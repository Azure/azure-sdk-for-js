// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import ts from "typescript";
import { canonicalize, mergeDeclaration } from "./ast-merge.mjs";
import { classicApiFile, classicMember, resolvedOperationImports } from "./classic.mjs";
import { customizeNewOperation, modelMemberIndex } from "./new-operations.mjs";
import {
  adoptConditionalPreviewHeader,
  applyPreviewHeaderPolicy,
  previewLiteral,
  retirePreviewHeaders,
  sendsPreviewHeader,
} from "./preview-headers.mjs";
import {
  declarations,
  edit,
  exportEntries,
  header,
  importsOf,
  nameOf,
  parse,
  relativeImport,
  renameSymbols,
  renderImports,
  resolveImport,
  textOf,
} from "./modules.mjs";

function calls(node, predicate) {
  const result = [];
  function visit(current) {
    if (ts.isCallExpression(current) && predicate(current)) result.push(current);
    ts.forEachChild(current, visit);
  }
  visit(node);
  return result;
}

function operationIdentity(node, file) {
  const paths = calls(
    node,
    (call) =>
      ts.isIdentifier(call.expression) &&
      call.expression.text === "expandUrlTemplate" &&
      ts.isStringLiteral(call.arguments[0]),
  );
  const methods = calls(
    node,
    (call) =>
      ts.isPropertyAccessExpression(call.expression) &&
      ["get", "post", "put", "patch", "delete", "head", "options"].includes(
        call.expression.name.text,
      ),
  );
  if (paths.length !== 1 || methods.length !== 1) return undefined;
  let template = paths[0].arguments[0].text
    .replace(/\{\?[^}]*\}/g, "")
    .replace(/\{[^}]*\}/g, "{}");
  // azure-rest-api-specs#47858 promotes Skills CRUD and changes only its
  // route prefix. Scope identity alignment to these two reviewed modules;
  // the actual emitted URL still participates in the three-way merge.
  if (
    file === "api/skills/operations.ts" &&
    /^\/openai\/v1\/skills(?:\/\{\}(?:\/versions(?:\/\{\})?)?(?:\/content)?)?$/.test(template)
  ) {
    template = template.replace(/^\/openai\/v1/, "");
  }
  return `${methods[0].expression.name.text.toUpperCase()} ${template}`;
}

function optionsName(node) {
  const parameter = node.parameters.find((item) => nameOf(item.name) === "options");
  return parameter?.type && ts.isTypeReferenceNode(parameter.type)
    ? nameOf(parameter.type.typeName)
    : undefined;
}

