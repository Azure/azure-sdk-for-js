// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import { edit, nameOf, parse } from "./modules.mjs";

export function modelMemberIndex(tree) {
  const result = new Map();
  for (const [file, text] of tree) {
    if (!file.startsWith("models/")) continue;
    for (const node of parse(text, file).statements.filter(ts.isInterfaceDeclaration)) {
      result.set(
        node.name.text,
        new Set(node.members.map((member) => nameOf(member.name)).filter(Boolean)),
      );
    }
  }
  return result;
}

function returnedModel(text) {
  const declaration = parse(text).statements.find(ts.isFunctionDeclaration);
  const type = declaration?.type;
  return type && ts.isTypeReferenceNode(type) && nameOf(type.typeName) === "Promise"
    ? nameOf(type.typeArguments?.[0]?.typeName)
    : undefined;
}

function requestHeaders(sendText) {
  const source = parse(sendText);
  const literals = new Map();
  let headers;
  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      (ts.isStringLiteral(node.initializer) || ts.isNumericLiteral(node.initializer))
    ) {
      literals.set(node.name.text, node.initializer.getText(source));
    }
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      ["get", "post", "put", "patch", "delete"].includes(node.expression.name.text) &&
      node.arguments[0] &&
      ts.isObjectLiteralExpression(node.arguments[0])
    ) {
      const property = node.arguments[0].properties.find(
        (item) => ts.isPropertyAssignment(item) && nameOf(item.name) === "headers",
      );
      if (property) headers = property.initializer;
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  if (!headers) return "options.requestOptions?.headers";
  const start = headers.getStart(source);
  const replacements = [];
  function replace(node) {
    if (
      ts.isIdentifier(node) &&
      literals.has(node.text) &&
      !(node.parent?.name === node && !ts.isShorthandPropertyAssignment(node.parent))
    ) {
      replacements.push({
        start: node.getStart(source) - start,
        end: node.end - start,
        text: literals.get(node.text),
      });
    }
    ts.forEachChild(node, replace);
  }
  replace(headers);
  return edit(headers.getText(source), replacements);
}

export function customizeNewOperation({ text, sendText, deserializeText, members }) {
  const source = parse(text);
  const shape = members.get(returnedModel(deserializeText));
  const cursor = shape?.has("last_id") && shape.has("has_more");
  const headers = requestHeaders(sendText);
  const changes = [];
  function visit(node) {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const paging = node.expression.text === "buildPagedAsyncIterator" && cursor;
      const polling = node.expression.text === "getLongRunningPoller";
      const argument = paging ? node.arguments[4] : polling ? node.arguments[1] : undefined;
      if (argument && ts.isObjectLiteralExpression(argument)) {
        const present = new Set(argument.properties.map((item) => nameOf(item.name)));
        const additions = [];
        if (paging) {
          if (!present.has("cursorFieldName")) additions.push('cursorFieldName: "last_id"');
          if (!present.has("hasMoreFieldName")) additions.push('hasMoreFieldName: "has_more"');
          if (!present.has("nextPageRequestOptions")) {
            additions.push(
              `nextPageRequestOptions: { ...operationOptionsToRequestParameters(options), headers: ${headers} }`,
            );
          }
        }
        if (polling && !present.has("pollHeaders")) additions.push(`pollHeaders: ${headers}`);
        if (additions.length) {
          const existing = argument.properties.map((property) => property.getText(source));
          changes.push({
            start: argument.getStart(source),
            end: argument.end,
            text: `{ ${[...existing, ...additions].join(", ")} }`,
          });
          return;
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return edit(text, changes);
}
