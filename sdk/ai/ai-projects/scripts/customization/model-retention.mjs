// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import { edit, nameOf, parse } from "./modules.mjs";

function alternatives(type) {
  return ts.isUnionTypeNode(type) ? [...type.types] : [type];
}

function referencesType(node, name) {
  if (!node) return false;
  if (ts.isTypeReferenceNode(node) && nameOf(node.typeName) === name) return true;
  return Boolean(ts.forEachChild(node, (child) => referencesType(child, name) || undefined));
}

function switchProperty(node) {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (
    ts.isElementAccessExpression(node) &&
    node.argumentExpression &&
    ts.isStringLiteral(node.argumentExpression)
  )
    return node.argumentExpression.text;
  return undefined;
}

function terminal(clause) {
  let last = clause.statements.at(-1);
  while (last && ts.isBlock(last)) last = last.statements.at(-1);
  return (
    last &&
    (ts.isReturnStatement(last) ||
      ts.isThrowStatement(last) ||
      (ts.isBreakStatement(last) && !last.label))
  );
}

/**
 * Model retention also owns the old model's polymorphic registrations.
 * Remove only those registrations from the virtual generated ancestor, so
 * the normal three-way merger treats their customized versions as additions.
 * No committed or emitted input files are changed.
 */
export function retainedModelBases(before, custom, incoming, diagnostics) {
  const retained = new Map();
  for (const [name, entry] of custom) {
    if (!before.has(name) || incoming.has(name) || !ts.isInterfaceDeclaration(entry.node)) continue;
    const tags = entry.node.members
      .filter(
        (member) =>
          ts.isPropertySignature(member) &&
          member.type &&
          ts.isLiteralTypeNode(member.type) &&
          ts.isStringLiteral(member.type.literal) &&
          nameOf(member.name),
      )
      .map((member) => ({ property: nameOf(member.name), value: member.type.literal.text }));
    if (tags.length) retained.set(name, { entry, tags });
  }
  const typeMembers = new Map();
  const literalMembers = new Map();
  const dispatch = new Map();
  const add = (map, name, value) => {
    if (!map.has(name)) map.set(name, new Set());
    map.get(name).add(value);
  };
  for (const [name, entry] of custom) {
    if (!ts.isTypeAliasDeclaration(entry.node) || !before.has(name) || !incoming.has(name))
      continue;
    for (const type of alternatives(entry.node.type)) {
      const model = ts.isTypeReferenceNode(type) && retained.get(nameOf(type.typeName));
      if (!model) continue;
      add(typeMembers, name, nameOf(type.typeName));
      if (!dispatch.has(name)) dispatch.set(name, []);
      dispatch.get(name).push(...model.tags);
    }
  }
  function parentMember(name, property, visited = new Set()) {
    if (visited.has(name)) return undefined;
    visited.add(name);
    const parent = custom.get(name)?.node;
    if (!parent || !ts.isInterfaceDeclaration(parent)) return undefined;
    const member = parent.members.find((item) => nameOf(item.name) === property);
    if (member) return member;
    for (const clause of parent.heritageClauses ?? []) {
      for (const type of clause.types) {
        const inherited = parentMember(nameOf(type.expression), property, visited);
        if (inherited) return inherited;
      }
    }
    return undefined;
  }
  for (const { entry, tags } of retained.values()) {
    for (const clause of entry.node.heritageClauses ?? []) {
      for (const parent of clause.types) {
        for (const tag of tags) {
          const member = parentMember(nameOf(parent.expression), tag.property);
          if (!member?.type || !ts.isTypeReferenceNode(member.type)) continue;
          const alias = nameOf(member.type.typeName);
          const declaration = custom.get(alias)?.node;
          if (
            declaration &&
            ts.isTypeAliasDeclaration(declaration) &&
            alternatives(declaration.type).some(
              (type) =>
                ts.isLiteralTypeNode(type) &&
                ts.isStringLiteral(type.literal) &&
                type.literal.text === tag.value,
            )
          ) {
            add(literalMembers, alias, tag.value);
          }
        }
      }
    }
  }
  const overrides = new Map();
  for (const name of new Set([...typeMembers.keys(), ...literalMembers.keys()])) {
    const entry = before.get(name);
    if (!entry || !incoming.has(name)) continue;
    const source = parse(entry.text);
    const node = source.statements[0];
    if (!ts.isTypeAliasDeclaration(node)) continue;
    const types = alternatives(node.type);
    const kept = types.filter((type) => {
      if (ts.isTypeReferenceNode(type) && typeMembers.get(name)?.has(nameOf(type.typeName)))
        return false;
      return !(
        ts.isLiteralTypeNode(type) &&
        ts.isStringLiteral(type.literal) &&
        literalMembers.get(name)?.has(type.literal.text)
      );
    });
    if (kept.length === types.length) continue;
    if (!kept.length) {
      diagnostics.push({
        file: "models/models.ts",
        declaration: name,
        message:
          "Retained legacy discriminator replaces the entire generated union; an explicit compatibility policy is required.",
      });
      continue;
    }
    overrides.set(
      name,
      edit(entry.text, [
        {
          start: node.type.getStart(source),
          end: node.type.end,
          text: kept.map((type) => type.getText(source)).join(" | "),
        },
      ]),
    );
  }
  for (const [name, entry] of before) {
    if (!custom.has(name) || !incoming.has(name) || !ts.isFunctionDeclaration(entry.node)) continue;
    const tags = [...dispatch]
      .filter(
        ([union]) =>
          referencesType(entry.node.type, union) ||
          entry.node.parameters.some((parameter) => referencesType(parameter.type, union)),
      )
      .flatMap(([, values]) => values);
    if (!tags.length) continue;
    const source = parse(entry.text);
    const customized = custom.get(name).node;
    const customCases = new Map();
    function collect(node) {
      if (ts.isSwitchStatement(node)) {
        for (const clause of node.caseBlock.clauses) {
          if (ts.isCaseClause(clause) && ts.isStringLiteral(clause.expression)) {
            customCases.set(
              JSON.stringify([switchProperty(node.expression), clause.expression.text]),
              terminal(clause),
            );
          }
        }
      }
      ts.forEachChild(node, collect);
    }
    collect(customized);
    const changes = [];
    function visit(node) {
      if (ts.isSwitchStatement(node)) {
        const property = switchProperty(node.expression);
        for (const clause of node.caseBlock.clauses) {
          if (!ts.isCaseClause(clause) || !ts.isStringLiteral(clause.expression)) continue;
          if (
            !tags.some(
              (tag) => tag.property === property && tag.value === clause.expression.text,
            ) ||
            !customCases.has(JSON.stringify([property, clause.expression.text]))
          )
            continue;
          if (
            !terminal(clause) ||
            !customCases.get(JSON.stringify([property, clause.expression.text]))
          ) {
            diagnostics.push({
              file: "models/models.ts",
              declaration: name,
              member: clause.expression.text,
              message:
                "A retained legacy dispatch case has fallthrough and requires explicit reconciliation.",
            });
          } else {
            changes.push({ start: clause.getFullStart(), end: clause.end, text: "" });
          }
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
    if (changes.length) overrides.set(name, edit(entry.text, changes));
  }
  return overrides;
}