export function normalizeOperationCode(text, file) {
  const source = parse(text, file);
  const changes = [];
  const previewParameters = new Map();
  for (const node of source.statements.filter(ts.isFunctionDeclaration)) {
    const index = node.parameters.findIndex(
      (parameter) => nameOf(parameter.name) === "foundryFeatures",
    );
    if (index < 0) continue;
    const parameter = node.parameters[index];
    if (
      !parameter.type ||
      !ts.isLiteralTypeNode(parameter.type) ||
      !ts.isStringLiteral(parameter.type.literal)
    ) {
      throw new Error(
        `${file}::${node.name.text}: required foundryFeatures needs an explicit literal default`,
      );
    }
    previewParameters.set(node.name.text, index);
    changes.push({
      start: node.parameters[0].getStart(source),
      end: node.parameters.at(-1).end,
      text: node.parameters
        .filter((_, position) => position !== index)
        .map((item) => item.getText(source))
        .join(", "),
    });
    if (node.name.text.endsWith("Send")) {
      changes.push({
        start: node.body.getStart(source) + 1,
        end: node.body.getStart(source) + 1,
        text: `\nconst foundryFeatures = ${JSON.stringify(parameter.type.literal.text)};\n`,
      });
    }
  }
  function visit(node) {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const index = previewParameters.get(node.expression.text);
      if (index !== undefined) {
        changes.push({
          start: node.arguments[0].getStart(source),
          end: node.arguments.at(-1).end,
          text: node.arguments
            .filter((_, position) => position !== index)
            .map((item) => item.getText(source))
            .join(", "),
        });
        return;
      }
      if (node.expression.text === "expandUrlTemplate" && ts.isStringLiteral(node.arguments[0])) {
        const template = node.arguments[0].text.replace(
          /\{\?([^}]+)\}/g,
          (_, variables) =>
            `{?${variables
              .split(",")
              .map((item) => decodeURIComponent(item))
              .sort()
              .join(",")}}`,
        );
        if (template !== node.arguments[0].text)
          changes.push({
            start: node.arguments[0].getStart(source),
            end: node.arguments[0].end,
            text: JSON.stringify(template),
          });
        if (node.arguments[1] && ts.isObjectLiteralExpression(node.arguments[1])) {
          for (const property of node.arguments[1].properties) {
            if (
              property.name &&
              ts.isStringLiteral(property.name) &&
              property.name.text.includes("%")
            ) {
              changes.push({
                start: property.name.getStart(source),
                end: property.name.end,
                text: JSON.stringify(decodeURIComponent(property.name.text)),
              });
            }
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return edit(text, changes);
}

export function indexOperations(files) {
  const result = [];
  for (const [file, original] of files) {
    if (!/^api\/.*\/operations\.ts$/.test(file)) continue;
    const source = parse(normalizeOperationCode(original, file), file);
    const nodes = declarations(source);
    for (const node of nodes.values()) {
      if (!ts.isFunctionDeclaration(node) || !node.name.text.endsWith("Send")) continue;
      const identity = operationIdentity(node, file);
      if (!identity) continue;
      const publicFunctions = [...nodes.values()].filter(
        (candidate) =>
          ts.isFunctionDeclaration(candidate) &&
          candidate !== node &&
          !candidate.name.text.endsWith("Deserialize") &&
          calls(
            candidate,
            (call) => ts.isIdentifier(call.expression) && call.expression.text === node.name.text,
          ).length > 0,
      );
      if (publicFunctions.length !== 1) {
        throw new Error(
          `${file}::${node.name.text}: cannot uniquely identify the public operation`,
        );
      }
      const publicNode = publicFunctions[0];
      const deserialize = nodes.get(node.name.text.replace(/Send$/, "Deserialize"));
      if (!deserialize) throw new Error(`${file}::${node.name.text}: missing deserializer`);
      result.push({
        file,
        identity,
        source,
        nodes,
        publicNode,
        send: node,
        deserialize,
        name: publicNode.name.text,
        options: optionsName(publicNode),
      });
    }
  }
  return result;
}

function chooseOperation(candidates, operation, preferredFile = operation.file) {
  const exact = candidates.filter(
    (item) =>
      item.file === preferredFile &&
      item.name === operation.name &&
      item.identity === operation.identity,
  );
  if (exact.length === 1) return exact[0];
  const local = candidates.filter(
    (item) => item.file === preferredFile && item.identity === operation.identity,
  );
  if (local.length === 1) return local[0];
  const matches = candidates.filter((item) => item.identity === operation.identity);
  if (operation.file === "api/skills/operations.ts") {
    // create and createFromFiles intentionally share a multipart route. Match
    // their reviewed names, not an arbitrary first operation on that route.
    const promoted = matches.filter(
      (item) =>
        item.file === "api/beta/skills/operations.ts" && item.name === operation.name,
    );
    if (promoted.length === 1) return promoted[0];
  }
  if (matches.length > 1)
    throw new Error(
      `${operation.file}::${operation.name}: ambiguous operation identity ${operation.identity}`,
    );
  return matches[0];
}

function normalizePoller(text, customized) {
  const target = /\bgetJobPoller\s*\(/.test(customized)
    ? "getJobPoller"
    : /\bgetRunPoller\s*\(/.test(customized)
      ? "getRunPoller"
      : undefined;
  if (!target) return text;
  const source = parse(text);
  const changes = [];
  const typeName = target === "getJobPoller" ? "JobPoller" : "RunPoller";
  function visit(node) {
    if (
      ts.isAsExpression(node) &&
      calls(
        node.expression,
        (call) =>
          ts.isIdentifier(call.expression) && call.expression.text === "getLongRunningPoller",
      ).length
    ) {
      changes.push({
        start: node.getStart(source),
        end: node.end,
        text: node.expression.getText(source).replace(/\bgetLongRunningPoller\b/g, target),
      });
      return;
    }
    if (
      ts.isTypeReferenceNode(node) &&
      nameOf(node.typeName) === "PollerLike" &&
      node.typeArguments?.length === 2
    ) {
      changes.push({
        start: node.getStart(source),
        end: node.end,
        text: `${typeName}<${node.typeArguments[1].getText(source)}>`,
      });
      return;
    }
    if (ts.isIdentifier(node) && node.text === "getLongRunningPoller") {
      changes.push({ start: node.getStart(source), end: node.end, text: target });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return edit(text, changes);
}

function operationNames(base, customized, incoming) {
  const result = {};
  for (const member of ["publicNode", "send", "deserialize"]) {
    const oldName = base?.[member].name.text;
    const customName = customized?.[member].name.text;
    result[member] = customName && customName !== oldName ? customName : incoming[member].name.text;
  }
  result.options =
    customized?.options && customized.options !== base?.options
      ? customized.options
      : incoming.options;
  return result;
}

function alignParameterNames(snippets, file) {
  if (!snippets[0] || !snippets[1]) return snippets;
  const [base, custom] = snippets.slice(0, 2).map((text) => parse(text, file).statements[0]);
  if (
    !ts.isFunctionDeclaration(base) ||
    !ts.isFunctionDeclaration(custom) ||
    base.parameters.length !== custom.parameters.length
  )
    return snippets;
  const renames = new Map();
  for (let index = 0; index < base.parameters.length; index++) {
    const before = base.parameters[index];
    const after = custom.parameters[index];
    if (!ts.isIdentifier(before.name) || !ts.isIdentifier(after.name)) return snippets;
    if (before.name.text !== after.name.text) renames.set(before.name.text, after.name.text);
  }
  if (!renames.size) return snippets;
  function aligned(text) {
    const source = parse(text, file);
    const targets = new Set(renames.values());
    let collision = false;
    function visit(node) {
      if (
        ts.isIdentifier(node) &&
        targets.has(node.text) &&
        !(
          (ts.isPropertyAccessExpression(node.parent) && node.parent.name === node) ||
          ((ts.isPropertyAssignment(node.parent) || ts.isPropertySignature(node.parent)) &&
            node.parent.name === node)
        )
      )
        collision = true;
      ts.forEachChild(node, visit);
    }
    visit(source);
    if (collision) return null;
    return renameSymbols(
      text,
      renames,
      file,
      (node) =>
        ts.isParameter(node.parent) &&
        ts.isFunctionDeclaration(node.parent.parent) &&
        ts.isSourceFile(node.parent.parent.parent),
    );
  }
  const normalizedBase = aligned(snippets[0]);
  if (!normalizedBase) return snippets;
  const signature = (node) =>
    canonicalize(`function signature(${node.parameters.map((p) => p.getText()).join(",")}) {}`);
  if (signature(parse(normalizedBase, file).statements[0]) !== signature(custom)) return snippets;
  const normalizedIncoming = aligned(snippets[2]);
  if (!normalizedIncoming) return snippets;
  return [normalizedBase, snippets[1], normalizedIncoming];
}

function localReferences(source, nodes) {
  const options = { noLib: true, target: ts.ScriptTarget.Latest };
  const host = ts.createCompilerHost(options);
  host.getSourceFile = (file) => (file === source.fileName ? source : undefined);
  host.fileExists = (file) => file === source.fileName;
  host.readFile = (file) => (file === source.fileName ? source.text : undefined);
  const checker = ts.createProgram([source.fileName], options, host).getTypeChecker();
  const bindings = new Map();
  for (const [name, node] of nodes) {
    const names = ts.isVariableStatement(node)
      ? node.declarationList.declarations.map((declaration) => declaration.name)
      : node.name
        ? [node.name]
        : [];
    for (const binding of names) {
      const symbol = checker.getSymbolAtLocation(binding);
      if (symbol) bindings.set(symbol, name);
    }
  }
  const references = new Map();
  for (const [name, node] of nodes) {
    const referenced = new Set();
    const visit = (child) => {
      if (ts.isIdentifier(child) && child !== node.name) {
        const symbol =
          ts.isShorthandPropertyAssignment(child.parent) && child.parent.name === child
            ? checker.getShorthandAssignmentValueSymbol(child.parent)
            : checker.getSymbolAtLocation(child);
        const target = bindings.get(symbol);
        if (target && target !== name) referenced.add(target);
      }
      ts.forEachChild(child, visit);
    };
    visit(node);
    references.set(name, referenced);
  }
  return references;
}

export function planOperations({ baseGenerated, baseSource, generated, modelRenames = new Map() }) {
  const generatedMembers = modelMemberIndex(generated);
  const oldOperations = indexOperations(baseGenerated);
  const changedModules = new Map(
    [...generated].filter(([file, text]) => text !== baseGenerated.get(file)),
  );
  const incomingOperations = indexOperations(changedModules);
  const candidateFiles = new Set(
    incomingOperations
      .map((operation) => chooseOperation(oldOperations, operation)?.file)
      .filter(Boolean),
  );
  for (const [file, text] of baseGenerated) {
    if (/^api\/.*\/operations\.ts$/.test(file) && generated.get(file) !== text)
      candidateFiles.add(file);
  }
  const customOperations = indexOperations(
    new Map([...baseSource].filter(([file]) => candidateFiles.has(file))),
  );
  const matches = [];
  const sourceMaps = new Map();
  const baseMaps = new Map();
  const incomingMaps = new Map();
  const moves = new Map();
  function addRename(maps, file, from, to) {
    if (!from || !to) return;
    if (!maps.has(file)) maps.set(file, new Map(modelRenames));
    const existing = maps.get(file).get(from);
    if (existing && existing !== to) throw new Error(`${file}: conflicting relocation of ${from}`);
    maps.get(file).set(from, to);
  }
  for (const incoming of incomingOperations) {
    const base = chooseOperation(oldOperations, incoming);
    const customized = base
      ? chooseOperation(
          customOperations.filter((item) => item.file === base.file),
          base,
        )
      : undefined;
    if (base && !customized)
      throw new Error(
        `${incoming.file}::${incoming.name}: the generated operation was removed by customization`,
      );
    const names = operationNames(base, customized, incoming);
    const match = { base, customized, incoming, names };
    matches.push(match);
    for (const member of ["publicNode", "send", "deserialize"]) {
      addRename(incomingMaps, incoming.file, incoming[member].name.text, names[member]);
      if (base) addRename(baseMaps, base.file, base[member].name.text, names[member]);
      if (customized)
        addRename(sourceMaps, customized.file, customized[member].name.text, names[member]);
    }
    for (const [operation, maps] of [
      [base, baseMaps],
      [customized, sourceMaps],
      [incoming, incomingMaps],
    ]) {
      if (!operation) continue;
      addRename(maps, operation.file, operation.options, names.options);
      addRename(
        maps,
        operation.file.replace(/operations\.ts$/, "options.ts"),
        operation.options,
        names.options,
      );
    }
    if (base) {
      for (const [oldName, newName] of [
        [base.options, names.options],
        [base.publicNode.name.text, names.publicNode],
        [base.send.name.text, names.send],
        [base.deserialize.name.text, names.deserialize],
      ]) {
        const oldFile =
          oldName === base.options ? base.file.replace(/operations\.ts$/, "options.ts") : base.file;
        const newFile =
          oldName === base.options
            ? incoming.file.replace(/operations\.ts$/, "options.ts")
            : incoming.file;
        moves.set(`${oldFile}::${oldName}`, { file: newFile, name: newName });
      }
    }
  }
  const files = new Map(
    [...generated]
      .filter(
        ([file, text]) =>
          /^api\/.*\/(?:operations|options)\.ts$/.test(file) &&
          text === baseGenerated.get(file) &&
          baseSource.has(file),
      )
      .map(([file]) => [file, baseSource.get(file)]),
  );
  const diagnostics = [];
  for (const previous of oldOperations) {
    if (
      baseGenerated.get(previous.file) === generated.get(previous.file) ||
      matches.some((match) => match.base === previous)
    )
      continue;
    const customized = chooseOperation(
      customOperations.filter((item) => item.file === previous.file),
      previous,
    );
    if (!customized) continue;
    for (const member of ["send", "deserialize", "publicNode"]) {
      const rename = new Map(modelRenames);
      rename.set(previous[member].name.text, customized[member].name.text);
      const original = renameSymbols(textOf(previous[member], previous.source), rename);
      const custom = textOf(customized[member], customized.source);
      if (canonicalize(original) !== canonicalize(custom)) {
        diagnostics.push({
          file: previous.file,
          declaration: customized[member].name.text,
          message: `Customized operation ${previous.identity} disappeared without an unambiguous emitted successor`,
        });
        break;
      }
    }
  }
  const contexts = new Map();
  const outputDeclarations = new Map();
  const normalized = new Map();
  function moduleFor(tree, maps, file, kind) {
    const key = `${kind}:${file}`;
    if (!normalized.has(key)) {
      const text = tree.get(file);
      if (text === undefined) throw new Error(`Missing ${kind} module ${file}`);
      const module = parse(
        renameSymbols(normalizeOperationCode(text, file), maps.get(file) ?? modelRenames, file),
        file,
      );
      normalized.set(key, { source: module, nodes: declarations(module) });
    }
    return normalized.get(key);
  }
  function addOutput(file, name, text, sources) {
    if (!outputDeclarations.has(file)) outputDeclarations.set(file, new Map());
    const declarations = outputDeclarations.get(file);
    if (declarations.has(name)) throw new Error(`${file}: duplicate resolved declaration ${name}`);
    declarations.set(name, text);
    if (!contexts.has(file)) contexts.set(file, []);
    contexts.get(file).push(...sources);
  }
  for (const match of matches) {
    const { base, customized, incoming, names } = match;
    for (const member of ["send", "deserialize", "publicNode", "options"]) {
      const isOptions = member === "options";
      const outputFile = isOptions
        ? incoming.file.replace(/operations\.ts$/, "options.ts")
        : incoming.file;
      const outputName = names[member];
      if (!outputName)
        throw new Error(`${incoming.file}::${incoming.name}: missing options contract`);
      const modules = [
        base &&
          moduleFor(
            baseGenerated,
            baseMaps,
            isOptions ? base.file.replace(/operations\.ts$/, "options.ts") : base.file,
            "base",
          ),
        customized &&
          moduleFor(
            baseSource,
            sourceMaps,
            isOptions ? customized.file.replace(/operations\.ts$/, "options.ts") : customized.file,
            "custom",
          ),
        moduleFor(generated, incomingMaps, outputFile, "incoming"),
      ];
      const snippets = alignParameterNames(
        modules.map((module) =>
          module ? textOf(module.nodes.get(outputName), module.source) : null,
        ),
        outputFile,
      );
      if (member === "publicNode" && snippets[1]) {
        snippets[0] = normalizePoller(snippets[0], snippets[1]);
        snippets[2] = normalizePoller(snippets[2], snippets[1]);
      }
      if (member === "send" && snippets[1]) {
        const optionsOf = (tree, maps, file, kind) =>
          moduleFor(tree, maps, file.replace(/operations\.ts$/, "options.ts"), kind).nodes.get(
            names.options,
          );
        if (base)
          snippets[0] = applyPreviewHeaderPolicy(
            snippets[0],
            snippets[1],
            previewLiteral(optionsOf(baseGenerated, baseMaps, base.file, "base")),
          );
        const incomingPreview = previewLiteral(
          optionsOf(generated, incomingMaps, incoming.file, "incoming"),
        );
        // #47930 makes call-job deletion's previously required opt-in
        // conditional for SIP. Do not turn that new optional header back into
        // an unconditional opt-in merely because the old wrapper used a constant.
        const conditionalCallJobPreview =
          base?.file === "api/beta/voiceAgents/telephony/operations.ts" &&
          incoming.file === "api/voiceAgents/telephony/operations.ts" &&
          base.name === "deleteCallJob" &&
          incoming.name === "deleteCallJob" &&
          declarations(parse(baseGenerated.get(base.file), base.file))
            .get(base.send.name.text)
            ?.parameters.some((parameter) => nameOf(parameter.name) === "foundryFeatures") &&
          !incoming.send.parameters.some(
            (parameter) => nameOf(parameter.name) === "foundryFeatures",
          ) &&
          incomingPreview === "VoiceAgents=V1Preview";
        if (conditionalCallJobPreview) {
          snippets[0] = adoptConditionalPreviewHeader(snippets[0], snippets[2]);
          snippets[1] = adoptConditionalPreviewHeader(snippets[1], snippets[2]);
        } else snippets[2] = applyPreviewHeaderPolicy(snippets[2], snippets[1], incomingPreview);
      }
      const merged = mergeDeclaration(...snippets, { file: outputFile, declaration: outputName });
      diagnostics.push(...merged.diagnostics);
      if (member === "publicNode" && merged.text && base && customized) {
        const sendOf = (module) => textOf(module.nodes.get(names.send), module.source);
        const outputSend = outputDeclarations.get(outputFile)?.get(names.send);
        if (
          sendsPreviewHeader(sendOf(modules[0])) &&
          sendsPreviewHeader(sendOf(modules[1])) &&
          outputSend &&
          !sendsPreviewHeader(outputSend)
        )
          merged.text = retirePreviewHeaders(merged.text);
      }
      if (!base && member === "publicNode" && merged.text) {
        const nodes = outputDeclarations.get(outputFile);
        merged.text = customizeNewOperation({
          text: merged.text,
          sendText: nodes.get(names.send),
          deserializeText: nodes.get(names.deserialize),
          members: generatedMembers,
        });
      }
      if (merged.text)
        addOutput(
          outputFile,
          outputName,
          merged.text,
          modules.filter(Boolean).map((module) => module.source),
        );
    }
  }
  function mapImport(item, fromFile, toFile) {
    if (item.module === "./options.js") return item;
    let resolved = resolveImport(fromFile, item.module);
    const target = moves.get(`${resolved.replace(/\.js$/, ".ts")}::${item.imported}`);
    let imported = target?.name ?? modelRenames.get(item.imported) ?? item.imported;
    let local = modelRenames.get(item.local) ?? item.local;
    if (item.imported === "PagedAsyncIterableIterator") {
      return { ...item, imported, local, module: "@azure/core-paging" };
    }
    if (item.imported === "getBinaryStreamResponse") {
      return {
        ...item,
        imported,
        local,
        module: "#platform/static-helpers/serialization/get-binary-stream-response",
      };
    }
    if (target) resolved = target.file.replace(/\.ts$/, ".js");
    if (/^models\/.*models\.js$/.test(resolved)) resolved = "models/models.js";
    return {
      ...item,
      imported,
      local,
      module: item.module.startsWith(".") ? relativeImport(toFile, resolved) : item.module,
    };
  }
  const relocatedHelpers = new Map();
  const helperDestinations = new Set();
  for (const oldFile of new Set(matches.map((match) => match.customized?.file).filter(Boolean))) {
    if (generated.has(oldFile)) continue;
    const custom = moduleFor(baseSource, sourceMaps, oldFile, "custom");
    const original = moduleFor(baseGenerated, baseMaps, oldFile, "base");
    const helpers = new Map([...custom.nodes].filter(([name]) => !original.nodes.has(name)));
    if (!helpers.size) continue;
    const references = localReferences(custom.source, custom.nodes);
    const destinations = new Map();
    for (const match of matches.filter((item) => item.customized?.file === oldFile)) {
      const visit = (name, visited = new Set()) => {
        if (visited.has(name)) return;
        visited.add(name);
        for (const target of references.get(name) ?? []) {
          if (!helpers.has(target)) continue;
          if (!destinations.has(target)) destinations.set(target, new Set());
          destinations.get(target).add(match.incoming.file);
          visit(target, visited);
        }
      };
      for (const member of ["send", "deserialize", "publicNode"]) visit(match.names[member]);
    }
    const exports = new Set(
      exportEntries(custom.source)
        .filter((entry) => !entry.module)
        .map((entry) => entry.imported),
    );
    const exportAssignments = new Set(
      custom.source.statements
        .filter(ts.isExportAssignment)
        .map(({ expression }) => (ts.isIdentifier(expression) ? expression.text : undefined))
        .filter(Boolean),
    );
    for (const [name, targets] of destinations) {
      const node = helpers.get(name);
      const file = [...targets][0];
      const output = outputDeclarations.get(file);
      const dependencyMovesToDestination = (dependency) =>
        matches.some(
          (match) =>
            match.customized?.file === oldFile &&
            match.incoming.file === file &&
            ["send", "deserialize", "publicNode"].some(
              (member) => match.names[member] === dependency,
            ),
        );
      const collides = [generated, baseSource].some(
        (tree) =>
          tree.has(file) &&
          (declarations(parse(tree.get(file), file)).has(name) ||
            importsOf(parse(tree.get(file), file)).some((item) => item.local === name)),
      );
      if (
        targets.size !== 1 ||
        !ts.isFunctionDeclaration(node) ||
        node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ||
        exports.has(name) ||
        exportAssignments.has(name) ||
        output?.has(name) ||
        helperDestinations.has(`${file}::${name}`) ||
        collides ||
        [...(references.get(name) ?? [])].some(
          (target) =>
            !helpers.has(target) && (!dependencyMovesToDestination(target) || !output?.has(target)),
        )
      ) {
        diagnostics.push({
          file: oldFile,
          declaration: name,
          message:
            "Custom helper relocation requires a private function, a unique destination, and all local dependencies without collisions",
        });
        continue;
      }
      const move = { file, name };
      helperDestinations.add(`${file}::${name}`);
      relocatedHelpers.set(`${oldFile}::${name}`, move);
      moves.set(`${oldFile}::${name}`, move);
    }
  }
  for (const [file, nodes] of outputDeclarations) {
    if (baseGenerated.get(file) === generated.get(file) && baseSource.has(file)) {
      files.set(file, baseSource.get(file));
      continue;
    }
    const contributors = new Set(
      matches
        .filter(
          (match) =>
            (file.endsWith("options.ts")
              ? match.incoming.file.replace(/operations\.ts$/, "options.ts")
              : match.incoming.file) === file,
        )
        .map((match) => match.customized?.file)
        .filter(Boolean)
        .map((oldFile) =>
          file.endsWith("options.ts") ? oldFile.replace(/operations\.ts$/, "options.ts") : oldFile,
        ),
    );
    for (const oldFile of contributors) {
      const oldGenerated = declarations(parse(baseGenerated.get(oldFile), oldFile));
      const custom = moduleFor(baseSource, sourceMaps, oldFile, "custom");
      const mapped = new Set((sourceMaps.get(oldFile) ?? new Map()).values());
      // A generated name the customization renamed away may be reused by a
      // custom-only declaration, such as a compatibility alias.
      const renamed = baseMaps.get(oldFile) ?? new Map();
      const generatedBacked = (name) =>
        mapped.has(name) || (oldGenerated.has(name) && (renamed.get(name) ?? name) === name);
      for (const [name, node] of custom.nodes) {
        if (
          !generatedBacked(name) &&
          !nodes.has(name) &&
          ((oldFile === file && generated.has(oldFile)) ||
            relocatedHelpers.get(`${oldFile}::${name}`)?.file === file)
        ) {
          nodes.set(name, textOf(node, custom.source));
        }
      }
    }
    const body = [...nodes.values()].join("\n\n");
    const candidates = contexts
      .get(file)
      .flatMap((source) => importsOf(source).map((item) => mapImport(item, source.fileName, file)));
    const imports = renderImports(file, body, candidates);
    files.set(file, `${header}${imports}\n\n${body}\n`);
  }
  return { files, diagnostics, matches, moves, relocatedHelpers };
}

export function classicFromOperations(file, incomingText, operations, sourceOperations) {
  const source = parse(incomingText, file);
  const interfaceNode = source.statements.find(ts.isInterfaceDeclaration);
  if (!interfaceNode) throw new Error(`${file}: missing operations interface`);
  const apiFile = classicApiFile(file);
  const resolved = parse(sourceOperations, apiFile);
  const rendered = operations
    .filter((item) => item.incoming.file === apiFile)
    .map((match) => classicMember(file, match, resolved, interfaceNode, source));
  const imports = [
    ...importsOf(source).filter((item) => item.imported === "AIProjectContext"),
    ...resolvedOperationImports(file, resolved),
    ...rendered.map((item) => item.importItem),
  ];
  const body = `/** Operations for ${interfaceNode.name.text}. */\nexport interface ${interfaceNode.name.text} {\n${rendered.map((item) => item.member).join("\n")}\n}\n\nexport function _get${interfaceNode.name.text}(context: AIProjectContext): ${interfaceNode.name.text} {\nreturn {${rendered.map((item) => item.property).join(",\n")}};\n}`;
  return `${header}${renderImports(file, body, imports)}\n\n${body}\n`;
}
