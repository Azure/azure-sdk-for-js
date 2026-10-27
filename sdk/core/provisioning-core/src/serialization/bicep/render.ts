// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DeclarableBodyNode,
  DecoratorsNode,
  ExpressionNode,
  InfraNode,
  ModuleDeclarationNode,
  OutputDeclarationNode,
  ParameterDeclarationNode,
  ResourceDeclarationNode,
  TypeNode,
  VariableDeclarationNode,
} from "../ast/index.js";
import { Stack } from "../../constructs/stack.js";

import { buildBicepFiles } from "./file-layout/build-bicep-files.js";

const PRECEDENCE: Record<string, number> = {
  "??": 1,
  "||": 2,
  "&&": 3,
  "==": 4,
  "!=": 4,
  "=~": 4,
  "!~": 4,
  "<": 5,
  "<=": 5,
  ">": 5,
  ">=": 5,
  "+": 6,
  "-": 6,
  "*": 7,
  "/": 7,
  "%": 7,
};

const ACCESS_PRECEDENCE = 9;

/** A generated Bicep source file and its relative output path. */
export interface RenderedBicepFile {
  readonly path: string;
  readonly contents: string;
}

/** Render authored Stacks into Bicep files without writing or deploying them. */
export function renderBicepFiles(input: Stack | readonly Stack[]): readonly RenderedBicepFile[] {
  const stacks: readonly Stack[] = Array.isArray(input) ? input : [input];
  if (stacks.length === 0) return [];
  const names = new Set<string>();
  const files = stacks.flatMap((stack) => {
    if (!(stack instanceof Stack)) {
      throw new Error(
        "Bicep generation requires authored Stacks. Restore supported JSON definitions with deserialize() first.",
      );
    }
    return buildBicepFiles(stack).map((file) => renderBicepFile(file));
  });
  for (const file of files) {
    if (names.has(file.path)) {
      throw new Error(`Duplicate Bicep file path "${file.path}". Give Stacks distinct names.`);
    }
    names.add(file.path);
  }
  return files;
}

export function renderBicepFile(file: InfraNode): RenderedBicepFile {
  const sections: string[] = [];

  if (file.targetScope !== undefined) {
    sections.push(`targetScope = ${renderStringLiteral(file.targetScope)}`);
  }

  sections.push(...renderNamedDeclarations(file.parameters, renderParameter));
  sections.push(...renderNamedDeclarations(file.variables, renderVariable));
  sections.push(...renderNamedDeclarations(file.resources, renderResource));
  sections.push(...renderNamedDeclarations(file.modules, renderModule));
  sections.push(...renderNamedDeclarations(file.outputs, renderOutput));

  return {
    path: file.fileName,
    contents: `${sections.filter((section) => section.length > 0).join("\n\n")}\n`,
  };
}

function renderNamedDeclarations<T extends { readonly bicepIdentifier: string }>(
  record: Record<string, T> | undefined,
  render: (name: string, value: T) => string,
): string[] {
  if (record === undefined) {
    return [];
  }

  return Object.values(record).map((value) => render(value.bicepIdentifier, value));
}

function renderDecorators(decorators: DecoratorsNode | undefined): string {
  if (decorators === undefined) {
    return "";
  }

  const lines: string[] = [];

  if (decorators.description !== undefined) {
    lines.push(`@description(${renderStringLiteral(decorators.description)})`);
  }
  if (decorators.secure) lines.push("@secure()");
  if (decorators.minValue !== undefined) {
    lines.push(`@minValue(${decorators.minValue})`);
  }
  if (decorators.maxValue !== undefined) {
    lines.push(`@maxValue(${decorators.maxValue})`);
  }
  if (decorators.minLength !== undefined) {
    lines.push(`@minLength(${decorators.minLength})`);
  }
  if (decorators.maxLength !== undefined) {
    lines.push(`@maxLength(${decorators.maxLength})`);
  }
  if (decorators.metadata !== undefined) {
    const obj: ExpressionNode = { kind: "object", value: decorators.metadata };
    lines.push(`@metadata(${renderExpression(obj)})`);
  }
  if (decorators.allowed !== undefined) {
    const arr: ExpressionNode = {
      kind: "array",
      items: [...decorators.allowed],
    };
    lines.push(`@allowed(${renderExpression(arr)})`);
  }
  if (decorators.discriminator !== undefined) {
    lines.push(`@discriminator(${renderStringLiteral(decorators.discriminator)})`);
  }
  if (decorators.sealed) lines.push("@sealed()");
  if (decorators.export) lines.push("@export()");
  if (decorators.batchSize !== undefined) {
    lines.push(`@batchSize(${decorators.batchSize})`);
  }

  return lines.length > 0 ? `${lines.join("\n")}\n` : "";
}

