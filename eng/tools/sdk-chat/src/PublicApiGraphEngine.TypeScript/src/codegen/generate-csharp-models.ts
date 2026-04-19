// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Code generator that produces Models.Generated.cs from models.ts.
 *
 * This is the single source of truth for the JSON wire-contract between the
 * TypeScript extraction engine and the C# formatter/orchestrator.
 *
 * Usage:  npx tsx src/codegen/generate-csharp-models.ts
 *
 * The generator:
 *  1. Parses models.ts using ts-morph
 *  2. Walks only the allowlisted interfaces (wire-contract types)
 *  3. Maps TS types → C# types recursively, failing on unsupported constructs
 *  4. Emits a partial sealed record per interface with [JsonPropertyName] attrs
 *  5. Writes Models.Generated.cs — any C#-only logic lives in Models.Handwritten.cs
 */

import { Project, SyntaxKind, type InterfaceDeclaration, type PropertySignature, type TypeNode } from "ts-morph";
import * as path from "node:path";
import * as fs from "node:fs";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Interfaces to generate — only the wire-contract subset of models.ts. */
const ALLOWLISTED_TYPES = new Set([
  "MethodInfo",
  "PropertyInfo",
  "IndexSignatureInfo",
  "ConstructorInfo",
  "ParameterInfo",
  "ClassInfo",
  "CallSignatureInfo",
  "ConstructSignatureInfo",
  "InterfaceInfo",
  "EnumInfo",
  "TypeAliasInfo",
  "FunctionInfo",
  "ModuleInfo",
  "NamespaceInfo",
  "ApiIndex",
  "DependencyInfo",
]);

/** TS properties that are NOT part of the wire contract (transient/internal). */
const EXCLUDED_PROPERTIES: Record<string, Set<string>> = {
  ApiIndex: new Set(["qualifiedReferencedTypes"]),
};

/**
 * Properties whose C# implementation requires custom logic and live in the
 * handwritten partial. The generator skips these entirely.
 */
const HANDWRITTEN_PROPERTIES: Record<string, Set<string>> = {
  FunctionInfo: new Set(["sig"]),
  MethodInfo: new Set(["sig"]),
  ConstructorInfo: new Set(["sig"]),
};

/** C# property name overrides: tsName → csharpName. */
const NAME_OVERRIDES: Record<string, Record<string, string>> = {
  "*": {
    deprecated: "IsDeprecated",
    deprecatedMsg: "DeprecatedMessage",
  },
  ParameterInfo: {
    optional: "IsOptional",
    rest: "IsRest",
  },
};

/**
 * Explicit non-nullable required properties (C# property has no `?`).
 * By default, optional TS properties (with `?`) map to nullable C# types.
 */
const REQUIRED_PROPERTIES: Record<string, Set<string>> = {
  ApiIndex: new Set(["package", "modules"]),
  ModuleInfo: new Set(["name"]),
  ClassInfo: new Set(["name"]),
  InterfaceInfo: new Set(["name"]),
  EnumInfo: new Set(["name"]),
  TypeAliasInfo: new Set(["name", "type"]),
  FunctionInfo: new Set(["name"]),
  MethodInfo: new Set(["name"]),
  PropertyInfo: new Set(["name", "type"]),
  IndexSignatureInfo: new Set(["keyName", "keyType", "valueType"]),
  ParameterInfo: new Set(["name", "type"]),
  ConstructorInfo: new Set([]),
  NamespaceInfo: new Set(["name"]),
  DependencyInfo: new Set(["package"]),
  CallSignatureInfo: new Set(["sig"]),
  ConstructSignatureInfo: new Set(["sig"]),
};

/** Properties that use the C# `required` keyword on the init accessor. */
const REQUIRED_KEYWORD_PROPERTIES: Record<string, Set<string>> = {
  ParameterInfo: new Set(["name", "type"]),
};

/** C# base types / interfaces per record. */
const BASE_TYPES: Record<string, string> = {
  ApiIndex: "IApiIndex",
};

/** Properties where JsonIgnoreCondition should be WhenWritingDefault (for non-nullable booleans). */
const WHEN_WRITING_DEFAULT_PROPERTIES: Record<string, Set<string>> = {
  DependencyInfo: new Set(["isNode"]),
};

/** Override C# type for specific properties (bypasses automatic mapping). */
const TYPE_OVERRIDES: Record<string, Record<string, string>> = {
  DependencyInfo: { isNode: "bool" },
  ApiIndex: { ambientTypes: "Dictionary<string, List<string>>?" },
};

// ---------------------------------------------------------------------------
// TS → C# type mapping (recursive, fail-closed)
// ---------------------------------------------------------------------------

