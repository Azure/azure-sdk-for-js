// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { retainCustomizedOnConflict } from "./ast-merge.mjs";
import { validateCustomization } from "./guards.mjs";
import { planCustomization } from "./planner.mjs";

function models() {
  return new Map([
    ["models/models.ts", "export interface Model { value?: string; }"],
    ["models/index.ts", 'export type { Model } from "./models.js";'],
    ["index.ts", 'export type { Model } from "./models/index.js";'],
  ]);
}

function rleClientFixture() {
  const baseGenerated = models();
  const baseSource = models();
  const generated = models();
  const scaffold = `import type { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import type { ContinuablePage } from "./static-helpers/pagingHelpers.js";`;
  for (const tree of [baseGenerated, baseSource, generated])
    tree.set("index.ts", scaffold + tree.get("index.ts"));
  const base = `export class AIProjectClient {
    constructor() { this.beta = _getBetaOperations(this._client); }
  }`;
  const customized = `export class AIProjectClient {
    constructor() {
      this._cognitiveScopeClient = createAIProject(endpoint, credential, { scopes: ["https://ai.azure.com/.default"] });
      this._azureScopeClient = createAIProject(endpoint, credential);
      this.beta = _getBetaOperations(this._cognitiveScopeClient, credential, endpoint);
      this.telemetry = customTelemetry();
    }
  }`;
  const incoming = `import { RLEOperations, _getRLEOperations } from "./classic/rle/index.js";
${base
  .replace("constructor()", "public readonly rle: RLEOperations; constructor()")
  .replace("this.beta =", "this.rle = _getRLEOperations(this._client); this.beta =")}`;
  baseGenerated.set("aiProjectClient.ts", base);
  baseSource.set("aiProjectClient.ts", customized);
  generated.set("aiProjectClient.ts", incoming);
  return { baseGenerated, baseSource, generated };
}

test("adds emitted RLE client members with the maintained Foundry auth context", () => {
  const inputs = rleClientFixture();
  const plan = planCustomization(inputs);
  assert.deepEqual(plan.diagnostics, []);
  assert.deepEqual(validateCustomization({ ...inputs, ...plan }), []);
  const client = plan.source.get("aiProjectClient.ts");
  assert.match(client, /import type \{ RLEOperations \} from "\.\/classic\/rle\/index\.js"/);
  assert.match(client, /import \{ _getRLEOperations \} from "\.\/classic\/rle\/index\.js"/);
  assert.match(client, /public readonly rle: RLEOperations/);
  assert.match(client, /this.rle = _getRLEOperations\(this._cognitiveScopeClient\)/);
  assert.match(client, /this.telemetry = customTelemetry\(\)/);
  assert.match(client, /this._azureScopeClient = createAIProject\(endpoint, credential\)/);
  const repeated = planCustomization({
    baseGenerated: inputs.generated,
    baseSource: plan.source,
    generated: inputs.generated,
  });
  assert.deepEqual(repeated.diagnostics, []);
  assert.equal(repeated.source.get("aiProjectClient.ts"), client);
});

test("RLE guards reject wrong auth context, missing wiring, and unrelated constructor edits", () => {
  for (const change of [
    (text) =>
      text.replace(
        "_getRLEOperations(this._cognitiveScopeClient)",
        "_getRLEOperations(this._azureScopeClient)",
      ),
    (text) => text.replace("this.rle = _getRLEOperations(this._cognitiveScopeClient);", ""),
    (text) => text.replace("this.telemetry = customTelemetry();", ""),
    (text) =>
      text.replace("https://ai.azure.com/.default", "https://management.azure.com/.default"),
  ]) {
    const inputs = rleClientFixture();
    const plan = planCustomization(inputs);
    plan.source.set("aiProjectClient.ts", change(plan.source.get("aiProjectClient.ts")));
    assert.notDeepEqual(validateCustomization({ ...inputs, ...plan }), []);
  }
});

test("does not infer RLE wiring from an unsupported factory or missing Foundry context", () => {
  for (const target of ["generated", "baseSource"]) {
    const inputs = rleClientFixture();
    inputs[target].set(
      "aiProjectClient.ts",
      inputs[target]
        .get("aiProjectClient.ts")
        .replace(
          target === "generated" ? "_getRLEOperations(this._client)" : "_getBetaOperations",
          "unknownFactory",
        ),
    );
    assert.ok(planCustomization(inputs).diagnostics.some((item) => item.member === "rle"));
  }
});

test("does not automatically wire unrelated new protected client groups", () => {
  const inputs = rleClientFixture();
  inputs.generated.set(
    "aiProjectClient.ts",
    inputs.generated
      .get("aiProjectClient.ts")
      .replaceAll("rle", "other")
      .replaceAll("RLE", "Other"),
  );
  const plan = planCustomization(inputs);
  assert.equal(plan.source.get("aiProjectClient.ts"), inputs.baseSource.get("aiProjectClient.ts"));
  assert.notDeepEqual(validateCustomization({ ...inputs, ...plan }), []);
});

