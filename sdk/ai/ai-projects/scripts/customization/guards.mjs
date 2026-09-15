// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import ts from "typescript";
import { canonicalize } from "./ast-merge.mjs";

const protectedFiles = new Set([
  "aiProjectClient.ts",
  "constants.ts",
  "getCustomFetch-browser.mts",
  "getCustomFetch.ts",
  "overwriteOpenAIClient.ts",
  "util.ts",
  "api/aiProjectContext.ts",
  "api/telemetry/index.ts",
  "api/telemetry/operations.ts",
  "api/datasets/operations.ts",
  "classic/telemetry/index.ts",
  "classic/datasets/index.ts",
  "classic/index.ts",
]);
// Converter/helper renames come only from the resolver's verified baseline metadata.
const packageRenames = new Map([
  ["ApiError", "ErrorModel"],
  ["_FileSearchToolFiltersValue", "_ComparisonFilterValue"],
  ["_FileSearchToolFiltersFilter", "_CompoundFilterFilter"],
]);
const behaviorProperties = new Set([
  "cursorFieldName",
  "hasMoreFieldName",
  "nextPageRequestOptions",
  "pollHeaders",
]);

function nameOf(node) {
  if (!node) return undefined;
  if (ts.isIdentifier(node) || ts.isStringLiteralLike(node) || ts.isNumericLiteral(node)) {
    return node.text;
  }
  if (ts.isComputedPropertyName(node) && ts.isStringLiteralLike(node.expression)) {
    return node.expression.text;
  }
  return undefined;
}

function walk(node, visit) {
  visit(node);
  ts.forEachChild(node, (child) => walk(child, visit));
}

function unwrap(node) {
  while (
    node &&
    (ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isSatisfiesExpression(node) ||
      ts.isNonNullExpression(node) ||
      ts.isParenthesizedTypeNode(node))
  ) {
    node = node.expression ?? node.type;
  }
  return node;
}

function mapped(name, renames) {
  const seen = new Set();
  while (renames.has(name) && renames.get(name) !== name) {
    if (seen.has(name)) throw new Error(`Cyclic customization rename for ${name}`);
    seen.add(name);
    name = renames.get(name);
  }
  return name;
}

function renameText(text, renames) {
  if (!renames.size) return text;
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, true, ts.LanguageVariant.Standard, text);
  const edits = [];
  for (let token = scanner.scan(); token !== ts.SyntaxKind.EndOfFileToken; token = scanner.scan()) {
    if (token === ts.SyntaxKind.Identifier && renames.has(scanner.getTokenText())) {
      edits.push({
        start: scanner.getTokenPos(),
        end: scanner.getTextPos(),
        text: mapped(scanner.getTokenText(), renames),
      });
    }
  }
  for (const edit of edits.reverse()) {
    text = text.slice(0, edit.start) + edit.text + text.slice(edit.end);
  }
  return text;
}

function cleanUserAgent(text) {
  return text
    .replace(/(\$\{[^}]+\}) azsdk-js-(?:client|api)`/g, "$1`")
    .replace(/(\$\{[^}]+\}) azsdk-js-(?:client|api) /g, "$1 ")
    .replace(/`azsdk-js-(?:client|api)`/g, '""')
    .replace(/`azsdk-js-(?:client|api) /g, "`");
}

function nodeKey(node, renames = new Map(), userAgentCleanup = false) {
  let text = renameText(node.getText(), renames);
  if (userAgentCleanup) text = cleanUserAgent(text);
  if (ts.isTypeNode(node)) text = `type GuardType = ${text};`;
  else if (ts.isExpression(node)) text = `const guardValue = ${text};`;
  else if (ts.isVariableDeclaration(node)) text = `let ${text};`;
  else if (
    ts.isPropertyAssignment(node) ||
    ts.isShorthandPropertyAssignment(node) ||
    ts.isSpreadAssignment(node)
  ) {
    text = `const guardValue = { ${text} };`;
  } else if (
    node.parent &&
    (ts.isInterfaceDeclaration(node.parent) || ts.isTypeLiteralNode(node.parent))
  ) {
    text = `interface GuardType { ${text} }`;
  } else if (
    node.parent &&
    (ts.isClassDeclaration(node.parent) || ts.isClassExpression(node.parent))
  ) {
    text = `class GuardType { ${text} }`;
  } else if (ts.isEnumMember(node)) {
    text = `enum GuardType { ${text} }`;
  }
  return canonicalize(text);
}

function directDeclarations(source) {
  const result = [];
  for (const statement of source.statements) {
    if (ts.isVariableStatement(statement)) {
      for (const node of statement.declarationList.declarations) {
        const name = nameOf(node.name);
        if (name) result.push({ name, node });
      }
    } else {
      const name = nameOf(statement.name);
      if (name) result.push({ name, node: statement });
    }
  }
  return result;
}

function validOverloads(nodes) {
  return (
    nodes.every(
      (node) =>
        ts.isFunctionDeclaration(node) ||
        ts.isMethodDeclaration(node) ||
        ts.isMethodSignature(node) ||
        ts.isConstructorDeclaration(node),
    ) &&
    new Set(nodes.map((node) => node.kind)).size === 1 &&
    nodes.filter((node) => node.body).length <= 1 &&
    new Set(nodes.map((node) => nodeKey(node))).size === nodes.length
  );
}

function validateDuplicates(source, file, report) {
  function check(nodes, declaration, member = false) {
    const grouped = new Map();
    for (const node of nodes) {
      const name =
        nameOf(node.name) ?? (ts.isConstructorDeclaration(node) ? "constructor" : undefined);
      if (!name) continue;
      const key = `${node.modifiers?.some((item) => item.kind === ts.SyntaxKind.StaticKeyword) ? "static " : ""}${name}`;
      const group = grouped.get(key) ?? [];
      group.push(node);
      grouped.set(key, group);
    }
    for (const [name, group] of grouped) {
      if (group.length < 2 || validOverloads(group)) continue;
      if (
        group.length === 2 &&
        group.some(ts.isGetAccessorDeclaration) &&
        group.some(ts.isSetAccessorDeclaration)
      ) {
        continue;
      }
      report(
        file,
        member ? declaration : name,
        `Duplicate ${member ? "named member" : "declaration"} '${name}'; resolve the merge rather than relying on declaration merging.`,
        member ? name : undefined,
      );
    }
  }
  check(
    directDeclarations(source).map((item) => item.node),
    "<module>",
  );
  const bindings = new Set(directDeclarations(source).map((entry) => entry.name));
  for (const binding of imports({ source })) {
    if (binding.local.startsWith("side-effect:")) continue;
    if (bindings.has(binding.local))
      report(file, binding.local, "Duplicate imported or declared local binding.");
    bindings.add(binding.local);
  }
  walk(source, (node) => {
    if (
      ts.isInterfaceDeclaration(node) ||
      ts.isTypeLiteralNode(node) ||
      ts.isClassDeclaration(node) ||
      ts.isClassExpression(node) ||
      ts.isObjectLiteralExpression(node) ||
      ts.isEnumDeclaration(node)
    ) {
      let owner = node;
      while (owner.parent && !nameOf(owner.name)) owner = owner.parent;
      check(node.members ?? node.properties, nameOf(owner.name) ?? "<object>", true);
    }
    if (ts.isModuleBlock(node))
      check(
        directDeclarations(node).map((item) => item.node),
        "<namespace>",
      );
  });
}