function renderParameter(name: string, node: ParameterDeclarationNode): string {
  return `${renderDecorators(node.decorators)}param ${name} ${renderType(node.valueType)}${node.defaultValue === undefined ? "" : ` = ${renderExpression(node.defaultValue)}`}`;
}

function renderVariable(name: string, node: VariableDeclarationNode): string {
  return `${renderDecorators(node.decorators)}var ${name} = ${renderExpression(node.value)}`;
}

function renderOutput(name: string, node: OutputDeclarationNode): string {
  return `${renderDecorators(node.decorators)}output ${name} ${renderType(node.valueType)} = ${renderExpression(node.value)}`;
}

function renderResource(name: string, node: ResourceDeclarationNode): string {
  return `${renderDecorators(node.decorators)}resource ${name} ${renderStringLiteral(`${node.type}@${node.apiVersion}`)}${node.existing ? " existing" : ""} = ${renderDeclarableBody(node.value)}`;
}

function renderModule(name: string, node: ModuleDeclarationNode): string {
  return `${renderDecorators(node.decorators)}module ${name} ${renderStringLiteral(node.path)} = ${renderDeclarableBody(node.value)}`;
}

function renderDeclarableBody(node: DeclarableBodyNode): string {
  switch (node.kind) {
    case "object":
      return renderExpression(node);
    case "if-condition":
      return `if (${renderExpression(node.condition)}) ${renderExpression(node.body)}`;
    case "for-expression":
      return renderExpression(node);
    default:
      return assertNever(node);
  }
}

function renderExpression(node: ExpressionNode, parentPrecedence?: number): string {
  switch (node.kind) {
    case "null":
      return "null";
    case "boolean":
      return node.value ? "true" : "false";
    case "integer":
      return node.value;
    case "string":
      return renderStringLiteral(node.value);
    case "array":
      if (node.items.length === 0) {
        return "[]";
      }

      return `[\n${indent(node.items.map((item) => renderExpression(item)).join("\n"))}\n]`;
    case "object": {
      const entries = Object.entries(node.value);
      if (entries.length === 0) {
        return "{}";
      }

      return `{\n${indent(entries.map(([key, value]) => `${renderPropertyKey(key)}: ${renderExpression(value)}`).join("\n"))}\n}`;
    }
    case "identifier":
      return node.id;
    case "function-call": {
      // Bicep prefers string interpolation over concat() — transform at render time.
      if (typeof node.target === "string" && node.target === "concat" && node.args.length > 0) {
        const inner = node.args
          .map((arg) =>
            arg.kind === "string" ? escapeStringContent(arg.value) : `\${${renderExpression(arg)}}`,
          )
          .join("");
        return `'${inner}'`;
      }
      const target = typeof node.target === "string" ? node.target : renderExpression(node.target);
      return `${target}(${node.args.map((arg) => renderExpression(arg)).join(", ")})`;
    }
    case "instance-function-call":
      return `${renderExpression(node.base, ACCESS_PRECEDENCE)}.${node.name}(${node.args.map((arg) => renderExpression(arg)).join(", ")})`;
    case "property-access":
      return `${renderExpression(node.base, ACCESS_PRECEDENCE)}${node.nullish ? ".?" : "."}${node.property}`;
    case "array-access":
      return `${renderExpression(node.base, ACCESS_PRECEDENCE)}[${node.nullish ? "?" : ""}${node.fromEnd ? "^" : ""}${renderExpression(node.index)}]`;
    case "binary-operation": {
      const prec = PRECEDENCE[node.operator] ?? 0;
      const inner = `${renderExpression(node.left, prec)} ${node.operator} ${renderExpression(node.right, prec + 0.5)}`;
      return parentPrecedence !== undefined && prec < parentPrecedence ? `(${inner})` : inner;
    }
    case "unary-operation": {
      const UNARY_PREC = 8;
      const inner = `${node.operator}${renderExpression(node.argument, UNARY_PREC)}`;
      return parentPrecedence !== undefined && parentPrecedence > UNARY_PREC ? `(${inner})` : inner;
    }
    case "ternary-operation": {
      const inner = `${renderExpression(node.condition, 0.5)} ? ${renderExpression(node.trueValue)} : ${renderExpression(node.falseValue)}`;
      return parentPrecedence !== undefined && parentPrecedence > 0 ? `(${inner})` : inner;
    }
    case "if-condition":
      return `if (${renderExpression(node.condition)}) ${renderExpression(node.body)}`;
    case "for-expression": {
      const variables =
        node.indexVariable === undefined
          ? node.itemVariable
          : `(${node.itemVariable}, ${node.indexVariable})`;
      return `[for ${variables} in ${renderExpression(node.collection)}: ${renderExpression(node.body)}]`;
    }
    case "interpolated-string": {
      const inner = node.segments
        .map((seg) =>
          seg.kind === "string" ? escapeStringContent(seg.value) : `\${${renderExpression(seg)}}`,
        )
        .join("");
      return `'${inner}'`;
    }
    default:
      return assertNever(node);
  }
}

