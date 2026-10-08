// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { planCustomization } from "./planner.mjs";

function models() {
  return new Map([
    ["models/models.ts", "export interface Model { value?: string; }"],
    ["models/index.ts", 'export type { Model } from "./models.js";'],
    ["index.ts", 'export type { Model } from "./models/index.js";'],
  ]);
}

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
