// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import ts from "typescript";
import { canonicalize } from "./ast-merge.mjs";
import {
  edit,
  header,
  importsOf,
  relativeImport,
  renameSymbols,
  renderExports,
  renderImports,
  resolveImport,
} from "./modules.mjs";

const canonicalFile = "models/models.ts";
const modelBarrel = "models/index.ts";
const reasonTypes = new Set([
  "TelephonyCallEndReason",
  "TelephonyCallLifecycleEventReason",
  "TelephonyCallJobTerminalReason",
]);
const documentedRenames = new Map([
  ["ApiError", "ErrorModel"],
  ["_FileSearchToolFiltersValue", "_ComparisonFilterValue"],
  ["_FileSearchToolFiltersFilter", "_CompoundFilterFilter"],
]);

function isModel(file) {
  return file.startsWith("models/") && /\.(?:ts|mts|cts)$/.test(file);
}

function internalModelImport(file, module) {
  return module.startsWith(".") && resolveImport(file, module).startsWith("models/");
}

function importPath(file, entry) {
  return entry.external ? entry.module : relativeImport(file, entry.module);
}

function declarationName(node) {
  if (ts.isVariableStatement(node)) {
    const declarations = node.declarationList.declarations;
    return declarations.length === 1 && ts.isIdentifier(declarations[0].name)
      ? declarations[0].name.text
      : undefined;
  }
  return node.name && ts.isIdentifier(node.name) ? node.name.text : undefined;
}

function isTypeOnly(node) {
  return ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node);
}

function exported(node) {
  return node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
}

function sourceText(node, source) {
  return source.text
    .slice(node.getFullStart(), node.end)
    .trim()
    .replace(
      /^\/\/ Copyright \(c\) Microsoft Corporation\.\r?\n\/\/ Licensed under the MIT License\.\s*/,
      "",
    );
}

function parse(text, file, diagnostics) {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  for (const diagnostic of source.parseDiagnostics) {
    diagnostics.push({
      file,
      declaration: "<module>",
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
    });
  }
  return source;
}

function inventory(tree, diagnostics, replacements = new Map()) {
  const modules = new Map();
  const declarations = new Map();
  for (const [file, original] of [...tree]
    .filter(([file]) => isModel(file))
    .sort(([left], [right]) =>
      left === canonicalFile ? -1 : right === canonicalFile ? 1 : left.localeCompare(right),
    )) {
    if (file.includes("\\") || path.posix.normalize(file) !== file) {
      diagnostics.push({
        file,
        declaration: "<module>",
        message: "Expected a normalized model path.",
      });
      continue;
    }
    const source = parse(original, file, diagnostics);
    if (source.parseDiagnostics.length) continue;
    const scopedRenames = new Map(replacements);
    for (const item of importsOf(source)) {
      if (!internalModelImport(file, item.module) || item.sideEffect) continue;
      if (item.imported === "*" || item.imported === "default") {
        diagnostics.push({
          file,
          declaration: "<imports>",
          member: item.local,
          message: "A namespace/default model import needs an explicit flattening policy.",
        });
      } else {
        scopedRenames.set(item.local, replacements.get(item.imported) ?? item.imported);
      }
    }
    const normalized = parse(renameSymbols(original, scopedRenames, file), file, diagnostics);
    modules.set(file, normalized);
    for (const node of normalized.statements) {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node) || ts.isEmptyStatement(node))
        continue;
      const supported =
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isFunctionDeclaration(node) ||
        ts.isEnumDeclaration(node) ||
        ts.isClassDeclaration(node) ||
        ts.isVariableStatement(node);
      const name = supported && declarationName(node);
      if (
        !name ||
        node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword)
      ) {
        diagnostics.push({
          file,
          declaration: "<module>",
          message: "Unsupported or anonymous top-level model declaration.",
        });
        continue;
      }
      if (declarations.has(name)) {
        diagnostics.push({
          file,
          declaration: name,
          message: `Ambiguous model declaration; also declared in ${declarations.get(name).file}.`,
        });
        continue;
      }
      declarations.set(name, { file, node, text: sourceText(node, normalized) });
    }
  }
  return { modules, declarations };
}