function mapType(
  typeNode: TypeNode,
  nullable: boolean,
  interfaceName: string,
  propName: string,
): string {
  // Check for explicit type override first (returns as-is, no nullable adjustment)
  const override = TYPE_OVERRIDES[interfaceName]?.[propName];
  if (override) return override;

  const kind = typeNode.getKind();

  // string
  if (kind === SyntaxKind.StringKeyword) {
    return nullable ? "string?" : "string";
  }

  // boolean
  if (kind === SyntaxKind.BooleanKeyword) {
    return "bool?"; // JSON booleans are always nullable in this contract
  }

  // number
  if (kind === SyntaxKind.NumberKeyword) {
    return nullable ? "int?" : "int";
  }

  // T[] array syntax
  if (kind === SyntaxKind.ArrayType) {
    const elementType = typeNode.asKindOrThrow(SyntaxKind.ArrayType).getElementTypeNode();
    const inner = mapType(elementType, false, interfaceName, propName);
    return nullable ? `IReadOnlyList<${inner}>?` : `IReadOnlyList<${inner}>`;
  }

  // TypeReference: Record<K,V>, model references, etc.
  if (kind === SyntaxKind.TypeReference) {
    const ref = typeNode.asKindOrThrow(SyntaxKind.TypeReference);
    const typeName = ref.getTypeName().getText();
    const typeArgs = ref.getTypeArguments();

    // Record<K, V> → Dictionary<K, V>
    if (typeName === "Record" && typeArgs.length === 2) {
      const keyType = mapType(typeArgs[0], false, interfaceName, propName);
      const valType = mapType(typeArgs[1], false, interfaceName, propName);
      return nullable
        ? `Dictionary<${keyType}, ${valType}>?`
        : `Dictionary<${keyType}, ${valType}>`;
    }

    // Allowlisted model reference (e.g., ClassInfo, ModuleInfo)
    if (ALLOWLISTED_TYPES.has(typeName)) {
      return nullable ? `${typeName}?` : typeName;
    }

    throw new Error(
      `Unsupported type reference '${typeName}' in ${interfaceName}.${propName}. ` +
        `Add it to ALLOWLISTED_TYPES or TYPE_OVERRIDES.`,
    );
  }

  // Union types — only support string literal unions (map to string)
  if (kind === SyntaxKind.UnionType) {
    const members = typeNode.asKindOrThrow(SyntaxKind.UnionType).getTypeNodes();
    const allStringLike = members.every(
      (m) => m.isKind(SyntaxKind.LiteralType) || m.isKind(SyntaxKind.StringKeyword),
    );
    if (allStringLike) return nullable ? "string?" : "string";

    throw new Error(
      `Unsupported union type '${typeNode.getText()}' in ${interfaceName}.${propName}. ` +
        `Only string literal unions are supported.`,
    );
  }

  throw new Error(
    `Unsupported type '${typeNode.getText()}' (kind: ${typeNode.getKindName()}) ` +
      `in ${interfaceName}.${propName}. Add explicit handling or use TYPE_OVERRIDES.`,
  );
}

// ---------------------------------------------------------------------------
// Code generation helpers
// ---------------------------------------------------------------------------

function getCSharpPropertyName(interfaceName: string, tsName: string): string {
  const specific = NAME_OVERRIDES[interfaceName]?.[tsName];
  if (specific) return specific;
  const global = NAME_OVERRIDES["*"]?.[tsName];
  if (global) return global;
  return tsName.charAt(0).toUpperCase() + tsName.slice(1);
}

function isPropertyRequired(interfaceName: string, tsName: string, isOptional: boolean): boolean {
  const required = REQUIRED_PROPERTIES[interfaceName];
  if (required?.has(tsName)) return true;
  return !isOptional;
}

function getDefaultValue(csharpType: string, required: boolean): string | null {
  if (!required) return null;
  if (csharpType === "string") return `""`;
  if (csharpType.startsWith("IReadOnlyList<") && !csharpType.endsWith("?")) return `[]`;
  return null;
}

function escapeXml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Format a JSDoc description as a C# XML doc summary, handling multiline. */
function formatDocComment(text: string): string[] {
  const escaped = escapeXml(text);
  const lines = escaped.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  if (lines.length === 1) {
    return [`    /// <summary>${lines[0]}</summary>`];
  }
  const result: string[] = [];
  result.push(`    /// <summary>`);
  for (const line of lines) {
    result.push(`    /// ${line}`);
  }
  result.push(`    /// </summary>`);
  return result;
}

// ---------------------------------------------------------------------------
// Property and record generation
// ---------------------------------------------------------------------------

