// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import ts from "typescript";

export const header =
  "// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\n";

export function parse(text, file = "module.ts") {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  if (source.parseDiagnostics.length) {
    throw new Error(
      `${file}: ${source.parseDiagnostics
        .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))
        .join("; ")}`,
    );
  }
  return source;
}

export function nameOf(node) {
  if (!node) return undefined;
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
    return node.text;
  }
  return undefined;
}

export function declarations(source) {
  const result = new Map();
  for (const statement of source.statements) {
    let name = nameOf(statement.name);
    if (ts.isVariableStatement(statement)) {
      const names = statement.declarationList.declarations.map((item) => nameOf(item.name));
      if (names.some((item) => !item))
        throw new Error(`${source.fileName}: unsupported top-level binding`);
      name = names.join(",");
    }
    if (!name) continue;
    if (result.has(name)) throw new Error(`${source.fileName}: duplicate declaration ${name}`);
    result.set(name, statement);
  }
  return result;
}

export function textOf(node, source) {
  return source.text.slice(node.getFullStart(), node.end).trim();
}

export function edit(text, edits) {
  let previous = text.length;
  for (const change of [...edits].sort((a, b) => b.start - a.start)) {
    if (change.end > previous || change.start > change.end)
      throw new Error("Overlapping source edits");
    text = text.slice(0, change.start) + change.text + text.slice(change.end);
    previous = change.start;
  }
  return text;
}

