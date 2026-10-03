// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import ts from "typescript";
import { canonicalize, mergeDeclaration } from "./ast-merge.mjs";
import {
  classicApiFile,
  classicFile,
  mergeCustomizedClassic,
  relocatedMemberDiagnostics,
  simpleFactoryProblem,
} from "./classic.mjs";
import { clientFile, wireOperationGroups } from "./client.mjs";
import { reconcileModels } from "./models.mjs";
import { classicFromOperations, planOperations } from "./operations.mjs";
import {
  declarations,
  edit,
  exportEntries,
  header,
  importsOf,
  parse,
  relativeImport,
  renameSymbols,
  renderExports,
  renderImports,
  resolveImport,
  textOf,
} from "./modules.mjs";

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
]);

function isProtected(file) {
  return protectedFiles.has(file) || file.startsWith("static-helpers/");
}

function isModel(file) {
  return file.startsWith("models/");
}

function exportedModels(entries) {
  return entries.filter(
    (entry) => /(^|\/)models\//.test(entry.module) || entry.module === "./models/index.js",
  );
}

function sameExport(left, right) {
  return left && right && left.imported === right.imported && left.module === right.module;
}

function normalizeGroupOrder(text, customized, file) {
  const source = parse(text, file);
  const reference = parse(customized, file);
  const orders = new Map();
  function groupProperties(node) {
    if (
      ts.isInterfaceDeclaration(node) &&
      node.members.every(
        (member) =>
          ts.isPropertySignature(member) &&
          ts.isIdentifier(member.name) &&
          member.type &&
          ts.isTypeReferenceNode(member.type) &&
          /Operations$/.test(member.type.typeName.getText()),
      )
    )
      return node.members;
    if (
      ts.isFunctionDeclaration(node) &&
      /^_get.*Operations$/.test(node.name?.text ?? "") &&
      node.body?.statements.length === 1 &&
      ts.isReturnStatement(node.body.statements[0])
    ) {
      const value = node.body.statements[0].expression;
      if (
        value &&
        ts.isObjectLiteralExpression(value) &&
        value.properties.every(
          (property) =>
            ts.isPropertyAssignment(property) &&
            ts.isIdentifier(property.name) &&
            ts.isCallExpression(property.initializer) &&
            ts.isIdentifier(property.initializer.expression) &&
            /^_get.*Operations$/.test(property.initializer.expression.text) &&
            property.initializer.arguments.every(ts.isIdentifier),
        )
      )
        return value.properties;
    }
    return undefined;
  }
  for (const node of reference.statements) {
    const members = groupProperties(node);
    if (members?.length)
      orders.set(
        node.name.text,
        members.map((member) => member.name.text),
      );
  }
  const changes = [];
  for (const node of source.statements) {
    const order = orders.get(node.name?.text);
    const members = groupProperties(node);
    if (!order || !members?.length) continue;
    const ordered = [...members]
      .map((member, index) => ({ member, index }))
      .sort((left, right) => {
        const leftIndex = order.indexOf(left.member.name.text);
        const rightIndex = order.indexOf(right.member.name.text);
        return (
          (leftIndex < 0 ? order.length : leftIndex) -
            (rightIndex < 0 ? order.length : rightIndex) || left.index - right.index
        );
      });
    changes.push({
      start: members[0].getFullStart(),
      end: members.at(-1).end,
      text:
        "\n" +
        ordered
          .map(({ member }) => textOf(member, source))
          .join(ts.isInterfaceDeclaration(node) ? "\n" : ",\n"),
    });
  }
  return edit(text, changes);
}

function knownImport(item) {
  if (item.imported === "PagedAsyncIterableIterator" || item.imported === "PageSettings")
    return { ...item, module: "@azure/core-paging" };
  if (item.imported === "getBinaryStreamResponse")
    return {
      ...item,
      module: "#platform/static-helpers/serialization/get-binary-stream-response",
    };
  return item;
}