function renameFingerprint(declaration) {
  return canonicalize(
    renameSymbols(
      declaration.text,
      new Map([[declarationName(declaration.node), "__ModelIdentity"]]),
      declaration.file,
    ),
  );
}

function discoverRenames(baseGenerated, baseSource, incoming, diagnostics) {
  const renames = new Map();
  for (const [generated, custom] of documentedRenames) {
    if (
      !baseSource.declarations.has(generated) &&
      (baseGenerated.declarations.has(generated) || incoming.declarations.has(generated)) &&
      (generated === "ApiError" || baseSource.declarations.has(custom))
    )
      renames.set(generated, custom);
  }
  for (const [generated, custom] of [
    ["apiErrorDeserializer", "errorDeserializer"],
    ["apiErrorArrayDeserializer", "errorArrayDeserializer"],
  ]) {
    if (
      !baseSource.declarations.has(generated) &&
      baseSource.declarations.has(custom) &&
      (baseGenerated.declarations.has(generated) || incoming.declarations.has(generated))
    )
      renames.set(generated, custom);
  }
  const used = new Set(
    [...baseGenerated.declarations.keys()].filter((name) => baseSource.declarations.has(name)),
  );
  for (const name of renames.values()) used.add(name);
  let progress = true;
  while (progress) {
    progress = false;
    const normalized = inventory(
      new Map([...baseGenerated.modules].map(([file, source]) => [file, source.text])),
      diagnostics,
      renames,
    );
    const candidates = [...baseSource.declarations].filter(([name]) => !used.has(name));
    for (const [name, declaration] of normalized.declarations) {
      if (baseSource.declarations.has(name) || renames.has(name)) continue;
      const fingerprint = renameFingerprint(declaration);
      const matches = candidates.filter(
        ([candidateName, candidate]) =>
          !used.has(candidateName) &&
          candidate.node.kind === declaration.node.kind &&
          renameFingerprint(candidate) === fingerprint,
      );
      if (matches.length === 1) {
        renames.set(name, matches[0][0]);
        used.add(matches[0][0]);
        progress = true;
      } else if (matches.length > 1) {
        diagnostics.push({
          file: declaration.file,
          declaration: name,
          message: `Ambiguous customization rename: ${matches.map(([candidate]) => candidate).join(", ")}.`,
        });
      }
    }
    if (diagnostics.length) break;
  }
  return renames;
}

function simpleRecord(type) {
  return (
    ts.isTypeReferenceNode(type) &&
    ts.isIdentifier(type.typeName) &&
    type.typeName.text === "Record" &&
    type.typeArguments?.length === 2 &&
    type.typeArguments[0].kind === ts.SyntaxKind.StringKeyword &&
    [ts.SyntaxKind.AnyKeyword, ts.SyntaxKind.UnknownKeyword].includes(type.typeArguments[1].kind)
  );
}

