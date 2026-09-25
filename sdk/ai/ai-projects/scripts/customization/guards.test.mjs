// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import ts from "typescript";
import { validateCustomization } from "./guards.mjs";

const scaffold = `
import type { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import type { ContinuablePage } from "./static-helpers/pagingHelpers.js";
`;
const tree = (files = {}) => new Map(Object.entries(files));

function validate(files = {}) {
  return validateCustomization({
    baseGenerated: tree(),
    baseSource: tree(),
    generated: tree(),
    source: tree(),
    ...files,
  });
}

function modelFixture(base, customized, incoming, source) {
  return {
    baseGenerated: tree({ "models/models.ts": base }),
    baseSource: tree({ "models/models.ts": customized }),
    generated: tree({ "models/models.ts": incoming }),
    source: tree({ "models/models.ts": source }),
  };
}

function has(diagnostics, declaration, member, message) {
  assert.ok(
    diagnostics.some(
      (diagnostic) =>
        diagnostic.declaration === declaration &&
        (member === undefined || diagnostic.member === member) &&
        (!message || diagnostic.message.includes(message)),
    ),
    JSON.stringify(diagnostics, null, 2),
  );
}

test("reports unresolved markers, parse errors, duplicate declarations and members", () => {
  const diagnostics = validate({
    source: tree({
      "conflict.ts": "<<<<<<< generated\nexport interface A {}\n=======\n>>>>>>> customized\n",
      "syntax.ts": "export interface Missing { value?:",
      "models/duplicates.ts": `
        export interface Duplicate { status?: string; status?: string; }
        export interface Duplicate {}
        export function deserialize(item: any) { return { status: item.status, status: item.status }; }
      `,
    }),
  });
  assert.ok(
    diagnostics.some(
      (item) => item.file === "conflict.ts" && item.message.includes("conflict markers"),
    ),
  );
  assert.ok(
    diagnostics.some((item) => item.file === "syntax.ts" && item.message.includes("parse error")),
  );
  has(diagnostics, "Duplicate", undefined, "Duplicate declaration");
  has(diagnostics, "Duplicate", "status", "Duplicate named member");
  assert.ok(
    diagnostics.some((item) => item.member === "status" && item.file === "models/duplicates.ts"),
  );
});

test("allows getter/setter pairs and function or method overloads", () => {
  assert.deepEqual(
    validate({
      source: tree({
        "overloads.ts": `
        export function read(value: string): string;
        export function read(value: number): number;
        export function read(value: string | number) { return value; }
        export class Accessor {
          get value(): string { return ""; }
          set value(value: string) {}
          read(value: string): string;
          read(value: number): number;
          read(value: string | number) { return value; }
        }
      `,
      }),
    }),
    [],
  );
});

test("requires optional model members and their serializer/deserializer wire mappings", () => {
  const base = `
    export interface Widget { id: string; }
    export function widgetSerializer(item: Widget) { return { id: item.id }; }
    export function widgetDeserializer(item: any): Widget { return { id: item.id }; }
  `;
  const incoming = base
    .replace("id: string;", "id: string; preview?: string;")
    .replace("return { id: item.id };", "return { id: item.id, preview_value: item.preview };")
    .replace("return { id: item.id };", "return { id: item.id, preview: item.preview_value };");
  const diagnostics = validate(modelFixture(base, base, incoming, base));
  has(diagnostics, "Widget", "preview");
  has(diagnostics, "widgetSerializer", "preview_value");
  has(diagnostics, "widgetDeserializer", "preview");
  assert.deepEqual(validate(modelFixture(base, base, incoming, incoming)), []);
});

test("requires new Send body mappings independently of operation-planner matches", () => {
  const file = "api/widgets/operations.ts";
  const base =
    "export function _createSend(context: any, body: any) { return context.post({ body: { id: body.id } }); }";
  const incoming = base.replace("id: body.id", "id: body.id, preview_value: body.preview");
  const diagnostics = validate({
    baseGenerated: tree({ [file]: base }),
    baseSource: tree({ [file]: base }),
    generated: tree({ [file]: incoming }),
    source: tree({ [file]: base }),
  });
  has(diagnostics, "_createSend", "preview_value", "Send request-body");
});

test("inventories namespace/module moves without dropping maintained model members", () => {
  const base = "export interface Widget { id: string; }";
  const customized = "export interface Widget { id: string; customLabel?: string; }";
  const incoming = "export interface Widget { id: string; preview?: string; }";
  const files = {
    baseGenerated: tree({ "models/models.ts": base }),
    baseSource: tree({ "models/models.ts": customized }),
    generated: tree({ "models/openAI/models.ts": incoming }),
    source: tree({
      "models/typeSpec/models.ts":
        "export interface Widget { id: string; preview?: string; customLabel?: string; }",
    }),
  };
  assert.deepEqual(validate(files), []);
  files.source = tree({ "models/openAI/models.ts": incoming });
  has(validate(files), "Widget", "customLabel", "custom-only");
  files.source = tree();
  has(validate(files), "Widget", undefined, "Lost maintained model");
});

