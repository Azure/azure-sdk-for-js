// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { retainCustomizedOnConflict } from "./ast-merge.mjs";
import {
  ClassicRenderError,
  mergeCustomizedClassic,
  relocatedMemberDiagnostics,
} from "./classic.mjs";
import { validateCustomization } from "./guards.mjs";
import { parse } from "./modules.mjs";
import { classicFromOperations } from "./operations.mjs";
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

function tracingPromotionTrees({ telephony = false, conversations = false } = {}) {
  const suffix = telephony
    ? "VoiceAgentsTelephony"
    : conversations
      ? "VoiceAgentsConversations"
      : "Agents";
  const group = telephony
    ? "voiceAgents/telephony"
    : conversations
      ? "voiceAgents/conversations"
      : "agents";
  const name = telephony ? "createBinding" : conversations ? "$delete" : "createFromPrompt";
  const method = conversations ? "delete" : "post";
  const before = [name, `/agents/{id}/${name}`, method, `Beta${suffix}Options`];
  const after = [name, before[1], method, `${suffix}Options`];
  const campaign = ["getCampaign", "/campaigns/{id}", "get", "CampaignOptions"];
  const oldSpecs = telephony ? [before, campaign] : [before];
  const trees = {
    baseGenerated: new Map(Object.entries(models())),
    baseSource: new Map(Object.entries(models())),
    generated: new Map(Object.entries(models())),
  };
  const oldFile = `classic/beta/${group}/index.ts`;
  const file = `classic/${group}/index.ts`;
  const depth = telephony || conversations ? 4 : 3;
  for (const tree of [trees.baseGenerated, trees.baseSource]) {
    tree.set(`api/beta/${group}/operations.ts`, operations(depth - 1, oldSpecs));
    tree.set(`api/beta/${group}/options.ts`, options(oldSpecs.map((spec) => spec[3])));
    tree.set(
      oldFile,
      classic(depth, `Beta${suffix}`, `beta/${group}`, oldSpecs).replaceAll("$delete:", "delete:"),
    );
  }
  trees.generated.set(`api/${group}/operations.ts`, operations(depth - 2, [after]));
  trees.generated.set(`api/${group}/options.ts`, options([after[3]]));
  trees.generated.set(
    file,
    classic(depth - 1, suffix, group, [after]).replaceAll("$delete:", "delete:"),
  );
  if (telephony) {
    trees.generated.set("api/beta/voiceAgents/telephony/operations.ts", operations(3, [campaign]));
    trees.generated.set("api/beta/voiceAgents/telephony/options.ts", options([campaign[3]]));
    trees.generated.set(oldFile, classic(4, `Beta${suffix}`, `beta/${group}`, [campaign]));
    const api = "api/beta/voiceAgents/telephony/operations.ts";
    trees.baseSource.set(
      api,
      trees.baseSource
        .get(api)
        .replace("return _getCampaignDeserialize(result);", "return getCampaignResult(result);") +
        "\nfunction getCampaignResult(result: PathUncheckedResponse): Promise<string> { return _getCampaignDeserialize(result); }",
    );
  }
  const wrapped = trees.baseSource
    .get(oldFile)
    .replaceAll(
      "context: AIProjectContext)",
      "context: AIProjectContext, tracingConfig?: ResolvedTracingConfig)",
    )
    .replace(
      `=> ${name}(context, id, options)`,
      telephony
        ? `=> run("create_binding", () => ${name}(context, id, options))`
        : `=> traceVoiceAgentOperation("delete_or_create", context.endpoint, tracingConfig, () => ${name}(context, id, options))`,
    )
    .replace(`..._getBeta${suffix}(context)`, `..._getBeta${suffix}(context, tracingConfig)`)
    .replace(
      "  return {",
      telephony
        ? `  const run = <T>(name: string, operation: () => Promise<T>): Promise<T> =>
      traceVoiceAgentOperation(name, context.endpoint, tracingConfig, operation);
  return {`
        : "  return {",
    );
  trees.baseSource.set(
    oldFile,
    `import type { ResolvedTracingConfig } from "${"../".repeat(depth)}tracing/configuration.js";
import { traceVoiceAgentOperation } from "${"../".repeat(depth)}tracing/voiceAgentTracing.js";
${wrapped}`,
  );
  return { trees, oldFile, file, name };
}

