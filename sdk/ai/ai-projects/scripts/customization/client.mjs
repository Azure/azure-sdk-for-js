// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import { canonicalize } from "./ast-merge.mjs";
import { edit, importsOf, nameOf, parse, textOf } from "./modules.mjs";

/** The protected client module that wires the top-level operation groups. */
export const clientFile = "aiProjectClient.ts";

/**
 * The maintained client context for newly emitted top-level operation groups.
 * Plain GA groups use the default-scope context, which honors caller-provided
 * credential scopes. A group that needs another context or extra arguments
 * requires a reviewed customization.
 */
export const operationGroupContext = "_azureScopeClient";

const emittedContext = "_client";

function isThisProperty(node, name) {
  return (
    ts.isPropertyAccessExpression(node) &&
    node.expression.kind === ts.SyntaxKind.ThisKeyword &&
    (name === undefined || node.name.text === name)
  );
}

function clientClass(source, name) {
  const classes = source.statements.filter(ts.isClassDeclaration);
  return (
    classes.find((node) => node.name?.text === name) ??
    (classes.length === 1 ? classes[0] : undefined)
  );
}

function constructorOf(node) {
  return node?.members.find((member) => ts.isConstructorDeclaration(member) && member.body);
}

/** `this.<group> = <factory>(...)` */
function groupAssignment(statement) {
  if (
    !ts.isExpressionStatement(statement) ||
    !ts.isBinaryExpression(statement.expression) ||
    statement.expression.operatorToken.kind !== ts.SyntaxKind.EqualsToken
  )
    return undefined;
  const { left, right } = statement.expression;
  if (!isThisProperty(left) || !ts.isCallExpression(right) || !ts.isIdentifier(right.expression))
    return undefined;
  return { name: left.name.text, factory: right.expression.text, args: right.arguments };
}

function isPlain(assignment) {
  return assignment.args.length === 1 && isThisProperty(assignment.args[0], emittedContext);
}

function operationGroups(source, className) {
  const node = clientClass(source, className);
  const constructor = constructorOf(node);
  if (!node || !constructor) return undefined;
  const bindings = importsOf(source);
  const groups = new Map();
  for (const statement of constructor.body.statements) {
    const assignment = groupAssignment(statement);
    if (!assignment) continue;
    const property = node.members.find(
      (member) => ts.isPropertyDeclaration(member) && nameOf(member.name) === assignment.name,
    );
    const type =
      property?.type &&
      ts.isTypeReferenceNode(property.type) &&
      ts.isIdentifier(property.type.typeName)
        ? property.type.typeName.text
        : undefined;
    const factory = bindings.find((item) => item.local === assignment.factory);
    const typeBinding = bindings.find((item) => item.local === type);
    if (!factory || !typeBinding || factory.module !== typeBinding.module) continue;
    if (!factory.module.startsWith("./classic/")) continue;
    groups.set(assignment.name, {
      ...assignment,
      statement,
      property,
      type,
      // Local names as used in the class, with the classic exports they bind.
      typeImport: typeBinding.imported,
      factoryImport: factory.imported,
      module: factory.module,
    });
  }
  return { node, constructor, groups };
}

function specifier(imported, local) {
  return imported === local ? local : `${imported} as ${local}`;
}

function wiredAssignment(statementText) {
  let statement;
  try {
    statement = parse(statementText).statements[0];
  } catch {
    return undefined;
  }
  const assignment = statement && groupAssignment(statement);
  if (!assignment || !isPlain(assignment)) return undefined;
  return {
    name: assignment.name,
    initializer: `${assignment.factory}(this.${operationGroupContext})`,
  };
}

/**
 * The maintained form of an emitted plain operation-group initializer, or
 * undefined when the statement is not one.
 */
export function wiredOperationGroup(statementText) {
  const wired = wiredAssignment(statementText);
  return wired && `this.${wired.name} = ${wired.initializer};`;
}

/** The maintained initializer expression for an emitted plain operation group. */
export function wiredOperationGroupInitializer(statementText) {
  return wiredAssignment(statementText)?.initializer;
}

/**
 * Wire newly emitted top-level operation groups into the protected client:
 * the emitted property, a constructor initializer bound to the maintained
 * client context, and the classic imports. Nothing else in the maintained
 * client changes; groups that cannot be wired this way are reported.
 */
