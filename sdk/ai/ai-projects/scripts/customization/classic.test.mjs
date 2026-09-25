// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { mergeCustomizedClassic, relocatedMemberDiagnostics } from "./classic.mjs";
import { validateCustomization } from "./guards.mjs";
import { parse } from "./modules.mjs";
import { planCustomization } from "./planner.mjs";

function models() {
  return {
    "models/models.ts": "export interface Model { value?: string; }",
    "models/index.ts": 'export type { Model } from "./models.js";',
  };
}

function operation(name, route, method, optionName) {
  return `
export function _${name}Send(context: Client, id: string, options: ${optionName} = { requestOptions: {} }): StreamableMethod {
  const path = expandUrlTemplate("${route}{?api%2Dversion}", { id: id, "api%2Dversion": context.apiVersion ?? "v1" }, {});
  return context.path(path).${method}({ ...operationOptionsToRequestParameters(options), headers: { accept: "application/json", ...options.requestOptions?.headers } });
}
export async function _${name}Deserialize(result: PathUncheckedResponse): Promise<string> { return result.body; }
/** ${name} operation. */
export async function ${name}(context: Client, id: string, options: ${optionName} = { requestOptions: {} }): Promise<string> {
  const result = await _${name}Send(context, id, options);
  return _${name}Deserialize(result);
}`;
}

function operations(depth, specs) {
  const up = "../".repeat(depth);
  return `import type { AIProjectContext as Client } from "${up}index.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { expandUrlTemplate } from "../${up}static-helpers/urlTemplate.js";
import type { ${specs.map((spec) => spec[3]).join(", ")} } from "./options.js";
${specs.map((spec) => operation(...spec)).join("\n")}`;
}

function options(names) {
  return `import type { OperationOptions } from "@azure-rest/core-client";
${names.map((name) => `/** Optional parameters. */\nexport interface ${name} extends OperationOptions {}`).join("\n\n")}`;
}

function classic(depth, group, apiGroup, specs) {
  const up = "../".repeat(depth);
  return `import { AIProjectContext } from "${up}api/aiProjectContext.js";
import { ${specs.map((spec) => spec[0]).join(", ")} } from "${up}api/${apiGroup}/operations.js";
import { ${specs.map((spec) => spec[3]).join(", ")} } from "${up}api/${apiGroup}/options.js";

/** Interface representing a ${group} operations. */
export interface ${group}Operations {
${specs.map(([name, , , optionName]) => `  /** ${name} operation. */\n  ${name}: (id: string, options?: ${optionName}) => Promise<string>;`).join("\n")}
}

function _get${group}(context: AIProjectContext) {
  return {
${specs.map(([name, , , optionName]) => `    ${name}: (id: string, options?: ${optionName}) => ${name}(context, id, options),`).join("\n")}
  };
}

export function _get${group}Operations(context: AIProjectContext): ${group}Operations {
  return {
    ..._get${group}(context),
  };
}`;
}

const getItem = ["getItem", "/items/{id}", "get", "ItemsGetItemOptionalParams"];
const betaArchive = [
  "archiveItem",
  "/items/{id}:archive",
  "post",
  "BetaItemsArchiveItemOptionalParams",
];
const archive = ["archiveItem", "/items/{id}:archive", "post", "ItemsArchiveItemOptionalParams"];
const restore = [
  "restoreItem",
  "/items/{id}:restore",
  "post",
  "BetaItemsRestoreItemOptionalParams",
];

// A customized classic module with custom-only overloads and factory behavior.
const customizedItems = `import type { AIProjectContext } from "../../api/aiProjectContext.js";
import { getItem } from "../../api/items/operations.js";
import type { ItemsGetItemOptionalParams } from "../../api/items/options.js";

/** Operations for items. */
export interface ItemsOperations {
  /** getItem operation. */
  getItem: (id: string, options?: ItemsGetItemOptionalParams) => Promise<string>;
  /** Reads an item, or returns the fallback when it cannot be read. */
  tryGetItem(id: string): Promise<string | undefined>;
  tryGetItem(id: string, fallback: string): Promise<string>;
}

function _getItems(context: AIProjectContext, fallbackLabel?: string) {
  return {
    getItem: (id: string, options?: ItemsGetItemOptionalParams) => getItem(context, id, options),
    async tryGetItem(id: string, fallback?: string): Promise<string | undefined> {
      try {
        return await getItem(context, id);
      } catch {
        return fallback ?? fallbackLabel;
      }
    },
  };
}

export function _getItemsOperations(context: AIProjectContext, fallbackLabel?: string): ItemsOperations {
  return { ..._getItems(context, fallbackLabel) };
}`;