function renderType(node: TypeNode): string {
  switch (node.kind) {
    case "primitive-type":
      return node.name;
    case "type-reference":
      return node.name;
    case "string-type-literal":
      return renderStringLiteral(node.value);
    case "integer-type-literal":
      return node.value;
    case "boolean-type-literal":
      return node.value ? "true" : "false";
    case "null-type-literal":
      return "null";
    case "array-type":
      return `${needsParenthesizedArrayItem(node.item) ? `(${renderType(node.item)})` : renderType(node.item)}[]`;
    case "object-type-property":
      return `${renderDecorators(node.decorators)}${renderPropertyKey(node.key)}${node.optional ? "?" : ""}: ${renderType(node.valueType)}`;
    case "object-type-additional-properties":
      return `${renderDecorators(node.decorators)}*: ${renderType(node.valueType)}`;
    case "object-type": {
      const members = [
        ...node.properties.map((property) => renderType(property)),
        ...(node.additionalProperties === undefined ? [] : [renderType(node.additionalProperties)]),
      ];
      if (members.length === 0) {
        return "{}";
      }
      return `{\n${indent(members.join("\n"))}\n}`;
    }
    case "union-type-member":
      return renderType(node.valueType);
    case "union-type":
      return node.members.map((member) => renderType(member.valueType)).join(" | ");
    case "nullable-type":
      return `${renderType(node.base)}?`;
    case "parameterized-type-argument":
      return renderType(node.valueType);
    case "parameterized-type-instantiation":
      return `${renderType(node.base)}<${node.args.map((arg) => renderType(arg.valueType)).join(", ")}>`;
    default:
      return assertNever(node);
  }
}

function needsParenthesizedArrayItem(node: TypeNode): boolean {
  switch (node.kind) {
    case "primitive-type":
    case "type-reference":
    case "parameterized-type-instantiation":
      return false;
    default:
      return true;
  }
}

function renderPropertyKey(key: string): string {
  return /^[A-Za-z_][A-Za-z0-9_]*$/u.test(key) ? key : renderStringLiteral(key);
}

function renderStringLiteral(value: string): string {
  return `'${escapeStringContent(value)}'`;
}

function escapeStringContent(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\$\{/g, "\\${")
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t");
}

function indent(value: string, level = 1): string {
  const prefix = "  ".repeat(level);
  return value
    .split("\n")
    .map((line) => `${prefix}${line}`)
    .join("\n");
}

function unsupported(kind: string): Error {
  return new Error(`Unsupported Bicep renderer node kind: ${kind}.`);
}

function assertNever(value: never): never {
  throw unsupported((value as { kind?: string }).kind ?? "unknown");
}