function policyText(name, text, context, diagnostics) {
  if (text === null) return null;
  const source = parse(text, context.file, diagnostics);
  if (source.parseDiagnostics.length) return text;
  const node = source.statements[0];
  const changes = [];
  if (name === "RealtimeFunctionToolParameters") {
    const empty =
      (ts.isInterfaceDeclaration(node) &&
        node.members.length === 0 &&
        !node.heritageClauses?.length) ||
      (ts.isTypeAliasDeclaration(node) &&
        ((ts.isTypeLiteralNode(node.type) && node.type.members.length === 0) ||
          simpleRecord(node.type)));
    if (empty) {
      const leading = text.slice(0, node.getStart(source));
      return `${leading}${exported(node) ? "export " : ""}type ${name} = Record<string, unknown>;`;
    }
    diagnostics.push({
      ...context,
      message: "Realtime function parameters changed beyond the arbitrary JSON Schema policy.",
    });
    return text;
  }
  if (
    [
      "realtimeFunctionToolParametersSerializer",
      "realtimeFunctionToolParametersDeserializer",
    ].includes(name) &&
    ts.isFunctionDeclaration(node) &&
    node.parameters.length === 1 &&
    ts.isIdentifier(node.parameters[0].name) &&
    node.body?.statements.length === 1
  ) {
    const statement = node.body.statements[0];
    if (
      ts.isReturnStatement(statement) &&
      statement.expression &&
      ts.isObjectLiteralExpression(statement.expression) &&
      statement.expression.properties.length === 0
    ) {
      changes.push({
        start: statement.expression.getStart(source),
        end: statement.expression.end,
        text: node.parameters[0].name.text,
      });
    }
  }
  if (name === "ErrorModel" && ts.isInterfaceDeclaration(node)) {
    for (const member of node.members) {
      if (!ts.isPropertySignature(member) || !member.type) continue;
      const memberName = member.name.getText(source);
      if (["additionalInfo", "debugInfo"].includes(memberName) && simpleRecord(member.type)) {
        changes.push({
          start: member.type.getStart(source),
          end: member.type.end,
          text: "Record<string, unknown>",
        });
      } else if (
        memberName === "code" &&
        ts.isUnionTypeNode(member.type) &&
        member.type.types.every(
          (type) =>
            type.kind === ts.SyntaxKind.StringKeyword ||
            (ts.isLiteralTypeNode(type) && type.literal.kind === ts.SyntaxKind.NullKeyword),
        )
      ) {
        changes.push({ start: member.type.getStart(source), end: member.type.end, text: "string" });
      }
    }
  }
  if (reasonTypes.has(name)) {
    if (!ts.isTypeAliasDeclaration(node)) {
      diagnostics.push({
        ...context,
        message: "Telephony reason codes must remain extensible string unions.",
      });
    } else {
      const types = ts.isUnionTypeNode(node.type) ? node.type.types : [node.type];
      if (
        !types.every(
          (type) =>
            type.kind === ts.SyntaxKind.StringKeyword ||
            (ts.isLiteralTypeNode(type) && ts.isStringLiteral(type.literal)),
        )
      ) {
        diagnostics.push({ ...context, message: "Unrecognized telephony reason representation." });
      } else if (!types.some((type) => type.kind === ts.SyntaxKind.StringKeyword)) {
        changes.push({
          start: node.type.getStart(source),
          end: node.type.getStart(source),
          text:
            node.type.getFirstToken(source)?.kind === ts.SyntaxKind.BarToken
              ? "string "
              : "string | ",
        });
      }
    }
  }
  function dates(current) {
    if (ts.isConditionalExpression(current)) {
      const negated =
        ts.isPrefixUnaryExpression(current.condition) &&
        current.condition.operator === ts.SyntaxKind.ExclamationToken;
      const value = negated ? current.condition.operand : current.condition;
      const converted = negated ? current.whenFalse : current.whenTrue;
      const unchanged = negated ? current.whenTrue : current.whenFalse;
      const argument =
        ts.isNewExpression(converted) && converted.arguments?.length === 1
          ? converted.arguments[0]
          : undefined;
      if (
        (ts.isElementAccessExpression(value) || ts.isPropertyAccessExpression(value)) &&
        ts.isNewExpression(converted) &&
        ts.isIdentifier(converted.expression) &&
        converted.expression.text === "Date" &&
        argument &&
        ts.isBinaryExpression(argument) &&
        argument.operatorToken.kind === ts.SyntaxKind.AsteriskToken &&
        ts.isNumericLiteral(argument.right) &&
        argument.right.text === "1000" &&
        canonicalize(value.getText(source)) === canonicalize(unchanged.getText(source)) &&
        canonicalize(value.getText(source)) === canonicalize(argument.left.getText(source))
      ) {
        const access = value.getText(source);
        changes.push({
          start: current.condition.getStart(source),
          end: current.condition.end,
          text: negated
            ? `${access} === undefined || ${access} === null`
            : `${access} !== undefined && ${access} !== null`,
        });
      }
    }
    ts.forEachChild(current, dates);
  }
  dates(node);
  return edit(text, changes);
}

