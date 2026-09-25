// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import { edit, nameOf, parse } from "./modules.mjs";

export const previewHeader = "foundry-features";

const requestMethods = new Set(["get", "post", "put", "patch", "delete", "head", "options"]);

function unwrap(node) {
  while (
    node &&
    (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isNonNullExpression(node))
  ) {
    node = node.expression;
  }
  return node;
}

function functionOf(source) {
  const node = source.statements.find(ts.isFunctionDeclaration);
  return node?.body ? node : undefined;
}

function requestHeaders(node) {
  const found = [];
  function visit(current) {
    if (
      ts.isCallExpression(current) &&
      ts.isPropertyAccessExpression(current.expression) &&
      requestMethods.has(current.expression.name.text) &&
      current.arguments[0] &&
      ts.isObjectLiteralExpression(current.arguments[0])
    ) {
      for (const property of current.arguments[0].properties) {
        if (
          ts.isPropertyAssignment(property) &&
          nameOf(property.name) === "headers" &&
          ts.isObjectLiteralExpression(property.initializer)
        ) {
          found.push(property.initializer);
        }
      }
    }
    ts.forEachChild(current, visit);
  }
  visit(node);
  return found.length === 1 ? found[0] : undefined;
}

function readsFoundryFeaturesOption(node) {
  node = unwrap(node);
  return (
    node !== undefined &&
    ts.isPropertyAccessExpression(node) &&
    node.name.text === "foundryFeatures" &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === "options"
  );
}

// `...(options?.foundryFeatures !== undefined ? { "foundry-features": options?.foundryFeatures } : {})`
function isOptionalPreviewSpread(property) {
  if (!ts.isSpreadAssignment(property)) return false;
  const conditional = unwrap(property.expression);
  if (!ts.isConditionalExpression(conditional)) return false;
  const condition = unwrap(conditional.condition);
  const whenTrue = unwrap(conditional.whenTrue);
  const whenFalse = unwrap(conditional.whenFalse);
  return (
    ts.isBinaryExpression(condition) &&
    condition.operatorToken.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken &&
    readsFoundryFeaturesOption(condition.left) &&
    ts.isIdentifier(condition.right) &&
    condition.right.text === "undefined" &&
    ts.isObjectLiteralExpression(whenTrue) &&
    whenTrue.properties.length === 1 &&
    ts.isPropertyAssignment(whenTrue.properties[0]) &&
    nameOf(whenTrue.properties[0].name) === previewHeader &&
    readsFoundryFeaturesOption(whenTrue.properties[0].initializer) &&
    ts.isObjectLiteralExpression(whenFalse) &&
    whenFalse.properties.length === 0
  );
}

function localConstant(body, name) {
  const statements = body.statements.filter(
    (statement) =>
      ts.isVariableStatement(statement) &&
      statement.declarationList.declarations.some((item) => nameOf(item.name) === name),
  );
  if (statements.length !== 1) return undefined;
  const statement = statements[0];
  const declaration = statement.declarationList.declarations[0];
  const initializer = unwrap(declaration.initializer);
  if (
    !(statement.declarationList.flags & ts.NodeFlags.Const) ||
    statement.declarationList.declarations.length !== 1 ||
    !initializer ||
    !ts.isStringLiteral(initializer)
  ) {
    return undefined;
  }
  return { literal: initializer.text, index: body.statements.indexOf(statement) };
}

function constantPreviewHeader(node) {
  const properties =
    requestHeaders(node)?.properties.filter((item) => nameOf(item.name) === previewHeader) ?? [];
  if (properties.length !== 1 || !ts.isPropertyAssignment(properties[0])) return undefined;
  const value = unwrap(properties[0].initializer);
  if (ts.isStringLiteral(value)) return { literal: value.text };
  if (!ts.isIdentifier(value)) return undefined;
  const local = localConstant(node.body, value.text);
  return local && { literal: local.literal, local: value.text, index: local.index };
}

/** The preview opt-in literal an emitted options bag declares, if any. */
export function previewLiteral(optionsNode) {
  if (!optionsNode || !ts.isInterfaceDeclaration(optionsNode)) return undefined;
  const member = optionsNode.members.find(
    (item) => ts.isPropertySignature(item) && nameOf(item.name) === "foundryFeatures",
  );
  const type = member?.type;
  return type && ts.isLiteralTypeNode(type) && ts.isStringLiteral(type.literal)
    ? type.literal.text
    : undefined;
}

/**
 * The package sends each preview opt-in as a constant header instead of the
 * emitter's optional `foundryFeatures` spread. Rewrite an emitted optional
 * preview header into the maintained constant form of the customized send so
 * that only genuine emitter changes, such as a retired opt-in or a new preview
 * literal, remain visible to the three-way merge.
 */