for (const scenario of [{}, { conversations: true }, { telephony: true }]) {
  test(`reviewed GA tracing promotion preserves wrappers and factory configuration ${JSON.stringify(scenario)}`, () => {
    const { trees, oldFile, file } = tracingPromotionTrees(scenario);
    const plan = planCustomization(trees);
    assert.deepEqual(plan.diagnostics, []);
    const output = plan.source.get(file);
    assert.match(output, /tracingConfig\?: ResolvedTracingConfig/);
    assert.match(output, /traceVoiceAgentOperation/);
    assert.doesNotMatch(output, /(?:export interface|options\?:) Beta(?:Agents|VoiceAgents)/);
    if (scenario.telephony) {
      assert.match(output, /const run/);
      assert.match(output, /run\("create_binding"/);
      assert.match(plan.source.get(oldFile), /getCampaign/);
      assert.doesNotMatch(plan.source.get(oldFile), /createBinding/);
      assert.doesNotMatch(output, /getCampaign/);
      assert.match(
        plan.source.get("api/beta/voiceAgents/telephony/operations.ts"),
        /function getCampaignResult/,
      );
      assert.doesNotMatch(
        plan.source.get("api/voiceAgents/telephony/operations.ts"),
        /getCampaignResult/,
      );
    } else assert.equal(plan.source.has(oldFile), false);
  });
}

test("reviewed promotion still rejects altered forwarding and duplicate delegate calls", () => {
  for (const change of [
    "createFromPrompt(context, 'wrong', options)",
    "(createFromPrompt(context, id, options), createFromPrompt(context, id, options))",
  ]) {
    const { trees, oldFile } = tracingPromotionTrees();
    trees.baseSource.set(
      oldFile,
      trees.baseSource.get(oldFile).replace("createFromPrompt(context, id, options)", change),
    );
    const plan = planCustomization(trees);
    assert.ok(plan.diagnostics.some((item) => /cannot be relocated/.test(item.message)));
  }
});

test("reviewed tracing promotion follows customized delegates after positional preview opt-in retirement", () => {
  const { trees, oldFile, file, name } = tracingPromotionTrees();
  const api = "api/beta/agents/operations.ts";
  trees.baseGenerated.set(
    api,
    trees.baseGenerated
      .get(api)
      .replaceAll(
        "context: Client, id: string",
        'context: Client, foundryFeatures: "VoiceAgents=V1Preview", id: string',
      )
      .replace(
        `_${name}Send(context, id, options)`,
        `_${name}Send(context, foundryFeatures, id, options)`,
      )
      .replace("headers: { accept:", 'headers: { "foundry-features": foundryFeatures, accept:'),
  );
  trees.baseSource.set(
    api,
    trees.baseSource
      .get(api)
      .replace(
        "  const path =",
        '  const foundryFeatures = "VoiceAgents=V1Preview";\n  const path =',
      )
      .replace("headers: { accept:", 'headers: { "foundry-features": foundryFeatures, accept:'),
  );
  trees.baseGenerated.set(
    oldFile,
    trees.baseGenerated
      .get(oldFile)
      .replaceAll(
        "id: string, options?",
        'foundryFeatures: "VoiceAgents=V1Preview", id: string, options?',
      )
      .replace(`${name}(context, id, options)`, `${name}(context, foundryFeatures, id, options)`),
  );
  const plan = planCustomization(trees);
  assert.deepEqual(plan.diagnostics, []);
  assert.match(plan.source.get(file), /traceVoiceAgentOperation/);
  assert.doesNotMatch(plan.source.get(file), /foundryFeatures/);
  assert.doesNotMatch(plan.source.get("api/agents/operations.ts"), /foundry-features/);
});

test("reviewed promotion does not authorize an unrelated destination or custom-only declaration", () => {
  const { trees, oldFile } = tracingPromotionTrees();
  trees.baseSource.set(
    oldFile,
    trees.baseSource.get(oldFile) + "\nfunction unrelated() { return 1; }",
  );
  assert.ok(
    planCustomization(trees).diagnostics.some((item) =>
      /custom-only declarations/.test(item.message),
    ),
  );
  for (const file of [...trees.generated.keys()].filter((file) => file.includes("/agents/"))) {
    trees.generated.set(file.replace("/agents/", "/other/"), trees.generated.get(file));
    trees.generated.delete(file);
  }
  assert.ok(
    planCustomization(trees).diagnostics.some((item) => /cannot be relocated/.test(item.message)),
  );
});

test("reviewed tracing promotion rejects an existing destination member rather than overwriting it", () => {
  const { trees, file } = tracingPromotionTrees();
  trees.baseSource.set(file, trees.generated.get(file));
  assert.ok(
    planCustomization(trees).diagnostics.some((item) => /cannot be relocated/.test(item.message)),
  );
});

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
  // Plain delegating factories are still regenerated from their operations.
  assert.doesNotMatch(beta, /function _getBetaItems\(/);
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

test("merges overload and signature-only classic customizations instead of regenerating", () => {
  const generatedItems = classic(2, "Items", "items", [getItem]);
  const trees = (customClassic, customApi) => {
    const baseGenerated = new Map(
      Object.entries({
        ...models(),
        "api/items/options.ts": options([getItem[3]]),
        "api/items/operations.ts": operations(1, [getItem]),
        "classic/items/index.ts": generatedItems,
      }),
    );
    const baseSource = new Map(baseGenerated);
    baseSource.set("classic/items/index.ts", customClassic);
    if (customApi) baseSource.set("api/items/operations.ts", customApi);
    const generated = new Map(
      Object.entries({
        ...models(),
        "api/items/options.ts": options([getItem[3], archive[3]]),
        "api/items/operations.ts": operations(1, [getItem, archive]),
        "classic/items/index.ts": classic(2, "Items", "items", [getItem, archive]),
      }),
    );
    return { baseGenerated, baseSource, generated };
  };
  const member =
    "  getItem: (id: string, options?: ItemsGetItemOptionalParams) => Promise<string>;";
  const property =
    "getItem: (id: string, options?: ItemsGetItemOptionalParams) => getItem(context, id, options),";
  const retryApi = `${operations(1, [getItem])}
export async function getItemWithRetry(context: Client, id: string, options: ItemsGetItemOptionalParams = { requestOptions: {} }): Promise<string> {
  return getItem(context, id, options);
}`;
  for (const [custom, preserved, customApi] of [
    [
      generatedItems.replace(
        member,
        "  getItem: (id: string, options?: ItemsGetItemOptionalParams) => Promise<unknown>;",
      ),
      /getItem: \(id: string, options\?: ItemsGetItemOptionalParams\) => Promise<unknown>;/,
    ],
    [
      generatedItems.replace(
        member,
        "  getItem(id: string): Promise<string>;\n  getItem(id: string, options: ItemsGetItemOptionalParams): Promise<string>;",
      ),
      /getItem\(id: string\): Promise<string>;\s*getItem\(id: string, options: ItemsGetItemOptionalParams\): Promise<string>;/,
    ],
    [
      generatedItems.replace(
        property,
        "getItem: (id: string, options: ItemsGetItemOptionalParams = { requestOptions: { timeout: 1000 } }) => getItem(context, id, options),",
      ),
      /options: ItemsGetItemOptionalParams = \{ requestOptions: \{ timeout: 1000 \} \}/,
    ],
    [
      generatedItems
        .replace(property, property.replace("=> getItem(", "=> getItemWithRetry("))
        .replace("import { getItem }", "import { getItem, getItemWithRetry }"),
      /=> getItemWithRetry\(context, id, options\)/,
      retryApi,
    ],
  ]) {
    assert.notEqual(custom, generatedItems);
    const inputs = trees(custom, customApi);
    const plan = planCustomization(inputs);
    assert.deepEqual(plan.diagnostics, []);
    const items = plan.source.get("classic/items/index.ts");
    assert.match(items, preserved);
    assert.match(
      items,
      /archiveItem: \(id: string, options\?: ItemsArchiveItemOptionalParams\) => archiveItem\(context, id, options\)/,
    );
    assert.deepEqual(
      validateCustomization({
        ...inputs,
        source: plan.source,
        matches: plan.matches,
        modelRenames: plan.modelRenames,
      }),
      [],
    );
  }
});

test("reports the unresolved operation merge instead of failing to render its classic member", () => {
  // The customization and the emitter retype the same parameter differently, so
  // the operation has no resolved declaration for its classic module to render from.
  const retype = (text, type) => text.replace(/id: string/g, `id: ${type}`);
  const baseGenerated = new Map(
    Object.entries({
      ...models(),
      "api/items/options.ts": options([getItem[3]]),
      "api/items/operations.ts": operations(1, [getItem]),
      "classic/items/index.ts": classic(2, "Items", "items", [getItem]),
    }),
  );
  const baseSource = new Map(baseGenerated).set(
    "api/items/operations.ts",
    retype(operations(1, [getItem]), "number"),
  );
  const generated = new Map(baseGenerated)
    .set("api/items/operations.ts", retype(operations(1, [getItem]), "boolean"))
    .set("classic/items/index.ts", retype(classic(2, "Items", "items", [getItem]), "boolean"));
  const plan = planCustomization({ baseGenerated, baseSource, generated });
  const operationConflicts = plan.diagnostics.filter(
    (item) => item.file === "api/items/operations.ts",
  );
  assert.deepEqual([...new Set(operationConflicts.map((item) => item.declaration))].sort(), [
    "_getItemSend",
    "getItem",
  ]);
  // The conflict is the only report: nothing is rendered from the missing declaration.
  assert.deepEqual(
    plan.diagnostics.filter((item) => item.file !== "api/items/operations.ts"),
    [],
  );
});

test("reports a classic member the emitter does not declare instead of throwing", () => {
  const baseGenerated = new Map(
    Object.entries({
      ...models(),
      "api/items/options.ts": options([getItem[3]]),
      "api/items/operations.ts": operations(1, [getItem]),
      "classic/items/index.ts": classic(2, "Items", "items", [getItem]),
    }),
  );
  const generated = new Map(baseGenerated)
    .set("api/items/options.ts", options([getItem[3], archive[3]]))
    .set("api/items/operations.ts", operations(1, [getItem, archive]));
  // The emitted operations include archiveItem, but its classic interface omits it.
  generated.set("classic/items/index.ts", classic(2, "Items", "items", [getItem]) + "\n");
  const plan = planCustomization({ baseGenerated, baseSource: baseGenerated, generated });
  assert.deepEqual(
    plan.diagnostics.map(({ file, declaration }) => ({ file, declaration })),
    [{ file: "classic/items/index.ts", declaration: "archiveItem" }],
  );
  assert.match(plan.diagnostics[0].message, /missing emitted interface member for archiveItem/);
});

test("classic rendering names an operation that has no resolved declaration", () => {
  const match = {
    incoming: { file: "api/items/operations.ts", name: "getItem" },
    names: { publicNode: "getItem" },
  };
  assert.throws(
    () =>
      classicFromOperations(
        "classic/items/index.ts",
        classic(2, "Items", "items", [getItem]),
        [match],
        operations(1, [archive]),
      ),
    (error) =>
      error instanceof ClassicRenderError &&
      /missing resolved operation getItem in api\/items\/operations\.ts/.test(error.message) &&
      error.diagnostic.declaration === "getItem",
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
  // A plain delegation that customizes its signature is still a customization.
  const retyped = customText.replace(
    "deleteItem: (id: string, options?: ItemsDeleteItemOptionalParams) => Promise<string>;",
    "deleteItem: (id: string, options?: ItemsDeleteItemOptionalParams) => Promise<void>;",
  );
  const withApi = (custom, api) =>
    mergeCustomizedClassic({
      file: "classic/items/index.ts",
      baseText,
      customText: custom,
      incomingText,
      matches: [],
      resolvedText: operations(1, [getItem]),
      resolvedOptionsText: options([getItem[3]]),
      customApiText: api,
    });
  const signature = withApi(retyped, operations(1, [getItem, deleteItem]));
  assert.equal(signature.text, undefined);
  assert.ok(signature.diagnostics.some((item) => item.declaration === "deleteItem"));
  // Mirroring the customized operation signature can follow the operation.
  const mirrored = withApi(
    retyped,
    operations(1, [getItem, deleteItem]).replace(
      "export async function deleteItem(context: Client, id: string, options: ItemsDeleteItemOptionalParams = { requestOptions: {} }): Promise<string>",
      "export async function deleteItem(context: Client, id: string, options: ItemsDeleteItemOptionalParams = { requestOptions: {} }): Promise<void>",
    ),
  );
  assert.deepEqual(mirrored.diagnostics, []);
  assert.doesNotMatch(mirrored.text, /deleteItem/);
  // A delegate rerouted to another customized function is maintained behavior.
  const softApi = `${operations(1, [getItem, deleteItem])}
export async function deleteItemSoftly(context: Client, id: string, options: ItemsDeleteItemOptionalParams = { requestOptions: {} }): Promise<string> {
  return deleteItem(context, id, options);
}`;
  const rerouted = withApi(
    customText.replace(
      "=> deleteItem(context, id, options)",
      "=> deleteItemSoftly(context, id, options)",
    ),
    softApi,
  );
  assert.equal(rerouted.text, undefined);
  assert.ok(rerouted.diagnostics.some((item) => item.declaration === "deleteItem"));
});

test("recovery keeps a customized classic member the emitter removed and records it", () => {
  const deleteItem = ["deleteItem", "/items/{id}", "delete", "ItemsDeleteItemOptionalParams"];
  const baseText = classic(2, "Items", "items", [getItem, deleteItem]);
  const customText = baseText
    .replace(
      "  /** getItem operation. */",
      "  /** Custom-only member. */\n  ping(): string;\n  /** getItem operation. */",
    )
    .replace("  return {\n    getItem:", '  return {\n    ping: () => "pong",\n    getItem:')
    .replace(
      "deleteItem(context, id, options)",
      "deleteItem(context, id, { ...options, requestOptions: {} })",
    );
  const merge = (optionNames) =>
    mergeCustomizedClassic({
      file: "classic/items/index.ts",
      baseText,
      customText,
      incomingText: classic(2, "Items", "items", [getItem]),
      matches: [],
      resolvedText: operations(1, [getItem, deleteItem]),
      resolvedOptionsText: options(optionNames),
    });
  const strict = merge([getItem[3], deleteItem[3]]);
  assert.equal(strict.text, undefined);
  assert.ok(strict.diagnostics.some((item) => item.declaration === "deleteItem"));
  const sink = [];
  retainCustomizedOnConflict(sink);
  try {
    const result = merge([getItem[3], deleteItem[3]]);
    assert.deepEqual(result.diagnostics, []);
    assert.match(
      result.text,
      /deleteItem\(context, id, \{ \.\.\.options, requestOptions: \{\} \}\)/,
    );
    assert.deepEqual(
      sink.map((item) => `${item.file}::${item.declaration}`),
      ["classic/items/index.ts::deleteItem"],
    );
    assert.match(sink[0].baseText, /deleteItem: \(id: string/);
    assert.match(sink[0].customText, /requestOptions: \{\}/);
    assert.equal(sink[0].incomingText, null);
    // Keeping the member never hides an import the resolved module no longer declares.
    const missing = merge([getItem[3]]);
    assert.equal(missing.text, undefined);
    assert.ok(
      missing.diagnostics.some((item) =>
        /imports 'ItemsDeleteItemOptionalParams'/.test(item.message),
      ),
    );
  } finally {
    retainCustomizedOnConflict(null);
  }
});

test("recovery keeps a customized classic module it cannot recognize without claiming a removal", () => {
  const baseText = classic(2, "Items", "items", [getItem]);
  const merge = () =>
    mergeCustomizedClassic({
      file: "classic/items/index.ts",
      baseText,
      customText: "export const items = 1;\n",
      incomingText: baseText,
      matches: [],
      resolvedText: operations(1, [getItem]),
      resolvedOptionsText: options([getItem[3]]),
    });
  const strict = merge();
  assert.equal(strict.text, undefined);
  assert.deepEqual(
    strict.diagnostics.map((item) => item.declaration),
    ["<file>"],
  );
  const sink = [];
  retainCustomizedOnConflict(sink);
  try {
    const result = merge();
    assert.deepEqual(result, { text: undefined, diagnostics: [] });
    assert.equal(sink.length, 1);
    assert.equal(sink[0].declaration, "<file>");
    assert.equal(sink[0].baseText, undefined);
    assert.equal(sink[0].customText, undefined);
    assert.equal(sink[0].incomingText, undefined);
  } finally {
    retainCustomizedOnConflict(null);
  }
});

test("keeps a customized classic member whose resolved operation still matches it", () => {
  const baseText = classic(2, "Items", "items", [getItem]);
  const customText = `import type { AIProjectContext } from "../../api/aiProjectContext.js";
import { getItem } from "../../api/items/operations.js";
import type { ItemsGetItemOptionalParams } from "../../api/items/options.js";

/** Operations for items. */
export interface ItemsOperations {
  /** Custom-only member. */
  ping(): string;
  /** getItem operation. */
  getItem: (
    id: string,
    options?: ItemsGetItemOptionalParams,
  ) => Promise<string>;
}

function _getItems(context: AIProjectContext) {
  return {
    ping: () => "pong",
    getItem: (id: string, options?: ItemsGetItemOptionalParams) =>
      getItem(context, id, options),
  };
}

export function _getItemsOperations(context: AIProjectContext): ItemsOperations {
  return { ..._getItems(context) };
}`;
  // The emitter retyped getItem, but the resolved operation (the customized one)
  // still returns what the member declares, so re-rendering would only churn layout.
  const result = mergeCustomizedClassic({
    file: "classic/items/index.ts",
    baseText,
    customText,
    incomingText: baseText.replace("Promise<string>", "Promise<number>"),
    matches: [
      {
        incoming: { file: "api/items/operations.ts", name: "getItem" },
        names: { publicNode: "getItem" },
      },
    ],
    resolvedText: operations(1, [getItem]),
    resolvedOptionsText: options([getItem[3]]),
    customApiText: operations(1, [getItem]),
  });
  assert.deepEqual(result.diagnostics, []);
  assert.match(
    result.text,
    /getItem: \(\n {4}id: string,\n {4}options\?: ItemsGetItemOptionalParams,\n {2}\) => Promise<string>;/,
  );
  assert.match(
    result.text,
    /getItem: \(id: string, options\?: ItemsGetItemOptionalParams\) =>\n {6}getItem\(context, id, options\)/,
  );
  assert.doesNotMatch(result.text, /Promise<number>/);
});

test("updates a classic member when its resolved return literal changes", () => {
  const baseText = classic(2, "Items", "items", [getItem]).replace(
    "Promise<string>",
    'Promise<"a b">',
  );
  const customText = `import type { AIProjectContext } from "../../api/aiProjectContext.js";
import { getItem } from "../../api/items/operations.js";
import type { ItemsGetItemOptionalParams } from "../../api/items/options.js";

/** Operations for items. */
export interface ItemsOperations {
  /** Custom-only member. */
  ping(): string;
  /** getItem operation. */
  getItem: (
    id: string,
    options?: ItemsGetItemOptionalParams,
  ) => Promise<"a b">;
}

function _getItems(context: AIProjectContext) {
  return {
    ping: () => "pong",
    getItem: (id: string, options?: ItemsGetItemOptionalParams) =>
      getItem(context, id, options),
  };
}

export function _getItemsOperations(context: AIProjectContext): ItemsOperations {
  return { ..._getItems(context) };
}`;
  const incomingText = baseText.replace('Promise<"a b">', 'Promise<"ab">');
  const resolvedText = operations(1, [getItem]).replace(
    "options: ItemsGetItemOptionalParams = { requestOptions: {} }): Promise<string> {\n  const result",
    'options: ItemsGetItemOptionalParams = { requestOptions: {} }): Promise<"ab"> {\n  const result',
  );
  const result = mergeCustomizedClassic({
    file: "classic/items/index.ts",
    baseText,
    customText,
    incomingText,
    matches: [
      {
        incoming: { file: "api/items/operations.ts", name: "getItem" },
        names: { publicNode: "getItem" },
      },
    ],
    resolvedText,
    resolvedOptionsText: options([getItem[3]]),
    customApiText: operations(1, [getItem]),
  });
  assert.deepEqual(result.diagnostics, []);
  assert.match(
    result.text,
    /getItem: \(\s*id: string,\s*options\?: ItemsGetItemOptionalParams,?\s*\) => Promise<"ab">;/,
  );
  assert.doesNotMatch(result.text, /Promise<"a b">/);
});

test("ports emitted classic parameter changes through a customized tracing wrapper", async (t) => {
  const baseText = classic(2, "Items", "items", [getItem]);
  const customText = baseText.replace(
    "getItem(context, id, options)",
    'traceOperation("get_item", () => getItem(context, id, options))',
  );
  const incomingText = baseText
    .replaceAll("id: string", "itemId: string")
    .replace("getItem(context, id, options)", "getItem(context, itemId, options)");
  const incomingApi = operations(1, [getItem])
    .replaceAll("id: string", "itemId: string")
    .replaceAll("context, id, options", "context, itemId, options");
  const merge = (text, overrides = {}) =>
    mergeCustomizedClassic({
      file: "classic/items/index.ts",
      baseText,
      customText: text,
      incomingText,
      matches: [
        {
          incoming: { file: "api/items/operations.ts", name: "getItem" },
          names: { publicNode: "getItem" },
        },
      ],
      resolvedText: incomingApi,
      resolvedOptionsText: options([getItem[3]]),
      customApiText: operations(1, [getItem]),
      ...overrides,
    });
  const result = merge(customText);
  assert.deepEqual(result.diagnostics, []);
  assert.match(
    result.text,
    /traceOperation\("get_item", \(\) => getItem\(context, itemId, options\)\)/,
  );
  assert.match(result.text, /itemId: string/);
  assert.doesNotMatch(result.text, /id: string/);
  const unsafe = merge(
    customText.replace("getItem(context, id, options)", "getItem(context, options, id)"),
  );
  assert.ok(unsafe.diagnostics.length > 0);

  for (const body of [
    '{ const itemId = "maintained"; return getItem(context, id, options); }',
    "(itemId: string) => getItem(context, id, options)",
    "({ nested: { itemId } }) => getItem(context, id, options)",
  ]) {
    await t.test(`rejects a rename target collision in ${body}`, () => {
      const colliding = customText.replace("() => getItem(context, id, options)", `() => ${body}`);
      const result = merge(colliding);
      assert.ok(result.diagnostics.length > 0);
    });
  }

  for (const [kind, parameter] of [
    ["default", "options: ItemsGetItemOptionalParams = { requestOptions: { timeout: 5 } }"],
    ["rest", "...options: [ItemsGetItemOptionalParams?]"],
  ]) {
    for (const side of ["before", "custom", "after", "before and custom"]) {
      await t.test(`does not fast-path a ${kind} parameter in ${side}`, () => {
        const change = (text) =>
          text
            .replace(
              "options?: ItemsGetItemOptionalParams) => getItem(",
              `${parameter}) => getItem(`,
            )
            .replace(
              "options?: ItemsGetItemOptionalParams) => traceOperation(",
              `${parameter}) => traceOperation(`,
            );
        const result = merge(side.includes("custom") ? change(customText) : customText, {
          baseText: side.includes("before") ? change(baseText) : baseText,
          incomingText: side === "after" ? change(incomingText) : incomingText,
        });
        assert.ok(result.diagnostics.length > 0);
      });
    }
  }

  for (const [kind, updated, preserved] of [
    [
      "async modifier",
      "getItem: async (itemId: string, options?: ItemsGetItemOptionalParams) => getItem(context, itemId, options)",
      /getItem: async \(itemId: string/,
    ],
    [
      "type parameters",
      "getItem: <T>(itemId: string, options?: ItemsGetItemOptionalParams) => getItem(context, itemId, options)",
      /getItem: <T>\(itemId: string/,
    ],
    [
      "return annotation",
      "getItem: (itemId: string, options?: ItemsGetItemOptionalParams): Promise<string> => getItem(context, itemId, options)",
      /getItem: \(itemId: string,[\s\S]*\): Promise<string> =>/,
    ],
  ]) {
    await t.test(`does not fast-path an emitted ${kind} change`, () => {
      const changed = incomingText.replace(
        "getItem: (itemId: string, options?: ItemsGetItemOptionalParams) => getItem(context, itemId, options)",
        updated,
      );
      const result = merge(customText, { incomingText: changed });
      assert.ok(
        result.diagnostics.length > 0 || preserved.test(result.text),
        `the emitted ${kind} change was dropped`,
      );
    });
  }
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
  // A plain delegation that customizes its signature is still a customization.
  const api = operations(2, [betaArchive, restore]);
  const retyped = baseText.replaceAll(
    "archiveItem: (id: string, options?: BetaItemsArchiveItemOptionalParams)",
    "archiveItem: (id: string, options?: ArchiveOptions)",
  );
  assert.equal(
    relocatedMemberDiagnostics("classic/beta/items/index.ts", retyped, baseText, matches, api)
      .length,
    1,
  );
  // Mirroring the customized operation signature can follow the operation.
  assert.deepEqual(
    relocatedMemberDiagnostics(
      "classic/beta/items/index.ts",
      retyped,
      baseText,
      matches,
      api.replace(
        "export async function archiveItem(context: Client, id: string, options: BetaItemsArchiveItemOptionalParams",
        "export async function archiveItem(context: Client, id: string, options: ArchiveOptions",
      ),
    ),
    [],
  );
  // Defaults and rerouted callees are maintained behavior, not emitted delegation.
  const defaulted = baseText.replace(
    "archiveItem: (id: string, options?: BetaItemsArchiveItemOptionalParams) => archiveItem(",
    "archiveItem: (id: string, options: BetaItemsArchiveItemOptionalParams = { requestOptions: { timeout: 5 } }) => archiveItem(",
  );
  const rerouted = baseText.replace(
    "=> archiveItem(context, id, options)",
    "=> archiveItemWithAudit(context, id, options)",
  );
  const auditedApi = `${api}
export async function archiveItemWithAudit(context: Client, id: string, options: BetaItemsArchiveItemOptionalParams = { requestOptions: {} }): Promise<string> {
  return archiveItem(context, id, options);
}`;
  for (const custom of [defaulted, rerouted]) {
    assert.notEqual(custom, baseText);
    assert.equal(
      relocatedMemberDiagnostics(
        "classic/beta/items/index.ts",
        custom,
        baseText,
        [{ ...matches[0], customized: { name: "archiveItem" } }],
        auditedApi,
      ).length,
      1,
    );
  }
});

test("relocates alpha-renamed delegates and aliases only from their own operation module", () => {
  const file = "classic/beta/items/index.ts";
  const base = classic(3, "BetaItems", "beta/items", [betaArchive]);
  const custom = base
    .replace("import { archiveItem }", "import { archiveItem as archive }")
    .replaceAll("archiveItem: (id: string", "archiveItem: (itemId: string")
    .replace("=> archiveItem(context, id, options)", "=> archive(context, itemId, options)");
  const matches = [
    {
      base: { name: "archiveItem", file: "api/beta/items/operations.ts" },
      customized: { name: "archiveItem" },
      incoming: { name: "archiveItem", file: "api/items/operations.ts" },
    },
  ];
  const api = operations(2, [betaArchive]);
  assert.deepEqual(relocatedMemberDiagnostics(file, custom, base, matches, api), []);
  for (const unsafe of [
    custom.replace("api/beta/items/operations.js", "api/beta/other/operations.js"),
    custom.replace("archiveItem as archive", "archiveItemWithAudit as archive"),
    custom.replace(
      "function _getBetaItems(context: AIProjectContext) {",
      "function _getBetaItems(context: AIProjectContext) { const archive = audit;",
    ),
    custom.replace("archive(context, itemId, options)", "archive(context, options, itemId)"),
  ])
    assert.equal(relocatedMemberDiagnostics(file, unsafe, base, matches, api).length, 1);
});

test("a removed beta module carries renamed operation helpers but rejects unknown custom declarations", () => {
  const oldFile = "api/beta/items/operations.ts";
  const baseGenerated = new Map(
    Object.entries({
      ...models(),
      [oldFile]: operations(2, [betaArchive]),
      "api/beta/items/options.ts": options([betaArchive[3]]),
      "classic/beta/items/index.ts": classic(3, "BetaItems", "beta/items", [betaArchive]),
    }),
  );
  const baseSource = new Map(baseGenerated);
  baseSource.set(
    oldFile,
    baseSource.get(oldFile).replaceAll("archiveItem", "deleteAgentInsightMonitor"),
  );
  baseSource.set(
    "classic/beta/items/index.ts",
    baseSource
      .get("classic/beta/items/index.ts")
      .replace("import { archiveItem }", "import { deleteAgentInsightMonitor as archiveItem }"),
  );
  const generated = new Map(
    Object.entries({
      ...models(),
      "api/items/operations.ts": operations(1, [archive]),
      "api/items/options.ts": options([archive[3]]),
      "api/items/index.ts": 'export { archiveItem } from "./operations.js";',
      "classic/items/index.ts": classic(2, "Items", "items", [archive]),
    }),
  );
  const inputs = { baseGenerated, baseSource, generated };
  const plan = planCustomization(inputs);
  assert.deepEqual(plan.diagnostics, []);
  const resolved = plan.source.get("api/items/operations.ts");
  for (const name of [
    "deleteAgentInsightMonitor",
    "_deleteAgentInsightMonitorSend",
    "_deleteAgentInsightMonitorDeserialize",
  ])
    assert.match(resolved, new RegExp(`function ${name}\\(`));
  assert.match(
    plan.source.get("classic/items/index.ts"),
    /deleteAgentInsightMonitor\(context, id, options\)/,
  );
  assert.equal(plan.source.has(oldFile), false);
  assert.match(plan.source.get("api/items/index.ts"), /export \{ deleteAgentInsightMonitor \}/);
  baseSource.set(
    oldFile,
    `${baseSource.get(oldFile)}\nexport function customDeleteAudit() { return "audit"; }`,
  );
  const unsafe = planCustomization(inputs);
  assert.ok(
    unsafe.diagnostics.some((d) => d.file === oldFile && d.declaration === "customDeleteAudit"),
  );
});

for (const [group, type] of [
  ["agentInsightMonitors", "AgentInsightMonitors"],
  ["skills", "Skills"],
])
  test(`promoted ${group} wiring preserves the customized beta authentication context`, () => {
    const oldApi = `api/beta/${group}/operations.ts`;
    const rootApi = `api/${group}/operations.ts`;
    const beta = `export interface BetaOperations {
  ${group}: Beta${type}Operations;
}
export function _getBetaOperations(context: Client): BetaOperations {
  return { ${group}: _getBeta${type}Operations(context) };
}`;
    const client = `export class AIProjectClient {
  constructor() {
    this.beta = _getBetaOperations(this._client);
    this.telemetry = customTelemetry();
  }
}`;
    const customClient = client.replaceAll("this._client", "this._cognitiveScopeClient");
    const baseGenerated = new Map(
      Object.entries({
        ...models(),
        [oldApi]: operations(2, [betaArchive]),
        [`api/beta/${group}/options.ts`]: options([betaArchive[3]]),
        [`classic/beta/${group}/index.ts`]: classic(3, `Beta${type}`, `beta/${group}`, [
          betaArchive,
        ]),
        "classic/beta/index.ts": beta,
        "aiProjectClient.ts": client,
      }),
    );
    const baseSource = new Map(baseGenerated);
    baseSource.set("aiProjectClient.ts", customClient);
    const generated = new Map(
      Object.entries({
        ...models(),
        [rootApi]: operations(1, [archive]),
        [`api/${group}/options.ts`]: options([archive[3]]),
        [`classic/${group}/index.ts`]: classic(2, type, group, [archive]),
        "classic/beta/index.ts":
          "export interface BetaOperations {} export function _getBetaOperations(context: Client): BetaOperations { return {}; }",
        "aiProjectClient.ts": `import { ${type}Operations, _get${type}Operations } from "./classic/${group}/index.js";
${client
  .replace("constructor()", `public readonly ${group}: ${type}Operations;\nconstructor()`)
  .replace(
    "this.telemetry",
    `this.${group} = _get${type}Operations(this._client);\nthis.telemetry`,
  )}`,
      }),
    );
    const inputs = { baseGenerated, baseSource, generated };
    const plan = planCustomization(inputs);
    assert.deepEqual(plan.diagnostics, []);
    const resolved = plan.source.get("aiProjectClient.ts");
    assert.match(
      resolved,
      new RegExp(`this\\.${group} = _get${type}Operations\\(this\\._cognitiveScopeClient\\)`),
    );
    assert.match(resolved, /this.telemetry = customTelemetry\(\)/);
    const guardInputs = {
      ...inputs,
      source: plan.source,
      matches: plan.matches,
      modelRenames: plan.modelRenames,
    };
    assert.deepEqual(validateCustomization(guardInputs), []);
    const wrongContext = new Map(plan.source);
    wrongContext.set(
      "aiProjectClient.ts",
      resolved.replace(
        `_get${type}Operations(this._cognitiveScopeClient)`,
        `_get${type}Operations(this._azureScopeClient)`,
      ),
    );
    assert.ok(
      validateCustomization({ ...guardInputs, source: wrongContext }).some(
        (d) => d.file === "aiProjectClient.ts" && /Protected customization changed/.test(d.message),
      ),
    );
    generated.set(rootApi, generated.get(rootApi).replaceAll("/items/", "/unrelated/"));
    const unrelated = planCustomization(inputs);
    assert.equal(unrelated.source.get("aiProjectClient.ts"), customClient);
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

// Mirrors a service change that merges an entire beta group into a
// hand-maintained (protected) group, such as beta datasets into datasets.
function protectedMergeTrees() {
  // Protected modules must not drift, so use the current emitter's parameter spelling.
  const current = (text) => text.replaceAll("api%2Dversion", "api-version");
  const emitted = (depth, specs) => current(operations(depth, specs));
  const customDatasetsApi = `${emitted(1, [getItem])}
export function datasetUploadRoot(): string {
  return "uploads";
}`;
  const customDatasets = `import type { AIProjectContext } from "../../api/aiProjectContext.js";
import { getItem } from "../../api/datasets/operations.js";
import type { ItemsGetItemOptionalParams } from "../../api/datasets/options.js";
import { uploadFile } from "#platform/api/datasets/uploads";

/** Interface representing a Datasets operations. */
export interface DatasetsOperations {
  /** getItem operation. */
  getItem: (id: string, options?: ItemsGetItemOptionalParams) => Promise<string>;
  /** Uploads a file. Only supported in Node.js. */
  uploadFile: (path: string) => Promise<string>;
}

function _getDatasets(context: AIProjectContext, projectOptions: object = {}) {
  return {
    getItem: (id: string, options?: ItemsGetItemOptionalParams) => getItem(context, id, options),
    uploadFile: (path: string) => uploadFile(context, path, projectOptions),
  };
}

export function _getDatasetsOperations(context: AIProjectContext, projectOptions: object = {}): DatasetsOperations {
  return {
    ..._getDatasets(context, projectOptions),
  };
}`;
  const customBetaApi = emitted(2, [betaArchive])
    .replace(
      'import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";',
      'import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";\nimport { tagItem } from "../../../static-helpers/tagging.js";',
    )
    .replace(
      "return _archiveItemDeserialize(result);",
      "return tagItem(await _archiveItemDeserialize(result));",
    );
  const barrel = (groups) =>
    groups.map(([name, path]) => `export type { ${name} } from "./${path}/index.js";`).join("\n");
  const shared = {
    ...models(),
    "api/datasets/options.ts": options([getItem[3]]),
    "api/beta/datasets/options.ts": options([betaArchive[3]]),
    "classic/beta/datasets/index.ts": classic(3, "BetaDatasets", "beta/datasets", [betaArchive]),
    "classic/index.ts": barrel([
      ["DatasetsOperations", "datasets"],
      ["BetaDatasetsOperations", "beta/datasets"],
    ]),
  };
  const baseGenerated = new Map(
    Object.entries({
      ...shared,
      "api/datasets/operations.ts": emitted(1, [getItem]),
      "api/beta/datasets/operations.ts": emitted(2, [betaArchive]),
      "classic/datasets/index.ts": classic(2, "Datasets", "datasets", [getItem]),
    }),
  );
  const baseSource = new Map(
    Object.entries({
      ...shared,
      "api/datasets/operations.ts": customDatasetsApi,
      "api/beta/datasets/operations.ts": customBetaApi,
      "classic/datasets/index.ts": customDatasets,
    }),
  );
  const generated = new Map(
    Object.entries({
      ...models(),
      "api/datasets/options.ts": options([getItem[3], archive[3]]),
      "api/datasets/operations.ts": emitted(1, [getItem, archive]),
      "classic/datasets/index.ts": classic(2, "Datasets", "datasets", [getItem, archive]),
      "classic/index.ts": barrel([["DatasetsOperations", "datasets"]]),
    }),
  );
  return { baseGenerated, baseSource, generated };
}

test("merges a removed beta group into a protected customized group", () => {
  const inputs = protectedMergeTrees();
  const plan = planCustomization(inputs);
  assert.deepEqual(plan.diagnostics, []);
  const api = plan.source.get("api/datasets/operations.ts");
  assert.match(api, /export function datasetUploadRoot\(\)/);
  assert.match(api, /return tagItem\(await _archiveItemDeserialize\(result\)\);/);
  assert.match(api, /import \{ tagItem \} from "\.\.\/\.\.\/static-helpers\/tagging\.js";/);
  const datasets = plan.source.get("classic/datasets/index.ts");
  assert.match(
    datasets,
    /uploadFile: \(path: string\) => uploadFile\(context, path, projectOptions\)/,
  );
  assert.match(
    datasets,
    /archiveItem: \(id: string, options\?: ItemsArchiveItemOptionalParams\) => archiveItem\(/,
  );
  // The removed group's untouched generated export follows the emitter
  // instead of being retained as a dangling compatibility alias.
  assert.doesNotMatch(plan.source.get("classic/index.ts"), /BetaDatasetsOperations/);
  assert.ok(plan.removedFiles.has("classic/beta/datasets/index.ts"));
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

test("relocation into a protected group admits only the relocated operations", () => {
  const inputs = protectedMergeTrees();
  const plan = planCustomization(inputs);
  const validate = (file, edit) => {
    const source = new Map(plan.source);
    source.set(file, edit(source.get(file)));
    return validateCustomization({
      ...inputs,
      source,
      matches: plan.matches,
      modelRenames: plan.modelRenames,
    });
  };
  const rejected = (diagnostics, declaration, message) =>
    assert.ok(
      diagnostics.some(
        (item) => item.declaration === declaration && item.message.includes(message),
      ),
      JSON.stringify(diagnostics, null, 2),
    );
  rejected(
    validate(
      "api/datasets/operations.ts",
      (text) => `${text}\nexport function extra(): number { return 1; }`,
    ),
    "extra",
    "Unproven addition",
  );
  rejected(
    validate(
      "api/datasets/operations.ts",
      (text) => `import { leak } from "../../static-helpers/leak.js";\n${text}`,
    ),
    "leak",
    "Unproven import",
  );
  rejected(
    validate("classic/datasets/index.ts", (text) =>
      text.replace(
        "uploadFile: (path: string) => uploadFile(",
        "extraUpload: (path: string) => uploadFile(context, path),\n    uploadFile: (path: string) => uploadFile(",
      ),
    ),
    "_getDatasets",
    "Protected customization changed",
  );
  rejected(
    validate("classic/datasets/index.ts", (text) =>
      text.replace(/=> archiveItem\(context, id, options\)/, "=> getItem(context, id, options)"),
    ),
    "_getDatasets",
    "Protected customization changed",
  );
  rejected(
    validate("classic/datasets/index.ts", (text) =>
      text.replace(
        "uploadFile: (path: string) => Promise<string>;",
        "uploadFile: (path: string) => Promise<void>;",
      ),
    ),
    "DatasetsOperations",
    "Protected customization changed",
  );
  // Without the planner's relocation evidence the same output is unproven.
  const unmatched = validateCustomization({
    ...inputs,
    source: plan.source,
    matches: [],
    modelRenames: plan.modelRenames,
  });
  rejected(unmatched, "archiveItem", "Unproven addition");
  rejected(unmatched, "tagItem", "Unproven import");
});