export function renameSymbols(text, replacements, file = "module.ts") {
  if (!replacements.size) return text;
  const source = parse(text, file);
  const options = { noLib: true, target: ts.ScriptTarget.Latest };
  const host = ts.createCompilerHost(options);
  host.getSourceFile = (name) => (name === file ? source : undefined);
  host.fileExists = (name) => name === file;
  host.readFile = (name) => (name === file ? text : undefined);
  const checker = ts.createProgram([file], options, host).getTypeChecker();
  const symbols = new Map();
  function findBindings(node) {
    if (
      ts.isIdentifier(node) &&
      replacements.has(node.text) &&
      node.parent?.name === node &&
      !ts.isPropertyAssignment(node.parent) &&
      !ts.isPropertySignature(node.parent) &&
      !ts.isPropertyAccessExpression(node.parent)
    ) {
      const symbol = checker.getSymbolAtLocation(node);
      if (symbol) symbols.set(symbol, replacements.get(node.text));
    }
    ts.forEachChild(node, findBindings);
  }
  findBindings(source);
  const edits = [];
  function visit(node) {
    if (ts.isShorthandPropertyAssignment(node)) {
      const renamed = symbols.get(checker.getShorthandAssignmentValueSymbol(node));
      if (renamed && renamed !== node.name.text) {
        edits.push({
          start: node.getStart(source),
          end: node.end,
          text: `${node.name.text}: ${renamed}`,
        });
        return;
      }
    }
    if (ts.isIdentifier(node)) {
      const renamed = symbols.get(checker.getSymbolAtLocation(node));
      if (renamed && renamed !== node.text) {
        edits.push({ start: node.getStart(source), end: node.end, text: renamed });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return edit(text, edits);
}

export function importsOf(source) {
  const result = [];
  for (const statement of source.statements.filter(ts.isImportDeclaration)) {
    const module = statement.moduleSpecifier.text;
    const clause = statement.importClause;
    if (!clause) {
      result.push({ module, sideEffect: true });
      continue;
    }
    if (clause.name) result.push({ module, imported: "default", local: clause.name.text });
    if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
      result.push({ module, imported: "*", local: clause.namedBindings.name.text });
    } else if (clause.namedBindings) {
      for (const specifier of clause.namedBindings.elements) {
        result.push({
          module,
          imported: specifier.propertyName?.text ?? specifier.name.text,
          local: specifier.name.text,
        });
      }
    }
  }
  return result;
}

export function resolveImport(file, module) {
  return module.startsWith(".")
    ? path.posix.normalize(path.posix.join(path.posix.dirname(file), module))
    : module;
}

export function relativeImport(file, target) {
  if (!target.startsWith(".") && !target.endsWith(".js") && !target.endsWith(".mjs")) return target;
  const relative = path.posix.relative(path.posix.dirname(file), target);
  return relative.startsWith(".") ? relative : `./${relative}`;
}

function referenceKind(node) {
  const parent = node.parent;
  if (ts.isExportSpecifier(parent)) {
    if (parent.parent.parent.moduleSpecifier) return undefined;
    if (parent.propertyName && parent.name === node) return undefined;
    return parent.isTypeOnly || parent.parent.parent.isTypeOnly ? "type" : "value";
  }
  if (
    (parent?.name === node &&
      !ts.isShorthandPropertyAssignment(parent) &&
      !ts.isTypeReferenceNode(parent)) ||
    (ts.isPropertyAccessExpression(parent) && parent.name === node)
  ) {
    return undefined;
  }
  for (let current = parent; current; current = current.parent) {
    if (
      ts.isExpressionWithTypeArguments(current) &&
      ts.isHeritageClause(current.parent) &&
      ts.isClassDeclaration(current.parent.parent) &&
      current.parent.token === ts.SyntaxKind.ExtendsKeyword
    )
      return "value";
    if (ts.isTypeNode(current)) return "type";
    if (ts.isStatement(current) || ts.isExpression(current)) break;
  }
  return "value";
}

export function renderImports(file, body, candidates, mapImport = (item) => item) {
  const references = new Map();
  const source = parse(body, file);
  function visit(node) {
    if (ts.isIdentifier(node)) {
      const kind = referenceKind(node);
      if (kind) {
        const kinds = references.get(node.text) ?? new Set();
        kinds.add(kind);
        references.set(node.text, kinds);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  const selected = new Map();
  const sideEffects = new Set();
  for (const original of candidates) {
    const item = mapImport(original);
    if (!item) continue;
    if (item.sideEffect) {
      sideEffects.add(item.module);
      continue;
    }
    if (!references.has(item.local)) continue;
    const previous = selected.get(item.local);
    if (previous && (previous.module !== item.module || previous.imported !== item.imported)) {
      throw new Error(
        `${file}: conflicting imports for ${item.local}: ${previous.module}, ${item.module}`,
      );
    }
    selected.set(item.local, item);
  }
  const groups = new Map();
  const lines = [...sideEffects].map((module) => `import ${JSON.stringify(module)};`);
  for (const item of selected.values()) {
    const typeOnly = !references.get(item.local).has("value");
    if (item.imported === "default" || item.imported === "*") {
      lines.push(
        `import ${typeOnly ? "type " : ""}${item.imported === "*" ? "* as " : ""}${item.local} from ${JSON.stringify(item.module)};`,
      );
      continue;
    }
    const key = `${typeOnly}:${item.module}`;
    if (!groups.has(key)) groups.set(key, { module: item.module, typeOnly, names: [] });
    groups
      .get(key)
      .names.push(item.imported === item.local ? item.local : `${item.imported} as ${item.local}`);
  }
  for (const { module, typeOnly, names } of groups.values()) {
    lines.push(
      `import ${typeOnly ? "type " : ""}{ ${names.join(", ")} } from ${JSON.stringify(module)};`,
    );
  }
  return lines.join("\n");
}

export function exportEntries(source) {
  const result = [];
  for (const statement of source.statements.filter(ts.isExportDeclaration)) {
    if (!statement.exportClause || !ts.isNamedExports(statement.exportClause)) {
      throw new Error(
        `${source.fileName}: unsupported wildcard export ${statement.getText(source)}`,
      );
    }
    for (const item of statement.exportClause.elements) {
      result.push({
        name: item.name.text,
        imported: item.propertyName?.text ?? item.name.text,
        module: statement.moduleSpecifier?.text,
        isTypeOnly: statement.isTypeOnly || item.isTypeOnly,
      });
    }
  }
  return result;
}

export function renderExports(entries) {
  const names = new Set();
  const groups = new Map();
  for (const entry of entries) {
    if (names.has(entry.name)) throw new Error(`Duplicate export ${entry.name}`);
    names.add(entry.name);
    const key = `${entry.isTypeOnly}:${entry.module}`;
    if (!groups.has(key)) groups.set(key, { ...entry, names: [] });
    groups
      .get(key)
      .names.push(
        entry.imported === entry.name ? entry.name : `${entry.imported} as ${entry.name}`,
      );
  }
  return [...groups.values()]
    .map(
      (group) =>
        `export ${group.isTypeOnly ? "type " : ""}{ ${group.names.join(", ")} }${group.module ? ` from ${JSON.stringify(group.module)}` : ""};`,
    )
    .join("\n");
}
