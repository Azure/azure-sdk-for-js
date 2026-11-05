// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import { canonicalize } from "./ast-merge.mjs";
import { parse } from "./modules.mjs";

const pagingBefore = `
const body = results as Record<string, unknown>;
if (body[hasMoreFieldName] === true && body[cursorFieldName]) {
  initialRequestUrl.searchParams.set("after", body[cursorFieldName] as string);
  resolvedNextLink = initialRequestUrl.toString();
}`;
const pagingAfter = `
const body = results as Record<string, unknown>;
const backwardsCursor = options.firstCursorFieldName;
const backwards = backwardsCursor !== undefined && initialRequestUrl.searchParams.has("before");
const cursor = backwards ? backwardsCursor : cursorFieldName;
if (body[hasMoreFieldName] === true && cursor && body[cursor]) {
  if (backwardsCursor !== undefined) {
    initialRequestUrl.searchParams.delete(backwards ? "after" : "before");
  }
  initialRequestUrl.searchParams.set(backwards ? "before" : "after", body[cursor] as string);
  resolvedNextLink = initialRequestUrl.toString();
}`;
const responseBefore = `
return {
  flatResponse: response,
  rawResponse: {
    ...response,
    statusCode: Number.parseInt(response.status),
    body: normalizedBody,
  },
};`;
const responseAfter = `
const resourceLocation = getResourceLocation?.(response, initialResponse);
return {
  flatResponse: response,
  rawResponse: {
    ...response,
    statusCode: Number.parseInt(response.status),
    body: resourceLocation === undefined ? normalizedBody : { ...normalizedBody, resourceLocation },
  },
};`;
const policies = new Map([
  [
    "static-helpers/pagingHelpers.ts::BuildPagedAsyncIteratorOptions",
    [["cursorFieldName?: string;", "cursorFieldName?: string; firstCursorFieldName?: string;"]],
  ],
  ["static-helpers/pagingHelpers.ts::buildPagedAsyncIterator", [[pagingBefore, pagingAfter]]],
  [
    "static-helpers/pollingHelpers.ts::GetLongRunningPollerOptions",
    [
      [
        "getInitialResponse?: () => PromiseLike<TResponse>;",
        `getInitialResponse?: () => PromiseLike<TResponse>;
     getResourceLocation?: (response: TResponse, initialResponse?: TResponse) => string | undefined;`,
      ],
    ],
  ],
  [
    "static-helpers/pollingHelpers.ts::getLongRunningPoller",
    [
      [
        "const { restoreFrom, getInitialResponse, apiVersion, pollHeaders, statusNormalizations } = options;",
        "const { restoreFrom, getInitialResponse, apiVersion, pollHeaders, statusNormalizations, getResourceLocation } = options;",
      ],
      [
        "getLroResponse(initialResponse, expectedStatuses, statusNormalizations)",
        "getLroResponse(initialResponse, expectedStatuses, statusNormalizations, getResourceLocation, initialResponse)",
      ],
      [
        "getLroResponse(response as TResponse, expectedStatuses, statusNormalizations)",
        "getLroResponse(response as TResponse, expectedStatuses, statusNormalizations, getResourceLocation, initialResponse)",
      ],
    ],
  ],
  [
    "static-helpers/pollingHelpers.ts::getLroResponse",
    [
      [
        "statusNormalizations?: Record<string, OperationStatus>,",
        `statusNormalizations?: Record<string, OperationStatus>,
       getResourceLocation?: GetLongRunningPollerOptions<TResponse>["getResourceLocation"],
       initialResponse?: TResponse,`,
      ],
      [responseBefore, responseAfter],
    ],
  ],
]);

function tokens(text) {
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, true, ts.LanguageVariant.Standard, text);
  const result = [];
  for (let kind = scanner.scan(); kind !== ts.SyntaxKind.EndOfFileToken; kind = scanner.scan()) {
    result.push({
      key: JSON.stringify([
        kind,
        kind === ts.SyntaxKind.StringLiteral ? scanner.getTokenValue() : scanner.getTokenText(),
      ]),
      start: scanner.getTokenPos(),
      end: scanner.getTextPos(),
    });
  }
  return result;
}

function behaviorKey(text) {
  const source = parse(text);
  function visit(node) {
    // Work on this private parse only; call/signature trailing commas are formatting, not array holes.
    for (const field of ["arguments", "parameters", "typeArguments", "typeParameters"]) {
      if (Array.isArray(node[field])) node[field].hasTrailingComma = false;
    }
    if (ts.isObjectBindingPattern(node)) node.elements.hasTrailingComma = false;
    ts.forEachChild(node, visit);
  }
  visit(source);
  return canonicalize(ts.createPrinter({ removeComments: true }).printFile(source));
}

/**
 * Admit only the reviewed before-cursor and campaign core-lro adapter transitions.
 * Declaration-scoped token edits preserve every other operator, literal and statement;
 * they are not a file/name allowlist for arbitrary protected behavior changes.
 */
export function isReviewedHelperUpdate(file, before, after) {
  const changes = policies.get(`${file}::${before.name?.getText()}`);
  if (!changes || before.kind !== after.kind) return false;
  let expected = before.getText();
  for (const [oldText, newText] of changes) {
    const oldTokens = tokens(oldText);
    const stream = tokens(expected);
    const locations = [];
    for (let index = 0; index <= stream.length - oldTokens.length; index++) {
      if (oldTokens.every((token, offset) => stream[index + offset].key === token.key))
        locations.push(index);
    }
    if (locations.length !== 1) return false;
    const index = locations[0];
    expected =
      expected.slice(0, stream[index].start) +
      newText +
      expected.slice(stream[index + oldTokens.length - 1].end);
  }
  return behaviorKey(expected) === behaviorKey(after.getText());
}
