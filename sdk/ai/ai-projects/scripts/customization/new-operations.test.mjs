// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { customizeNewOperation } from "./new-operations.mjs";
import { parse } from "./modules.mjs";
import { canonicalize } from "./ast-merge.mjs";

const sendText = `export function _send(context: Client, options: Options) {
  const foundryFeatures = "Preview=V1";
  return context.path("/items").get({headers: {
    "foundry-features": foundryFeatures,
    ...options.requestOptions?.headers
  }});
}`;
const deserializeText =
  "export async function _deserialize(response: Response): Promise<Page> { return response.body; }";

test("new cursor list operations retain continuation options and preview headers", () => {
  const text = customizeNewOperation({
    text: `export function list(context: Client, options: Options = {}) {
      return buildPagedAsyncIterator(context, () => _send(context, options), _deserialize, ["200"],
        {itemName: "data", apiVersion: context.apiVersion});
    }`,
    sendText,
    deserializeText,
    members: new Map([["Page", new Set(["data", "last_id", "has_more"])]]),
  });
  parse(text);
  assert.match(text, /cursorFieldName: "last_id"/);
  assert.match(text, /hasMoreFieldName: "has_more"/);
  assert.match(text, /operationOptionsToRequestParameters\(options\)/);
  assert.match(text, /"foundry-features": "Preview=V1"/);
  assert.match(text, /options\.requestOptions\?\.headers/);
});

test("new pollers forward initial preview and caller headers", () => {
  const text = customizeNewOperation({
    text: `export function create(context: Client, options: Options = {}) {
      return getLongRunningPoller(context, {getInitialResponse: () => _send(context, options)});
    }`,
    sendText,
    deserializeText,
    members: new Map(),
  });
  parse(text);
  assert.match(text, /pollHeaders:/);
  assert.match(text, /"foundry-features": "Preview=V1"/);
  assert.match(text, /options\.requestOptions\?\.headers/);
});

test("next-link operations are not rewritten to cursor pagination", () => {
  const original = `export function list(context: Client, options: Options = {}) {
    return buildPagedAsyncIterator(context, () => _send(context, options), _deserialize, ["200"], {itemName: "value"});
  }`;
  const customized = customizeNewOperation({
    text: original,
    sendText,
    deserializeText,
    members: new Map([["Page", new Set(["value", "nextLink"])]]),
  });
  parse(customized);
  assert.doesNotMatch(customized, /cursorFieldName|hasMoreFieldName/);
  assert.match(customized, /nextPageRequestOptions/);
  assert.match(customized, /operationOptionsToRequestParameters\(options\)/);
  assert.match(customized, /"foundry-features": "Preview=V1"/);
  assert.match(customized, /options\.requestOptions\?\.headers/);
  assert.equal(
    canonicalize(
      customizeNewOperation({
        text: customized,
        sendText,
        deserializeText,
        members: new Map([["Page", new Set(["value", "nextLink"])]]),
      }),
    ),
    canonicalize(customized),
  );
});

test("new next-link paging forwards caller headers without a preview opt-in", () => {
  const text = customizeNewOperation({
    text: `export function list(context: Client, options: Options) {
      return buildPagedAsyncIterator(context, () => _send(context, options), _deserialize, ["200"],
        {itemName: "value", nextLinkName: "nextLink"});
    }`,
    sendText: `export function _send(context: Client, options: Options) {
      return context.path("/items").get({ headers: { ...options.requestOptions?.headers } });
    }`,
    deserializeText,
    members: new Map([["Page", new Set(["value", "nextLink"])]]),
  });
  parse(text);
  assert.match(text, /nextPageRequestOptions/);
  assert.match(text, /options\.requestOptions\?\.headers/);
  assert.doesNotMatch(text, /foundry-features|cursorFieldName|hasMoreFieldName/);
});

test("new paging preserves an existing continuation-options customization", () => {
  const original = `export function list(context: Client, options: Options) {
    return buildPagedAsyncIterator(context, () => _send(context, options), _deserialize, ["200"],
      {itemName: "value", nextLinkName: "nextLink", nextPageRequestOptions: customContinuationOptions});
  }`;
  assert.equal(
    customizeNewOperation({
      text: original,
      sendText,
      deserializeText,
      members: new Map([["Page", new Set(["value", "nextLink"])]]),
    }),
    original,
  );
});