function parseTree(tree, label, report) {
  const modules = new Map();
  for (const [file, text] of tree) {
    if (typeof file !== "string" || typeof text !== "string") {
      report(String(file), "<file>", `${label} must contain string paths and TypeScript text.`);
      continue;
    }
    if (label === "source" && /^[ \t]*(?:<{7}|\|{7}|>{7}|={7}(?:\r?$))/m.test(text)) {
      report(file, "<file>", "Unresolved merge conflict markers remain in customized source.");
    }
    if (!/\.(?:ts|mts|cts)$/.test(file)) continue;
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    for (const error of source.parseDiagnostics) {
      const position = source.getLineAndCharacterOfPosition(error.start ?? 0);
      report(
        file,
        "<file>",
        `${label} TypeScript parse error at ${position.line + 1}:${position.character + 1}: ${ts.flattenDiagnosticMessageText(error.messageText, " ")}`,
      );
    }
    if (source.parseDiagnostics.length) continue;
    if (label === "source") validateDuplicates(source, file, report);
    const entries = directDeclarations(source).map((item) => ({ ...item, file, source }));
    modules.set(file, {
      file,
      source,
      entries,
      byName: new Map(entries.map((entry) => [entry.name, entry])),
    });
  }
  return modules;
}

function inventory(modules, predicate = () => true) {
  const result = new Map();
  for (const module of modules.values()) {
    if (!predicate(module.file)) continue;
    for (const entry of module.entries) {
      const entries = result.get(entry.name) ?? [];
      entries.push(entry);
      result.set(entry.name, entries);
    }
  }
  return result;
}

function modelFile(file) {
  return file.startsWith("models/");
}

function candidates(index, name, renames) {
  const result = [];
  const target = mapped(name, renames);
  for (const [candidate, entries] of index) {
    if (mapped(candidate, renames) === target) result.push(...entries);
  }
  return result;
}

function find(index, name, file, renames, report) {
  const found = candidates(index, name, renames);
  const exact = found.filter((entry) => entry.file === file && entry.name === name);
  if (exact.length === 1) return exact[0];
  const local = found.filter((entry) => entry.file === file);
  if (local.length === 1) return local[0];
  const named = found.filter((entry) => entry.name === mapped(name, renames));
  if (named.length === 1) return named[0];
  if (found.length === 1) return found[0];
  if (found.length > 1) {
    report(
      file,
      mapped(name, renames),
      `Ambiguous declaration inventory: ${found.map((entry) => `${entry.file}::${entry.name}`).join(", ")}.`,
    );
  }
  return undefined;
}

function aliasTarget(node) {
  if (ts.isTypeAliasDeclaration(node)) {
    const type = unwrap(node.type);
    if (ts.isTypeReferenceNode(type) && !type.typeArguments?.length) return nameOf(type.typeName);
  }
  if (ts.isVariableDeclaration(node) && node.initializer && ts.isIdentifier(node.initializer)) {
    return node.initializer.text;
  }
  const callable = node.body ? node : node.initializer && unwrap(node.initializer);
  const body = callable?.body;
  let expression;
  if (body && ts.isBlock(body) && body.statements.length === 1) {
    const statement = body.statements[0];
    if (ts.isReturnStatement(statement)) expression = unwrap(statement.expression);
  } else if (body && !ts.isBlock(body)) {
    expression = unwrap(body);
  }
  if (
    expression &&
    ts.isCallExpression(expression) &&
    expression.arguments.length === callable.parameters?.length &&
    expression.arguments.every(
      (argument, index) => nameOf(unwrap(argument)) === nameOf(callable.parameters[index].name),
    )
  ) {
    return nameOf(expression.expression);
  }
  return undefined;
}

function resolveAlias(entry, index, renames, report, seen = new Set()) {
  if (!entry) return undefined;
  const key = `${entry.file}::${entry.name}`;
  if (seen.has(key)) {
    report(entry.file, entry.name, "Cyclic simple alias prevents customization validation.");
    return undefined;
  }
  seen.add(key);
  const target = aliasTarget(entry.node);
  if (!target) return entry;
  const binding = imports(entry).find((item) => item.local === target);
  const next = find(
    index,
    binding?.imported ?? target,
    moduleFile(entry.file, binding?.module) ?? entry.file,
    renames,
    report,
  );
  return next ? resolveAlias(next, index, renames, report, seen) : entry;
}

function members(entry, index, renames, report, seen = new Set()) {
  entry = resolveAlias(entry, index, renames, report);
  if (!entry) return new Map();
  const key = `${entry.file}::${entry.name}`;
  if (seen.has(key)) return new Map();
  seen.add(key);
  const node = entry.node;
  const type = ts.isTypeAliasDeclaration(node) ? unwrap(node.type) : node;
  const result = new Map(
    (type.members ?? [])
      .filter((member) => nameOf(member.name))
      .map((member) => [nameOf(member.name), member]),
  );
  for (const clause of node.heritageClauses ?? []) {
    for (const heritage of clause.types) {
      const name = nameOf(heritage.expression);
      if (!name) continue;
      const parent = find(index, name, entry.file, renames, report);
      for (const [member, value] of members(parent, index, renames, report, seen)) {
        if (!result.has(member)) result.set(member, value);
      }
    }
  }
  return result;
}

function alternatives(entry, index, renames, report) {
  if (!entry || !ts.isTypeAliasDeclaration(entry.node)) return new Map();
  let type = unwrap(entry.node.type);
  const seen = new Set([`${entry.file}::${entry.name}`]);
  while (ts.isTypeReferenceNode(type) && !type.typeArguments?.length && nameOf(type.typeName)) {
    const target = find(index, nameOf(type.typeName), entry.file, renames, report);
    if (!target || !ts.isTypeAliasDeclaration(target.node)) break;
    const key = `${target.file}::${target.name}`;
    if (seen.has(key)) {
      report(entry.file, entry.name, "Cyclic union alias prevents validation.");
      break;
    }
    seen.add(key);
    entry = target;
    type = unwrap(target.node.type);
  }
  const types = ts.isUnionTypeNode(type) ? type.types : [type];
  return new Map(types.map((item) => [nodeKey(item, renames), item.getText()]));
}