test("requires generated RLE imports rather than inferring their module", () => {
  const inputs = rleClientFixture();
  inputs.generated.set(
    "aiProjectClient.ts",
    inputs.generated.get("aiProjectClient.ts").replace("./classic/rle/index.js", "./custom.js"),
  );
  assert.ok(planCustomization(inputs).diagnostics.some((item) => item.member === "rle"));
});

function groups(names) {
  return `
import type { Context } from "../../context.js";
${names.map((name) => `import { ${name}Operations, _get${name}Operations } from "./${name}/index.js";`).join("\n")}
export interface BetaOperations {
${names.map((name) => `${name.toLowerCase()}: ${name}Operations;`).join("\n")}
}
export function _getBetaOperations(context: Context): BetaOperations {
return {
${names.map((name) => `${name.toLowerCase()}: _get${name}Operations(context)`).join(",\n")}
};
}`;
}

test("preserves customized group order while applying emitted group changes", () => {
  const baseGenerated = models();
  const baseSource = models();
  const generated = models();
  baseGenerated.set("classic/beta/index.ts", groups(["Agents", "Other", "Old"]));
  baseSource.set("classic/beta/index.ts", groups(["Other", "Agents", "Old"]));
  generated.set("classic/beta/index.ts", groups(["Agents", "Other", "Voice"]));
  const plan = planCustomization({ baseGenerated, baseSource, generated });
  assert.deepEqual(plan.diagnostics, []);
  const result = plan.source.get("classic/beta/index.ts");
  assert.ok(result.indexOf("other:") < result.indexOf("agents:"));
  assert.match(result, /voice:/);
  assert.doesNotMatch(result, /\bold:/);
});

test("reports an incompatible declaration change rather than choosing a side", () => {
  const baseGenerated = models();
  const baseSource = models();
  const generated = models();
  baseGenerated.set("api/example/options.ts", "export interface Options { value: string; }");
  baseSource.set("api/example/options.ts", "export interface Options { value: number; }");
  generated.set("api/example/options.ts", "export interface Options { value: boolean; }");
  const plan = planCustomization({ baseGenerated, baseSource, generated });
  assert.ok(plan.diagnostics.some((item) => item.file === "api/example/options.ts"));
});

test("recovery keeps the customized declaration of an incompatible change and applies the rest", () => {
  const baseGenerated = models();
  const baseSource = models();
  const generated = models();
  baseGenerated.set("api/example/options.ts", "export interface Options { value: string; }");
  baseSource.set("api/example/options.ts", "export interface Options { value: number; }");
  generated.set("api/example/options.ts", "export interface Options { value: boolean; }");
  for (const tree of [baseGenerated, baseSource])
    tree.set("api/example/other.ts", "export interface Other { a: string; }");
  generated.set("api/example/other.ts", "export interface Other { a: string; b?: string; }");
  const inputs = { baseGenerated, baseSource, generated };
  assert.ok(
    planCustomization(inputs).diagnostics.some((item) => item.file === "api/example/options.ts"),
  );
  const retained = [];
  retainCustomizedOnConflict(retained);
  try {
    const plan = planCustomization(inputs);
    assert.deepEqual(plan.diagnostics, []);
    assert.match(plan.source.get("api/example/options.ts"), /value: number/);
    assert.match(plan.source.get("api/example/other.ts"), /b\?: string/);
    assert.deepEqual(
      retained.map((item) => `${item.file}::${item.declaration}`),
      ["api/example/options.ts::Options"],
    );
    assert.equal(retained[0].incomingText.includes("boolean"), true);
  } finally {
    retainCustomizedOnConflict(null);
  }
});