test("follows simple type aliases when checking model additions", () => {
  const base = "export interface Widget { id: string; }";
  const incoming = "export interface Widget { id: string; preview?: string; }";
  const custom = "export interface CustomWidget { id: string; } export type Widget = CustomWidget;";
  const source = custom.replace("id: string;", "id: string; preview?: string;");
  assert.deepEqual(validate(modelFixture(base, custom, incoming, source)), []);
  has(validate(modelFixture(base, custom, incoming, custom)), "Widget", "preview");
});

test("reports ambiguous cross-module declarations instead of waiving model checks", () => {
  const diagnostics = validate({
    generated: tree({ "models/new/models.ts": "export interface Widget { preview?: string; }" }),
    source: tree({
      "models/one/models.ts": "export interface Widget {}",
      "models/two/models.ts": "export interface Widget {}",
    }),
  });
  has(diagnostics, "Widget", undefined, "Ambiguous");
});

test("requires union alternatives and their converter dispatcher cases", () => {
  const base = `
    export interface A { kind: "a"; }
    export type Choice = A;
    export function choiceSerializer(item: Choice) { switch (item.kind) { case "a": return {}; } }
  `;
  const incoming = base
    .replace(
      "export type Choice = A;",
      'export interface B { kind: "b"; } export type Choice = A | B;',
    )
    .replace('case "a": return {};', 'case "a": return {}; case "b": return {};');
  const source = base + 'export interface B { kind: "b"; }';
  const diagnostics = validate(modelFixture(base, base, incoming, source));
  has(diagnostics, "Choice", "B", "union alternative");
  has(diagnostics, "choiceSerializer", '"b"', "discriminator");
});

test("preserves custom-only declarations, members, and exports even in an otherwise no-op generation", () => {
  const base = "export interface Widget { id: string; }";
  const custom =
    base.replace("id: string;", "id: string; customLabel?: string;") +
    "export interface CustomOnly {}";
  const files = modelFixture(base, custom, base, base);
  files.baseSource.set(
    "index.ts",
    scaffold + 'export type { CustomOnly } from "./models/index.js";',
  );
  files.source.set("index.ts", scaffold);
  const diagnostics = validate(files);
  has(diagnostics, "Widget", "customLabel");
  has(diagnostics, "CustomOnly", undefined, "Lost maintained model");
  has(diagnostics, "CustomOnly", undefined, "Lost maintained root export");
});

test("allows proven generated-backed root export removals but not moved declarations masquerading as removals", () => {
  const baseModel = "export interface Widget { id: string; }";
  const exports = 'export type { Widget } from "./models/models.js";';
  const files = {
    baseGenerated: tree({ "models/models.ts": baseModel, "index.ts": exports }),
    baseSource: tree({ "models/models.ts": baseModel, "index.ts": scaffold + exports }),
    generated: tree(),
    source: tree({ "index.ts": scaffold }),
  };
  assert.deepEqual(validate(files), []);
  files.generated.set("models/openAI/models.ts", baseModel);
  files.source.set("models/openAI/models.ts", baseModel);
  has(validate(files), "Widget", undefined, "Lost maintained root export");
  files.source.set(
    "index.ts",
    scaffold + 'export type { Widget } from "./models/openAI/models.js";',
  );
  assert.deepEqual(validate(files), []);
});

test("requires current emitted root exports and honors explicit package type renames", () => {
  const generated = tree({
    "models/models.ts": "export interface ApiError { code: string; }",
    "index.ts": 'export type { ApiError } from "./models/models.js";',
  });
  const source = tree({
    "models/models.ts": "export interface ErrorModel { code: string; }",
    "index.ts": scaffold + 'export type { ErrorModel } from "./models/models.js";',
  });
  assert.deepEqual(validate({ generated, source }), []);
  source.set("index.ts", scaffold);
  has(
    validate({ generated, source }),
    "ErrorModel",
    undefined,
    "Missing current emitted root export",
  );
});

for (const [file, specifier, prefix] of [
  ["index.ts", "./models/models.js", scaffold],
  ["models/index.ts", "./models.js", ""],
  ["classic/index.ts", "../models/models.js", ""],
]) {
  test(`preserves an established generated export omission in ${file}`, () => {
    const model = "export interface InternalModel { id: string; }";
    const files = modelFixture(model, model, model, model);
    const emitted = `export type { InternalModel } from "${specifier}";`;
    files.baseGenerated.set(file, emitted);
    files.baseSource.set(file, prefix);
    files.generated.set(file, emitted);
    files.source.set(file, prefix);
    assert.deepEqual(validate(files), []);
  });
}

