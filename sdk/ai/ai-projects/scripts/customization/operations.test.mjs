// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import ts from "typescript";
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

test("merges a renamed body parameter when the emitter moves its value into options", () => {
  const withBody = (text) =>
    text
      .replaceAll("id: string, options:", "id: string, update: Update, options:")
      .replace("headers: {", "body: serialize(update), headers: {")
      .replace("Send(context, id, options)", "Send(context, id, update, options)");
  const baseGenerated = tree("old", "updateInsight", "UpdateOptions");
  const baseSource = tree("old", "updateInsight", "UpdateOptions", { custom: true });
  const generated = tree("new", "updateInsight", "UpdateOptions");
  const oldFile = "api/beta/old/operations.ts";
  for (const tree of [baseGenerated, baseSource]) tree.set(oldFile, withBody(tree.get(oldFile)));
  baseSource.set(
    oldFile,
    renameSymbols(baseSource.get(oldFile), new Map([["update", "insightUpdate"]])),
  );
  generated.set(
    "api/beta/new/operations.ts",
    generated
      .get("api/beta/new/operations.ts")
      .replace("headers: {", "body: { status: options.status }, headers: {"),
  );
  const result = planOperations({ baseGenerated, baseSource, generated });
  assert.deepEqual(result.diagnostics, []);
  const resolved = result.files.get("api/beta/new/operations.ts");
  assert.match(resolved, /body: \{ status: options.status \}/);
  assert.match(resolved, /x-custom/);
  assert.doesNotMatch(resolved, /insightUpdate|serialize\(update\)/);
  assert.match(resolved, /_updateInsightSend\(context, id, options\)/);
});

test("parameter normalization preserves wire keys and nested bindings, and rejects capture", () => {
  const baseGenerated = tree("old", "readItem", "ReadOptions");
  const baseSource = tree("old", "readItem", "ReadOptions");
  const generated = tree("new", "readItem", "ReadOptions", { addition: true });
  const oldFile = "api/beta/old/operations.ts";
  const newFile = "api/beta/new/operations.ts";
  const nested = 'const label = ((id: string) => id)("nested");';
  for (const [tree, file] of [
    [baseGenerated, oldFile],
    [baseSource, oldFile],
    [generated, newFile],
  ])
    tree.set(file, tree.get(file).replace("const path =", `${nested} const path =`));
  baseSource.set(
    oldFile,
    renameSymbols(
      baseSource.get(oldFile),
      new Map([["id", "itemId"]]),
      oldFile,
      (node) => ts.isParameter(node.parent) && ts.isFunctionDeclaration(node.parent.parent),
    ),
  );
  const result = planOperations({ baseGenerated, baseSource, generated });
  assert.deepEqual(result.diagnostics, []);
  const resolved = result.files.get(newFile);
  assert.match(resolved, /itemId: string/);
  assert.match(resolved, /id: itemId/);
  assert.match(resolved, /"\/things\/\{id\}/);
  assert.match(resolved, /\(\(id: string\) => id\)/);
  // A new local would capture the normalized parameter; it must not be renamed.
  generated.set(
    newFile,
    generated.get(newFile).replace("const path =", 'const itemId = "local"; const path ='),
  );
  const captured = planOperations({ baseGenerated, baseSource, generated });
  assert.ok(captured.diagnostics.length > 0);
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
