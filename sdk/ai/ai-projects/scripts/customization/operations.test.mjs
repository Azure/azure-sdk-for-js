// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { planOperations, normalizeOperationCode, classicFromOperations } from "./operations.mjs";
import { parse, renameSymbols } from "./modules.mjs";

function operation(name, optionName, { custom = false, addition = false } = {}) {
  return `
import type { Client, Response, StreamableMethod } from "../../index.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import { operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { ${optionName} } from "./options.js";
export function _${name}Send(context: Client, id: string, options: ${optionName} = {}): StreamableMethod {
  const path = expandUrlTemplate("/things/{id}{?api%2Dversion}", {id, "api%2Dversion": context.apiVersion ?? "v1"}, {});
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ${custom ? '"x-custom": "retained",' : ""}
      ${addition ? '"x-extra": options.extra,' : ""}
      ...options.requestOptions?.headers
    }
  });
}
export async function _${name}Deserialize(response: Response): Promise<string> { return response.body; }
export async function ${name}(context: Client, id: string, options: ${optionName} = {}): Promise<string> {
  const response = await _${name}Send(context, id, options);
  return _${name}Deserialize(response);
}`;
}

function options(name, addition = false) {
  return `import type { OperationOptions } from "@azure-rest/core-client";
export interface ${name} extends OperationOptions { ${addition ? "extra?: string;" : ""} }`;
}

function tree(group, name, optionName, settings) {
  return new Map([
    [`api/beta/${group}/operations.ts`, operation(name, optionName, settings)],
    [`api/beta/${group}/options.ts`, options(optionName, settings?.addition)],
  ]);
}

test("relocates operations by wire identity and combines new mappings with custom headers", () => {
  const result = planOperations({
    baseGenerated: tree("old", "readItem", "OldReadOptions"),
    baseSource: tree("old", "readItem", "OldReadOptions", { custom: true }),
    generated: tree("new", "getItem", "NewGetOptions", { addition: true }),
  });
  assert.deepEqual(result.diagnostics, []);
  const source = result.files.get("api/beta/new/operations.ts");
  parse(source);
  assert.match(source, /function getItem\(/);
  assert.match(source, /x-custom/);
  assert.match(source, /x-extra/);
  assert.match(source, /options\.extra/);
  assert.doesNotMatch(source, /\breadItem\b/);
  assert.match(result.files.get("api/beta/new/options.ts"), /extra\?: string/);
});

test("retains a deliberate customized operation name", () => {
  const result = planOperations({
    baseGenerated: tree("old", "readItem", "OldReadOptions"),
    baseSource: tree("old", "get", "CustomReadOptions", { custom: true }),
    generated: tree("new", "getItem", "NewGetOptions", { addition: true }),
  });
  assert.deepEqual(result.diagnostics, []);
  assert.match(result.files.get("api/beta/new/operations.ts"), /function get\(/);
  assert.match(result.files.get("api/beta/new/options.ts"), /interface CustomReadOptions/);
});

test("rejects ambiguous route relocation rather than choosing a customization", () => {
  const base = new Map([
    ...tree("first", "readItem", "FirstOptions"),
    ...tree("second", "readItem", "SecondOptions"),
  ]);
  assert.throws(
    () =>
      planOperations({
        baseGenerated: base,
        baseSource: base,
        generated: tree("new", "getItem", "NewOptions"),
      }),
    /ambiguous operation identity/,
  );
});

test("keeps untouched customized modules byte-for-byte", () => {
  const generated = tree("old", "readItem", "OldReadOptions");
  const source = tree("old", "readItem", "OldReadOptions", { custom: true });
  const result = planOperations({ baseGenerated: generated, baseSource: source, generated });
  assert.deepEqual([...result.files], [...source]);
});

test("rejects removal of a customized operation without a verified successor", () => {
  const result = planOperations({
    baseGenerated: tree("old", "readItem", "OldReadOptions"),
    baseSource: tree("old", "readItem", "OldReadOptions", { custom: true }),
    generated: new Map(),
  });
  assert.ok(
    result.diagnostics.some((item) => /disappeared without an unambiguous/.test(item.message)),
  );
});

test("normalizes required preview parameters without changing wire header names", () => {
  const source = normalizeOperationCode(
    `
export function _getSend(context: Client, foundryFeatures: "Voice=V1", name: string) {
  return context.path(name).get({headers: {"foundry-features": foundryFeatures}});
}
export function get(context: Client, foundryFeatures: "Voice=V1", name: string) {
  return _getSend(context, foundryFeatures, name);
}`,
    "api/test/operations.ts",
  );
  parse(source);
  assert.match(source, /const foundryFeatures = "Voice=V1"/);
  assert.doesNotMatch(source, /foundryFeatures:/);
  assert.match(source, /"foundry-features": foundryFeatures/);
  assert.match(source, /_getSend\(context, name\)/);
});

test("rejects preview parameters without an unambiguous default", () => {
  assert.throws(
    () =>
      normalizeOperationCode(
        "export function _getSend(context: Client, foundryFeatures: string) { return foundryFeatures; }",
        "api/test/operations.ts",
      ),
    /explicit literal default/,
  );
});

test("symbol renaming preserves wire property names and string literals", () => {
  const renamed = renameSymbols(
    `
export function send(name: string) {
  return {name, literal: "name", nested: {name: name}};
}`,
    new Map([["name", "toolboxName"]]),
  );
  parse(renamed);
  assert.match(renamed, /send\(toolboxName: string\)/);
  assert.match(renamed, /name: toolboxName/);
  assert.match(renamed, /literal: "name"/);
  assert.match(renamed, /nested: \{name: toolboxName\}/);
});

test("classic interface signatures use the resolved API contract", () => {
  const result = planOperations({
    baseGenerated: tree("old", "readItem", "OldReadOptions"),
    baseSource: tree("old", "readItem", "OldReadOptions", { custom: true }),
    generated: tree("new", "getItem", "NewGetOptions"),
  });
  const output = classicFromOperations(
    "classic/beta/new/index.ts",
    `
import { AIProjectContext } from "../../../api/aiProjectContext.js";
export interface NewOperations { getItem: (id: string, options?: NewGetOptions) => Promise<string>; }
`,
    result.matches,
    result.files.get("api/beta/new/operations.ts"),
  );
  parse(output);
  assert.match(output, /_getNewOperations/);
  assert.match(output, /getItem\(context, id, options\)/);
  assert.match(output, /options\?: NewGetOptions/);
});