function relocationTrees() {
  const shared = {
    ...models(),
    "api/items/options.ts": options([getItem[3]]),
    "api/items/operations.ts": operations(1, [getItem]),
    "api/beta/items/options.ts": options([betaArchive[3], restore[3]]),
    "api/beta/items/operations.ts": operations(2, [betaArchive, restore]),
    "classic/beta/items/index.ts": classic(3, "BetaItems", "beta/items", [betaArchive, restore]),
  };
  const baseGenerated = new Map(
    Object.entries({
      ...shared,
      "classic/items/index.ts": classic(2, "Items", "items", [getItem]),
    }),
  );
  const baseSource = new Map(
    Object.entries({ ...shared, "classic/items/index.ts": customizedItems }),
  );
  const generated = new Map(
    Object.entries({
      ...models(),
      "api/items/options.ts": options([getItem[3], archive[3]]),
      "api/items/operations.ts": operations(1, [getItem, archive]),
      "classic/items/index.ts": classic(2, "Items", "items", [getItem, archive]),
      "api/beta/items/options.ts": options([restore[3]]),
      "api/beta/items/operations.ts": operations(2, [restore]),
      "classic/beta/items/index.ts": classic(3, "BetaItems", "beta/items", [restore]),
    }),
  );
  return { baseGenerated, baseSource, generated };
}

test("relocates operations into a customized classic module without regenerating it", () => {
  const inputs = relocationTrees();
  const plan = planCustomization(inputs);
  assert.deepEqual(plan.diagnostics, []);
  const items = plan.source.get("classic/items/index.ts");
  parse(items);
  assert.match(items, /tryGetItem\(id: string\): Promise<string \| undefined>;/);
  assert.match(items, /tryGetItem\(id: string, fallback: string\): Promise<string>;/);
  assert.match(items, /return fallback \?\? fallbackLabel;/);
  assert.match(items, /_getItems\(context: AIProjectContext, fallbackLabel\?: string\)/);
  assert.match(
    items,
    /archiveItem: \(id: string, options\?: ItemsArchiveItemOptionalParams\) => Promise<string>;/,
  );
  assert.match(
    items,
    /archiveItem: \(id: string, options\?: ItemsArchiveItemOptionalParams\) => archiveItem\(context, id, options\)/,
  );
  assert.match(
    items,
    /import \{ getItem, archiveItem \} from "\.\.\/\.\.\/api\/items\/operations\.js";/,
  );
  assert.ok(items.indexOf("archiveItem:") < items.indexOf("tryGetItem("));
  const beta = plan.source.get("classic/beta/items/index.ts");
  assert.doesNotMatch(beta, /archiveItem/);
  assert.match(beta, /restoreItem: \(id: string, options\?: BetaItemsRestoreItemOptionalParams\)/);
  assert.deepEqual(
    validateCustomization({
      ...inputs,
      source: plan.source,
      matches: plan.matches,
      modelRenames: plan.modelRenames,
    }),
    [],
  );
});

test("reports a customized classic member instead of dropping it with its operation", () => {
  const deleteItem = ["deleteItem", "/items/{id}", "delete", "ItemsDeleteItemOptionalParams"];
  const baseText = classic(2, "Items", "items", [getItem, deleteItem]);
  const customText = baseText
    .replace(
      "  /** getItem operation. */",
      "  /** Custom-only member. */\n  ping(): string;\n  /** getItem operation. */",
    )
    .replace("  return {\n    getItem:", '  return {\n    ping: () => "pong",\n    getItem:');
  const incomingText = classic(2, "Items", "items", [getItem]);
  const merge = (custom) =>
    mergeCustomizedClassic({
      file: "classic/items/index.ts",
      baseText,
      customText: custom,
      incomingText,
      matches: [],
      resolvedText: operations(1, [getItem]),
      resolvedOptionsText: options([getItem[3]]),
    });
  const removed = merge(customText);
  assert.deepEqual(removed.diagnostics, []);
  assert.doesNotMatch(removed.text, /deleteItem/);
  assert.match(removed.text, /ping: \(\) => "pong"/);
  const customized = merge(
    customText.replace(
      "deleteItem(context, id, options)",
      "deleteItem(context, id, { ...options, requestOptions: {} })",
    ),
  );
  assert.equal(customized.text, undefined);
  assert.ok(
    customized.diagnostics.some(
      (item) => item.declaration === "deleteItem" && /customized member/.test(item.message),
    ),
  );
});

