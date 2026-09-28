// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { canonicalize } from "./ast-merge.mjs";
import { validateCustomization } from "./guards.mjs";
import { parse } from "./modules.mjs";
import { planOperations } from "./operations.mjs";
import {
  applyPreviewHeaderPolicy,
  previewLiteral,
  retirePreviewHeaders,
  sendsPreviewHeader,
} from "./preview-headers.mjs";

const optional =
  '...(options?.foundryFeatures !== undefined ? { "foundry-features": options?.foundryFeatures } : {}),';

function send({ header = "optional", literal = "Items=V1Preview", extra = false } = {}) {
  const entries = {
    optional,
    literal: `"foundry-features": "${literal}",`,
    local: '"foundry-features": foundryFeatures,',
    none: "",
  };
  return `export function _createItemSend(context: Client, options: CreateItemOptionalParams = { requestOptions: {} }): StreamableMethod {
  ${header === "local" ? `const foundryFeatures = "${literal}";` : ""}
  const path = expandUrlTemplate("/items{?api%2Dversion}", { "api%2Dversion": context.apiVersion ?? "v1" }, {});
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { ${entries[header]} ${extra ? '"x-extra": "emitted",' : ""} accept: "application/json", ...options.requestOptions?.headers },
  });
}`;
}

function operations(settings = {}) {
  const { poll = false } = settings;
  return `
import type { Client, StreamableMethod } from "../../index.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { getJobPoller } from "../../static-helpers/pollingHelpers.js";
import type { JobPoller } from "../../static-helpers/pollingHelpers.js";
import { operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { CreateItemOptionalParams } from "./options.js";
${send(settings)}
export async function _createItemDeserialize(result: any): Promise<string> { return result.body; }
export function createItem(context: Client, options: CreateItemOptionalParams = { requestOptions: {} }): JobPoller<string> {
  return getJobPoller(context, _createItemDeserialize, ["201"], {
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createItemSend(context, options),
    ${poll ? 'pollHeaders: { ...options?.requestOptions?.headers, "foundry-features": "Items=V1Preview" },' : ""}
  });
}`;
}

function options(preview) {
  return `import type { OperationOptions } from "@azure-rest/core-client";
export interface CreateItemOptionalParams extends OperationOptions {
  ${preview ? 'foundryFeatures?: "Items=V1Preview";' : ""}
}`;
}

function tree(operationsText, optionsText) {
  return new Map([
    ["api/items/operations.ts", operationsText],
    ["api/items/options.ts", optionsText],
  ]);
}

const same = (left, right) => assert.equal(canonicalize(left), canonicalize(right));

test("rewrites an emitted optional preview header into the customized constant form", () => {
  same(
    applyPreviewHeaderPolicy(send(), send({ header: "literal" }), "Items=V1Preview"),
    send({ header: "literal" }),
  );
  same(
    applyPreviewHeaderPolicy(send(), send({ header: "local" }), "Items=V1Preview"),
    send({ header: "local" }),
  );
  same(
    applyPreviewHeaderPolicy(send(), send({ header: "local" }), "Items=V2Preview"),
    send({ header: "local", literal: "Items=V2Preview" }),
  );
  assert.equal(applyPreviewHeaderPolicy(send(), send(), "Items=V1Preview"), send());
  assert.equal(
    applyPreviewHeaderPolicy(send({ header: "none" }), send({ header: "literal" }), undefined),
    send({ header: "none" }),
  );
  assert.equal(previewLiteral(parse(options(true)).statements[1]), "Items=V1Preview");
  assert.equal(previewLiteral(parse(options(false)).statements[1]), undefined);
  assert.ok(sendsPreviewHeader(send()));
  assert.ok(!sendsPreviewHeader(send({ header: "none" })));
});

test("retires stale preview headers from poll and continuation requests", () => {
  const poller = `export function createItem(context: Client, options: CreateItemOptionalParams) {
  const foundryFeatures = "Items=V1Preview";
  return getJobPoller(context, _createItemDeserialize, ["201"], {
    abortSignal: options?.abortSignal,
    pollHeaders: { ...options?.requestOptions?.headers, "foundry-features": foundryFeatures },
  });
}`;
  const retired = retirePreviewHeaders(poller);
  parse(retired);
  assert.doesNotMatch(retired, /pollHeaders|foundryFeatures|foundry-features/);
  assert.match(retired, /abortSignal: options\?\.abortSignal/);

  const custom = retirePreviewHeaders(
    poller.replace(
      '"foundry-features": foundryFeatures',
      '"x-custom": "kept", "foundry-features": foundryFeatures',
    ),
  );
  assert.match(
    custom,
    /pollHeaders: \{ \.\.\.options\?\.requestOptions\?\.headers, "x-custom": "kept" \}/,
  );
  assert.doesNotMatch(custom, /foundryFeatures|foundry-features/);

  const spread = retirePreviewHeaders(
    poller.replace("...options?.requestOptions?.headers", "...customPollingHeaders"),
  );
  assert.match(spread, /pollHeaders: \{ \.\.\.customPollingHeaders \}/);
  assert.doesNotMatch(spread, /foundryFeatures|foundry-features/);

  const paging =
    retirePreviewHeaders(`export function listItems(context: Client, options: ListItemsOptionalParams) {
  const requestParameters = operationOptionsToRequestParameters(options);
  return buildPagedAsyncIterator(context, {
    nextPageRequestOptions: { ...requestParameters, headers: { ...requestParameters.headers, "foundry-features": "Items=V1Preview" } },
  });
}`);
  assert.match(paging, /headers: \{ \.\.\.requestParameters\.headers \}/);
  assert.doesNotMatch(paging, /foundry-features/);
});