function objectProperties(node, prefix = "", result = new Map()) {
  node = unwrap(node);
  if (!node || !ts.isObjectLiteralExpression(node)) return result;
  for (const property of node.properties) {
    const name = nameOf(property.name);
    if (!name) continue;
    const key = prefix ? `${prefix}.${name}` : name;
    result.set(key, property);
    if (ts.isPropertyAssignment(property)) objectProperties(property.initializer, key, result);
  }
  return result;
}

function mappings(entry, kind) {
  const result = new Map();
  if (!entry) return result;
  function visit(node) {
    if (node !== entry.node && ts.isFunctionLike(node)) return;
    if (kind === "body" && ts.isPropertyAssignment(node) && nameOf(node.name) === "body") {
      objectProperties(node.initializer, "", result);
    }
    if (kind === "return" && ts.isReturnStatement(node) && node.expression) {
      objectProperties(node.expression, "", result);
    }
    ts.forEachChild(node, visit);
  }
  visit(entry.node);
  return result;
}

function switchCases(entry, renames) {
  const result = new Map();
  if (entry) {
    walk(entry.node, (node) => {
      if (ts.isCaseClause(node))
        result.set(nodeKey(node.expression, renames), node.expression.getText());
    });
  }
  return result;
}

function requireDelta(previous, incoming, output, entry, kind, report) {
  for (const [member, value] of incoming) {
    if (!previous.has(member) && !output.has(member)) {
      report(
        entry.file,
        entry.name,
        `Missing newly emitted ${kind}; incorporate the generated addition without replacing maintained customizations.`,
        typeof value === "string" ? value : member,
      );
    } else if (
      !previous.has(member) &&
      /property|mapping/.test(kind) &&
      ts.isPropertyAssignment(value)
    ) {
      const actual = output.get(member);
      if (
        actual &&
        ts.isPropertyAssignment(actual) &&
        ts.isIdentifier(unwrap(actual.initializer)) &&
        unwrap(actual.initializer).text === "undefined" &&
        nodeKey(value.initializer) !== nodeKey(actual.initializer)
      ) {
        report(
          entry.file,
          entry.name,
          `New ${kind} is present but its value was replaced with undefined.`,
          member,
        );
      }
    }
  }
}

function preserveCustom(
  previousGenerated,
  previousSource,
  output,
  entry,
  kind,
  report,
  renames = new Map(),
) {
  for (const [member, value] of previousSource) {
    if (!previousGenerated.has(member) && !output.has(member)) {
      report(
        entry.file,
        entry.name,
        `Lost custom-only ${kind} from the clean source baseline.`,
        typeof value === "string" ? value : member,
      );
    } else if (!previousGenerated.has(member) && typeof value !== "string") {
      const actual = output.get(member);
      const preserved =
        ts.isPropertyAssignment(value) && ts.isPropertyAssignment(actual)
          ? containsObject(value.initializer, actual.initializer, renames)
          : nodeKey(value, renames) === nodeKey(actual, renames);
      if (!preserved)
        report(
          entry.file,
          entry.name,
          `Changed custom-only ${kind}; retain its maintained shape or mapping.`,
          member,
        );
    }
  }
}

function checkDeclaration(base, custom, incoming, output, indexes, renames, report) {
  const target = {
    file: output?.file ?? incoming?.file ?? custom.file,
    name: output?.name ?? mapped(incoming?.name ?? custom.name, renames),
  };
  const memberSets = [
    members(base, indexes.base, renames, report),
    members(custom, indexes.custom, renames, report),
    members(incoming, indexes.incoming, renames, report),
    members(output, indexes.output, renames, report),
  ];
  requireDelta(
    memberSets[0],
    memberSets[2],
    memberSets[3],
    target,
    "model or options member",
    report,
  );
  preserveCustom(memberSets[0], memberSets[1], memberSets[3], target, "member", report, renames);
  const unions = [
    alternatives(base, indexes.base, renames, report),
    alternatives(custom, indexes.custom, renames, report),
    alternatives(incoming, indexes.incoming, renames, report),
    alternatives(output, indexes.output, renames, report),
  ];
  requireDelta(unions[0], unions[2], unions[3], target, "union alternative", report);
  preserveCustom(unions[0], unions[1], unions[3], target, "union alternative", report, renames);
  if (/Serializer$|Deserializer$/.test(incoming?.name ?? custom.name)) {
    const resolved = [
      resolveAlias(base, indexes.base, renames, report),
      resolveAlias(custom, indexes.custom, renames, report),
      resolveAlias(incoming, indexes.incoming, renames, report),
      resolveAlias(output, indexes.output, renames, report),
    ];
    const returns = resolved.map((entry) => mappings(entry, "return"));
    requireDelta(returns[0], returns[2], returns[3], target, "converter return property", report);
    preserveCustom(
      returns[0],
      returns[1],
      returns[3],
      target,
      "converter return property",
      report,
      renames,
    );
    const cases = resolved.map((entry) => switchCases(entry, renames));
    requireDelta(cases[0], cases[2], cases[3], target, "converter discriminator case", report);
    preserveCustom(
      cases[0],
      cases[1],
      cases[3],
      target,
      "converter discriminator case",
      report,
      renames,
    );
  }
}

function checkModels(trees, renames, report) {
  const indexes = Object.fromEntries(
    Object.entries(trees).map(([key, modules]) => [key, inventory(modules, modelFile)]),
  );
  for (const entries of indexes.incoming.values()) {
    for (const incoming of entries) {
      const base = find(indexes.base, incoming.name, incoming.file, renames, report);
      const custom = find(indexes.custom, incoming.name, incoming.file, renames, report);
      const output = find(
        indexes.output,
        mapped(incoming.name, renames),
        incoming.file,
        renames,
        report,
      );
      if (!base && !output) {
        report(
          incoming.file,
          mapped(incoming.name, renames),
          "Missing genuinely new emitted model declaration (inventory includes all model modules).",
        );
      }
      checkDeclaration(base, custom, incoming, output, indexes, renames, report);
    }
  }
  for (const entries of indexes.custom.values()) {
    for (const custom of entries) {
      const base = find(indexes.base, custom.name, custom.file, renames, report);
      const incoming = find(indexes.incoming, custom.name, custom.file, renames, report);
      const output = find(indexes.output, custom.name, custom.file, renames, report);
      if (base && !incoming) continue;
      if (!output) {
        const alias = aliasTarget(custom.node);
        if (
          alias &&
          candidates(indexes.base, alias, renames).length &&
          !candidates(indexes.incoming, alias, renames).length
        )
          continue;
        report(
          custom.file,
          custom.name,
          "Lost maintained model declaration; no generated-backed removal was established across the model inventory.",
        );
      } else if (!incoming) {
        checkDeclaration(base, custom, undefined, output, indexes, renames, report);
      }
    }
  }
  return indexes;
}

function moduleFile(file, specifier) {
  if (!specifier?.startsWith(".")) return undefined;
  return path.posix
    .normalize(path.posix.join(path.posix.dirname(file), specifier))
    .replace(/\.mjs$/, ".mts")
    .replace(/\.cjs$/, ".cts")
    .replace(/\.js$/, ".ts");
}

