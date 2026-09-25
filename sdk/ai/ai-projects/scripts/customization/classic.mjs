// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import { canonicalize, mergeDeclaration } from "./ast-merge.mjs";
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

export function classicApiFile(file) {
  return file.replace(/^classic\//, "api/").replace(/index\.ts$/, "operations.ts");
}

export function classicFile(apiFile) {
  return apiFile.replace(/^api\//, "classic/").replace(/operations\.ts$/, "index.ts");
}

export function classicMemberName(operationName) {
  return operationName === "$delete" ? "delete" : operationName;
}

/**
 * Explain why a customized classic module is not a plain delegating factory
 * that can be regenerated wholesale from its resolved operations.
 *
 * @returns {string | undefined}
 */
export function simpleFactoryProblem(custom, base, file) {
  const source = parse(custom, file);
  const previous = parse(base, file);
  const originalInterface = previous.statements.find(ts.isInterfaceDeclaration);
  const customizedInterface = source.statements.find(ts.isInterfaceDeclaration);
  if (!originalInterface || !customizedInterface)
    return `${file}: unrecognized operations interface`;
  const originalNames = new Set(
    originalInterface.members.map((member) => member.name?.getText(previous)),
  );
  if (
    customizedInterface.members.some((member) => !originalNames.has(member.name?.getText(source)))
  ) {
    return `${file}: customized classic module declares custom-only members`;
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
      return `${file}::${declaration.name.text}: nontrivial customized factory cannot be regenerated`;
    }
    const statement = declaration.body.statements[0];
    if (
      !ts.isReturnStatement(statement) ||
      !statement.expression ||
      !ts.isObjectLiteralExpression(statement.expression)
    ) {
      return `${file}::${declaration.name.text}: customized factory does not return a plain operations object`;
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
      return `${file}::${declaration.name.text}: customized factory behavior requires explicit preservation`;
    }
  }
  return undefined;
}

/** Imports of a resolved operations module, relative to its classic module. */
export function resolvedOperationImports(file, resolved) {
  const apiFile = classicApiFile(file);
  return importsOf(resolved).map((item) => ({
    ...item,
    module: item.module.startsWith(".")
      ? relativeImport(file, resolveImport(apiFile, item.module))
      : item.module,
  }));
}

/**
 * Render the classic interface member and delegating factory property for a
 * resolved operation. Signatures follow the resolved API contract; the
 * documentation follows the emitted classic member.
 */
export function classicMember(
  file,
  match,
  resolved,
  interfaceNode,
  source,
  contextName = "context",
) {
  const apiFile = classicApiFile(file);
  const node = declarations(resolved).get(match.names.publicNode);
  if (!node || !ts.isFunctionDeclaration(node) || !node.type)
    throw new Error(`${file}: missing resolved operation ${match.names.publicNode}`);
  const parameters = node.parameters.slice(1).map((parameter) => {
    const type = parameter.type?.getText(resolved);
    if (!type || !ts.isIdentifier(parameter.name))
      throw new Error(`${file}: unsupported operation parameter`);
    return `${parameter.name.text}${parameter.questionToken || parameter.initializer ? "?" : ""}: ${type}`;
  });
  const args = node.parameters.slice(1).map((parameter) => parameter.name.text);
  const incomingMember = interfaceNode.members.find(
    (member) => nameOf(member.name) === classicMemberName(match.incoming.name),
  );
  if (!incomingMember)
    throw new Error(`${file}: missing interface member for ${match.incoming.name}`);
  const name = classicMemberName(match.names.publicNode);
  const comment = source.text
    .slice(incomingMember.getFullStart(), incomingMember.getStart(source))
    .trim();
  return {
    name,
    member: `${comment}\n${name}: (${parameters.join(", ")}) => ${node.type.getText(resolved)};`,
    property: `${name}: (${parameters.join(", ")}) => ${match.names.publicNode}(${[contextName, ...args].join(", ")})`,
    importItem: {
      module: relativeImport(file, apiFile.replace(/\.ts$/, ".js")),
      imported: match.names.publicNode,
      local: match.names.publicNode,
    },
  };
}

function operationFactory(source) {
  const candidates = [];
  for (const statement of source.statements) {
    if (!ts.isFunctionDeclaration(statement) || !statement.body) continue;
    const last = statement.body.statements.at(-1);
    const value = last && ts.isReturnStatement(last) ? last.expression : undefined;
    if (!value || !ts.isObjectLiteralExpression(value)) continue;
    if (value.properties.some((property) => !ts.isSpreadAssignment(property)))
      candidates.push({ node: statement, object: value });
  }
  return candidates.length === 1 ? candidates[0] : undefined;
}

function shapeOf(source, interfaceName) {
  const interfaces = source.statements.filter(ts.isInterfaceDeclaration);
  const interfaceNode =
    interfaces.find((node) => node.name.text === interfaceName) ??
    (interfaces.length === 1 ? interfaces[0] : undefined);
  const factory = operationFactory(source);
  if (!interfaceNode || !factory) return undefined;
  const members = [];
  for (const member of interfaceNode.members) {
    members.push({ name: nameOf(member.name), nodes: [member] });
  }
  const properties = [];
  for (const property of factory.object.properties) {
    const name = nameOf(property.name);
    if (name !== undefined && properties.some((item) => item.name === name)) return undefined;
    properties.push({ name, nodes: [property] });
  }
  return { source, interfaceNode, factory, members, properties };
}

function group(slots, name) {
  const nodes = slots.filter((slot) => slot.name === name).flatMap((slot) => slot.nodes);
  return nodes.length ? nodes : undefined;
}

function contextParameter(factory) {
  const parameter = factory.node.parameters[0];
  return parameter && ts.isIdentifier(parameter.name) ? parameter.name.text : "context";
}

function isSimpleMember(members, properties, contextName) {
  if (members?.length !== 1 || properties?.length !== 1) return false;
  const [member] = members;
  const [property] = properties;
  if (!ts.isPropertySignature(member) || !member.type || !ts.isFunctionTypeNode(member.type))
    return false;
  if (!ts.isPropertyAssignment(property) || !ts.isArrowFunction(property.initializer)) return false;
  const arrow = property.initializer;
  if (!ts.isCallExpression(arrow.body) || !ts.isIdentifier(arrow.body.expression)) return false;
  const names = (nodes) => nodes.map((node) => (ts.isIdentifier(node) ? node.text : null));
  const same = (left, right) =>
    left.length === right.length &&
    left.every((item, index) => item !== null && item === right[index]);
  const parameters = names(arrow.parameters.map((parameter) => parameter.name));
  return (
    same(names(arrow.body.arguments), [contextName, ...parameters]) &&
    same(names(member.type.parameters.map((parameter) => parameter.name)), parameters)
  );
}

function typeKey(node) {
  return node ? canonicalize(`type GuardType = ${node.getText(node.getSourceFile())};`) : null;
}

function parameterKeys(parameters) {
  return parameters.map((parameter) =>
    JSON.stringify([
      ts.isIdentifier(parameter.name) ? parameter.name.text : null,
      Boolean(parameter.questionToken || parameter.initializer),
      typeKey(parameter.type),
    ]),
  );
}

/**
 * Whether a classic member is exactly the delegation that would be rendered
 * from its operation's customized signature. Only such members, or members
 * unchanged from the emitted baseline, can follow the resolved contract
 * without losing a classic-level customization.
 */
function mirrorsOperation(members, properties, contextName, api) {
  if (!api || !isSimpleMember(members, properties, contextName)) return false;
  const [member] = members;
  const arrow = properties[0].initializer;
  const node = api.get(arrow.body.expression.text);
  if (!node || !ts.isFunctionDeclaration(node) || !node.type) return false;
  const expected = parameterKeys(node.parameters.slice(1));
  const matches = (parameters) =>
    parameterKeys(parameters).join("\n") === expected.join("\n") &&
    !expected.some((key) => JSON.parse(key).includes(null));
  return (
    matches(member.type.parameters) &&
    matches(arrow.parameters) &&
    typeKey(member.type.type) === typeKey(node.type)
  );
}

function operationDeclarations(text, file) {
  if (text === undefined) return undefined;
  try {
    return declarations(parse(text, file));
  } catch {
    return undefined;
  }
}

function wrap(kind, text) {
  return kind === "member"
    ? `interface GuardType {\n${text}\n}`
    : `const guardValue = {\n${text}\n};`;
}

function sameNodes(kind, left, right) {
  if (!left || !right) return !left === !right;
  const text = (nodes) => nodes.map((node) => textOf(node, node.getSourceFile())).join("\n");
  return canonicalize(wrap(kind, text(left))) === canonicalize(wrap(kind, text(right)));
}

function mergeNodes(kind, file, name, base, custom, incoming) {
  const text = (nodes) =>
    nodes ? nodes.map((node) => textOf(node, node.getSourceFile())).join("\n") : null;
  const merged = mergeDeclaration(
    base && wrap(kind, text(base)),
    custom && wrap(kind, text(custom)),
    incoming && wrap(kind, text(incoming)),
    { file, declaration: name },
  );
  if (!merged.text) return merged;
  const source = parse(merged.text, file);
  const statement = source.statements[0];
  const list =
    kind === "member"
      ? statement.members
      : statement.declarationList.declarations[0].initializer.properties;
  return {
    text: list.map((node) => textOf(node, source)).join(kind === "member" ? "\n" : ",\n"),
    diagnostics: [],
  };
}

function place(slots, name, text, anchors) {
  const existing = slots.findIndex((slot) => slot.name === name);
  if (existing >= 0) {
    slots[existing] = { name, text };
    for (let index = slots.length - 1; index > existing; index--) {
      if (slots[index].name === name) slots.splice(index, 1);
    }
    return;
  }
  for (const anchor of anchors) {
    const index = slots.findLastIndex((slot) => slot.name === anchor);
    if (index >= 0) {
      slots.splice(index + 1, 0, { name, text });
      return;
    }
  }
  slots.unshift({ name, text });
}

/**
 * An operation relocated out of a customized classic module is rendered from
 * its resolved API contract in the destination module. That is lossless only
 * when the source member is unchanged from the emitted baseline or mirrors its
 * operation's signature, so report any other member instead of silently
 * dropping its classic-level customization.
 */
export function relocatedMemberDiagnostics(oldFile, customText, baseText, matches, customApiText) {
  const baseSource = parse(baseText, oldFile);
  const interfaceName = baseSource.statements.find(ts.isInterfaceDeclaration)?.name.text;
  const base = shapeOf(baseSource, interfaceName);
  const custom = shapeOf(parse(customText, oldFile), interfaceName);
  if (!custom) {
    return [
      {
        file: oldFile,
        declaration: "<file>",
        message:
          "Unrecognized operations interface or factory; relocated classic operations require review.",
      },
    ];
  }
  const contextName = contextParameter(custom.factory);
  const api = operationDeclarations(customApiText, classicApiFile(oldFile));
  const diagnostics = [];
  for (const match of matches) {
    const name = classicMemberName(match.base.name);
    const members = group(custom.members, name);
    const properties = group(custom.properties, name);
    if (!members && !properties) continue;
    const unchanged =
      base &&
      sameNodes("member", group(base.members, name), members) &&
      sameNodes("property", group(base.properties, name), properties);
    if (!unchanged && !mirrorsOperation(members, properties, contextName, api)) {
      diagnostics.push({
        file: oldFile,
        declaration: name,
        message: `Customized classic member cannot be relocated to ${classicFile(match.incoming.file)} without review.`,
      });
    }
  }
  return diagnostics;
}

/**
 * Apply the emitter's classic delta to a customized classic module that is not
 * a plain delegating factory. Members the customization owns are retained;
 * emitted additions are rendered from the resolved operations; removals and
 * changes of customized members are merged by identity or reported.
 */
export function mergeCustomizedClassic({
  file,
  baseText,
  customText,
  incomingText,
  matches,
  resolvedText,
  resolvedOptionsText,
  customApiText,
  baseRenames = new Map(),
  incomingRenames = new Map(),
  mapImport = (item) => item,
}) {
  const diagnostics = [];
  const report = (declaration, message) => diagnostics.push({ file, declaration, message });
  const apiFile = classicApiFile(file);
  const incomingSource = parse(incomingText, file);
  const incomingInterface = incomingSource.statements.find(ts.isInterfaceDeclaration);
  const interfaceName = incomingInterface?.name.text;
  const base = shapeOf(parse(renameSymbols(baseText, baseRenames, file), file), interfaceName);
  const custom = shapeOf(parse(customText, file), interfaceName);
  const incoming = shapeOf(
    parse(renameSymbols(incomingText, incomingRenames, file), file),
    interfaceName,
  );
  if (!base || !custom || !incoming) {
    report(
      "<file>",
      "Unrecognized operations interface or factory; the customized classic module requires review.",
    );
    return { text: undefined, diagnostics };
  }
  const resolved = parse(resolvedText, apiFile);
  const customApi = operationDeclarations(customApiText, apiFile);
  const contextName = contextParameter(custom.factory);
  const operationMatches = new Map(
    matches
      .filter((match) => match.incoming.file === apiFile)
      .map((match) => [classicMemberName(match.incoming.name), match]),
  );
  const slots = {
    member: custom.members.map((slot) => ({
      name: slot.name,
      text: slot.nodes.map((node) => textOf(node, custom.source)).join("\n"),
    })),
    property: custom.properties.map((slot) => ({
      name: slot.name,
      text: slot.nodes.map((node) => textOf(node, custom.source)).join("\n"),
    })),
  };
  const lists = { member: "members", property: "properties" };
  const imports = [];
  const order = (kind) => incoming[lists[kind]].map((slot) => slot.name).filter(Boolean);
  const names = new Set(
    [base, incoming].flatMap((shape) =>
      [...shape.members, ...shape.properties].map((slot) => slot.name).filter(Boolean),
    ),
  );
  for (const name of names) {
    const entry = (shape) => ({
      member: group(shape.members, name),
      property: group(shape.properties, name),
    });
    const before = entry(base);
    const current = entry(custom);
    const after = entry(incoming);
    if (
      sameNodes("member", before.member, after.member) &&
      sameNodes("property", before.property, after.property)
    )
      continue;
    const emitted = Boolean(before.member || before.property);
    const retained = Boolean(after.member || after.property);
    const owned = Boolean(current.member || current.property);
    const uncustomized =
      owned &&
      ((sameNodes("member", before.member, current.member) &&
        sameNodes("property", before.property, current.property)) ||
        mirrorsOperation(current.member, current.property, contextName, customApi));
    if (!retained) {
      if (!owned) continue;
      if (!uncustomized) {
        report(
          name,
          "The emitter removed or relocated a classic operation whose customized member requires review.",
        );
        continue;
      }
      slots.member = slots.member.filter((slot) => slot.name !== name);
      slots.property = slots.property.filter((slot) => slot.name !== name);
      continue;
    }
    if (emitted && !owned) {
      report(
        name,
        "The emitter changed a classic operation that the customization removed or replaced.",
      );
      continue;
    }
    if (!emitted && owned) {
      report(name, "An emitted classic member collides with a customized member.");
      continue;
    }
    if (uncustomized || !owned) {
      const match = operationMatches.get(name);
      const rendered = match
        ? classicMember(file, match, resolved, incomingInterface, incomingSource, contextName)
        : {
            name,
            member: after.member?.map((node) => textOf(node, incoming.source)).join("\n"),
            property: after.property?.map((node) => textOf(node, incoming.source)).join("\n"),
          };
      if (
        rendered.name !== name &&
        (group(custom.members, rendered.name) || group(custom.properties, rendered.name))
      ) {
        report(rendered.name, "An emitted classic member collides with a customized member.");
        continue;
      }
      for (const kind of ["member", "property"]) {
        slots[kind] = slots[kind].filter((slot) => slot.name !== name || rendered.name === name);
        if (!rendered[kind]) continue;
        const incomingOrder = order(kind);
        const anchors = incomingOrder.slice(0, incomingOrder.indexOf(name)).reverse();
        place(slots[kind], rendered.name, rendered[kind], anchors);
      }
      if (rendered.importItem) imports.push(rendered.importItem);
      continue;
    }
    for (const kind of ["member", "property"]) {
      if (sameNodes(kind, before[kind], after[kind])) continue;
      const merged = mergeNodes(kind, file, name, before[kind], current[kind], after[kind]);
      diagnostics.push(...merged.diagnostics);
      if (merged.text) place(slots[kind], name, merged.text, []);
      else if (!merged.diagnostics.length)
        slots[kind] = slots[kind].filter((slot) => slot.name !== name);
    }
  }
  if (diagnostics.length) return { text: undefined, diagnostics };
  const source = custom.source;
  const edits = source.statements
    .filter(ts.isImportDeclaration)
    .map((statement) => ({ start: statement.getFullStart(), end: statement.end, text: "" }));
  edits.push({
    start: custom.interfaceNode.members.pos,
    end: custom.interfaceNode.end - 1,
    text: `\n${slots.member.map((slot) => slot.text).join("\n")}\n`,
  });
  edits.push({
    start: custom.factory.object.properties.pos,
    end: custom.factory.object.end - 1,
    text: slots.property.length
      ? `\n${slots.property.map((slot) => slot.text).join(",\n")},\n`
      : "\n",
  });
  const body = edit(source.text, edits)
    .trim()
    .replace(
      /^\/\/ Copyright \(c\) Microsoft Corporation\.\r?\n\/\/ Licensed under the MIT License\.\s*/,
      "",
    );
  const candidates = [];
  const seen = new Set();
  for (const item of [
    ...importsOf(source),
    ...imports,
    ...resolvedOperationImports(file, resolved),
    ...importsOf(incomingSource),
  ].map(mapImport)) {
    const key = JSON.stringify([item.module, item.imported, item.local, item.sideEffect]);
    if (seen.has(key)) continue;
    seen.add(key);
    candidates.push(item);
  }
  const text = `${header}${renderImports(file, body, candidates)}\n\n${body}\n`;
  const available = {
    [relativeImport(file, apiFile.replace(/\.ts$/, ".js"))]: declarations(resolved),
    [relativeImport(file, apiFile.replace(/operations\.ts$/, "options.js"))]:
      resolvedOptionsText && declarations(parse(resolvedOptionsText, apiFile)),
  };
  for (const item of importsOf(parse(text, file))) {
    const declared = available[item.module];
    if (declared && !declared.has(item.imported))
      report(
        item.local,
        `Customized classic module imports '${item.imported}', which the resolved '${item.module}' module no longer declares.`,
      );
  }
  return diagnostics.length ? { text: undefined, diagnostics } : { text, diagnostics };
}