test("follows the emitter when it retires a preview opt-in the customization hard-coded", () => {
  const baseGenerated = tree(operations(), options(true));
  const baseSource = tree(operations({ header: "local", poll: true }), options(true));
  const generated = tree(operations({ header: "none" }), options(false));
  const result = planOperations({ baseGenerated, baseSource, generated });
  assert.deepEqual(result.diagnostics, []);
  const output = result.files.get("api/items/operations.ts");
  parse(output);
  assert.doesNotMatch(output, /foundry-features|foundryFeatures|pollHeaders/);
  assert.match(output, /accept: "application\/json"/);
  assert.match(output, /getJobPoller\(/);
  assert.deepEqual(
    validateCustomization({
      baseGenerated,
      baseSource,
      generated,
      source: result.files,
      matches: result.matches,
    }),
    [],
  );
});

test("keeps the constant preview header while the emitter still declares the opt-in", () => {
  const baseGenerated = tree(operations(), options(true));
  const baseSource = tree(operations({ header: "local", poll: true }), options(true));
  const generated = tree(operations({ extra: true }), options(true));
  const result = planOperations({ baseGenerated, baseSource, generated });
  assert.deepEqual(result.diagnostics, []);
  const output = result.files.get("api/items/operations.ts");
  assert.match(output, /const foundryFeatures = "Items=V1Preview"/);
  assert.match(output, /"foundry-features": foundryFeatures/);
  assert.match(output, /"x-extra": "emitted"/);
  assert.doesNotMatch(output, /options\?\.foundryFeatures/);
  assert.match(output, /pollHeaders: \{[^}]*"foundry-features": "Items=V1Preview"/);
  const guarded = (source) =>
    validateCustomization({
      baseGenerated,
      baseSource,
      generated,
      source,
      matches: result.matches,
    });
  assert.deepEqual(guarded(result.files), []);
  const dropped = new Map(result.files);
  dropped.set("api/items/operations.ts", output.replace(/pollHeaders: \{[^}]*\},?/, ""));
  assert.ok(
    guarded(dropped).some((item) => item.member === "pollHeaders"),
    "poll headers stay required while the emitter still sends the opt-in",
  );
});

test("does not treat a custom-only preview header as an emitter retirement", () => {
  const baseGenerated = tree(operations({ header: "none" }), options(false));
  const baseSource = tree(operations({ header: "local", poll: true }), options(false));
  const generated = tree(operations({ header: "none", extra: true }), options(false));
  const result = planOperations({ baseGenerated, baseSource, generated });
  assert.deepEqual(result.diagnostics, []);
  const output = result.files.get("api/items/operations.ts");
  assert.match(output, /"foundry-features": foundryFeatures/);
  assert.match(output, /pollHeaders: \{[^}]*"foundry-features": "Items=V1Preview"/);
  const guarded = (source) =>
    validateCustomization({
      baseGenerated,
      baseSource,
      generated,
      source,
      matches: result.matches,
    });
  assert.deepEqual(guarded(result.files), []);
  const dropped = new Map(result.files);
  dropped.set(
    "api/items/operations.ts",
    output
      .replace(/const foundryFeatures = "Items=V1Preview";\s*/, "")
      .replace(/"foundry-features": foundryFeatures,?\s*/, "")
      .replace(/pollHeaders: \{[^}]*\},?/, ""),
  );
  assert.ok(
    guarded(dropped).some((item) => item.member === "pollHeaders"),
    "a maintained header the emitter never sent must not pass as retired",
  );
});

test("keeps maintained poll header spreads when the emitter retires the opt-in", () => {
  const custom = operations({ header: "local", poll: true }).replace(
    "pollHeaders: { ...options?.requestOptions?.headers,",
    "pollHeaders: { ...pollingHeaders(options),",
  );
  const baseGenerated = tree(operations(), options(true));
  const baseSource = tree(custom, options(true));
  const generated = tree(operations({ header: "none" }), options(false));
  const result = planOperations({ baseGenerated, baseSource, generated });
  assert.deepEqual(result.diagnostics, []);
  const output = result.files.get("api/items/operations.ts");
  assert.match(output, /pollHeaders: \{ \.\.\.pollingHeaders\(options\) \}/);
  assert.doesNotMatch(output, /foundry-features|foundryFeatures/);
  const guarded = (source) =>
    validateCustomization({
      baseGenerated,
      baseSource,
      generated,
      source,
      matches: result.matches,
    });
  assert.deepEqual(guarded(result.files), []);
  const dropped = new Map(result.files);
  dropped.set("api/items/operations.ts", output.replace(/pollHeaders: \{[^}]*\},?/, ""));
  assert.ok(
    guarded(dropped).some((item) => item.member === "pollHeaders"),
    "maintained poll headers must survive an opt-in retirement",
  );
});