function modelTarget(file, module, modules) {
  if (!internalModelImport(file, module)) return undefined;
  const resolved = resolveImport(file, module);
  return [resolved, resolved.replace(/\.(?:js|mjs|cjs)$/, ".ts"), `${resolved}/index.ts`].find(
    (candidate) => modules.has(candidate),
  );
}

function publicEntries(inventory, diagnostics) {
  const cache = new Map();
  const active = new Set();
  function entries(file) {
    if (cache.has(file)) return cache.get(file);
    if (active.has(file)) {
      diagnostics.push({ file, declaration: "<exports>", message: "Cyclic model re-export." });
      return [];
    }
    active.add(file);
    const source = inventory.modules.get(file);
    const result = new Map();
    function add(entry) {
      const existing = result.get(entry.name);
      if (
        existing &&
        (existing.imported !== entry.imported ||
          existing.module !== entry.module ||
          Boolean(existing.external) !== Boolean(entry.external))
      ) {
        diagnostics.push({
          file,
          declaration: "<exports>",
          member: entry.name,
          message: "Ambiguous model export.",
        });
      } else {
        result.set(
          entry.name,
          existing
            ? {
                ...entry,
                isTypeOnly: existing.isTypeOnly && entry.isTypeOnly,
                explicit: existing.explicit || entry.explicit,
              }
            : entry,
        );
      }
    }
    for (const node of source.statements) {
      const name = declarationName(node);
      if (name && exported(node)) {
        add({ name, imported: name, module: canonicalFile, isTypeOnly: isTypeOnly(node) });
      }
      if (!ts.isExportDeclaration(node)) continue;
      const module = node.moduleSpecifier?.text;
      const target = module && modelTarget(file, module, inventory.modules);
      if (module && internalModelImport(file, module) && !target) {
        diagnostics.push({
          file,
          declaration: "<exports>",
          message: `Missing model export module ${module}.`,
        });
        continue;
      }
      const targetEntries = target
        ? new Map(entries(target).map((entry) => [entry.name, entry]))
        : undefined;
      if (!node.exportClause) {
        if (!targetEntries) {
          diagnostics.push({
            file,
            declaration: "<exports>",
            message: "Cannot inventory an external wildcard export.",
          });
        } else
          for (const entry of targetEntries.values())
            add({ ...entry, isTypeOnly: node.isTypeOnly || entry.isTypeOnly });
        continue;
      }
      if (!ts.isNamedExports(node.exportClause)) {
        diagnostics.push({
          file,
          declaration: "<exports>",
          message: "Namespace model exports need an explicit policy.",
        });
        continue;
      }
      for (const specifier of node.exportClause.elements) {
        const imported = specifier.propertyName?.text ?? specifier.name.text;
        const resolved = targetEntries?.get(imported);
        if (targetEntries && !resolved) {
          diagnostics.push({
            file,
            declaration: "<exports>",
            member: imported,
            message: `Missing export in ${module}.`,
          });
          continue;
        }
        const importedBinding = !module
          ? importsOf(source).find((item) => item.local === imported && !item.sideEffect)
          : undefined;
        if (!module && !inventory.declarations.has(imported) && !importedBinding) {
          diagnostics.push({
            file,
            declaration: "<exports>",
            member: imported,
            message: "Unresolved local model export.",
          });
          continue;
        }
        add({
          ...(resolved ?? {
            imported: importedBinding?.imported ?? imported,
            module: module
              ? resolveImport(file, module)
              : importedBinding
                ? resolveImport(file, importedBinding.module)
                : canonicalFile,
            external: module
              ? !module.startsWith(".")
              : importedBinding
                ? !importedBinding.module.startsWith(".")
                : false,
          }),
          name: specifier.name.text,
          explicit: true,
          isTypeOnly: node.isTypeOnly || specifier.isTypeOnly || resolved?.isTypeOnly || false,
        });
      }
    }
    active.delete(file);
    cache.set(file, [...result.values()]);
    return cache.get(file);
  }
  const barrels = [...inventory.modules.keys()].filter((file) =>
    /\/index\.(?:ts|mts|cts)$/.test(file),
  );
  const selected = barrels.length
    ? barrels.flatMap(entries)
    : [...inventory.modules.keys()].flatMap(entries).filter((entry) => {
        const declaration = inventory.declarations.get(entry.imported);
        return (
          entry.explicit ||
          entry.external ||
          entry.module !== canonicalFile ||
          (declaration &&
            !entry.name.startsWith("_") &&
            (isTypeOnly(declaration.node) ||
              ts.isEnumDeclaration(declaration.node) ||
              ts.isClassDeclaration(declaration.node) ||
              entry.name.startsWith("Known")))
        );
      });
  const byName = new Map();
  for (const entry of selected) {
    const existing = byName.get(entry.name);
    if (
      existing &&
      (existing.imported !== entry.imported ||
        existing.module !== entry.module ||
        Boolean(existing.external) !== Boolean(entry.external))
    ) {
      diagnostics.push({
        file: modelBarrel,
        declaration: "<exports>",
        member: entry.name,
        message: "Conflicting public model exports.",
      });
    } else {
      byName.set(
        entry.name,
        existing
          ? {
              ...entry,
              isTypeOnly: existing.isTypeOnly && entry.isTypeOnly,
            }
          : entry,
      );
    }
  }
  for (const file of inventory.modules.keys()) entries(file);
  return { entries: [...byName.values()], modules: cache };
}