function imports(module) {
  const result = [];
  for (const node of module?.source.statements ?? []) {
    if (!ts.isImportDeclaration(node)) continue;
    const clause = node.importClause;
    const specifier = node.moduleSpecifier.text;
    if (!clause) {
      result.push({
        local: `side-effect:${specifier}`,
        imported: "",
        module: specifier,
        typeOnly: false,
      });
    } else {
      if (clause.name)
        result.push({
          local: clause.name.text,
          imported: "default",
          module: specifier,
          typeOnly: clause.isTypeOnly,
        });
      if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
        result.push({
          local: clause.namedBindings.name.text,
          imported: "*",
          module: specifier,
          typeOnly: clause.isTypeOnly,
        });
      } else {
        for (const item of clause.namedBindings?.elements ?? []) {
          result.push({
            local: item.name.text,
            imported: item.propertyName?.text ?? item.name.text,
            module: specifier,
            typeOnly: clause.isTypeOnly || item.isTypeOnly,
          });
        }
      }
    }
  }
  return result;
}

function exportsOf(modules, file, report, seen = new Set()) {
  if (seen.has(file)) {
    report(file, "<exports>", "Cyclic wildcard re-exports prevent inventory validation.");
    return new Map();
  }
  const module = modules.get(file);
  const result = new Map();
  if (!module) return result;
  const add = (name, entry) => {
    if (result.has(name)) report(file, name, "Duplicate public export.");
    result.set(name, entry);
  };
  for (const node of module.source.statements) {
    if (ts.isExportDeclaration(node)) {
      const specifier = node.moduleSpecifier?.text;
      if (!node.exportClause) {
        const target = moduleFile(file, specifier);
        if (!target || !modules.has(target)) {
          report(
            file,
            "<exports>",
            `Cannot validate wildcard re-export from '${specifier}'. Use an explicit supported export.`,
          );
          continue;
        }
        for (const [name, entry] of exportsOf(modules, target, report, new Set([...seen, file])))
          add(name, entry);
      } else if (ts.isNamedExports(node.exportClause)) {
        for (const item of node.exportClause.elements) {
          const imported = item.propertyName?.text ?? item.name.text;
          const local = !specifier && imports(module).find((binding) => binding.local === imported);
          add(item.name.text, {
            name: item.name.text,
            imported: local?.imported ?? imported,
            module: specifier ?? local?.module,
            file,
          });
        }
      } else {
        add(node.exportClause.name.text, {
          name: node.exportClause.name.text,
          imported: "*",
          module: specifier,
          file,
        });
      }
    } else if (node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const entry of module.entries.filter(
        (entry) => entry.node === node || entry.node.parent?.parent === node,
      )) {
        add(entry.name, { name: entry.name, imported: entry.name, file });
      }
    }
  }
  return result;
}

function checkExports(trees, renames, report) {
  const baseInventory = inventory(trees.base);
  const incomingInventory = inventory(trees.incoming);
  for (const file of ["index.ts", "models/index.ts", "classic/index.ts"]) {
    const previous = exportsOf(trees.custom, file, report);
    const emittedBase = exportsOf(trees.base, file, report);
    const incoming = exportsOf(trees.incoming, file, report);
    const output = exportsOf(trees.output, file, report);
    const generatedBaselineNames = new Set(
      [...emittedBase.keys()].map((name) => mapped(name, renames)),
    );
    const customizedBaselineNames = new Set(
      [...previous.keys()].map((name) => mapped(name, renames)),
    );
    for (const [name, entry] of previous) {
      if (output.has(name)) {
        const next = output.get(name);
        if (
          !candidates(baseInventory, entry.imported, renames).length &&
          !emittedBase.has(name) &&
          (next.module !== entry.module || next.imported !== entry.imported)
        ) {
          report(
            file,
            name,
            "Maintained custom-only export now points at a different symbol or module.",
          );
        }
        continue;
      }
      const counterpart =
        emittedBase.get(name) ??
        [...emittedBase.values()].find((item) => mapped(item.name, renames) === name);
      const generatedName = counterpart?.imported ?? entry.imported;
      if (
        candidates(baseInventory, generatedName, renames).length &&
        !candidates(incomingInventory, generatedName, renames).length
      )
        continue;
      report(
        file,
        name,
        "Lost maintained root export; its baseline generated counterpart did not disappear from the full declaration inventory.",
      );
    }
    for (const entry of incoming.values()) {
      if (entry.module?.includes("restorePollerHelpers")) continue;
      const expected = mapped(entry.name, renames);
      // Preserve omissions established in this barrel, not omissions inferred from current output.
      if (generatedBaselineNames.has(expected) && !customizedBaselineNames.has(expected)) continue;
      if (!output.has(expected))
        report(
          file,
          expected,
          `Missing current emitted root export '${entry.name}' (after package renames).`,
        );
    }
    for (const entry of output.values()) {
      if (!exportResolves(trees.output, entry, report)) {
        report(
          file,
          entry.name,
          `Root export '${entry.name}' does not resolve to '${entry.imported}' in '${entry.module ?? entry.file}'.`,
        );
      }
    }
    if (file === "index.ts" && output.has("ApiError"))
      report(
        file,
        "ApiError",
        "Keep the maintained ErrorModel export instead of exposing the emitted ApiError rename.",
      );
  }

  function exportResolves(modules, entry, report, seen = new Set()) {
    if (entry.module && !entry.module.startsWith(".")) return true;
    const targetFile = moduleFile(entry.file, entry.module) ?? entry.file;
    const module = modules.get(targetFile);
    if (!module) return false;
    if (entry.imported === "*" || module.byName.has(entry.imported)) return true;
    const key = `${targetFile}::${entry.imported}`;
    if (seen.has(key)) return false;
    seen.add(key);
    const target = exportsOf(modules, targetFile, report).get(entry.imported);
    return target ? exportResolves(modules, target, report, seen) : false;
  }
}

function containsObject(expected, actual, renames) {
  expected = unwrap(expected);
  actual = unwrap(actual);
  if (!expected || !actual) return false;
  if (!ts.isObjectLiteralExpression(expected) || !ts.isObjectLiteralExpression(actual)) {
    return nodeKey(expected, renames) === nodeKey(actual, renames);
  }
  return expected.properties.every((property) => {
    if (ts.isSpreadAssignment(property))
      return actual.properties.some(
        (candidate) =>
          ts.isSpreadAssignment(candidate) &&
          nodeKey(property, renames) === nodeKey(candidate, renames),
      );
    const candidates = actual.properties.filter(
      (candidate) => nameOf(candidate.name) === nameOf(property.name),
    );
    return candidates.some((candidate) =>
      ts.isPropertyAssignment(property) && ts.isPropertyAssignment(candidate)
        ? containsObject(property.initializer, candidate.initializer, renames)
        : nodeKey(property, renames) === nodeKey(candidate, renames),
    );
  });
}

