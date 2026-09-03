// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import test from "node:test";
import {
  findMissingAdditions,
  findMissingPreservedExports,
  findIndexInvariantViolations,
} from "./check-generated-member-parity.mjs";

const previousGeneratedOptions = `
export interface AgentsCreateAgentOptionalParams {
  description?: string;
}
`;

const currentGeneratedOptions = `
export interface AgentsCreateAgentOptionalParams {
  description?: string;
  digitalWorkerType?: DigitalWorkerType;
  draft?: boolean;
}
`;

const previousGeneratedOperations = `
export function _createAgentSend() {
  return client.post({ body: { description: options?.description } });
}
`;

const currentGeneratedOperations = `
export function _createAgentSend() {
  return client.post({
    body: {
      description: options?.description,
      digital_worker_type: options?.digitalWorkerType,
      draft: options?.draft,
    },
  });
}
`;

const previousGeneratedModels = `
export interface Widget {
  name: string;
}
export function widgetSerializer(item: Widget): any {
  return { widget_name: item["name"] };
}
export function widgetDeserializer(item: any): Widget {
  return { name: item["widget_name"] };
}
`;

const currentGeneratedModels = `
export interface Widget {
  name: string;
  description?: string;
}
export function widgetSerializer(item: Widget): any {
  return { widget_name: item["name"], widget_description: item["description"] };
}
export function widgetDeserializer(item: any): Widget {
  return { name: item["widget_name"], description: item["widget_description"] };
}
`;

test("reports new members missing from customized declarations", () => {
  const currentSource = `
export interface AgentsCreateOptionalParams {
  description?: string;
}
export function _createSend() {
  return client.post({ body: { description: options?.description } });
}
`;

  const missing = findMissingAdditions({
    previousGenerated: previousGeneratedOptions,
    currentGenerated: currentGeneratedOptions,
    currentSource,
    file: "api/agents/options.ts",
  });
  assert.deepEqual(
    missing.map(({ kind, member }) => [kind, member]),
    [
      ["interface member", "digitalWorkerType"],
      ["interface member", "draft"],
    ],
  );
});

test("accepts new members carried into renamed customized declarations", () => {
  const currentSource = `
export interface AgentsCreateOptionalParams {
  description?: string;
  digitalWorkerType?: DigitalWorkerType;
  draft?: boolean;
}
`;

  const missing = findMissingAdditions({
    previousGenerated: previousGeneratedOptions,
    currentGenerated: currentGeneratedOptions,
    currentSource,
    file: "api/agents/options.ts",
  });
  assert.deepEqual(missing, []);
});

test("reports new request properties missing from renamed send helpers", () => {
  const currentSource = `
export function _createSend() {
  return client.post({ body: { description: options?.description } });
}
`;

  const missing = findMissingAdditions({
    previousGenerated: previousGeneratedOperations,
    currentGenerated: currentGeneratedOperations,
    currentSource,
    file: "api/agents/operations.ts",
  });
  assert.deepEqual(
    missing.map(({ kind, member }) => [kind, member]),
    [
      ["request body property", "digital_worker_type"],
      ["request body property", "draft"],
    ],
  );
});

test("reports serializer and deserializer properties missing from customized models", () => {
  const currentSource = `
export interface Widget {
  name: string;
  description?: string;
}
export function widgetSerializer(item: Widget): any {
  return { widget_name: item["name"] };
}
export function widgetDeserializer(item: any): Widget {
  return { name: item["widget_name"] };
}
`;

  const missing = findMissingAdditions({
    previousGenerated: previousGeneratedModels,
    currentGenerated: currentGeneratedModels,
    currentSource,
    file: "models/models.ts",
  });
  assert.deepEqual(
    missing.map(({ kind, member }) => [kind, member]),
    [
      ["serializer property", "widget_description"],
      ["deserializer property", "description"],
    ],
  );
});

test("accepts serializer and deserializer properties carried into customized models", () => {
  const missing = findMissingAdditions({
    previousGenerated: previousGeneratedModels,
    currentGenerated: currentGeneratedModels,
    currentSource: currentGeneratedModels,
    file: "models/models.ts",
  });
  assert.deepEqual(missing, []);
});

test("reports customized exports removed by a destructive merge", () => {
  const previousSource = `
export { AIProjectClient } from "./aiProjectClient.js";
export type { ExistingModel, LegacyModel } from "./models/index.js";
export interface LocalOptions {}
`;
  const currentSource = `
export type { ExistingModel, EmittedModel } from "./models/index.js";
`;

  const missing = findMissingPreservedExports({
    previousSource,
    currentSource,
    file: "index.ts",
  });
  assert.deepEqual(
    missing.map(({ name }) => name),
    ["AIProjectClient", "LegacyModel", "LocalOptions"],
  );
});

test("accepts preserved customized exports plus additions", () => {
  const previousSource = `
export { InternalName as PublicName } from "./models/index.js";
export type { ExistingModel } from "./models/index.js";
`;
  const currentSource = `
export { InternalName as PublicName } from "./models/index.js";
export type { ExistingModel, EmittedModel } from "./models/index.js";
`;

  const missing = findMissingPreservedExports({
    previousSource,
    currentSource,
    file: "index.ts",
  });
  assert.deepEqual(missing, []);
});

test("identifies the exact customized export requiring an explicit removal allowance", () => {
  const previousSource = `
export type { ExistingModel, ReviewedRemoval } from "./models/index.js";
`;
  const currentSource = `
export type { ExistingModel } from "./models/index.js";
`;

  const missing = findMissingPreservedExports({
    previousSource,
    currentSource,
    file: "index.ts",
  });
  assert.deepEqual(missing, [{ file: "index.ts", name: "ReviewedRemoval" }]);
});

test("rejects emitted paging and restore-poller imports in the customized barrel", () => {
  const source = `
import { PageSettings, ContinuablePage, PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
`;

  assert.deepEqual(findIndexInvariantViolations(source), [
    "must not reference nonexistent src/restorePollerHelpers.ts",
    "PageSettings must be imported as a type from @azure/core-paging",
    "PagedAsyncIterableIterator must be imported as a type from @azure/core-paging",
    "ContinuablePage must be imported as a type from ./static-helpers/pagingHelpers.js",
  ]);
});

test("accepts the hand-maintained customized barrel imports", () => {
  const source = `
import type { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import type { ContinuablePage } from "./static-helpers/pagingHelpers.js";
`;

  assert.deepEqual(findIndexInvariantViolations(source), []);
});