test("an established omission does not waive a genuinely new emitted export", () => {
  const before = "export interface InternalModel { id: string; }";
  const incoming = before + "export interface NewFeature { preview?: string; }";
  const files = modelFixture(before, before, incoming, incoming);
  files.baseGenerated.set("index.ts", 'export type { InternalModel } from "./models/models.js";');
  files.baseSource.set("index.ts", scaffold);
  files.generated.set(
    "index.ts",
    'export type { InternalModel, NewFeature } from "./models/models.js";',
  );
  files.source.set("index.ts", scaffold + 'export type { NewFeature } from "./models/models.js";');
  assert.deepEqual(validate(files), []);
  files.source.set("index.ts", scaffold);
  const diagnostics = validate(files);
  has(diagnostics, "NewFeature", undefined, "Missing current emitted root export");
  assert.equal(
    diagnostics.some((item) => item.declaration === "InternalModel"),
    false,
  );
});

test("established omissions do not permit losing maintained custom-only exports", () => {
  const emitted = "export interface InternalModel {}";
  const customized = emitted + "export interface CustomTracingOptions { enabled?: boolean; }";
  const files = modelFixture(emitted, customized, emitted, customized);
  files.baseGenerated.set("index.ts", 'export type { InternalModel } from "./models/models.js";');
  files.generated.set("index.ts", files.baseGenerated.get("index.ts"));
  files.baseSource.set(
    "index.ts",
    scaffold + 'export type { CustomTracingOptions } from "./models/models.js";',
  );
  files.source.set("index.ts", files.baseSource.get("index.ts"));
  assert.deepEqual(validate(files), []);
  files.source.set("index.ts", scaffold);
  has(validate(files), "CustomTracingOptions", undefined, "Lost maintained root export");
});

test("established root omissions never suppress new model members or wire mappings", () => {
  const before = `
    export interface InternalModel { id: string; }
    export function internalModelSerializer(item: InternalModel) { return { id: item.id }; }
  `;
  const incoming = before
    .replace("id: string;", "id: string; preview?: string;")
    .replace("id: item.id", "id: item.id, preview_value: item.preview");
  const files = modelFixture(before, before, incoming, incoming);
  files.baseGenerated.set("index.ts", 'export type { InternalModel } from "./models/models.js";');
  files.generated.set("index.ts", files.baseGenerated.get("index.ts"));
  files.baseSource.set("index.ts", scaffold);
  files.source.set("index.ts", scaffold);
  assert.deepEqual(validate(files), []);
  files.source.set("models/models.ts", before);
  const diagnostics = validate(files);
  has(diagnostics, "InternalModel", "preview", "newly emitted");
  has(diagnostics, "internalModelSerializer", "preview_value", "newly emitted");
  assert.equal(
    diagnostics.some((item) => item.file === "index.ts"),
    false,
  );
});

test("established omissions follow verified symbol renames rather than raw generated spelling", () => {
  const files = modelFixture(
    "export interface OldGeneratedName { id: string; }",
    "export interface MaintainedName { id: string; }",
    "export interface NewGeneratedName { id: string; }",
    "export interface MaintainedName { id: string; }",
  );
  files.baseGenerated.set(
    "index.ts",
    'export type { OldGeneratedName } from "./models/models.js";',
  );
  files.generated.set("index.ts", 'export type { NewGeneratedName } from "./models/models.js";');
  files.baseSource.set("index.ts", scaffold);
  files.source.set("index.ts", scaffold);
  files.modelRenames = new Map([
    ["OldGeneratedName", "MaintainedName"],
    ["NewGeneratedName", "MaintainedName"],
  ]);
  assert.deepEqual(validate(files), []);
});

test("an omission in another barrel cannot waive a new package-root export", () => {
  const model = "export interface InternalModel {}";
  const files = modelFixture(model, model, model, model);
  files.baseGenerated.set("models/index.ts", 'export type { InternalModel } from "./models.js";');
  files.generated.set("models/index.ts", files.baseGenerated.get("models/index.ts"));
  files.baseSource.set("models/index.ts", "");
  files.source.set("models/index.ts", "");
  files.baseGenerated.set("index.ts", "");
  files.baseSource.set("index.ts", scaffold);
  files.generated.set("index.ts", 'export type { InternalModel } from "./models/models.js";');
  files.source.set("index.ts", scaffold);
  has(validate(files), "InternalModel", undefined, "Missing current emitted root export");
});

function errorConverterFixture() {
  const generated = `
    export interface ApiError { code: string; }
    export function apiErrorDeserializer(item: any): ApiError { return { code: item.code }; }
    export function apiErrorArrayDeserializer(items: Array<ApiError>): any[] { return items.map(apiErrorDeserializer); }
  `;
  const source = generated.replaceAll("ApiError", "ErrorModel");
  const files = modelFixture(generated, source, generated, source);
  const barrel = 'export { apiErrorDeserializer, apiErrorArrayDeserializer } from "./models.js";';
  files.baseGenerated.set("models/index.ts", barrel);
  files.baseSource.set("models/index.ts", barrel);
  files.generated.set("models/index.ts", barrel);
  files.source.set("models/index.ts", barrel);
  return files;
}