function propertiesNamed(node, names) {
  const result = new Map();
  walk(node, (child) => {
    if (ts.isPropertyAssignment(child) && names.has(nameOf(child.name))) {
      const entries = result.get(nameOf(child.name)) ?? [];
      entries.push(child.initializer);
      result.set(nameOf(child.name), entries);
    }
  });
  return result;
}

function containsIdentifier(node, name, call = false) {
  let found = false;
  walk(node, (child) => {
    if (
      call
        ? ts.isCallExpression(child) && nameOf(child.expression) === name
        : ts.isIdentifier(child) && child.text === name
    )
      found = true;
  });
  return found;
}

function checkOperations(trees, matches, renames, report) {
  const processed = new Set();
  for (const match of matches) {
    const { base, customized, incoming, names } = match;
    if (!incoming?.file || !names?.publicNode || !names.send || !names.deserialize) {
      report(
        incoming?.file ?? "<matches>",
        incoming?.name ?? "<operation>",
        "Incomplete operation match; output public/send/deserialize names are required.",
      );
      continue;
    }
    const module = trees.output.get(incoming.file);
    for (const role of ["publicNode", "send", "deserialize"]) {
      const expectedName = names[role];
      const output = module?.byName.get(expectedName);
      processed.add(`${incoming.file}::${expectedName}`);
      if (!output) {
        report(incoming.file, expectedName, `Missing mapped operation ${role} declaration.`);
        continue;
      }
      const oldNode =
        customized?.[role] ??
        customized?.nodes?.get(
          role === "publicNode" ? customized.name : customized?.[role]?.name.text,
        );
      if (role === "send") {
        const before = base?.send ? { node: base.send } : undefined;
        const next = incoming.send ? { node: incoming.send } : undefined;
        requireDelta(
          mappings(before, "body"),
          mappings(next, "body"),
          mappings(output, "body"),
          output,
          "Send request-body mapping",
          report,
        );
        if (oldNode)
          preserveCustom(
            mappings(before, "body"),
            mappings({ node: oldNode }, "body"),
            mappings(output, "body"),
            output,
            "Send request-body mapping",
            report,
            renames,
          );
      }
      if (!oldNode) continue;
      for (const [property, values] of propertiesNamed(oldNode, behaviorProperties)) {
        const actual = propertiesNamed(output.node, behaviorProperties).get(property) ?? [];
        for (const value of values) {
          if (!actual.some((candidate) => containsObject(value, candidate, renames))) {
            report(
              output.file,
              output.name,
              `Lost maintained paging or polling customization '${property}', including its options/header values.`,
              property,
            );
          }
        }
      }
      if (role === "publicNode") {
        for (const [wrapper, factory] of [
          ["JobPoller", "getJobPoller"],
          ["RunPoller", "getRunPoller"],
        ]) {
          if (!containsIdentifier(oldNode, wrapper) && !containsIdentifier(oldNode, factory, true))
            continue;
          if (
            !output.node.type ||
            !containsIdentifier(output.node.type, wrapper) ||
            !containsIdentifier(output.node, factory, true)
          ) {
            report(
              output.file,
              output.name,
              `Lost ${wrapper}/${factory} identity wrapper; the created resource id must remain reachable from poller state.`,
            );
          }
          const classicFile = incoming.file
            .replace(/^api\//, "classic/")
            .replace(/operations\.ts$/, "index.ts");
          const oldClassicFile = customized.file
            .replace(/^api\//, "classic/")
            .replace(/operations\.ts$/, "index.ts");
          if (!trees.custom.has(oldClassicFile)) continue;
          const classic = trees.output.get(classicFile);
          let preserved = false;
          if (classic)
            walk(classic.source, (node) => {
              if (
                nameOf(node.name) === expectedName.replace(/^\$/, "") &&
                node.type &&
                containsIdentifier(node.type, wrapper)
              )
                preserved = true;
            });
          if (!preserved)
            report(
              classicFile,
              expectedName,
              `Classic operation must retain its ${wrapper} return type.`,
            );
        }
      }
    }
    const optionFile = incoming.file.replace(/operations\.ts$/, "options.ts");
    const oldOptionFile = base?.file.replace(/operations\.ts$/, "options.ts");
    const customOptionFile = customized?.file.replace(/operations\.ts$/, "options.ts");
    if (names.options) {
      const indexes = Object.fromEntries(
        Object.entries(trees).map(([key, modules]) => [
          key,
          inventory(
            modules,
            (file) =>
              file ===
              (key === "base" ? oldOptionFile : key === "custom" ? customOptionFile : optionFile),
          ),
        ]),
      );
      const before = trees.base.get(oldOptionFile)?.byName.get(base?.options);
      const custom = trees.custom.get(customOptionFile)?.byName.get(customized?.options);
      const next = trees.incoming.get(optionFile)?.byName.get(incoming.options);
      const output = trees.output.get(optionFile)?.byName.get(names.options);
      if (next && !output) report(optionFile, names.options, "Missing mapped options declaration.");
      if (next) checkDeclaration(before, custom, next, output, indexes, renames, report);
    }
  }
  for (const module of trees.incoming.values()) {
    if (!/^api\/.*\/operations\.ts$/.test(module.file)) continue;
    for (const incoming of module.entries.filter((entry) => /Send$/.test(entry.name))) {
      if (
        processed.has(`${incoming.file}::${incoming.name}`) ||
        matches.some(
          (match) =>
            match.incoming?.file === incoming.file &&
            match.incoming?.send?.name.text === incoming.name,
        )
      )
        continue;
      const before = trees.base.get(incoming.file)?.byName.get(incoming.name);
      const output = trees.output.get(incoming.file)?.byName.get(incoming.name);
      requireDelta(
        mappings(before, "body"),
        mappings(incoming, "body"),
        mappings(output, "body"),
        incoming,
        "Send request-body mapping",
        report,
      );
    }
  }
  for (const module of trees.incoming.values()) {
    if (!/^api\/.*\/options\.ts$/.test(module.file)) continue;
    const indexes = Object.fromEntries(
      Object.entries(trees).map(([key, modules]) => [
        key,
        inventory(modules, (file) => file === module.file),
      ]),
    );
    for (const incoming of module.entries) {
      if (
        matches.some(
          (match) =>
            match.incoming.file.replace(/operations\.ts$/, "options.ts") === module.file &&
            match.incoming.options === incoming.name,
        )
      )
        continue;
      const base = trees.base.get(module.file)?.byName.get(incoming.name);
      const custom = trees.custom.get(module.file)?.byName.get(incoming.name);
      const output = trees.output.get(module.file)?.byName.get(incoming.name);
      if (!base && !output)
        report(module.file, incoming.name, "Missing newly emitted options declaration.");
      checkDeclaration(base, custom, incoming, output, indexes, renames, report);
    }
  }
}

function memberIdentity(node) {
  const name =
    nameOf(node.name) ?? (ts.isConstructorDeclaration(node) ? "constructor" : nodeKey(node));
  return `${node.kind}:${name}${ts.isMethodDeclaration(node) && !node.body ? `:${nodeKey(node)}` : ""}`;
}

function additiveProtected(before, after, baseGenerated, generated, renames, cleanup) {
  if (nodeKey(before, renames, cleanup) === nodeKey(after, renames, cleanup)) return true;
  if (before.kind !== after.kind) return false;
  if (ts.isClassDeclaration(before) || ts.isInterfaceDeclaration(before)) {
    const oldMembers = new Map(before.members.map((member) => [memberIdentity(member), member]));
    const newMembers = new Map(after.members.map((member) => [memberIdentity(member), member]));
    if (
      before.heritageClauses?.map((clause) => clause.getText()).join() !==
      after.heritageClauses?.map((clause) => clause.getText()).join()
    )
      return false;
    for (const [name, member] of oldMembers) {
      const next = newMembers.get(name);
      if (!next) return false;
      if (nodeKey(member, renames, cleanup) === nodeKey(next, renames, cleanup)) continue;
      if (!ts.isConstructorDeclaration(member) || !ts.isConstructorDeclaration(next)) return false;
      const oldStatements = member.body?.statements ?? [];
      const nextStatements = next.body?.statements ?? [];
      let index = 0;
      for (const statement of nextStatements) {
        if (
          index < oldStatements.length &&
          nodeKey(statement, renames, cleanup) === nodeKey(oldStatements[index], renames, cleanup)
        )
          index++;
        else {
          let generatedAddition = false;
          if (generated)
            walk(generated, (candidate) => {
              if (
                ts.isStatement(candidate) &&
                nodeKey(candidate, renames, cleanup) === nodeKey(statement, renames, cleanup)
              )
                generatedAddition = true;
            });
          if (!generatedAddition) return false;
        }
      }
      if (index !== oldStatements.length) return false;
      if (
        member.parameters.map((parameter) => parameter.getText()).join() !==
        next.parameters.map((parameter) => parameter.getText()).join()
      )
        return false;
    }
    for (const [name, member] of newMembers) {
      if (oldMembers.has(name)) continue;
      if (
        !generated?.members?.some(
          (candidate) =>
            memberIdentity(candidate) === name &&
            nodeKey(candidate, renames, cleanup) === nodeKey(member, renames, cleanup),
        )
      )
        return false;
      if (baseGenerated?.members?.some((candidate) => memberIdentity(candidate) === name))
        return false;
    }
    return true;
  }
  return false;
}

function isProtectedFile(file) {
  return (
    protectedFiles.has(file) || file.startsWith("static-helpers/") || file.startsWith("tracing/")
  );
}

function classInitializers(entry) {
  const result = new Map();
  if (!entry || !ts.isClassDeclaration(entry.node)) return result;
  for (const member of entry.node.members) {
    if (ts.isPropertyDeclaration(member) && member.initializer && nameOf(member.name)) {
      result.set(nameOf(member.name), member.initializer);
    }
    if (!ts.isConstructorDeclaration(member) || !member.body) continue;
    function visit(node) {
      if (ts.isFunctionLike(node) || ts.isClassDeclaration(node)) return;
      if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
        const left = unwrap(node.left);
        if (
          ts.isPropertyAccessExpression(left) &&
          left.expression.kind === ts.SyntaxKind.ThisKeyword
        ) {
          result.set(left.name.text, node.right);
        } else if (
          ts.isElementAccessExpression(left) &&
          left.expression.kind === ts.SyntaxKind.ThisKeyword &&
          nameOf(left.argumentExpression)
        ) {
          result.set(nameOf(left.argumentExpression), node.right);
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(member.body);
  }
  return result;
}

function checkProtectedAdditions(trees, renames, report) {
  const indexes = Object.fromEntries(
    Object.entries(trees).map(([key, modules]) => [key, inventory(modules)]),
  );
  for (const [file, module] of trees.incoming) {
    if (!isProtectedFile(file)) continue;
    for (const incoming of module.entries) {
      if (
        !ts.isClassDeclaration(incoming.node) &&
        !ts.isInterfaceDeclaration(incoming.node) &&
        !ts.isTypeAliasDeclaration(incoming.node)
      )
        continue;
      const base = trees.base.get(file)?.byName.get(incoming.name);
      const name = mapped(incoming.name, renames);
      const output = trees.output.get(file)?.byName.get(name);
      if (!base && !output) {
        report(
          file,
          name,
          "Missing newly emitted protected declaration; keeping the old file verbatim does not incorporate the new API.",
        );
      }
      const previousMembers = members(base, indexes.base, renames, report);
      const incomingMembers = members(incoming, indexes.incoming, renames, report);
      const outputMembers = members(output, indexes.output, renames, report);
      requireDelta(
        previousMembers,
        incomingMembers,
        outputMembers,
        { file, name },
        "protected client/interface member",
        report,
      );
      const initializers = classInitializers(output);
      for (const [member, initializer] of classInitializers(incoming)) {
        if (previousMembers.has(member)) continue;
        const expected = unwrap(initializer);
        const actual = unwrap(initializers.get(member));
        const matchesFactory =
          actual &&
          ts.isCallExpression(expected) &&
          ts.isCallExpression(actual) &&
          nodeKey(expected.expression, renames) === nodeKey(actual.expression, renames);
        if (
          !actual ||
          (!matchesFactory && nodeKey(expected, renames) !== nodeKey(actual, renames))
        ) {
          report(
            file,
            name,
            "Missing or unproven initialization of a newly emitted protected member; wire the new operation group while retaining the maintained client scopes and behavior.",
            member,
          );
        }
      }
    }
  }
}

function checkProtected(trees, renames, report) {
  checkProtectedAdditions(trees, renames, report);
  for (const [file, previous] of trees.custom) {
    if (!isProtectedFile(file)) continue;
    const output = trees.output.get(file);
    if (!output) {
      report(file, "<file>", "Protected customized file was deleted.");
      continue;
    }
    const cleanup = file === "aiProjectClient.ts" || file === "api/aiProjectContext.ts";
    const beforeText = cleanup ? cleanUserAgent(previous.source.text) : previous.source.text;
    const afterText = cleanup ? cleanUserAgent(output.source.text) : output.source.text;
    if (canonicalize(beforeText) === canonicalize(afterText)) continue;
    for (const entry of previous.entries) {
      const next = output.byName.get(entry.name);
      const base = trees.base.get(file)?.byName.get(entry.name);
      const incoming = trees.incoming.get(file)?.byName.get(entry.name);
      if (
        !next ||
        !additiveProtected(entry.node, next.node, base?.node, incoming?.node, renames, cleanup)
      ) {
        report(
          file,
          entry.name,
          "Protected customization changed beyond supported generated-backed additive wiring or user-agent tag cleanup; preserve the baseline behavior or add a reviewed narrow policy.",
        );
      }
    }
    for (const entry of output.entries) {
      if (previous.byName.has(entry.name)) continue;
      const incoming = trees.incoming.get(file)?.byName.get(entry.name);
      if (
        !incoming ||
        trees.base.get(file)?.byName.has(entry.name) ||
        nodeKey(entry.node, renames, cleanup) !== nodeKey(incoming.node, renames, cleanup)
      ) {
        report(file, entry.name, "Unproven addition to a protected custom file.");
      }
    }
    const oldImports = imports(previous);
    const newImports = imports(output);
    for (const binding of oldImports) {
      if (
        !newImports.some(
          (next) =>
            next.local === binding.local &&
            next.imported === binding.imported &&
            next.module === binding.module &&
            (!binding.typeOnly || next.typeOnly),
        )
      ) {
        report(
          file,
          binding.local,
          `Protected import from '${binding.module}' was removed or changed.`,
        );
      }
    }
    for (const binding of newImports) {
      const same = (candidate) =>
        candidate.local === binding.local &&
        candidate.imported === binding.imported &&
        candidate.module === binding.module;
      if (!oldImports.some(same) && !imports(trees.incoming.get(file)).some(same)) {
        report(
          file,
          binding.local,
          `Unproven import from '${binding.module}' added to a protected file.`,
        );
      }
    }
    const oldOther = previous.source.statements.filter(
      (node) =>
        !ts.isImportDeclaration(node) &&
        !ts.isExportDeclaration(node) &&
        !nameOf(node.name) &&
        !ts.isVariableStatement(node),
    );
    for (const node of oldOther) {
      if (
        !output.source.statements.some(
          (next) => nodeKey(next, renames, cleanup) === nodeKey(node, renames, cleanup),
        )
      ) {
        report(file, "<module>", "Protected top-level behavior was removed or changed.");
      }
    }
    for (const node of output.source.statements.filter(
      (node) =>
        !ts.isImportDeclaration(node) &&
        !ts.isExportDeclaration(node) &&
        !nameOf(node.name) &&
        !ts.isVariableStatement(node),
    )) {
      if (
        !oldOther.some(
          (previous) => nodeKey(previous, renames, cleanup) === nodeKey(node, renames, cleanup),
        )
      ) {
        report(file, "<module>", "Unproven top-level behavior added to a protected file.");
      }
    }
  }
}

function checkVoicePaging(entry, report) {
  if (!containsIdentifier(entry.node, "buildPagedAsyncIterator", true)) return;
  const properties = propertiesNamed(entry.node, behaviorProperties);
  for (const [name, value] of [
    ["cursorFieldName", "last_id"],
    ["hasMoreFieldName", "has_more"],
  ]) {
    if (
      !properties
        .get(name)
        ?.some((node) => ts.isStringLiteralLike(unwrap(node)) && unwrap(node).text === value)
    ) {
      report(entry.file, entry.name, `Voice/telephony paging requires ${name}: "${value}".`, name);
    }
  }
  const parameters = new Map();
  walk(entry.node, (node) => {
    if (ts.isVariableDeclaration(node) && nameOf(node.name) && node.initializer)
      parameters.set(nameOf(node.name), node.initializer);
  });
  function requestParameters(node) {
    node = unwrap(node);
    if (ts.isIdentifier(node)) node = unwrap(parameters.get(node.text) ?? node);
    return (
      ts.isCallExpression(node) &&
      nameOf(node.expression) === "operationOptionsToRequestParameters" &&
      nameOf(node.arguments[0]) === "options"
    );
  }
  const continuation = properties.get("nextPageRequestOptions") ?? [];
  const forwardsOptions = continuation.some((node) => {
    node = unwrap(node);
    return (
      requestParameters(node) ||
      (ts.isObjectLiteralExpression(node) &&
        node.properties.some(
          (property) => ts.isSpreadAssignment(property) && requestParameters(property.expression),
        ))
    );
  });
  const forwardsHeaders = continuation.some((node) => {
    const headers = objectProperties(node).get("headers");
    if (!headers || !ts.isPropertyAssignment(headers)) return false;
    const value = unwrap(headers.initializer);
    return (
      ts.isObjectLiteralExpression(value) &&
      value.properties.some((property) => {
        if (!ts.isSpreadAssignment(property)) return false;
        const expression = unwrap(property.expression);
        return (
          ts.isPropertyAccessExpression(expression) &&
          expression.name.text === "headers" &&
          (requestParameters(expression.expression) ||
            (ts.isPropertyAccessExpression(expression.expression) &&
              expression.expression.name.text === "requestOptions" &&
              nameOf(expression.expression.expression) === "options"))
        );
      })
    );
  });
  if (!forwardsOptions || !forwardsHeaders) {
    report(
      entry.file,
      entry.name,
      "Voice/telephony continuation requests must forward converted operation options and merge the caller's headers.",
      "nextPageRequestOptions",
    );
  }
}

function checkKnownPolicies(trees, modelIndexes, renames, report) {
  for (const [file, module] of trees.output) {
    if (file === "restorePollerHelpers.ts")
      report(file, "<file>", "Generated-only restorePollerHelpers.ts must not exist in src.");
    walk(module.source, (node) => {
      if (node.parameters) {
        for (const parameter of node.parameters) {
          if (nameOf(parameter.name) === "foundryFeatures")
            report(
              file,
              nameOf(node.name) ?? "<function>",
              "foundryFeatures must be a local value or options-bag member, never a positional parameter.",
              "foundryFeatures",
            );
        }
      }
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier?.text.includes("restorePollerHelpers")
      ) {
        report(
          file,
          "<module>",
          "Do not import or export the generated-only restorePollerHelpers module.",
        );
      }
      if (
        ts.isInterfaceDeclaration(node) &&
        node.name.text === "BetaEvaluatorsOperations" &&
        (!node.members.some((member) => nameOf(member.name) === "list") ||
          node.members.some((member) => nameOf(member.name) === "listLatestVersions"))
      ) {
        report(
          file,
          node.name.text,
          "Preserve BetaEvaluatorsOperations.list; listLatestVersions is not the maintained API.",
          "list",
        );
      }
    });
    if (
      /^api\/beta\/(?:voiceAgents|voiceAgentWebSocket|agentTelephony|agentEndpointConversations)\/operations\.ts$/.test(
        file,
      )
    ) {
      for (const entry of module.entries.filter(
        (entry) => ts.isFunctionDeclaration(entry.node) && entry.node.body,
      ))
        checkVoicePaging(entry, report);
    }
  }
  const root = trees.output.get("index.ts");
  if (root) {
    const bindings = imports(root);
    for (const [name, specifier] of [
      ["PageSettings", "@azure/core-paging"],
      ["PagedAsyncIterableIterator", "@azure/core-paging"],
      ["ContinuablePage", "./static-helpers/pagingHelpers.js"],
    ]) {
      const actual = bindings.filter((binding) => binding.local === name);
      if (
        actual.length !== 1 ||
        actual[0].imported !== name ||
        actual[0].module !== specifier ||
        !actual[0].typeOnly
      ) {
        report("index.ts", name, `Maintain a single type import of ${name} from '${specifier}'.`);
      }
    }
  } else if (trees.custom.has("index.ts")) {
    report("index.ts", "<file>", "Maintained package root export scaffold was deleted.");
  }
  const schemaName = "RealtimeFunctionToolParameters";
  const emitted = candidates(modelIndexes.incoming, schemaName, renames);
  const maintained = candidates(modelIndexes.custom, schemaName, renames);
  if (!emitted.length && !maintained.length) return;
  const schema = resolveAlias(
    find(modelIndexes.output, schemaName, emitted[0]?.file ?? maintained[0].file, renames, report),
    modelIndexes.output,
    renames,
    report,
  );
  let openRecord = false;
  if (schema)
    walk(schema.node, (node) => {
      if (
        ts.isTypeReferenceNode(node) &&
        nameOf(node.typeName) === "Record" &&
        node.typeArguments?.[0]?.kind === ts.SyntaxKind.StringKeyword &&
        node.typeArguments[1]?.kind === ts.SyntaxKind.UnknownKeyword
      )
        openRecord = true;
      if (
        ts.isExpressionWithTypeArguments(node) &&
        nameOf(node.expression) === "Record" &&
        node.typeArguments?.[0]?.kind === ts.SyntaxKind.StringKeyword &&
        node.typeArguments[1]?.kind === ts.SyntaxKind.UnknownKeyword
      )
        openRecord = true;
      if (
        ts.isIndexSignatureDeclaration(node) &&
        node.parameters[0]?.type?.kind === ts.SyntaxKind.StringKeyword &&
        node.type?.kind === ts.SyntaxKind.UnknownKeyword
      )
        openRecord = true;
    });
  if (!openRecord)
    report(
      schema?.file ?? emitted[0]?.file ?? maintained[0].file,
      schemaName,
      "JSON Schema must remain an open Record<string, unknown>, not an empty emitted interface.",
    );
  for (const name of [
    "realtimeFunctionToolParametersSerializer",
    "realtimeFunctionToolParametersDeserializer",
  ]) {
    const converter = resolveAlias(
      find(modelIndexes.output, name, schema?.file, renames, report),
      modelIndexes.output,
      renames,
      report,
    );
    const parameter = converter?.node.parameters?.[0];
    const returns = [];
    function visit(node) {
      if (node !== converter.node && ts.isFunctionLike(node)) return;
      if (ts.isReturnStatement(node)) returns.push(unwrap(node.expression));
      ts.forEachChild(node, visit);
    }
    if (parameter) visit(converter.node);
    const preservesRecord =
      returns.length > 0 &&
      returns.every((expression) => {
        if (!expression) return false;
        if (ts.isIdentifier(expression)) return expression.text === nameOf(parameter.name);
        return (
          ts.isObjectLiteralExpression(expression) &&
          expression.properties.some(
            (property) =>
              ts.isSpreadAssignment(property) &&
              nameOf(unwrap(property.expression)) === nameOf(parameter.name),
          ) &&
          !expression.properties.some(
            (property) =>
              ts.isPropertyAssignment(property) &&
              ["type", "properties", "required"].includes(nameOf(property.name)),
          )
        );
      });
    if (!preservesRecord)
      report(
        converter?.file ?? schema?.file ?? emitted[0]?.file ?? maintained[0].file,
        name,
        "JSON Schema converter must preserve arbitrary input keys, including type/properties/required; empty or narrowed objects are unsafe.",
      );
  }
}

export function validateCustomization({
  baseGenerated,
  baseSource,
  generated,
  source,
  matches = [],
  modelRenames = new Map(),
}) {
  const diagnostics = [];
  const reported = new Set();
  const report = (file, declaration, message, member) => {
    const diagnostic = { file, declaration, ...(member === undefined ? {} : { member }), message };
    const key = JSON.stringify(diagnostic);
    if (!reported.has(key)) {
      reported.add(key);
      diagnostics.push(diagnostic);
    }
  };
  for (const [name, value] of Object.entries({
    baseGenerated,
    baseSource,
    generated,
    source,
    modelRenames,
  })) {
    if (!(value instanceof Map))
      report(
        "<input>",
        name,
        `${name} must be a Map; validation cannot infer a missing tree or rename policy.`,
      );
  }
  if (!Array.isArray(matches))
    report("<input>", "matches", "matches must be an operation-planner array.");
  else
    for (const match of matches) {
      if (
        !match?.incoming?.file ||
        !match.names?.publicNode ||
        !match.names.send ||
        !match.names.deserialize
      ) {
        report(
          "<input>",
          "matches",
          "Each match must identify an incoming file and output public/send/deserialize names.",
        );
      }
    }
  if (diagnostics.length) return diagnostics;
  const renames = new Map([...packageRenames, ...modelRenames]);
  for (const name of renames.keys()) {
    try {
      mapped(name, renames);
    } catch (error) {
      report("<input>", name, error.message);
    }
  }
  if (diagnostics.length) return diagnostics;
  const trees = {
    base: parseTree(baseGenerated, "baseGenerated", report),
    custom: parseTree(baseSource, "baseSource", report),
    incoming: parseTree(generated, "generated", report),
    output: parseTree(source, "source", report),
  };
  const baselineModels = inventory(trees.custom, modelFile);
  const previousDiagnosticCount = diagnostics.length;
  for (const [original, replacement] of modelRenames) {
    if (original === replacement || baselineModels.has(replacement)) continue;
    const existing = baselineModels
      .get(original)
      ?.find((entry) => ts.isFunctionDeclaration(entry.node));
    if (existing) {
      report(
        existing.file,
        original,
        `Converter/helper rename to '${replacement}' contradicts the verified source baseline: '${original}' already exists and '${replacement}' does not. Retain the established converter name.`,
      );
    }
  }
  if (diagnostics.length > previousDiagnosticCount) return diagnostics;
  const modelIndexes = checkModels(trees, renames, report);
  const exportRenames = new Map(renames);
  for (const match of matches) {
    if (match.incoming?.options && match.names?.options)
      exportRenames.set(match.incoming.options, match.names.options);
    if (match.base?.options && match.customized?.options)
      exportRenames.set(match.base.options, match.customized.options);
  }
  checkExports(trees, exportRenames, report);
  checkOperations(trees, matches, renames, report);
  checkProtected(trees, renames, report);
  checkKnownPolicies(trees, modelIndexes, renames, report);
  return diagnostics;
}