function importCandidates(inventory) {
  const bindings = new Map();
  const sideEffects = new Map();
  for (const [file, source] of inventory.modules) {
    for (const item of importsOf(source)) {
      const module = resolveImport(file, item.module);
      if (internalModelImport(file, item.module)) continue;
      const external = !item.module.startsWith(".");
      if (item.sideEffect) {
        sideEffects.set(`${external}:${module}`, { module, external });
        continue;
      }
      if (!bindings.has(item.local)) bindings.set(item.local, []);
      const candidates = bindings.get(item.local);
      if (
        !candidates.some(
          (candidate) =>
            candidate.module === module &&
            candidate.imported === item.imported &&
            candidate.external === external,
        )
      ) {
        candidates.push({ ...item, module, external });
      }
    }
  }
  return { bindings, sideEffects };
}

function freeReferences(body) {
  const file = ts.createSourceFile(canonicalFile, body, ts.ScriptTarget.Latest, true);
  const options = { noLib: true, noResolve: true, types: [] };
  const host = ts.createCompilerHost(options);
  host.getSourceFile = (name) => (name === canonicalFile ? file : undefined);
  host.fileExists = (name) => name === canonicalFile;
  host.readFile = (name) => (name === canonicalFile ? body : undefined);
  const checker = ts.createProgram([canonicalFile], options, host).getTypeChecker();
  const references = new Set();
  function visit(node) {
    if (ts.isIdentifier(node)) {
      const parent = node.parent;
      const property =
        (ts.isPropertyAccessExpression(parent) && parent.name === node) ||
        (ts.isQualifiedName(parent) && parent.right === node) ||
        (parent.name === node && !ts.isShorthandPropertyAssignment(parent));
      if (!property && !checker.getSymbolAtLocation(node)?.declarations?.length) {
        references.add(node.text);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return references;
}

function mergedImports(references, base, custom, incoming, diagnostics) {
  const result = [];
  const same = (left, right) =>
    left?.module === right?.module &&
    left?.imported === right?.imported &&
    left?.external === right?.external;
  for (const name of references) {
    const lists = [base, custom, incoming].map((inventory) => inventory.bindings.get(name) ?? []);
    if (lists.some((list) => list.length > 1)) {
      diagnostics.push({
        file: canonicalFile,
        declaration: "<imports>",
        member: name,
        message: "Ambiguous imported model dependency.",
      });
      continue;
    }
    const [before, ours, theirs] = lists.map((list) => list[0]);
    if (!before && !ours && !theirs) continue;
    let selected;
    if (same(theirs, before)) selected = ours;
    else if (same(ours, before)) selected = theirs;
    else if (same(ours, theirs)) selected = ours;
    else if (
      name === "NodeReadableStream" &&
      ours?.module === "#platform/static-helpers/platform-types" &&
      theirs?.module === "@azure/core-rest-pipeline"
    )
      selected = ours;
    else {
      diagnostics.push({
        file: canonicalFile,
        declaration: "<imports>",
        member: name,
        message: "Concurrent model dependency import changes.",
      });
      continue;
    }
    if (!selected && ours && !theirs) selected = ours;
    if (selected) result.push({ ...selected, module: importPath(canonicalFile, selected) });
    else {
      diagnostics.push({
        file: canonicalFile,
        declaration: "<imports>",
        member: name,
        message: "A reconciled model still needs a removed dependency import.",
      });
    }
  }
  for (const key of new Set([...custom.sideEffects.keys(), ...incoming.sideEffects.keys()])) {
    const before = base.sideEffects.has(key);
    const ours = custom.sideEffects.has(key);
    const theirs = incoming.sideEffects.has(key);
    if (theirs === before ? ours : theirs)
      result.push({
        module: importPath(
          canonicalFile,
          custom.sideEffects.get(key) ?? incoming.sideEffects.get(key),
        ),
        sideEffect: true,
      });
  }
  return result;
}

/**
 * Plan model customization in memory. Diagnostics make the entire model plan
 * non-publishable; the caller owns validation, formatting, and filesystem writes.
 *
 * @param {{baseGenerated: Map<string,string>, baseSource: Map<string,string>,
 * generated: Map<string,string>, mergeDeclaration: Function}} inputs
 * @returns {{files: Map<string,string>, diagnostics: object[],
 * exports: {name:string,isTypeOnly:boolean}[], renames: Map<string,string>}}
 */
export function reconcileModels({ baseGenerated, baseSource, generated, mergeDeclaration }) {
  const diagnostics = [];
  const result = { files: new Map(), diagnostics, exports: [], renames: new Map() };
  const old = inventory(baseGenerated, diagnostics);
  const custom = inventory(baseSource, diagnostics);
  const next = inventory(generated, diagnostics);
  if (diagnostics.length) return result;
  if (!old.modules.size && !custom.modules.size && !next.modules.size) return result;
  result.renames = discoverRenames(old, custom, next, diagnostics);
  if (diagnostics.length) return result;
  const before = inventory(baseGenerated, diagnostics, result.renames);
  const incoming = inventory(generated, diagnostics, result.renames);
  const oldPublic = publicEntries(before, diagnostics);
  const customPublic = publicEntries(custom, diagnostics);
  const nextPublic = publicEntries(incoming, diagnostics);
  if (diagnostics.length) return result;
  const merged = new Map();
  for (const name of new Set([
    ...custom.declarations.keys(),
    ...incoming.declarations.keys(),
    ...before.declarations.keys(),
  ])) {
    const base = before.declarations.get(name);
    const ours = custom.declarations.get(name);
    const theirs = incoming.declarations.get(name);
    const context = { file: canonicalFile, declaration: name };
    const baseText = policyText(name, base?.text ?? null, context, diagnostics);
    const customText = policyText(name, ours?.text ?? null, context, diagnostics);
    // Top-level removals are not implied by disappearance from an emitted module.
    const incomingText = policyText(
      name,
      theirs?.text ?? (ours ? base?.text : null) ?? null,
      context,
      diagnostics,
    );
    const planned = mergeDeclaration(baseText, customText, incomingText, context);
    diagnostics.push(...planned.diagnostics);
    if (planned.text !== null) merged.set(name, planned.text);
  }
  if (diagnostics.length) return result;
  const body = [...merged.values()].join("\n\n");
  const references = freeReferences(body);
  for (const name of references) {
    if ((before.declarations.has(name) || incoming.declarations.has(name)) && !merged.has(name)) {
      diagnostics.push({
        file: canonicalFile,
        declaration: name,
        message: "A reconciled model references a removed or unmapped generated declaration.",
      });
    }
  }
  const selectedImports = mergedImports(
    references,
    importCandidates(before),
    importCandidates(custom),
    importCandidates(incoming),
    diagnostics,
  );
  const publicModels = new Map(customPublic.entries.map((entry) => [entry.name, entry]));
  const priorExports = new Map(oldPublic.entries.map((entry) => [entry.name, entry]));
  const sameExport = (left, right) =>
    left?.module === right?.module &&
    left?.imported === right?.imported &&
    left?.isTypeOnly === right?.isTypeOnly &&
    Boolean(left?.external) === Boolean(right?.external);
  for (const entry of nextPublic.entries) {
    const ours = publicModels.get(entry.name);
    const prior = priorExports.get(entry.name);
    if (!ours) {
      if (!prior) publicModels.set(entry.name, entry);
    } else if (sameExport(entry, prior) || sameExport(ours, entry)) {
      continue;
    } else if (sameExport(ours, prior)) {
      publicModels.set(entry.name, entry);
    } else {
      diagnostics.push({
        file: modelBarrel,
        declaration: "<exports>",
        member: entry.name,
        message: "Concurrent public model export changes.",
      });
    }
  }
  const external = [];
  const localExports = [];
  for (const entry of publicModels.values()) {
    if (entry.external || entry.module !== canonicalFile) {
      external.push(entry);
      continue;
    }
    if (!merged.has(entry.imported)) {
      diagnostics.push({
        file: modelBarrel,
        declaration: "<exports>",
        member: entry.name,
        message: "Public model export has no reconciled declaration.",
      });
      continue;
    }
    const declaration = parse(merged.get(entry.imported), canonicalFile, diagnostics).statements[0];
    if (!exported(declaration))
      localExports.push(`export ${isTypeOnly(declaration) ? "type " : ""}{ ${entry.imported} };`);
  }
  if (diagnostics.length) return result;
  const imports = renderImports(canonicalFile, body, selectedImports);
  const canonicalExternal = renderExports(
    external.map((entry) => ({
      ...entry,
      module: importPath(canonicalFile, {
        ...entry,
        module: entry.external ? entry.module : entry.module.replace(/\.ts$/, ".js"),
      }),
    })),
  );
  result.files.set(
    canonicalFile,
    `${header}${imports}\n\n${body}\n\n${[...new Set(localExports)].join("\n")}\n${canonicalExternal}\n`,
  );
  result.files.set(
    modelBarrel,
    `${header}${renderExports(
      [...publicModels.values()].map((entry) => ({
        ...entry,
        module: importPath(modelBarrel, {
          ...entry,
          module: entry.external ? entry.module : entry.module.replace(/\.ts$/, ".js"),
        }),
      })),
    )}\n`,
  );
  result.exports = [...publicModels.values()].map(({ name, isTypeOnly }) => ({ name, isTypeOnly }));

  for (const file of new Set([...custom.modules.keys(), ...incoming.modules.keys()])) {
    if (file === canonicalFile || file === modelBarrel) continue;
    const entries = new Map();
    for (const inventory of [custom, incoming]) {
      for (const [name, declaration] of inventory.declarations) {
        if (declaration.file === file && exported(declaration.node) && merged.has(name)) {
          entries.set(name, {
            name,
            imported: name,
            module: relativeImport(file, "models/models.js"),
            isTypeOnly: isTypeOnly(declaration.node),
          });
        }
      }
    }
    for (const publics of [customPublic, nextPublic]) {
      for (const entry of publics.modules.get(file) ?? []) {
        if (entry.external || entry.module !== canonicalFile || merged.has(entry.imported)) {
          entries.set(entry.name, {
            ...entry,
            module: importPath(file, {
              ...entry,
              module: entry.external ? entry.module : entry.module.replace(/\.ts$/, ".js"),
            }),
          });
        }
      }
    }
    result.files.set(file, `${header}${renderExports([...entries.values()])}\n`);
  }
  return result;
}