function generateProperty(iface: InterfaceDeclaration, prop: PropertySignature): string[] {
  const interfaceName = iface.getName();
  const tsName = prop.getName();

  if (EXCLUDED_PROPERTIES[interfaceName]?.has(tsName)) return [];
  if (HANDWRITTEN_PROPERTIES[interfaceName]?.has(tsName)) return [];

  const typeNode = prop.getTypeNodeOrThrow();
  const isOptional = prop.hasQuestionToken();
  const required = isPropertyRequired(interfaceName, tsName, isOptional);
  const nullable = !required;

  const csharpName = getCSharpPropertyName(interfaceName, tsName);
  const csharpType = mapType(typeNode, nullable, interfaceName, tsName);

  const lines: string[] = [];

  // JSDoc → XML doc comment
  const jsDocs = prop.getJsDocs();
  if (jsDocs.length > 0) {
    const docText = jsDocs[0].getDescription().trim();
    if (docText) {
      lines.push(...formatDocComment(docText));
    }
  }

  // [JsonPropertyName]
  lines.push(`    [JsonPropertyName("${tsName}")]`);

  // [JsonIgnore] for optional properties
  if (nullable) {
    if (WHEN_WRITING_DEFAULT_PROPERTIES[interfaceName]?.has(tsName)) {
      lines.push(`    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]`);
    } else {
      lines.push(`    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]`);
    }
  }

  // Property declaration
  const requiredKw = REQUIRED_KEYWORD_PROPERTIES[interfaceName]?.has(tsName) ? "required " : "";
  const defaultValue = getDefaultValue(csharpType, required);
  const defaultSuffix = defaultValue ? ` = ${defaultValue};` : "";
  lines.push(`    public ${requiredKw}${csharpType} ${csharpName} { get; init; }${defaultSuffix}`);

  return lines;
}

function generateRecord(iface: InterfaceDeclaration): string {
  const name = iface.getName();
  const baseType = BASE_TYPES[name];
  const baseClause = baseType ? ` : ${baseType}` : "";

  const lines: string[] = [];
  lines.push(`public sealed partial record ${name}${baseClause}`);
  lines.push(`{`);

  const props = iface.getProperties();
  let firstProp = true;
  for (const prop of props) {
    const propLines = generateProperty(iface, prop);
    if (propLines.length > 0) {
      if (!firstProp) lines.push("");
      lines.push(...propLines);
      firstProp = false;
    }
  }

  lines.push(`}`);
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const modelsPath = path.resolve(import.meta.dirname, "..", "models.ts");
  const outputPath = path.resolve(import.meta.dirname, "..", "..", "Models.Generated.cs");
  const checkOnly = process.argv.includes("--check");

  console.log(`Reading models from: ${modelsPath}`);

  const project = new Project({ compilerOptions: { strict: true } });
  const sourceFile = project.addSourceFileAtPath(modelsPath);

  const interfaces = sourceFile.getInterfaces().filter((i) => {
    const name = i.getName();
    if (!i.isExported()) return false;
    if (!ALLOWLISTED_TYPES.has(name)) {
      console.log(`  Skipping non-allowlisted interface: ${name}`);
      return false;
    }
    return true;
  });

  // Verify all allowlisted types were found
  const found = new Set(interfaces.map((i) => i.getName()));
  for (const expected of ALLOWLISTED_TYPES) {
    if (!found.has(expected)) {
      throw new Error(`Allowlisted interface '${expected}' not found in models.ts`);
    }
  }

  console.log(`Generating ${interfaces.length} records...`);

  const records = interfaces.map(generateRecord);

  const output = [
    `// Copyright (c) Microsoft Corporation.`,
    `// Licensed under the MIT License.`,
    ``,
    `// <auto-generated>`,
    `// This file was generated by src/codegen/generate-csharp-models.ts from models.ts.`,
    `// Do not edit manually. Run: npx tsx src/codegen/generate-csharp-models.ts`,
    `// </auto-generated>`,
    ``,
    `using System.Text.Json.Serialization;`,
    `using PublicApiGraphEngine.Contracts;`,
    ``,
    `#nullable enable`,
    ``,
    `namespace PublicApiGraphEngine.TypeScript;`,
    ``,
    records.join("\n\n"),
    ``,
  ].join("\n");

  if (checkOnly) {
    const existing = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf-8") : "";
    if (existing !== output) {
      console.error("❌ Models.Generated.cs is out of date. Run: npm run generate:models");
      process.exit(1);
    }
    console.log("✅ Models.Generated.cs is up to date.");
    return;
  }

  fs.writeFileSync(outputPath, output, "utf-8");
  console.log(`✅ Wrote ${outputPath}`);
  console.log(`   ${interfaces.length} records from models.ts`);
}

main();