test("retains verified apiError converter names when only the model type was customized", () => {
  const files = errorConverterFixture();
  files.modelRenames = new Map([["ApiError", "ErrorModel"]]);
  assert.deepEqual(validate(files), []);
});

for (const [original, replacement] of [
  ["apiErrorDeserializer", "errorDeserializer"],
  ["apiErrorArrayDeserializer", "errorArrayDeserializer"],
]) {
  test(`does not infer an unverified rename of ${original} from the ErrorModel type`, () => {
    const files = errorConverterFixture();
    files.source.set(
      "models/models.ts",
      files.source.get("models/models.ts").replaceAll(original, replacement),
    );
    files.source.set(
      "models/index.ts",
      files.source.get("models/index.ts").replaceAll(original, replacement),
    );
    has(validate(files), original, undefined, "Lost maintained model declaration");
  });
}

test("honors separately verified converter rename metadata for a baseline that actually uses those names", () => {
  const files = errorConverterFixture();
  const renames = new Map([
    ["ApiError", "ErrorModel"],
    ["apiErrorDeserializer", "errorDeserializer"],
    ["apiErrorArrayDeserializer", "errorArrayDeserializer"],
  ]);
  for (const target of [files.baseSource, files.source]) {
    for (const [file, text] of target) {
      let renamed = text;
      for (const [original, replacement] of renames)
        renamed = renamed.replaceAll(original, replacement);
      target.set(file, renamed);
    }
  }
  files.modelRenames = renames;
  assert.deepEqual(validate(files), []);
});

test("rejects converter rename metadata contradicted by the verified source baseline", () => {
  const files = errorConverterFixture();
  files.modelRenames = new Map([
    ["ApiError", "ErrorModel"],
    ["apiErrorDeserializer", "errorDeserializer"],
    ["apiErrorArrayDeserializer", "errorArrayDeserializer"],
  ]);
  const diagnostics = validate(files);
  has(diagnostics, "apiErrorDeserializer", undefined, "contradicts the verified source baseline");
  has(
    diagnostics,
    "apiErrorArrayDeserializer",
    undefined,
    "contradicts the verified source baseline",
  );
});

test("allows classic generated-backed export changes while preserving custom-only exports", () => {
  const files = {
    baseGenerated: tree({
      "classic/old/index.ts": "export interface OldOperations {}",
      "classic/index.ts": 'export type { OldOperations } from "./old/index.js";',
    }),
    baseSource: tree({
      "classic/old/index.ts": "export interface OldOperations {}",
      "classic/custom/index.ts": "export interface CustomOperations {}",
      "classic/index.ts":
        'export type { OldOperations } from "./old/index.js"; export type { CustomOperations } from "./custom/index.js";',
    }),
    generated: tree({
      "classic/new/index.ts": "export interface NewOperations {}",
      "classic/index.ts": 'export type { NewOperations } from "./new/index.js";',
    }),
    source: tree({
      "classic/new/index.ts": "export interface NewOperations {}",
      "classic/custom/index.ts": "export interface CustomOperations {}",
      "classic/index.ts":
        'export type { NewOperations } from "./new/index.js"; export type { CustomOperations } from "./custom/index.js";',
    }),
  };
  assert.deepEqual(validate(files), []);
  files.source.set("classic/index.ts", 'export type { NewOperations } from "./new/index.js";');
  has(validate(files), "CustomOperations", undefined, "Lost maintained root export");
});

test("rejects polluted paging import scaffolds and generated-only poller restore exports/files", () => {
  const diagnostics = validate({
    baseSource: tree({ "index.ts": scaffold }),
    source: tree({
      "index.ts":
        scaffold.replace("@azure/core-paging", "./static-helpers/pagingHelpers.js") +
        '\nexport { restorePoller } from "./restorePollerHelpers.js";',
      "restorePollerHelpers.ts": "export const restorePoller = () => ({});",
    }),
  });
  has(diagnostics, "PageSettings", undefined, "type import");
  has(diagnostics, "PagedAsyncIterableIterator", undefined, "type import");
  assert.ok(diagnostics.some((item) => item.file === "restorePollerHelpers.ts"));
  assert.ok(
    diagnostics.some((item) => item.file === "index.ts" && item.message.includes("generated-only")),
  );
});

function operation(file, text) {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const nodes = new Map(
    source.statements.filter(ts.isFunctionDeclaration).map((node) => [node.name.text, node]),
  );
  return {
    file,
    name: "create",
    source,
    nodes,
    publicNode: nodes.get("create"),
    send: nodes.get("_createSend"),
    deserialize: nodes.get("_createDeserialize"),
  };
}