export function planCustomization({ baseGenerated, baseSource, generated }) {
  const diagnostics = [];
  const source = new Map(baseSource);
  const models = reconcileModels({ baseGenerated, baseSource, generated, mergeDeclaration });
  diagnostics.push(...models.diagnostics);
  for (const [file, text] of models.files) source.set(file, text);
  const modelRenames = models.renames ?? new Map();
  const operations = planOperations({ baseGenerated, baseSource, generated, modelRenames });
  diagnostics.push(...operations.diagnostics);
  for (const [file, text] of operations.files) source.set(file, text);

  const generatedNameMappings = new Map(modelRenames);
  const removedFiles = new Set();
  const moves = new Map(operations.moves);
  for (const match of operations.matches) {
    const currentOptions = match.incoming.file.replace(/operations\.ts$/, "options.ts");
    moves.set(`${currentOptions}::${match.incoming.options}`, {
      file: currentOptions,
      name: match.names.options,
    });
    generatedNameMappings.set(match.incoming.options, match.names.options);
  }
  for (const [file, text] of generated) {
    if (!file.startsWith("classic/") || !file.endsWith("/index.ts")) continue;
    const apiFile = classicApiFile(file);
    if (!operations.files.has(apiFile)) continue;
    if (baseGenerated.get(file) === text && baseSource.has(file)) continue;
    const relocated = operations.matches.filter(
      (match) => match.incoming.file === apiFile && match.base,
    );
    for (const oldFile of new Set(relocated.map((match) => classicFile(match.base.file)))) {
      if (oldFile !== file && baseSource.has(oldFile)) {
        diagnostics.push(
          ...relocatedMemberDiagnostics(
            oldFile,
            baseSource.get(oldFile),
            baseGenerated.get(oldFile),
            relocated.filter((match) => classicFile(match.base.file) === oldFile),
            baseSource.get(classicApiFile(oldFile)),
          ),
        );
      }
      const oldInterface = parse(baseGenerated.get(oldFile), oldFile).statements.find(
        ts.isInterfaceDeclaration,
      );
      const newInterface = parse(text, file).statements.find(ts.isInterfaceDeclaration);
      if (oldInterface && newInterface && !generated.has(oldFile)) {
        moves.set(`${oldFile}::${oldInterface.name.text}`, { file, name: newInterface.name.text });
      }
    }
    const customText = baseSource.get(file);
    const baseText = baseGenerated.get(file);
    if (
      customText !== undefined &&
      baseText !== undefined &&
      simpleFactoryProblem(customText, baseText, file, baseSource.get(apiFile), operations.matches)
    ) {
      const baseRenames = new Map(modelRenames);
      const incomingRenames = new Map(modelRenames);
      for (const match of operations.matches) {
        if (match.base && classicFile(match.base.file) === file) {
          baseRenames.set(match.base.options, match.names.options);
          baseRenames.set(match.base.name, match.names.publicNode);
        }
        if (match.incoming.file === apiFile) {
          incomingRenames.set(match.incoming.options, match.names.options);
          incomingRenames.set(match.incoming.name, match.names.publicNode);
        }
      }
      const merged = mergeCustomizedClassic({
        file,
        baseText,
        customText,
        incomingText: text,
        matches: operations.matches,
        resolvedText: operations.files.get(apiFile),
        resolvedOptionsText: operations.files.get(apiFile.replace(/operations\.ts$/, "options.ts")),
        customApiText: baseSource.get(apiFile),
        baseRenames,
        incomingRenames,
        mapImport: knownImport,
      });
      diagnostics.push(...merged.diagnostics);
      if (merged.text) source.set(file, merged.text);
      continue;
    }
    source.set(
      file,
      classicFromOperations(file, text, operations.matches, operations.files.get(apiFile)),
    );
  }

  function mapEntry(file, entry, old = false) {
    if (!entry.module || !entry.module.startsWith(".")) return { ...entry };
    let target = resolveImport(file, entry.module);
    let imported = modelRenames.get(entry.imported) ?? entry.imported;
    let name = modelRenames.get(entry.name) ?? entry.name;
    if (target.startsWith("models/")) {
      target = "models/index.js";
    } else {
      const candidates = [
        `${target.replace(/\.js$/, ".ts")}::${entry.imported}`,
        `${target.replace(/index\.js$/, "options.ts")}::${entry.imported}`,
        `${target.replace(/index\.js$/, "operations.ts")}::${entry.imported}`,
      ];
      const move = candidates.map((key) => moves.get(key)).find(Boolean);
      if (move) {
        target = move.file.replace(/\.ts$/, ".js");
        imported = move.name;
        if (!old || entry.name === entry.imported) name = move.name;
      }
    }
    return { ...entry, imported, name, module: relativeImport(file, target) };
  }

  function mergeExports(file, baseModule, customModule, incomingModule, localNames) {
    const base = new Map(exportEntries(baseModule).map((entry) => [entry.name, entry]));
    const custom = new Map(exportEntries(customModule).map((entry) => [entry.name, entry]));
    const incoming = new Map(exportEntries(incomingModule).map((entry) => [entry.name, entry]));
    const result = new Map();
    const add = (entry) => {
      if (localNames.has(entry.name)) return;
      const existing = result.get(entry.name);
      if (existing && !sameExport(existing, entry)) {
        throw new Error(`${file}: conflicting export destinations for ${entry.name}`);
      }
      result.set(entry.name, entry);
    };
    for (const [name, entry] of custom) {
      const prior = base.get(name);
      const next = incoming.get(name);
      // A compatibility alias that reuses a generated name the customization
      // renamed away keeps its own export beside the renamed declaration.
      const relocated = mapEntry(file, entry, true);
      if (relocated.name !== name && custom.has(relocated.name)) {
        add({ ...entry });
        continue;
      }
      if (prior && !next && sameExport(prior, entry) && !exportedModels([entry]).length) continue;
      if (prior && next && sameExport(prior, entry)) {
        add({ ...mapEntry(file, next), isTypeOnly: entry.isTypeOnly || next.isTypeOnly });
      } else {
        add(mapEntry(file, entry, true));
      }
    }
    for (const [name, entry] of incoming) {
      const mapped = mapEntry(file, entry);
      if (base.has(name) && !custom.has(name)) continue;
      if (!result.has(mapped.name)) add(mapped);
    }
    return [...result.values()];
  }

  for (const [file, incomingText] of generated) {
    if (isModel(file) || operations.files.has(file) || file === "restorePollerHelpers.ts") continue;
    const apiFile = file.replace(/^classic\//, "api/").replace(/index\.ts$/, "operations.ts");
    if (file.startsWith("classic/") && operations.files.has(apiFile)) continue;
    const baseText = baseGenerated.get(file);
    const customText = baseSource.get(file);
    if (isProtected(file)) {
      if (!customText) {
        diagnostics.push({
          file,
          declaration: "<file>",
          message: "New protected file requires an explicit customization policy",
        });
      } else if (file === clientFile && baseText !== undefined && incomingText !== baseText) {
        const wired = wireOperationGroups({ file, baseText, customText, incomingText });
        diagnostics.push(...wired.diagnostics);
        source.set(file, wired.text);
      }
      continue;
    }
    if (incomingText === baseText && customText !== undefined) continue;
    if (
      baseText === undefined &&
      customText !== undefined &&
      canonicalize(customText) !== canonicalize(incomingText)
    ) {
      diagnostics.push({
        file,
        declaration: "<file>",
        message: "New emitted file collides with an existing custom-only file",
      });
      continue;
    }
    const customNames = new Set();
    if (customText !== undefined) {
      const module = parse(customText, file);
      for (const entry of exportEntries(module)) customNames.add(entry.name);
      for (const name of declarations(module).keys()) customNames.add(name);
    }
    // Renaming a compatibility alias that reuses a generated name would
    // collapse it into the customized declaration it aliases.
    const customMappings = new Map(
      [...generatedNameMappings].filter(
        ([from, to]) => !(customNames.has(from) && customNames.has(to)),
      ),
    );
    const normalize = (text, mappings = generatedNameMappings) =>
      renameSymbols(
        file.startsWith("classic/") && customText
          ? normalizeGroupOrder(text ?? "", customText, file)
          : (text ?? ""),
        mappings,
        file,
      );
    const baseModule = parse(normalize(baseText), file);
    const customModule = parse(normalize(customText, customMappings), file);
    const incomingModule = parse(normalize(incomingText), file);
    const baseNodes = declarations(baseModule);
    const customNodes = declarations(customModule);
    const incomingNodes = declarations(incomingModule);
    const mergedNodes = new Map();
    for (const name of new Set([
      ...customNodes.keys(),
      ...incomingNodes.keys(),
      ...baseNodes.keys(),
    ])) {
      const snippets = [
        [baseNodes, baseModule],
        [customNodes, customModule],
        [incomingNodes, incomingModule],
      ].map(([nodes, module]) => (nodes.has(name) ? textOf(nodes.get(name), module) : null));
      const merged = mergeDeclaration(...snippets, { file, declaration: name });
      diagnostics.push(...merged.diagnostics);
      if (merged.text) mergedNodes.set(name, merged.text);
    }
    const exports = mergeExports(
      file,
      baseModule,
      customModule,
      incomingModule,
      new Set(mergedNodes.keys()),
    );
    const body = [...mergedNodes.values(), renderExports(exports)].filter(Boolean).join("\n\n");
    function mappedImports(module) {
      return importsOf(module).map((entry) => {
        if (entry.imported === "PagedAsyncIterableIterator" || entry.imported === "PageSettings") {
          return { ...entry, module: "@azure/core-paging" };
        }
        if (entry.imported === "getBinaryStreamResponse") {
          return {
            ...entry,
            module: "#platform/static-helpers/serialization/get-binary-stream-response",
          };
        }
        const mapped = mapEntry(file, {
          ...entry,
          name: entry.local,
          isTypeOnly: false,
        });
        return { ...entry, imported: mapped.imported, local: mapped.name, module: mapped.module };
      });
    }
    const priorImports = new Map(
      mappedImports(baseModule)
        .filter((item) => item.local)
        .map((item) => [item.local, item]),
    );
    const candidates = mappedImports(customModule);
    const customImports = new Map(
      candidates.filter((item) => item.local).map((item) => [item.local, item]),
    );
    for (const incoming of mappedImports(incomingModule)) {
      const custom = customImports.get(incoming.local);
      const prior = priorImports.get(incoming.local);
      if (custom && (sameExport(custom, incoming) || sameExport(prior, incoming))) continue;
      if (custom && sameExport(prior, custom)) {
        candidates.splice(candidates.indexOf(custom), 1);
      } else if (custom && !sameExport(custom, incoming)) {
        diagnostics.push({
          file,
          declaration: incoming.local,
          message: "Both generation and customization changed an import destination",
        });
        continue;
      }
      candidates.push(incoming);
    }
    source.set(file, `${header}${renderImports(file, body, candidates)}\n\n${body}\n`);
  }
  for (const [file, baseText] of baseGenerated) {
    if (generated.has(file) || isModel(file) || isProtected(file)) continue;
    if (!baseSource.has(file)) continue;
    const customized = declarations(parse(baseSource.get(file), file));
    const previous = declarations(parse(baseText, file));
    const sourceOnly = [...customized.keys()].filter((name) => !previous.has(name));
    if (sourceOnly.length) {
      diagnostics.push({
        file,
        declaration: sourceOnly.join(", "),
        message:
          "Removed generated module contains custom-only declarations; relocation requires a policy",
      });
      continue;
    }
    removedFiles.add(file);
    source.delete(file);
  }
  source.delete("restorePollerHelpers.ts");
  return { source, diagnostics, matches: operations.matches, modelRenames, removedFiles };
}
