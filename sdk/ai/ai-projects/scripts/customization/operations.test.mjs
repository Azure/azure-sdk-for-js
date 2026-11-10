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
  const extraDepth = "../".repeat(group.split("/").length - 1);
  return new Map([
    [
      `api/beta/${group}/operations.ts`,
      operation(name, optionName, settings).replace(/from "\.\.\//g, `from "${extraDepth}../`),
    ],
    [`api/beta/${group}/options.ts`, options(optionName, settings?.addition)],
  ]);
}

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

test("reviewed Skills promotion ports the OpenAI route and preserves custom headers", () => {
    const skills = (file, prefix, custom = false) =>
      new Map([
        [
          file,
          operation("get", "GetOptions", { custom })
            .replace("/things/{id}", `${prefix}/skills/{id}`)
            .replaceAll(
              'from "../../index.js"',
              file.includes("/beta/") ? 'from "../../../index.js"' : 'from "../../index.js"',
            )
            .replaceAll(
              'from "../../../static-helpers/urlTemplate.js"',
              file.includes("/beta/")
                ? 'from "../../../../static-helpers/urlTemplate.js"'
                : 'from "../../../static-helpers/urlTemplate.js"',
            ),
        ],
        [file.replace("operations.ts", "options.ts"), options("GetOptions")],
      ]);
    const oldFile = "api/beta/skills/operations.ts";
    const newFile = "api/skills/operations.ts";
    const baseGenerated = skills(oldFile, "");
    const baseSource = skills(oldFile, "", true);
    const result = planOperations({
      baseGenerated,
      baseSource,
      generated: skills(newFile, "/openai/v1"),
    });
    assert.deepEqual(result.diagnostics, []);
    const source = result.files.get(newFile);
    assert.match(source, /\/openai\/v1\/skills\/\{id\}/);
    assert.match(source, /x-custom/);
    assert.equal(result.files.has(oldFile), false);

    for (const file of ["api/unreviewed/operations.ts", newFile]) {
      const unsafe = planOperations({
        baseGenerated,
        baseSource,
        generated: skills(file, "/unreviewed/v1"),
      });
      assert.ok(unsafe.diagnostics.some((item) => /disappeared/.test(item.message)));
    }
});

test("reviewed call-job GA promotion adopts conditional SIP opt-in instead of the old required constant", () => {
  for (const group of ["voiceAgents/telephony", "unreviewed"]) {
    const oldFile = `api/beta/${group}/operations.ts`;
    const file = `api/${group}/operations.ts`;
    const oldOption = "BetaVoiceAgentsTelephonyDeleteCallJobOptionalParams";
    const option = "VoiceAgentsTelephonyDeleteCallJobOptionalParams";
    const baseGenerated = tree(group, "deleteCallJob", oldOption);
    baseGenerated.set(
      oldFile,
      baseGenerated
        .get(oldFile)
        .replaceAll(
          "context: Client, id: string",
          'context: Client, foundryFeatures: "VoiceAgents=V1Preview", id: string',
        )
        .replace(
          "_deleteCallJobSend(context, id, options)",
          "_deleteCallJobSend(context, foundryFeatures, id, options)",
        )
        .replace(
          'accept: "application/json",',
          '"foundry-features": foundryFeatures, accept: "application/json",',
        ),
    );
    const baseSource = tree(group, "deleteCallJob", oldOption, { custom: true });
    baseSource.set(
      oldFile,
      baseSource
        .get(oldFile)
        .replace(
          "  const path =",
          '  const foundryFeatures = "VoiceAgents=V1Preview";\n  const path =',
        )
        .replace(
          'accept: "application/json",',
          '"foundry-features": foundryFeatures, accept: "application/json",',
        ),
    );
    const generated = new Map([
      [
        file,
        operation("deleteCallJob", option)
          .replace(
            'from "../../index.js"',
            `from "${group === "unreviewed" ? "../" : "../../"}index.js"`,
          )
          .replace(
            'from "../../../static-helpers/',
            `from "${group === "unreviewed" ? "../../" : "../../../"}static-helpers/`,
          )
          .replace(
            'accept: "application/json",',
            '...(options?.foundryFeatures !== undefined ? { "foundry-features": options?.foundryFeatures } : {}), accept: "application/json",',
          ),
      ],
      [
        file.replace("operations.ts", "options.ts"),
        options(option).replace(
          "extends OperationOptions {",
          'extends OperationOptions { foundryFeatures?: "VoiceAgents=V1Preview";',
        ),
      ],
    ]);
    const result = planOperations({ baseGenerated, baseSource, generated });
    assert.deepEqual(result.diagnostics, []);
    const output = result.files.get(file);
    assert.match(output, /x-custom/);
    if (group === "voiceAgents/telephony") {
      assert.match(output, /options\?\.foundryFeatures !== undefined/);
      assert.doesNotMatch(output, /const foundryFeatures/);
    } else assert.match(output, /const foundryFeatures/);
  }
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

test("relocates helpers referenced through shorthand properties", () => {
  const inputs = helperRelocation();
  const file = "api/beta/old/operations.ts";
  inputs.baseSource.set(
    file,
    inputs.baseSource
      .get(file)
      .replace("return finishResult(response, options);", "return { finishResult };"),
  );
  const result = planOperations(inputs);
  assert.deepEqual(result.diagnostics, []);
  const source = result.files.get("api/beta/nested/new/operations.ts");
  assert.match(source, /return \{ finishResult \};/);
  assert.match(source, /function finishResult\(/);
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

for (const assignment of ["export default finishResult;", "export = finishResult;"]) {
  test(`rejects relocation of a helper exposed by ${assignment}`, () => {
    const inputs = helperRelocation();
    const file = "api/beta/old/operations.ts";
    inputs.baseSource.set(file, inputs.baseSource.get(file) + `\n${assignment}`);
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

test("rejects a helper dependency moved away from its destination despite a same-named operation", () => {
  const inputs = helperRelocation();
  const oldFile = "api/beta/old/operations.ts";
  const oldOptions = "api/beta/old/options.ts";
  const originalDependency = operation("readOther", "ReadOtherOptions").replaceAll(
    "/things/",
    "/other/",
  );
  const customDependency = renameSymbols(
    originalDependency,
    new Map([
      ["readOther", "get"],
      ["_readOtherSend", "_getSend"],
      ["_readOtherDeserialize", "_getDeserialize"],
      ["ReadOtherOptions", "GetOptions"],
    ]),
  );
  inputs.baseGenerated.set(oldFile, inputs.baseGenerated.get(oldFile) + `\n${originalDependency}`);
  inputs.baseSource.set(
    oldFile,
    inputs.baseSource
      .get(oldFile)
      .replace(
        "return _readItemDeserialize(normalize(guardResult(response), options));",
        "return get;",
      ) + `\n${customDependency}`,
  );
  inputs.baseGenerated.set(
    oldOptions,
    inputs.baseGenerated.get(oldOptions) + `\n${options("ReadOtherOptions")}`,
  );
  inputs.baseSource.set(
    oldOptions,
    inputs.baseSource.get(oldOptions) + `\n${options("GetOptions")}`,
  );
  for (const [file, text] of tree("split", "getOther", "GetOtherOptions"))
    inputs.generated.set(file, text.replaceAll("/things/", "/other/"));
  for (const [file, text] of tree("nested/new", "get", "GetOptions"))
    inputs.generated.set(
      file,
      `${inputs.generated.get(file)}\n${text.replaceAll("/things/", "/unrelated/")}`,
    );

  const result = planOperations(inputs);
  assert.ok(result.diagnostics.some((item) => item.declaration === "finishResult"));
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
