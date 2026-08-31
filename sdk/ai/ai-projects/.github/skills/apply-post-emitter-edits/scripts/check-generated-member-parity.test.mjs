// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import test from "node:test";
import { findMissingAdditions } from "./check-generated-member-parity.mjs";

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