export function applyPreviewHeaderPolicy(text, customText, literal) {
  if (!text || !customText) return text;
  const custom = functionOf(parse(customText));
  const policy = custom && constantPreviewHeader(custom);
  if (!policy) return text;
  const source = parse(text);
  const node = functionOf(source);
  const spreads = (node && requestHeaders(node)?.properties.filter(isOptionalPreviewSpread)) ?? [];
  if (spreads.length !== 1) return text;
  const value = JSON.stringify(literal ?? policy.literal);
  const edits = [
    {
      start: spreads[0].getStart(source),
      end: spreads[0].end,
      text: `${JSON.stringify(previewHeader)}: ${policy.local ?? value}`,
    },
  ];
  if (policy.local) {
    const declared = node.body.statements.some(
      (statement) =>
        ts.isVariableStatement(statement) &&
        statement.declarationList.declarations.some((item) => nameOf(item.name) === policy.local),
    );
    if (declared) return text;
    // Keep the constant at the customized statement position so that it does
    // not read as a concurrent reordering.
    const anchor = node.body.statements[policy.index];
    const start = anchor ? anchor.getStart(source) : node.body.end - 1;
    edits.push({ start, end: start, text: `const ${policy.local} = ${value};\n` });
  }
  return edit(text, edits);
}

/** Whether a declaration sends or forwards the preview opt-in header. */
export function sendsPreviewHeader(text) {
  if (!text) return false;
  let found = false;
  function visit(node) {
    if (ts.isPropertyAssignment(node) && nameOf(node.name) === previewHeader) found = true;
    else ts.forEachChild(node, visit);
  }
  visit(parse(text));
  return found;
}

/**
 * When the emitter stops declaring an operation's preview opt-in, the
 * maintained constant header on its poll and continuation requests is stale
 * too. Drop it along with a local opt-in constant that no longer has readers.
 * Poll headers exist to carry that opt-in, so a `pollHeaders` object left with
 * only forwarded request headers returns to the emitted poller shape.
 */
export function retirePreviewHeaders(text) {
  let source = parse(text);
  const edits = [];
  const render = (properties) => `{ ${properties.map((item) => item.getText(source)).join(", ")} }`;
  const retained = (objectLiteral) =>
    objectLiteral.properties.filter((item) => nameOf(item.name) !== previewHeader);
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const obsolete = node.properties.filter(
        (item) =>
          ts.isPropertyAssignment(item) &&
          nameOf(item.name) === "pollHeaders" &&
          ts.isObjectLiteralExpression(item.initializer) &&
          item.initializer.properties.some((header) => nameOf(header.name) === previewHeader) &&
          retained(item.initializer).every(ts.isSpreadAssignment),
      );
      if (obsolete.length) {
        edits.push({
          start: node.getStart(source),
          end: node.end,
          text: render(node.properties.filter((item) => !obsolete.includes(item))),
        });
        return;
      }
    }
    if (ts.isPropertyAssignment(node) && ts.isObjectLiteralExpression(node.initializer)) {
      const name = nameOf(node.name);
      const headers =
        name === "pollHeaders"
          ? [node.initializer]
          : name === "nextPageRequestOptions"
            ? node.initializer.properties
                .filter(
                  (item) =>
                    ts.isPropertyAssignment(item) &&
                    nameOf(item.name) === "headers" &&
                    ts.isObjectLiteralExpression(item.initializer),
                )
                .map((item) => item.initializer)
            : [];
      for (const objectLiteral of headers) {
        const kept = retained(objectLiteral);
        if (kept.length !== objectLiteral.properties.length)
          edits.push({
            start: objectLiteral.getStart(source),
            end: objectLiteral.end,
            text: render(kept),
          });
      }
      if (headers.length) return;
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  if (!edits.length) return text;
  text = edit(text, edits);
  source = parse(text);
  const node = functionOf(source);
  if (!node) return text;
  const unused = [];
  for (const statement of node.body.statements) {
    if (!ts.isVariableStatement(statement) || statement.declarationList.declarations.length !== 1)
      continue;
    const name = nameOf(statement.declarationList.declarations[0].name);
    if (name !== "foundryFeatures" || !localConstant(node.body, name)) continue;
    let reads = 0;
    function count(current) {
      if (ts.isIdentifier(current) && current.text === name && current.parent?.name !== current)
        reads++;
      else if (ts.isShorthandPropertyAssignment(current) && current.name.text === name) reads++;
      ts.forEachChild(current, count);
    }
    count(node.body);
    if (!reads) unused.push({ start: statement.getStart(source), end: statement.end, text: "" });
  }
  return edit(text, unused);
}