function operationFixture(customBody, outputBody) {
  const oldFile = "api/beta/old/operations.ts";
  const newFile = "api/beta/voiceAgents/operations.ts";
  const helpers = `
    export function _createSend(context: any, options: any) { return context.post({ body: {} }); }
    export function _createDeserialize(result: any) { return result.body; }
  `;
  const baseText =
    helpers +
    "export function create(context: any, options: any): PollerLike<unknown> { return getLongRunningPoller(context, {}); }";
  const customizedText = helpers + customBody;
  const outputText = helpers + outputBody;
  return {
    baseGenerated: tree({ [oldFile]: baseText }),
    baseSource: tree({ [oldFile]: customizedText }),
    generated: tree({ [newFile]: baseText }),
    source: tree({ [newFile]: outputText }),
    matches: [
      {
        base: operation(oldFile, baseText),
        customized: operation(oldFile, customizedText),
        incoming: operation(newFile, baseText),
        names: { publicNode: "create", send: "_createSend", deserialize: "_createDeserialize" },
      },
    ],
  };
}

for (const [wrapper, factory] of [
  ["JobPoller", "getJobPoller"],
  ["RunPoller", "getRunPoller"],
]) {
  test(`requires mapped ${wrapper} identity wrappers and poll headers`, () => {
    const customized = `
      export function create(context: any, options: any): ${wrapper}<unknown> {
        return ${factory}(context, { pollHeaders: { ...options?.requestOptions?.headers, "foundry-features": "Preview=V1" } });
      }
    `;
    const files = operationFixture(customized, customized);
    assert.deepEqual(validate(files), []);
    files.source.set(
      "api/beta/voiceAgents/operations.ts",
      files.source
        .get("api/beta/voiceAgents/operations.ts")
        .replace(wrapper, "PollerLike")
        .replace(factory, "getLongRunningPoller")
        .replace('...options?.requestOptions?.headers, "foundry-features": "Preview=V1"', ""),
    );
    const diagnostics = validate(files);
    has(diagnostics, "create", undefined, `${wrapper}/${factory}`);
    has(diagnostics, "create", "pollHeaders");
  });
}

test("preserves cursor fields and continuation options/headers in mapped operations", () => {
  const customized = `
    export function create(context: any, options: any) {
      const requestParameters = operationOptionsToRequestParameters(options);
      return buildPagedAsyncIterator(context, {
        cursorFieldName: "last_id", hasMoreFieldName: "has_more",
        nextPageRequestOptions: { ...requestParameters, headers: { ...requestParameters.headers, "foundry-features": "Preview=V1" } }
      });
    }
  `;
  const files = operationFixture(customized, customized);
  assert.deepEqual(validate(files), []);
  files.source.set(
    "api/beta/voiceAgents/operations.ts",
    files.source
      .get("api/beta/voiceAgents/operations.ts")
      .replace('cursorFieldName: "last_id", hasMoreFieldName: "has_more",', "")
      .replace(
        '...requestParameters, headers: { ...requestParameters.headers, "foundry-features": "Preview=V1" }',
        "headers: {}",
      ),
  );
  const diagnostics = validate(files);
  has(diagnostics, "create", "cursorFieldName");
  has(diagnostics, "create", "hasMoreFieldName");
  has(diagnostics, "create", "nextPageRequestOptions");
});

test("rejects broad protected-file overwrites, including auth/tracing and static helpers", () => {
  const files = {
    baseSource: tree({
      "aiProjectClient.ts":
        "export class AIProjectClient { private scope = 'https://ai.azure.com/.default'; trace() { return resolveTracingConfig(); } }",
      "static-helpers/pollingHelpers.ts":
        "export function getJobPoller(id: string) { return { jobId: id }; }",
      "api/aiProjectContext.ts":
        "export function createAIProject() { return getClient({ scopes: ['https://ai.azure.com/.default'] }); }",
    }),
    source: tree({
      "aiProjectClient.ts": "export class AIProjectClient {}",
      "static-helpers/pollingHelpers.ts": "export function getJobPoller(id: string) { return {}; }",
    }),
  };
  const diagnostics = validate(files);
  has(diagnostics, "AIProjectClient", undefined, "Protected customization");
  has(diagnostics, "getJobPoller", undefined, "Protected customization");
  assert.ok(
    diagnostics.some(
      (item) => item.file === "api/aiProjectContext.ts" && item.message.includes("deleted"),
    ),
  );
});