export function wireOperationGroups({ file = clientFile, baseText, customText, incomingText }) {
  const diagnostics = [];
  const report = (declaration, member, message) =>
    diagnostics.push({ file, declaration, member, message });
  const incomingSource = parse(incomingText, file);
  const className = incomingSource.statements.find(ts.isClassDeclaration)?.name?.text;
  const incoming = operationGroups(incomingSource, className);
  const base = operationGroups(parse(baseText, file), className);
  const customSource = parse(customText, file);
  const customClass = clientClass(customSource, className);
  const customConstructor = constructorOf(customClass);
  if (!incoming || !base || !customClass || !customConstructor)
    return { text: customText, diagnostics };
  const members = new Set(customClass.members.map((member) => nameOf(member.name)).filter(Boolean));
  const assigned = new Map();
  for (const statement of customConstructor.body.statements) {
    const assignment = groupAssignment(statement);
    if (assignment) assigned.set(assignment.name, statement);
  }
  for (const name of base.groups.keys()) {
    if (!incoming.groups.has(name) && (members.has(name) || assigned.has(name)))
      report(
        className,
        name,
        "The emitter removed a top-level operation group that the maintained client still wires; review the client.",
      );
  }
  // An existing group's maintained wiring cannot follow an emitted change to
  // its factory, arguments, context, or type without review.
  const wiring = (group) =>
    JSON.stringify([
      canonicalize(group.statement.getText()),
      group.type,
      group.typeImport,
      group.factoryImport,
      group.module,
    ]);
  for (const [name, previous] of base.groups) {
    const next = incoming.groups.get(name);
    if (next && wiring(previous) !== wiring(next))
      report(
        className,
        name,
        "The emitter changed the wiring of an existing top-level operation group; review the maintained client.",
      );
  }
  const property = (name) =>
    customClass.members.find(
      (member) => ts.isPropertyDeclaration(member) && nameOf(member.name) === name,
    );
  // A maintained member that already matches the reviewed wiring needs no
  // change; any other collision with a newly emitted group needs review.
  const bindings = importsOf(customSource);
  const memberKey = (node, source) => canonicalize(`class GuardType {\n${textOf(node, source)}\n}`);
  const alreadyWired = (group) => {
    const existing = property(group.name);
    const statement = assigned.get(group.name);
    const initializer = wiredOperationGroup(group.statement.getText(incomingSource));
    return (
      existing !== undefined &&
      statement !== undefined &&
      initializer !== undefined &&
      memberKey(existing, customSource) === memberKey(group.property, incomingSource) &&
      canonicalize(statement.getText(customSource)) === canonicalize(initializer) &&
      [
        [group.typeImport, group.type],
        [group.factoryImport, group.factory],
      ].every(([imported, local]) =>
        bindings.some(
          (item) =>
            item.local === local && item.imported === imported && item.module === group.module,
        ),
      )
    );
  };
  const additions = [];
  for (const group of incoming.groups.values()) {
    if (base.groups.has(group.name)) continue;
    if (members.has(group.name) || assigned.has(group.name)) {
      if (!alreadyWired(group))
        report(
          className,
          group.name,
          "A newly emitted operation group collides with a maintained client member; review the client.",
        );
      continue;
    }
    additions.push(group);
  }
  if (!additions.length) return { text: customText, diagnostics };
  if (!members.has(operationGroupContext)) {
    for (const group of additions)
      report(
        className,
        group.name,
        `The maintained client has no '${operationGroupContext}' context for a newly emitted operation group.`,
      );
    return { text: customText, diagnostics };
  }
  const insertions = new Map();
  const insert = (position, text) => {
    if (!insertions.has(position)) insertions.set(position, []);
    insertions.get(position).push(text);
  };
  const order = [...incoming.groups.keys()];
  const anchor = (name, existing) => {
    const index = order.indexOf(name);
    for (let cursor = index - 1; cursor >= 0; cursor--) {
      const found = existing(order[cursor]);
      if (found) return { node: found, after: true };
    }
    for (let cursor = index + 1; cursor < order.length; cursor++) {
      const found = existing(order[cursor]);
      if (found) return { node: found, after: false };
    }
    return undefined;
  };
  const imports = customSource.statements.filter(ts.isImportDeclaration);
  const importAnchor =
    imports.filter((statement) => statement.moduleSpecifier.text.startsWith("./classic/")).at(-1) ??
    imports.at(-1);
  for (const group of additions) {
    if (!isPlain(group)) {
      report(
        className,
        group.name,
        "A newly emitted operation group needs a reviewed client context or arguments.",
      );
      continue;
    }
    const declaration = textOf(group.property, incomingSource);
    const propertyAnchor = anchor(group.name, property);
    if (propertyAnchor?.after) insert(propertyAnchor.node.end, `\n${declaration}`);
    else if (propertyAnchor) insert(propertyAnchor.node.getFullStart(), `\n${declaration}`);
    else insert(customClass.end - 1, `\n${declaration}\n`);
    const initializer = wiredOperationGroup(group.statement.getText(incomingSource));
    const statementAnchor = anchor(group.name, (name) => assigned.get(name));
    if (statementAnchor?.after) insert(statementAnchor.node.end, `\n${initializer}`);
    else if (statementAnchor) insert(statementAnchor.node.getFullStart(), `\n${initializer}`);
    else insert(customConstructor.body.end - 1, `\n${initializer}\n`);
    const binding = `import type { ${specifier(group.typeImport, group.type)} } from ${JSON.stringify(group.module)};\nimport { ${specifier(group.factoryImport, group.factory)} } from ${JSON.stringify(group.module)};`;
    insert(importAnchor ? importAnchor.end : 0, importAnchor ? `\n${binding}` : `${binding}\n`);
  }
  const edits = [...insertions].map(([position, texts]) => ({
    start: position,
    end: position,
    text: texts.join(""),
  }));
  return { text: edit(customText, edits), diagnostics };
}