test("recovery keeps a declaration whose emitted addition conflicts and lists the addition", () => {
  const baseGenerated = models();
  const baseSource = models();
  const generated = models();
  // The guards require the hand-maintained paging imports in the package entry point.
  const entryPoint = `import type { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import type { ContinuablePage } from "./static-helpers/pagingHelpers.js";
export type { Model } from "./models/index.js";`;
  for (const tree of [baseGenerated, baseSource, generated]) tree.set("index.ts", entryPoint);
  baseGenerated.set("api/example/options.ts", "export interface Options { value: string; }");
  baseSource.set("api/example/options.ts", "export interface Options { value: number; }");
  generated.set(
    "api/example/options.ts",
    "export interface Options { value: boolean; extra?: string; }",
  );
  const inputs = { baseGenerated, baseSource, generated };
  const retained = [];
  retainCustomizedOnConflict(retained);
  try {
    const plan = planCustomization(inputs);
    assert.deepEqual(plan.diagnostics, []);
    const guardInputs = {
      ...inputs,
      source: plan.source,
      matches: plan.matches,
      modelRenames: plan.modelRenames,
    };
    // The keys the planner records are the keys the guards excuse.
    const strict = validateCustomization(guardInputs);
    assert.ok(strict.some((item) => item.declaration === "Options" && item.member === "extra"));
    const unapplied = [];
    const keys = new Set(retained.map((item) => `${item.file}::${item.declaration}`));
    assert.deepEqual(validateCustomization({ ...guardInputs, retained: keys, unapplied }), []);
    assert.deepEqual(
      unapplied.map((item) => `${item.file}::${item.declaration}.${item.member}`),
      ["api/example/options.ts::Options.extra"],
    );
  } finally {
    retainCustomizedOnConflict(null);
  }
});

test("rejects a new emitted file that collides with custom-only source", () => {
  const baseGenerated = models();
  const baseSource = models();
  const generated = models();
  baseSource.set("custom.ts", "export const setting = 'custom';");
  generated.set("custom.ts", "export const setting = 'generated';");
  const plan = planCustomization({ baseGenerated, baseSource, generated });
  assert.ok(
    plan.diagnostics.some((item) => item.file === "custom.ts" && /collides/.test(item.message)),
  );
});

function namespaced(tree) {
  tree.set(
    "models/models.ts",
    'import type { Tool } from "./openAI/models.js";\nexport interface Model { value?: string; tool?: Tool; }',
  );
  tree.set("models/openAI/models.ts", "export interface Tool { name: string; }");
  tree.set("models/openAI/index.ts", 'export type { Tool } from "./models.js";');
  tree.set(
    "index.ts",
    'export type { Model } from "./models/index.js";\nexport type { Tool } from "./models/openAI/index.js";',
  );
  return tree;
}

function modelFiles(plan) {
  return [...plan.source.keys()].filter((file) => file.startsWith("models/")).sort();
}

test("flattens emitted model namespaces without mirroring their modules into source", () => {
  const plan = planCustomization({
    baseGenerated: models(),
    baseSource: models(),
    generated: namespaced(models()),
  });
  assert.deepEqual(plan.diagnostics, []);
  assert.deepEqual(modelFiles(plan), ["models/index.ts", "models/models.ts"]);
  assert.match(plan.source.get("models/models.ts"), /export interface Tool\b/);
  assert.match(plan.source.get("models/index.ts"), /\bTool\b/);
  assert.match(plan.source.get("index.ts"), /\bTool\b/);
  assert.doesNotMatch(plan.source.get("index.ts"), /openAI/);
});

function flattened() {
  const tree = models();
  tree.set(
    "models/models.ts",
    "export interface Model { value?: string; tool?: Tool; }\nexport interface Tool { name: string; }",
  );
  tree.set("models/index.ts", 'export type { Model, Tool } from "./models.js";');
  tree.set("models/openAI/models.ts", 'export type { Tool } from "../models.js";');
  tree.set("models/openAI/index.ts", 'export type { Tool } from "../models.js";');
  tree.set("index.ts", 'export type { Model, Tool } from "./models/index.js";');
  return tree;
}

test("keeps a model re-export module only while customized source imports it", () => {
  const baseSource = flattened();
  baseSource.set(
    "toolHelpers.ts",
    'import type { Tool } from "./models/openAI/models.js";\nexport function toolName(tool: Tool): string { return tool.name; }',
  );
  const generated = namespaced(models());
  generated.set(
    "models/openAI/models.ts",
    "export interface Tool { name: string; strict?: boolean; }",
  );
  const plan = planCustomization({ baseGenerated: namespaced(models()), baseSource, generated });
  assert.deepEqual(plan.diagnostics, []);
  assert.deepEqual(modelFiles(plan), [
    "models/index.ts",
    "models/models.ts",
    "models/openAI/models.ts",
  ]);
  assert.match(plan.source.get("models/openAI/models.ts"), /\bTool\b.*from "\.\.\/models\.js"/s);
  assert.match(plan.source.get("models/models.ts"), /strict\?: boolean/);
  assert.equal(plan.source.get("toolHelpers.ts"), baseSource.get("toolHelpers.ts"));
});

test("removes previously mirrored model re-export modules that nothing imports", () => {
  const plan = planCustomization({
    baseGenerated: namespaced(models()),
    baseSource: flattened(),
    generated: namespaced(models()),
  });
  assert.deepEqual(plan.diagnostics, []);
  assert.deepEqual(modelFiles(plan), ["models/index.ts", "models/models.ts"]);
  assert.match(plan.source.get("models/models.ts"), /export interface Tool\b/);
});