for (const { file, declaration, token, before } of [
  {
    file: "aiProjectClient.ts",
    declaration: "AIProjectClient",
    token: "azsdk-js-client",
    before:
      "export class AIProjectClient { constructor(options: any) { const prefixFromOptions = options.prefix; this.prefix = prefixFromOptions ? `${prefixFromOptions} azsdk-js-client` : `azsdk-js-client`; } }",
  },
  {
    file: "api/aiProjectContext.ts",
    declaration: "createAIProject",
    token: "azsdk-js-api",
    before:
      'export function createAIProject(options: any) { const prefixFromOptions = options.prefix; const userAgentInfo = "sdk"; const prefix = prefixFromOptions ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}` : `azsdk-js-api ${userAgentInfo}`; return { prefix, scopes: ["https://ai.azure.com/.default"] }; }',
  },
]) {
  test(`preserves the existing ${token} user-agent token`, () => {
    const files = {
      baseSource: tree({ [file]: before }),
      source: tree({ [file]: before }),
    };
    assert.deepEqual(validate(files), []);
    files.source.set(
      file,
      before
        .replaceAll(`${token} `, "")
        .replaceAll(` ${token}`, "")
        .replaceAll(`\`${token}\``, '""'),
    );
    has(validate(files), declaration, undefined, "Protected customization");
  });
}

test("allows additive protected client wiring backed by genuinely new generated members", () => {
  const before =
    "export class AIProjectClient { constructor() { this.old = getOld(); } old: Old; }";
  const incoming =
    "export class AIProjectClient { constructor() { this.old = getOld(); this.preview = getPreview(); } old: Old; preview: Preview; }";
  const files = {
    baseGenerated: tree({ "aiProjectClient.ts": before }),
    baseSource: tree({ "aiProjectClient.ts": before }),
    generated: tree({ "aiProjectClient.ts": incoming }),
    source: tree({ "aiProjectClient.ts": incoming }),
  };
  assert.deepEqual(validate(files), []);
});

for (const { file, before, incoming, declaration } of [
  {
    file: "aiProjectClient.ts",
    before: "export class AIProjectClient { old: Old; }",
    incoming: "export class AIProjectClient { old: Old; preview: PreviewOperations; }",
    declaration: "AIProjectClient",
  },
  {
    file: "api/aiProjectContext.ts",
    before: "export interface AIProjectClientOptionalParams { old?: string; }",
    incoming: "export interface AIProjectClientOptionalParams { old?: string; preview?: boolean; }",
    declaration: "AIProjectClientOptionalParams",
  },
]) {
  test(`protected additions cannot be hidden by an unchanged ${declaration}`, () => {
    const diagnostics = validate({
      baseGenerated: tree({ [file]: before }),
      baseSource: tree({ [file]: before }),
      generated: tree({ [file]: incoming }),
      source: tree({ [file]: before }),
    });
    has(diagnostics, declaration, "preview", "newly emitted");
  });
}

test("protected initialization must wire a newly emitted client group, not only declare its field", () => {
  const file = "aiProjectClient.ts";
  const before =
    "export class AIProjectClient { constructor() { this.old = getOld(); } old: Old; }";
  const incoming =
    "export class AIProjectClient { constructor() { this.old = getOld(); this.preview = getPreview(); } old: Old; preview: Preview; }";
  const source = incoming.replace("this.preview = getPreview();", "");
  const diagnostics = validate({
    baseGenerated: tree({ [file]: before }),
    baseSource: tree({ [file]: before }),
    generated: tree({ [file]: incoming }),
    source: tree({ [file]: source }),
  });
  has(diagnostics, "AIProjectClient", "preview", "initialization");
});

test("a new protected declaration cannot be omitted by preserving the old file", () => {
  const file = "api/aiProjectContext.ts";
  const before = "export interface AIProjectContext {}";
  const incoming = before + "export interface PreviewContext { preview: string; }";
  has(
    validate({
      baseGenerated: tree({ [file]: before }),
      baseSource: tree({ [file]: before }),
      generated: tree({ [file]: incoming }),
      source: tree({ [file]: before }),
    }),
    "PreviewContext",
    undefined,
    "newly emitted protected declaration",
  );
});

test("user-agent changes cannot waive newly emitted protected interface members", () => {
  const file = "api/aiProjectContext.ts";
  const before =
    "export interface AIProjectClientOptionalParams { old?: string; } export function createAIProject() { return `azsdk-js-api`; }";
  const incoming = before.replace("old?: string;", "old?: string; preview?: string;");
  const source = before.replace("`azsdk-js-api`", '""');
  has(
    validate({
      baseGenerated: tree({ [file]: before }),
      baseSource: tree({ [file]: before }),
      generated: tree({ [file]: incoming }),
      source: tree({ [file]: source }),
    }),
    "AIProjectClientOptionalParams",
    "preview",
    "newly emitted",
  );
});

