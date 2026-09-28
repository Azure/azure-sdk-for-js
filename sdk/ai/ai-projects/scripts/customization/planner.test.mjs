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
