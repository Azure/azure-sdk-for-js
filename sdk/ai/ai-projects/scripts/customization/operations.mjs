// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import ts from "typescript";
import { canonicalize, mergeDeclaration } from "./ast-merge.mjs";
import { customizeNewOperation, modelMemberIndex } from "./new-operations.mjs";
import {
  declarations,
  edit,
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

function operationIdentity(node) {
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
  const template = paths[0].arguments[0].text
    .replace(/\{\?[^}]*\}/g, "")
    .replace(/\{[^}]*\}/g, "{}");
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
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken &&
      ts.isPropertyAccessExpression(node.left) &&
      node.left.name.text === "apiVersion" &&
      ts.isIdentifier(node.left.expression) &&
      node.left.expression.text === "context" &&
      ts.isStringLiteral(node.right)
    ) {
      changes.push({
        start: node.getStart(source),
        end: node.end,
        text: node.left.getText(source),
      });
      return;
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
      const identity = operationIdentity(node);
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
    (item) =>
      item.file === preferredFile && item.name === operation.name && item.identity === operation.identity,
  if (exact.length === 1) return exact[0];
  const local = candidates.filter(
    (item) => item.file === preferredFile && item.identity === operation.identity,
  );
  if (local.length === 1) return local[0];
  const matches = candidates.filter((item) => item.identity === operation.identity);
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
      const snippets = modules.map((module) =>
        module ? textOf(module.nodes.get(outputName), module.source) : null,
      );
      if (member === "publicNode" && snippets[1]) {
        snippets[0] = normalizePoller(snippets[0], snippets[1]);
        snippets[2] = normalizePoller(snippets[2], snippets[1]);
      }
      const merged = mergeDeclaration(...snippets, { file: outputFile, declaration: outputName });
      diagnostics.push(...merged.diagnostics);
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
      for (const [name, node] of custom.nodes) {
        if (!oldGenerated.has(name) && !mapped.has(name) && !nodes.has(name)) {
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
  return { files, diagnostics, matches, moves };
}

export function classicFromOperations(file, incomingText, operations, sourceOperations) {
  const source = parse(incomingText, file);
  const interfaceNode = source.statements.find(ts.isInterfaceDeclaration);
  if (!interfaceNode) throw new Error(`${file}: missing operations interface`);
  const apiFile = file.replace(/^classic\//, "api/").replace(/index\.ts$/, "operations.ts");
  const matches = operations.filter((item) => item.incoming.file === apiFile);
  const resolved = parse(sourceOperations, apiFile);
  const functions = declarations(resolved);
  const members = [];
  const properties = [];
  const imports = importsOf(source).filter((item) => item.imported === "AIProjectContext");
  imports.push(
    ...importsOf(resolved).map((item) => ({
      ...item,
      module: item.module.startsWith(".")
        ? relativeImport(file, resolveImport(apiFile, item.module))
        : item.module,
    })),
  );
  for (const match of matches) {
    const node = functions.get(match.names.publicNode);
    const parameters = node.parameters.slice(1).map((parameter) => {
      const type = parameter.type?.getText(resolved);
      if (!type || !ts.isIdentifier(parameter.name))
        throw new Error(`${file}: unsupported operation parameter`);
      return `${parameter.name.text}${parameter.questionToken || parameter.initializer ? "?" : ""}: ${type}`;
    });
    const args = node.parameters.slice(1).map((parameter) => parameter.name.text);
    const incomingMember = interfaceNode.members.find(
      (member) =>
        nameOf(member.name) ===
        (match.incoming.name === "$delete" ? "delete" : match.incoming.name),
    );
    if (!incomingMember)
      throw new Error(`${file}: missing interface member for ${match.incoming.name}`);
    const name = match.names.publicNode === "$delete" ? "delete" : match.names.publicNode;
    const comment = source.text
      .slice(incomingMember.getFullStart(), incomingMember.getStart(source))
      .trim();
    members.push(
      `${comment}\n${name}: (${parameters.join(", ")}) => ${node.type.getText(resolved)};`,
    );
    properties.push(
      `${name}: (${parameters.join(", ")}) => ${match.names.publicNode}(context${args.length ? ", " : ""}${args.join(", ")})`,
    );
    imports.push({
      module: relativeImport(file, apiFile.replace(/\.ts$/, ".js")),
      imported: match.names.publicNode,
      local: match.names.publicNode,
    });
  }
  const body = `/** Operations for ${interfaceNode.name.text}. */\nexport interface ${interfaceNode.name.text} {\n${members.join("\n")}\n}\n\nexport function _get${interfaceNode.name.text}(context: AIProjectContext): ${interfaceNode.name.text} {\nreturn {${properties.join(",\n")}};\n}`;
  return `${header}${renderImports(file, body, imports)}\n\n${body}\n`;
}
