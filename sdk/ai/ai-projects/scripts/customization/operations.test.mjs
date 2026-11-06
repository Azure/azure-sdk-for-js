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
  const extraDepth = "../".repeat(group.split("/").length - 1);
  return new Map([
    [
      `api/beta/${group}/operations.ts`,
      operation(name, optionName, settings).replace(/from "\.\.\//g, `from "${extraDepth}../`),
    ],
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

function helperRelocation() {
  const baseGenerated = tree("old", "readItem", "OldReadOptions");
  const baseSource = tree("old", "readItem", "OldReadOptions", { custom: true });
  const oldFile = "api/beta/old/operations.ts";
  baseSource.set(
    oldFile,
    `import { normalize } from "../../../normalization.js";\n` +
      baseSource
        .get(oldFile)
        .replace(
          "return _readItemDeserialize(response);",
          "return finishResult(response, options);",
        ) +
      `
function finishResult(response: Response, options: OldReadOptions): Promise<string> {
  return _readItemDeserialize(normalize(guardResult(response), options));
}
function guardResult(response: Response): Response {
  if (!response.body) throw new Error("Missing operation identity");
  return response;
}`,
  );
  return {
    baseGenerated,
    baseSource,
    generated: tree("nested/new", "getItem", "NewGetOptions", { addition: true }),
  };
}

test("relocates private helper dependencies with their unique operation destination", () => {
  const result = planOperations(helperRelocation());
  assert.deepEqual(result.diagnostics, []);
  const source = result.files.get("api/beta/nested/new/operations.ts");
  parse(source);
  assert.match(source, /function finishResult\(response: Response, options: NewGetOptions\)/);
  assert.match(source, /function guardResult/);
  assert.match(source, /_getItemDeserialize\(normalize\(guardResult\(response\), options\)\)/);
  assert.match(source, /Missing operation identity/);
  assert.match(source, /from "\.\.\/\.\.\/\.\.\/\.\.\/normalization\.js"/);
  assert.match(source, /x-custom/);
  assert.match(source, /x-extra/);
  assert.equal(result.relocatedHelpers.size, 2);
});

test("does not mistake a shadowed name for a dependency on a removed module's helper", () => {
  const inputs = helperRelocation();
  const file = "api/beta/old/operations.ts";
  inputs.baseSource.set(
    file,
    inputs.baseSource
      .get(file)
      .replace(
        "return finishResult(response, options);",
        "const finishResult = () => _readItemDeserialize(response); return finishResult();",
      ),
  );
  const result = planOperations(inputs);
  assert.deepEqual(result.diagnostics, []);
  assert.equal(result.relocatedHelpers.size, 0);
  assert.doesNotMatch(
    result.files.get("api/beta/nested/new/operations.ts"),
    /function guardResult/,
  );
});

for (const exported of ["export function", "function"]) {
  test(`rejects relocation of a helper exported via ${exported === "function" ? "a separate export" : "its declaration"}`, () => {
    const inputs = helperRelocation();
    const file = "api/beta/old/operations.ts";
    inputs.baseSource.set(
      file,
      exported === "function"
        ? inputs.baseSource.get(file) + "\nexport { finishResult };"
        : inputs.baseSource
            .get(file)
            .replace("function finishResult", "export function finishResult"),
    );
    const result = planOperations(inputs);
    assert.ok(result.diagnostics.some((item) => item.declaration === "finishResult"));
  });
}

for (const collision of [
  "function finishResult(): string { return 'other'; }",
  'import { finishResult } from "../../../../custom.js";',
])
  test("rejects a helper colliding with a destination binding", () => {
    const inputs = helperRelocation();
    const target = "api/beta/nested/new/operations.ts";
    const prior = tree("nested/new", "getOther", "GetOtherOptions");
    prior.set(target, prior.get(target).replaceAll("/things/", "/other/"));
    for (const [file, text] of prior) {
      inputs.baseGenerated.set(file, text);
      inputs.baseSource.set(file, file === target ? text + "\n" + collision : text);
      inputs.generated.set(file, text + "\n" + inputs.generated.get(file));
    }
    const result = planOperations(inputs);
    assert.ok(result.diagnostics.some((item) => item.declaration === "finishResult"));
  });

test("rejects helper collisions between two removed modules moving into one destination", () => {
  const inputs = helperRelocation();
  const renames = new Map([
    ["readItem", "readOther"],
    ["_readItemSend", "_readOtherSend"],
    ["_readItemDeserialize", "_readOtherDeserialize"],
    ["OldReadOptions", "OtherReadOptions"],
  ]);
  for (const tree of [inputs.baseGenerated, inputs.baseSource]) {
    for (const suffix of ["operations.ts", "options.ts"]) {
      tree.set(
        `api/beta/other/${suffix}`,
        renameSymbols(tree.get(`api/beta/old/${suffix}`), renames).replaceAll(
          "/things/",
          "/other/",
        ),
      );
    }
  }
  for (const [file, text] of tree("nested/new", "getOther", "NewGetOtherOptions"))
    inputs.generated.set(
      file,
      inputs.generated.get(file) + "\n" + text.replaceAll("/things/", "/other/"),
    );
  const result = planOperations(inputs);
  assert.ok(
    result.diagnostics.some(
      (item) => item.file === "api/beta/other/operations.ts" && item.declaration === "finishResult",
    ),
  );
});

test("rejects a shared helper when its operations split across destination modules", () => {
  const inputs = helperRelocation();
  const file = "api/beta/old/operations.ts";
  const second = operation("readOther", "ReadOtherOptions").replaceAll("/things/", "/other/");
  inputs.baseGenerated.set(file, inputs.baseGenerated.get(file) + second);
  inputs.baseSource.set(
    file,
    inputs.baseSource.get(file) +
      second.replace(
        "return _readOtherDeserialize(response);",
        "return finishResult(response, options);",
      ),
  );
  for (const target of [inputs.baseGenerated, inputs.baseSource])
    target.set("api/beta/old/options.ts", options("OldReadOptions") + options("ReadOtherOptions"));
  for (const [file, text] of tree("split", "getOther", "GetOtherOptions"))
    inputs.generated.set(file, text.replaceAll("/things/", "/other/"));
  const result = planOperations(inputs);
  assert.ok(result.diagnostics.some((item) => item.declaration === "finishResult"));
  assert.ok(result.diagnostics.some((item) => item.declaration === "guardResult"));
});

test("rejects a helper whose generated local dependency does not move with the operations", () => {
  const inputs = helperRelocation();
  const file = "api/beta/old/operations.ts";
  for (const tree of [inputs.baseGenerated, inputs.baseSource])
    tree.set(file, tree.get(file) + "\nconst requiredIdentity = 'operation-id';");
  inputs.baseSource.set(
    file,
    inputs.baseSource
      .get(file)
      .replace("if (!response.body)", "if (!response.body[requiredIdentity])"),
  );
  const result = planOperations(inputs);
  assert.ok(result.diagnostics.some((item) => item.declaration === "guardResult"));
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