test("reports a customized classic member whose operation moves to another group", () => {
  const baseText = classic(3, "BetaItems", "beta/items", [betaArchive, restore]);
  const matches = [
    {
      base: { name: "archiveItem", file: "api/beta/items/operations.ts" },
      incoming: { name: "archiveItem", file: "api/items/operations.ts" },
    },
  ];
  assert.deepEqual(
    relocatedMemberDiagnostics("classic/beta/items/index.ts", baseText, baseText, matches),
    [],
  );
  const customized = baseText.replace(
    "archiveItem(context, id, options)",
    'archiveItem(context, id, { ...options, requestOptions: { headers: { "x-archive": "1" } } })',
  );
  const diagnostics = relocatedMemberDiagnostics(
    "classic/beta/items/index.ts",
    customized,
    baseText,
    matches,
  );
  assert.equal(diagnostics.length, 1);
  assert.match(diagnostics[0].message, /classic\/items\/index\.ts/);
});

test("retains compatibility aliases that reuse a generated name the customization renamed", () => {
  const patch = ["patchItem", "/items/{id}", "patch", "ItemsPatchItemOptionalParams"];
  const generatedBarrel = (names) =>
    `export { ${names.map((spec) => spec[0]).join(", ")} } from "./operations.js";
export type { ${names.map((spec) => spec[3]).join(", ")} } from "./options.js";`;
  const customOperations = operations(1, [patch])
    .replaceAll("ItemsPatchItemOptionalParams", "ItemsUpdateItemOptionalParams")
    .replace("export async function patchItem(", "export async function updateItem(")
    .concat(
      `
/** Compatibility alias. */
export async function patchItem(context: Client, id: string, options: ItemsPatchItemOptionalParams = { requestOptions: {} }): Promise<string> {
  return updateItem(context, id, options);
}`,
    )
    .replace(
      'import type { ItemsUpdateItemOptionalParams } from "./options.js";',
      'import type { ItemsUpdateItemOptionalParams, ItemsPatchItemOptionalParams } from "./options.js";',
    );
  const customOptions = `${options(["ItemsUpdateItemOptionalParams"])}

/** Compatibility alias. */
export type ItemsPatchItemOptionalParams = ItemsUpdateItemOptionalParams;`;
  const customBarrel = `export { updateItem, patchItem } from "./operations.js";
export type { ItemsUpdateItemOptionalParams, ItemsPatchItemOptionalParams } from "./options.js";`;
  const baseGenerated = new Map(
    Object.entries({
      ...models(),
      "api/items/operations.ts": operations(1, [patch]),
      "api/items/options.ts": options([patch[3]]),
      "api/items/index.ts": generatedBarrel([patch]),
    }),
  );
  const baseSource = new Map(
    Object.entries({
      ...models(),
      "api/items/operations.ts": customOperations,
      "api/items/options.ts": customOptions,
      "api/items/index.ts": customBarrel,
    }),
  );
  const generated = new Map(
    Object.entries({
      ...models(),
      "api/items/operations.ts": operations(1, [patch, getItem]),
      "api/items/options.ts": options([patch[3], getItem[3]]),
      "api/items/index.ts": generatedBarrel([patch, getItem]),
    }),
  );
  const inputs = { baseGenerated, baseSource, generated };
  const plan = planCustomization(inputs);
  assert.deepEqual(plan.diagnostics, []);
  const resolved = plan.source.get("api/items/operations.ts");
  assert.match(resolved, /export async function updateItem\(/);
  assert.match(
    resolved,
    /export async function patchItem\([^)]*\): Promise<string> \{\s*return updateItem\(/,
  );
  assert.match(resolved, /export async function getItem\(/);
  const resolvedOptions = plan.source.get("api/items/options.ts");
  assert.match(resolvedOptions, /interface ItemsUpdateItemOptionalParams/);
  assert.match(
    resolvedOptions,
    /type ItemsPatchItemOptionalParams = ItemsUpdateItemOptionalParams;/,
  );
  assert.match(resolvedOptions, /interface ItemsGetItemOptionalParams/);
  const barrel = plan.source.get("api/items/index.ts");
  for (const name of [
    "updateItem",
    "patchItem",
    "getItem",
    "ItemsUpdateItemOptionalParams",
    "ItemsPatchItemOptionalParams",
    "ItemsGetItemOptionalParams",
  ])
    assert.match(barrel, new RegExp(`\\b${name}\\b`), `${name} export`);
  assert.deepEqual(
    validateCustomization({
      ...inputs,
      source: plan.source,
      matches: plan.matches,
      modelRenames: plan.modelRenames,
    }),
    [],
  );
});
