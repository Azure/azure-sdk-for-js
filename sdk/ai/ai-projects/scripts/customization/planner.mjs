// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import ts from "typescript";
import { canonicalize, mergeDeclaration } from "./ast-merge.mjs";
import { reconcileModels } from "./models.mjs";
import { classicFromOperations, planOperations } from "./operations.mjs";
import { wireTrainingJobsClient } from "./training-jobs-client.mjs";
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

function assertSimpleFactory(custom, base, file) {
  const source = parse(custom, file);
  const previous = parse(base, file);
  const originalInterface = previous.statements.find(ts.isInterfaceDeclaration);
  const customizedInterface = source.statements.find(ts.isInterfaceDeclaration);
  if (!originalInterface || !customizedInterface)
    throw new Error(`${file}: unrecognized operations interface`);
  const originalNames = new Set(
    originalInterface.members.map((member) => member.name?.getText(previous)),
  );
  if (
    customizedInterface.members.some((member) => !originalNames.has(member.name?.getText(source)))
  ) {
    throw new Error(`${file}: custom-only operations require an explicit relocation policy`);
  }
  function simpleCall(node, parameters) {
    return (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.arguments.every((argument) => ts.isIdentifier(argument) && parameters.has(argument.text))
    );
  }
  for (const declaration of source.statements.filter(ts.isFunctionDeclaration)) {
    if (
      !/^_get/.test(declaration.name.text) ||
      !declaration.body ||
      declaration.body.statements.length !== 1
    ) {
      throw new Error(
        `${file}::${declaration.name.text}: nontrivial customized factory cannot be regenerated`,
      );
    }
    const statement = declaration.body.statements[0];
    if (
      !ts.isReturnStatement(statement) ||
      !statement.expression ||
      !ts.isObjectLiteralExpression(statement.expression)
    ) {
      throw new Error(
        `${file}::${declaration.name.text}: customized factory does not return a plain operations object`,
      );
    }
    const parameters = new Set(
      declaration.parameters.map((parameter) => parameter.name.getText(source)),
    );
    for (const property of statement.expression.properties) {
      if (ts.isSpreadAssignment(property) && simpleCall(property.expression, parameters)) continue;
      if (ts.isPropertyAssignment(property) && ts.isArrowFunction(property.initializer)) {
        const arrow = property.initializer;
        const argumentsAllowed = new Set([
          ...parameters,
          ...arrow.parameters.map((parameter) => parameter.name.getText(source)),
        ]);
        if (simpleCall(arrow.body, argumentsAllowed)) continue;
      }
      throw new Error(
        `${file}::${declaration.name.text}: customized factory behavior requires explicit preservation`,
      );
    }
  }
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
    const apiFile = file.replace(/^classic\//, "api/").replace(/index\.ts$/, "operations.ts");
    if (!operations.files.has(apiFile)) continue;
    if (baseGenerated.get(file) === text && baseSource.has(file)) continue;
    const contributors = operations.matches
      .filter((match) => match.incoming.file === apiFile && match.base)
      .map((match) =>
        match.base.file.replace(/^api\//, "classic/").replace(/operations\.ts$/, "index.ts"),
      );
    for (const oldFile of new Set(contributors)) {
      if (baseSource.has(oldFile))
        assertSimpleFactory(baseSource.get(oldFile), baseGenerated.get(oldFile), oldFile);
      const oldInterface = parse(baseGenerated.get(oldFile), oldFile).statements.find(
        ts.isInterfaceDeclaration,
      );
      const newInterface = parse(text, file).statements.find(ts.isInterfaceDeclaration);
      if (oldInterface && newInterface && !generated.has(oldFile)) {
        moves.set(`${oldFile}::${oldInterface.name.text}`, { file, name: newInterface.name.text });
      }
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
      if (file === "aiProjectClient.ts" && baseText && customText) {
        const result = wireTrainingJobsClient(baseText, customText, incomingText);
        diagnostics.push(...result.diagnostics);
        source.set(file, result.text);
      }
      if (!customText) {
        diagnostics.push({
          file,
          declaration: "<file>",
          message: "New protected file requires an explicit customization policy",
        });
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
    const normalize = (text) =>
      renameSymbols(
        file.startsWith("classic/") && customText
          ? normalizeGroupOrder(text ?? "", customText, file)
          : (text ?? ""),
        generatedNameMappings,
        file,
      );
    const baseModule = parse(normalize(baseText), file);
    const customModule = parse(normalize(customText), file);
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