test("rejects positional preview parameters and evaluator API renames but permits options-bag fields", () => {
  const diagnostics = validate({
    source: tree({
      "api/preview/options.ts":
        'export interface PreviewOptions { foundryFeatures?: "Preview=V1"; }',
      "api/preview/operations.ts":
        'export function send(context: any, foundryFeatures: "Preview=V1", options?: PreviewOptions) {}',
      "classic/beta/evaluators/index.ts":
        "export interface BetaEvaluatorsOperations { listLatestVersions(): void; }",
    }),
  });
  has(diagnostics, "send", "foundryFeatures");
  has(diagnostics, "BetaEvaluatorsOperations", "list");
  assert.equal(
    diagnostics.some((item) => item.file === "api/preview/options.ts"),
    false,
  );
});

test("JSON Schema record and converters must preserve arbitrary schema keys", () => {
  const generated = `
    export interface RealtimeFunctionToolParameters {}
    export function realtimeFunctionToolParametersSerializer(item: RealtimeFunctionToolParameters) { return {}; }
    export function realtimeFunctionToolParametersDeserializer(item: any): RealtimeFunctionToolParameters { return {}; }
  `;
  const source = generated
    .replace(
      "interface RealtimeFunctionToolParameters {}",
      "type RealtimeFunctionToolParameters = Record<string, unknown>;",
    )
    .replaceAll("return {};", "return { ...item };");
  const files = {
    generated: tree({ "models/openAI/models.ts": generated }),
    source: tree({ "models/openAI/models.ts": source }),
  };
  assert.deepEqual(validate(files), []);
  files.source.set("models/openAI/models.ts", generated);
  const diagnostics = validate(files);
  has(diagnostics, "RealtimeFunctionToolParameters", undefined, "Record<string, unknown>");
  has(diagnostics, "realtimeFunctionToolParametersSerializer", undefined, "arbitrary input keys");
  has(diagnostics, "realtimeFunctionToolParametersDeserializer", undefined, "arbitrary input keys");
});

test("validation is pure, deterministic, and diagnoses invalid input instead of inventing a tree", () => {
  const files = modelFixture("", "", "export interface Added { optional?: string; }", "");
  const snapshot = Object.fromEntries(
    Object.entries(files).map(([key, value]) => [key, [...value]]),
  );
  const first = validate(files);
  assert.deepEqual(validate(files), first);
  assert.deepEqual(
    Object.fromEntries(Object.entries(files).map(([key, value]) => [key, [...value]])),
    snapshot,
  );
  has(validate({ source: undefined }), "source", undefined, "must be a Map");
  assert.ok(
    first.every(
      (item) =>
        typeof item.file === "string" &&
        typeof item.declaration === "string" &&
        typeof item.message === "string",
    ),
  );
});

test("reports duplicate import bindings, constructors, and identical overload declarations", () => {
  const diagnostics = validate({
    source: tree({
      "duplicates.ts": `
        import type { One as Value } from "./one.js";
        import type { Two as Value } from "./two.js";
        export function duplicate(value: string): string;
        export function duplicate(value: string): string;
        export class Constructed { constructor() {} constructor() {} }
      `,
    }),
  });
  has(diagnostics, "Value", undefined, "Duplicate imported");
  has(diagnostics, "duplicate", undefined, "Duplicate declaration");
  has(diagnostics, "Constructed", "constructor", "Duplicate named member");
});

test("checks optional-parameter additions without requiring a planner match", () => {
  const file = "api/widgets/options.ts";
  const base = "export interface CreateOptions { existing?: string; }";
  const incoming = "export interface CreateOptions { existing?: string; preview?: string; }";
  has(
    validate({
      baseGenerated: tree({ [file]: base }),
      baseSource: tree({ [file]: base }),
      generated: tree({ [file]: incoming }),
      source: tree({ [file]: base }),
    }),
    "CreateOptions",
    "preview",
  );
});

test("rejects newly added wire mappings whose values were erased", () => {
  const base = "export function itemSerializer(item: any) { return { id: item.id }; }";
  const incoming = base.replace("id: item.id", "id: item.id, preview: item.preview");
  const source = incoming.replace("preview: item.preview", "preview: undefined");
  has(
    validate(modelFixture(base, base, incoming, source)),
    "itemSerializer",
    "preview",
    "replaced with undefined",
  );
});

test("new voice lists require cursor paging and forwarding of continuation options and headers", () => {
  const file = "api/beta/voiceAgents/operations.ts";
  const output = `
    export function list(context: any, options: any) {
      return buildPagedAsyncIterator(context, { itemName: "data" });
    }
  `;
  const diagnostics = validate({ source: tree({ [file]: output }) });
  has(diagnostics, "list", "cursorFieldName");
  has(diagnostics, "list", "hasMoreFieldName");
  has(diagnostics, "list", "nextPageRequestOptions", "forward");
});

test("protected files cannot gain unrelated imports or top-level behavior", () => {
  const file = "api/aiProjectContext.ts";
  const original = "export function createAIProject() { return getClient(); }";
  const diagnostics = validate({
    baseSource: tree({ [file]: original }),
    source: tree({
      [file]: `import { replacement } from "./unreviewed.js"; ${original} replacement();`,
    }),
  });
  has(diagnostics, "replacement", undefined, "Unproven import");
  has(diagnostics, "<module>", undefined, "Unproven top-level behavior");
});

test("changing an exported module to a dangling target is not a valid relocation", () => {
  const declaration = "export interface Widget {}";
  const files = modelFixture(declaration, declaration, declaration, declaration);
  files.baseGenerated.set("index.ts", 'export type { Widget } from "./models/models.js";');
  files.baseSource.set("index.ts", scaffold + 'export type { Widget } from "./models/models.js";');
  files.generated.set("index.ts", files.baseGenerated.get("index.ts"));
  files.source.set("index.ts", scaffold + 'export type { Widget } from "./models/missing.js";');
  has(validate(files), "Widget", undefined, "does not resolve");
});

test("custom-only members must retain their shape, not merely their names", () => {
  const base = "export interface Widget { id: string; }";
  const customized = "export interface Widget { id: string; customLabel?: string; }";
  const source = "export interface Widget { id: string; customLabel: unknown; }";
  has(
    validate(modelFixture(base, customized, base, source)),
    "Widget",
    "customLabel",
    "Changed custom-only",
  );
});

test("JSON Schema passthrough in one branch cannot hide a destructive empty return", () => {
  const source = `
    export type RealtimeFunctionToolParameters = Record<string, unknown>;
    export function realtimeFunctionToolParametersSerializer(item: RealtimeFunctionToolParameters) {
      if (item.type) return { ...item };
      return {};
    }
    export function realtimeFunctionToolParametersDeserializer(item: any): RealtimeFunctionToolParameters { return { ...item }; }
  `;
  const diagnostics = validate({
    generated: tree({ "models/openAI/models.ts": source }),
    source: tree({ "models/openAI/models.ts": source }),
  });
  has(diagnostics, "realtimeFunctionToolParametersSerializer", undefined, "arbitrary input keys");
});

test("mapped options retain custom names and members across operation module moves", () => {
  const body =
    "export function create(context: any, options: any) { return _createSend(context, options); }";
  const files = operationFixture(body, body);
  const match = files.matches[0];
  match.base.options = "OldOptions";
  match.customized.options = "CustomOptions";
  match.incoming.options = "IncomingOptions";
  match.names.options = "CustomOptions";
  files.baseGenerated.set("api/beta/old/options.ts", "export interface OldOptions {}");
  files.baseSource.set(
    "api/beta/old/options.ts",
    "export interface CustomOptions { customHeader?: string; }",
  );
  files.generated.set(
    "api/beta/voiceAgents/options.ts",
    "export interface IncomingOptions { preview?: boolean; }",
  );
  files.source.set(
    "api/beta/voiceAgents/options.ts",
    "export interface CustomOptions { customHeader?: string; preview?: boolean; }",
  );
  assert.deepEqual(validate(files), []);
  files.source.set(
    "api/beta/voiceAgents/options.ts",
    "export interface CustomOptions { customHeader?: string; }",
  );
  has(validate(files), "CustomOptions", "preview");
  files.source.delete("api/beta/voiceAgents/options.ts");
  has(validate(files), "CustomOptions", undefined, "Missing mapped options");
});

test("follows a simple forwarding converter alias for wire-member parity", () => {
  const base = "export function widgetSerializer(item: any) { return { id: item.id }; }";
  const custom = `
    function maintainedSerializer(item: any) { return { id: item.id }; }
    export function widgetSerializer(item: any) { return maintainedSerializer(item); }
  `;
  const incoming = base.replace("id: item.id", "id: item.id, preview: item.preview");
  const output = custom.replace("id: item.id", "id: item.id, preview: item.preview");
  assert.deepEqual(validate(modelFixture(base, custom, incoming, output)), []);
  has(validate(modelFixture(base, custom, incoming, custom)), "widgetSerializer", "preview");
});

test("custom-only aliases of emitted models follow the emitted shape but keep their target", () => {
  const base = "export interface Widget { id: string; legacy?: string; }";
  const customized = `${base}\nexport type OldWidget = Widget;`;
  const incoming = "export interface Widget { id: string; current?: string; }";
  assert.deepEqual(
    validate(
      modelFixture(base, customized, incoming, `${incoming}\nexport type OldWidget = Widget;`),
    ),
    [],
  );
  has(
    validate(
      modelFixture(
        base,
        customized,
        incoming,
        `${incoming}\nexport interface Gadget { id: string; }\nexport type OldWidget = Gadget;`,
      ),
    ),
    "OldWidget",
    undefined,
    "target of a maintained custom-only alias",
  );
});
