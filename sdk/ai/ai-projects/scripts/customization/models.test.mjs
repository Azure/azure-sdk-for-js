// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import { mergeDeclaration } from "./ast-merge.mjs";
import { reconcileModels } from "./models.mjs";
import { readBaseline, readTree } from "./trees.mjs";

const modelFile = "models/models.ts";
const barrelFile = "models/index.ts";

function tree(text, exports) {
  return new Map([[modelFile, text], ...(exports ? [[barrelFile, exports]] : [])]);
}

function plan(baseGenerated, baseSource, generated) {
  const inputs = [baseGenerated, baseSource, generated];
  const snapshots = inputs.map((input) => [...input]);
  const result = reconcileModels({ baseGenerated, baseSource, generated, mergeDeclaration });
  inputs.forEach((input, index) => assert.deepEqual([...input], snapshots[index]));
  return result;
}

function succeeded(base, custom, incoming) {
  const result = plan(base, custom, incoming);
  assert.deepEqual(result.diagnostics, []);
  assert.ok(result.files.has(modelFile));
  return result;
}

function evaluate(text) {
  const compiled = ts.transpileModule(text, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
    reportDiagnostics: true,
  });
  assert.deepEqual(compiled.diagnostics, []);
  const sandbox = { exports: {} };
  runInNewContext(compiled.outputText, sandbox, { timeout: 1000 });
  return sandbox.exports;
}

function assertModelTypes(files, packageRoot) {
  const configuration = ts.readConfigFile(
    path.join(packageRoot, "tsconfig.test.node.json"),
    ts.sys.readFile,
  );
  assert.equal(configuration.error, undefined);
  const parsed = ts.parseJsonConfigFileContent(configuration.config, ts.sys, packageRoot);
  assert.deepEqual(parsed.errors, []);
  const options = { ...parsed.options, noEmit: true };
  const key = (file) => {
    const absolute = path.resolve(file);
    return ts.sys.useCaseSensitiveFileNames ? absolute : absolute.toLowerCase();
  };
  const virtual = new Map(
    [...files].map(([file, text]) => [
      key(path.join(packageRoot, "src", ...file.split("/"))),
      text,
    ]),
  );
  const host = ts.createCompilerHost(options);
  const original = {
    getSourceFile: host.getSourceFile.bind(host),
    fileExists: host.fileExists.bind(host),
    directoryExists: host.directoryExists.bind(host),
    readFile: host.readFile.bind(host),
  };
  host.getSourceFile = (file, ...args) =>
    virtual.has(key(file))
      ? ts.createSourceFile(file, virtual.get(key(file)), options.target, true)
      : original.getSourceFile(file, ...args);
  host.fileExists = (file) => virtual.has(key(file)) || original.fileExists(file);
  host.readFile = (file) => virtual.get(key(file)) ?? original.readFile(file);
  host.directoryExists = (directory) =>
    [...virtual.keys()].some((file) => file.startsWith(key(directory) + path.sep)) ||
    original.directoryExists(directory);
  host.writeFile = () => {
    throw new Error("The virtual model check must not write SDK files.");
  };
  const sourceRoot = key(path.join(packageRoot, "src")) + path.sep;
  const initial = ts.createProgram([...virtual.keys()], options, host);
  const roots = initial
    .getSourceFiles()
    .filter((source) => !source.isDeclarationFile && key(source.fileName).startsWith(sourceRoot))
    .map((source) => source.fileName);
  const program = ts.createProgram(roots, options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnostics(diagnostics, {
      getCurrentDirectory: () => packageRoot,
      getCanonicalFileName: key,
      getNewLine: () => "\n",
    }),
  );
}

const publicExample = 'export type { Example } from "./models.js";';

test("model moves preserve customized fields and merge new converter wire mappings", () => {
  const baseText = `
export interface Example { old_name: string; }
export function exampleSerializer(item: Example): any { return { old_name: item.old_name }; }
`;
  const customText = `
export interface Example { /** Keep this documentation. */ old_name: string; custom?: string; }
export function exampleSerializer(item: Example): any {
  return { old_name: item.old_name, custom: item.custom };
}
`;
  const incoming = new Map([
    [
      modelFile,
      "export interface Container { item: Example; }\nimport type { Example } from './openAI/models.js';",
    ],
    [
      "models/openAI/models.ts",
      `
export interface Example { connection_name: string; source: string; }
export function exampleSerializer(item: Example): any {
  return { connection_name: item.connection_name, source: item.source };
}
`,
    ],
    [barrelFile, 'export type { Container } from "./models.js";'],
    ["models/openAI/index.ts", publicExample],
  ]);
  const result = succeeded(
    tree(baseText, publicExample),
    tree(customText, publicExample),
    incoming,
  );
  const output = result.files.get(modelFile);
  assert.match(output, /Keep this documentation|custom\?: string/);
  assert.match(output, /connection_name: string/);
  assert.match(output, /source: string/);
  assert.doesNotMatch(output, /old_name/);
  assert.equal((output.match(/export interface Example\b/g) ?? []).length, 1);
  assert.match(result.files.get("models/openAI/models.ts"), /from "\.\.\/models\.js"/);
  const actual = evaluate(output).exampleSerializer({
    connection_name: "connection",
    source: "+14255550100",
    custom: "kept",
  });
  assert.equal(
    JSON.stringify(actual),
    JSON.stringify({ connection_name: "connection", source: "+14255550100", custom: "kept" }),
  );
  assert.ok(result.exports.some((entry) => entry.name === "Container" && entry.isTypeOnly));
});

test("new runtime Known enums and source-only public aliases stay exported", () => {
  const base = tree("export interface Example { value: string; }", publicExample);
  const custom = tree(
    `
export interface Example { value: string; }
export type PublicAlias = Example;
export const CustomValue = 7;
`,
    `${publicExample}\nexport type { PublicAlias } from "./models.js";\nexport { CustomValue } from "./models.js";`,
  );
  const incoming = tree(
    `
export interface Example { value: string; }
export enum KnownStatus { Ready = "ready", Pending = "pending" }
export type Status = string;
`,
    `${publicExample}\nexport { KnownStatus } from "./models.js";\nexport type { Status } from "./models.js";`,
  );
  const result = succeeded(base, custom, incoming);
  assert.ok(result.exports.some((entry) => entry.name === "KnownStatus" && !entry.isTypeOnly));
  assert.ok(result.exports.some((entry) => entry.name === "CustomValue" && !entry.isTypeOnly));
  assert.ok(result.exports.some((entry) => entry.name === "PublicAlias" && entry.isTypeOnly));
  assert.equal(evaluate(result.files.get(modelFile)).KnownStatus.Ready, "ready");
});

test("multiple barrels cannot turn a runtime Known enum into a type-only export", () => {
  const incoming = tree(
    'export enum KnownStatus { Ready = "ready" }',
    'export { KnownStatus } from "./models.js";',
  );
  incoming.set("models/openAI/index.ts", 'export type { KnownStatus } from "../models.js";');
  const result = succeeded(new Map(), new Map(), incoming);
  assert.deepEqual(result.exports, [{ name: "KnownStatus", isTypeOnly: false }]);
});

test("top-level disappearance retains old customized model names without resurrecting intentional custom removals", () => {
  const base = tree(
    "export interface Old { value: string; }\nexport interface Hidden { value: boolean; }",
  );
  const custom = tree("export interface Old { value: string; custom?: number; }");
  const incoming = tree("export interface New { value: string; }");
  const result = succeeded(base, custom, incoming);
  assert.match(result.files.get(modelFile), /interface Old/);
  assert.match(result.files.get(modelFile), /interface New/);
  assert.doesNotMatch(result.files.get(modelFile), /interface Hidden/);
});

function polymorphicTools({ legacy = false, added = false, customized = false } = {}) {
  return `
export type ToolKind = "current" ${legacy ? '| "legacy"' : ""} ${added ? '| "added"' : ""};
export type UnrelatedStatus = "current" ${legacy ? '| "legacy"' : ""};
export interface Tool { kind: ToolKind; }
export interface Current extends Tool { kind: "current"; }
${legacy ? 'export interface Legacy extends Tool { kind: "legacy"; configuration: string; }' : ""}
${added ? 'export interface Added extends Tool { kind: "added"; }' : ""}
export type Tools = Current ${legacy ? "| Legacy" : ""} ${added ? "| Added" : ""};
${
  legacy
    ? `export function legacySerialize(item: Legacy): any {
  return {kind: item.kind, configuration: item.configuration${customized ? ", customized: true" : ""}};
}
export function legacyDeserialize(item: any): Legacy {
  return {kind: "legacy", configuration: item.configuration};
}`
    : ""
}
export function serializeTools(item: Tools): any {
  switch (item.kind) {
    case "current": return item;
    ${legacy ? 'case "legacy": return legacySerialize(item);' : ""}
    ${added ? 'case "added": return item;' : ""}
    default: throw new Error("unsupported");
  }
}
export function deserializeTools(item: any): Tools {
  switch (item["kind"]) {
    case "current": return item;
    ${legacy ? 'case "legacy": return legacyDeserialize(item);' : ""}
    ${added ? 'case "added": return item;' : ""}
    default: throw new Error("unsupported");
  }
}`;
}

test("retained legacy models keep their discriminator and dispatch registrations", () => {
  const result = succeeded(
    tree(polymorphicTools({ legacy: true })),
    tree(polymorphicTools({ legacy: true, customized: true })),
    tree(polymorphicTools({ added: true })),
  );
  const text = result.files.get(modelFile);
  const source = ts.createSourceFile(modelFile, text, ts.ScriptTarget.Latest, true);
  const type = (name) =>
    source.statements.find((node) => node.name?.text === name).type.getText(source);
  assert.match(type("ToolKind"), /"legacy"/);
  assert.match(type("ToolKind"), /"added"/);
  assert.match(type("Tools"), /\bLegacy\b/);
  assert.match(type("Tools"), /\bAdded\b/);
  assert.doesNotMatch(type("UnrelatedStatus"), /"legacy"/);
  const api = evaluate(text);
  const legacy = { kind: "legacy", configuration: "retained" };
  assert.equal(
    JSON.stringify(api.serializeTools(legacy)),
    JSON.stringify({ ...legacy, customized: true }),
  );
  assert.equal(JSON.stringify(api.deserializeTools(legacy)), JSON.stringify(legacy));
  assert.equal(api.serializeTools({ kind: "added" }).kind, "added");
  assert.equal(api.deserializeTools({ kind: "added" }).kind, "added");
  assertModelTypes(result.files, path.resolve(fileURLToPath(new URL("../..", import.meta.url))));
});

test("legacy registration retention does not resurrect a model removed by customization", () => {
  const result = succeeded(
    tree(polymorphicTools({ legacy: true })),
    tree(polymorphicTools()),
    tree(polymorphicTools({ legacy: true, added: true })),
  );
  assert.doesNotMatch(result.files.get(modelFile), /\bLegacy\b|"legacy"/);
  assert.equal(
    evaluate(result.files.get(modelFile)).serializeTools({ kind: "added" }).kind,
    "added",
  );
});

test("retaining a legacy dispatch with fallthrough requires explicit reconciliation", () => {
  const original = polymorphicTools({ legacy: true }).replace(
    'case "legacy": return legacySerialize(item);',
    'case "legacy":',
  );
  const result = plan(tree(original), tree(original), tree(polymorphicTools({ added: true })));
  assert.equal(result.files.size, 0);
  assert.ok(
    result.diagnostics.some((item) =>
      /retained legacy dispatch case has fallthrough/.test(item.message),
    ),
  );
});

test("a structurally unique baseline rename is derived rather than added again", () => {
  const base = tree(
    "export interface Emitted { unique: number; }\nexport interface Holder { item: Emitted; }",
  );
  const custom = tree(
    "export interface Customized { unique: number; }\nexport interface Holder { item: Customized; }",
  );
  const incoming = tree(
    "export interface Emitted { unique: number; added?: boolean; }\nexport interface Holder { item: Emitted; }",
  );
  const result = succeeded(base, custom, incoming);
  assert.equal(result.renames.get("Emitted"), "Customized");
  assert.match(result.files.get(modelFile), /interface Customized/);
  assert.match(result.files.get(modelFile), /added\?: boolean/);
  assert.doesNotMatch(result.files.get(modelFile), /\bEmitted\b/);
});

test("ambiguously renamed or duplicate declarations fail the complete model plan", () => {
  const ambiguous = plan(
    tree("export interface Emitted { value: string; }"),
    tree("export interface First { value: string; }\nexport interface Second { value: string; }"),
    tree("export interface Emitted { value: string; added: boolean; }"),
  );
  assert.equal(ambiguous.files.size, 0);
  assert.ok(
    ambiguous.diagnostics.some((diagnostic) =>
      /Ambiguous customization rename/.test(diagnostic.message),
    ),
  );
  const duplicates = plan(
    tree("export interface Example { value: string; }"),
    tree("export interface Example { value: string; }"),
    new Map([
      [modelFile, "export interface Example { value: string; }"],
      ["models/openAI/models.ts", "export interface Example { value: string; }"],
    ]),
  );
  assert.equal(duplicates.files.size, 0);
  assert.ok(
    duplicates.diagnostics.some(
      (diagnostic) =>
        diagnostic.declaration === "Example" &&
        /Ambiguous model declaration/.test(diagnostic.message),
    ),
  );
});

test("incompatible concurrent changes are diagnostic, not a custom-side fallback", () => {
  const result = plan(
    tree("export interface Example { value: string; }"),
    tree("export interface Example { value: number; custom?: string; }"),
    tree("export interface Example { value: boolean; added?: string; }"),
  );
  assert.equal(result.files.size, 0);
  assert.ok(
    result.diagnostics.some(
      (diagnostic) => diagnostic.declaration === "Example" && diagnostic.member?.includes("value"),
    ),
  );
});

test("independent plain converter properties can merge without a surviving common property", () => {
  const result = succeeded(
    tree("export function convert(item: any): any { return { old_name: item.old_name }; }"),
    tree(
      "export function convert(item: any): any { return { old_name: item.old_name, custom: item.custom }; }",
    ),
    tree(
      "export function convert(item: any): any { return { connection_name: item.connection_name, source: item.source }; }",
    ),
  );
  const output = evaluate(result.files.get(modelFile)).convert({
    connection_name: "connection",
    source: "+14255550100",
    custom: "kept",
  });
  assert.deepEqual(JSON.parse(JSON.stringify(output)), {
    connection_name: "connection",
    source: "+14255550100",
    custom: "kept",
  });
});

test("side-effectful concurrent converter insertions remain explicit ordering diagnostics", () => {
  const result = plan(
    tree("export function convert(item: any): any { return { old_name: item.old_name }; }"),
    tree(
      "export function convert(item: any): any { return { old_name: item.old_name, custom: customEffect(item) }; }",
    ),
    tree(
      "export function convert(item: any): any { return { connection_name: incomingEffect(item), source: item.source }; }",
    ),
  );
  assert.equal(result.files.size, 0);
  assert.ok(
    result.diagnostics.some(
      (diagnostic) => diagnostic.declaration === "convert" && /ordering/.test(diagnostic.message),
    ),
  );
});

test("flat imports retain customized platform streams and add dependencies from relocated modules", () => {
  const base = tree(`
import type { NodeReadableStream } from "@azure/core-rest-pipeline";
export interface Audio { readableStreamBody?: NodeReadableStream; blobBody?: Promise<Blob>; }
`);
  const custom = tree(`
import type { NodeReadableStream } from "#platform/static-helpers/platform-types";
export interface Audio { readableStreamBody?: NodeReadableStream; blobBody?: Promise<Blob>; }
`);
  const incoming = new Map([
    [
      "models/openAI/models.ts",
      `
import type { NodeReadableStream } from "@azure/core-rest-pipeline";
import { convert } from "../../static-helpers/convert.js";
export interface Audio { readableStreamBody?: NodeReadableStream; blobBody?: Promise<Blob>; }
export interface NewAudio { readableStreamBody?: NodeReadableStream; }
export function audioDeserializer(item: any): Audio { return convert(item); }
`,
    ],
  ]);
  const result = succeeded(base, custom, incoming);
  const output = result.files.get(modelFile);
  assert.match(
    output,
    /import type \{ NodeReadableStream \} from "#platform\/static-helpers\/platform-types"/,
  );
  assert.match(output, /import \{ convert \} from "\.\.\/static-helpers\/convert\.js"/);
  assert.doesNotMatch(output, /@azure\/core-rest-pipeline/);
  assert.match(output, /blobBody\?: Promise<Blob>/);
});

test("renamed internal imports flatten without retaining missing local aliases", () => {
  const base = tree(
    "export interface Item { value: string; }\nexport interface Holder { item: Item; }",
  );
  const incoming = new Map([
    [
      modelFile,
      'import type { Item as ImportedItem } from "./openAI/models.js";\nexport interface Holder { item: ImportedItem; }',
    ],
    ["models/openAI/models.ts", "export interface Item { value: string; added?: string; }"],
  ]);
  const result = succeeded(base, base, incoming);
  assert.match(result.files.get(modelFile), /item: Item/);
  assert.doesNotMatch(result.files.get(modelFile), /\bImportedItem\b/);
});

test("concurrent import-provider changes produce a dependency diagnostic", () => {
  const text = (module) =>
    `import type { External } from "${module}";\nexport interface Example { value: External; }`;
  const result = plan(tree(text("original")), tree(text("custom")), tree(text("incoming")));
  assert.equal(result.files.size, 0);
  assert.ok(
    result.diagnostics.some(
      (diagnostic) => diagnostic.declaration === "<imports>" && diagnostic.member === "External",
    ),
  );
});

test("external JavaScript module imports and source-only re-exports keep their package specifiers", () => {
  const input = tree(
    'import { convert } from "dependency/convert.js";\nexport function convertValue(item: unknown): unknown { return convert(item); }\nexport interface Example {}',
    `${publicExample}\nexport type { External } from "dependency/types.js";`,
  );
  const result = succeeded(input, input, input);
  assert.match(result.files.get(modelFile), /from "dependency\/convert\.js"/);
  assert.match(result.files.get(barrelFile), /from "dependency\/types\.js"/);
  assert.doesNotMatch(result.files.get(modelFile), /from "\.\.\/dependency/);
});

test("source-only imported aliases survive even without a model barrel", () => {
  const custom = tree(`
import type { External as LocalExternal } from "dependency/types.js";
export type { LocalExternal as PublicExternal };
`);
  const result = succeeded(new Map(), custom, new Map());
  assert.ok(result.exports.some((entry) => entry.name === "PublicExternal" && entry.isTypeOnly));
  assert.match(result.files.get(modelFile), /External as PublicExternal/);
  assert.match(result.files.get(modelFile), /from "dependency\/types\.js"/);
});

test("new references to customized-away models require explicit reconciliation", () => {
  const base = tree("export interface Hidden { value: string; }");
  const incoming = tree(
    "export interface Hidden { value: string; }\nexport interface Added { hidden: Hidden; }",
  );
  const result = plan(base, new Map(), incoming);
  assert.equal(result.files.size, 0);
  assert.ok(
    result.diagnostics.some(
      (diagnostic) =>
        diagnostic.declaration === "Hidden" && /removed or unmapped/.test(diagnostic.message),
    ),
  );
});

test("model export destinations receive a real three-way merge", () => {
  const body = "export interface Example {}";
  const withExport = (module) => tree(body, `export type { External } from "${module}";`);
  const changed = succeeded(withExport("original"), withExport("original"), withExport("incoming"));
  assert.match(changed.files.get(barrelFile), /from "incoming"/);
  const conflict = plan(withExport("original"), withExport("custom"), withExport("incoming"));
  assert.equal(conflict.files.size, 0);
  assert.ok(
    conflict.diagnostics.some((diagnostic) =>
      /Concurrent public model export changes/.test(diagnostic.message),
    ),
  );
});

test("error model naming and custom JSON details survive new emitted error members", () => {
  const base = tree(
    `
export interface ApiError { code: string | null; message: string; additionalInfo?: Record<string, any>; }
export interface ApiErrorResponse { error: ApiError; }
export function apiErrorDeserializer(item: any): ApiError {
  return { code: item.code, message: item.message, additionalInfo: Object.fromEntries(Object.entries(item.additionalInfo)) };
}
`,
    'export type { ApiError, ApiErrorResponse } from "./models.js";',
  );
  const custom = tree(
    `
export interface ErrorModel { code: string; message: string; additionalInfo?: Record<string, unknown>; custom?: string; }
export interface ApiErrorResponse { error: ErrorModel; }
export function apiErrorDeserializer(item: any): ErrorModel {
  return { code: item.code, message: item.message, additionalInfo: item.additionalInfo, custom: item.custom };
}
`,
    'export type { ErrorModel, ApiErrorResponse } from "./models.js";',
  );
  const incoming = tree(
    `
export interface ApiError { code: string | null; message: string; additionalInfo?: Record<string, any>; new_info?: string; }
export interface ApiErrorResponse { error: ApiError; }
export function apiErrorDeserializer(item: any): ApiError {
  return { code: item.code, message: item.message, additionalInfo: Object.fromEntries(Object.entries(item.additionalInfo)), new_info: item.new_info };
}
`,
    'export type { ApiError, ApiErrorResponse } from "./models.js";',
  );
  const result = succeeded(base, custom, incoming);
  assert.equal(result.renames.get("ApiError"), "ErrorModel");
  assert.equal(result.renames.has("apiErrorDeserializer"), false);
  assert.equal(
    result.exports.some((entry) => entry.name === "ApiError"),
    false,
  );
  const additionalInfo = { count: 0 };
  const decoded = evaluate(result.files.get(modelFile)).apiErrorDeserializer({
    code: "failure",
    message: "message",
    additionalInfo,
    custom: "kept",
    new_info: "added",
  });
  assert.equal(decoded.additionalInfo.count, 0);
  assert.equal(decoded.additionalInfo, additionalInfo);
  assert.equal(decoded.custom, "kept");
  assert.equal(decoded.new_info, "added");
});

test("a first emitted error still uses the package ErrorModel name", () => {
  const result = succeeded(
    new Map(),
    new Map(),
    tree("export interface ApiError { code: string | null; message: string; }"),
  );
  assert.equal(result.renames.get("ApiError"), "ErrorModel");
  assert.equal(
    result.exports.some((entry) => entry.name === "ApiError"),
    false,
  );
  assert.equal(
    result.exports.some((entry) => entry.name === "ErrorModel"),
    true,
  );
});

test("renamed error helpers publish separate verified mappings and rewrite recursive calls", () => {
  function fixture(model, prefix, added = false) {
    return tree(`
export interface ${model} {
  code: string;
  message: string;
  details?: ${model}[];
  ${added ? "context?: string;" : ""}
}
export function ${prefix}Deserializer(item: any): ${model} {
  return {
    code: item.code,
    message: item.message,
    details: ${prefix}ArrayDeserializer(item.details ?? []),
    ${added ? "context: item.context," : ""}
  };
}
export function ${prefix}ArrayDeserializer(items: ${model}[]): ${model}[] {
  return items.map(${prefix}Deserializer);
}
`);
  }
  const result = succeeded(
    fixture("ApiError", "apiError"),
    fixture("ErrorModel", "error"),
    fixture("ApiError", "apiError", true),
  );
  assert.equal(result.renames.get("ApiError"), "ErrorModel");
  assert.equal(result.renames.get("apiErrorDeserializer"), "errorDeserializer");
  assert.equal(result.renames.get("apiErrorArrayDeserializer"), "errorArrayDeserializer");
  const output = result.files.get(modelFile);
  assert.doesNotMatch(output, /\bapiError(?:Array)?Deserializer\b/);
  const decoded = evaluate(output).errorDeserializer({
    code: "outer",
    message: "Outer error",
    context: "new field",
    details: [{ code: "inner", message: "Inner error" }],
  });
  assert.equal(decoded.context, "new field");
  assert.equal(decoded.details[0].code, "inner");
});

test("arbitrary JSON Schema is preserved in types and actual converter content", () => {
  const base = tree(`
export interface RealtimeFunctionToolParameters {}
export function realtimeFunctionToolParametersSerializer(item: RealtimeFunctionToolParameters): any { return {}; }
`);
  const custom = tree(`
export type RealtimeFunctionToolParameters = Record<string, unknown>;
export function realtimeFunctionToolParametersSerializer(item: RealtimeFunctionToolParameters): any { return { ...item }; }
`);
  const result = succeeded(base, custom, base);
  assert.match(result.files.get(modelFile), /Record<string, unknown>/);
  const parameters = {
    type: "object",
    properties: { limit: { type: "integer" } },
    required: ["limit"],
    additionalProperties: false,
  };
  const serialized = evaluate(result.files.get(modelFile)).realtimeFunctionToolParametersSerializer(
    parameters,
  );
  assert.equal(JSON.stringify(serialized), JSON.stringify(parameters));
  const fresh = succeeded(new Map(), new Map(), base);
  assert.equal(
    JSON.stringify(
      evaluate(fresh.files.get(modelFile)).realtimeFunctionToolParametersSerializer(parameters),
    ),
    JSON.stringify(parameters),
  );
});

test("unrecognized JSON Schema changes cannot silently replace a real customized converter", () => {
  const base = tree("export interface RealtimeFunctionToolParameters {}");
  const custom = tree("export type RealtimeFunctionToolParameters = Record<string, unknown>;");
  const incoming = tree(
    "export interface RealtimeFunctionToolParameters { new_required_property: number; }",
  );
  const result = plan(base, custom, incoming);
  assert.equal(result.files.size, 0);
  assert.ok(
    result.diagnostics.some((diagnostic) =>
      /beyond the arbitrary JSON Schema policy/.test(diagnostic.message),
    ),
  );
});

test("optional Unix Date deserialization retains epoch zero without matching unrelated conditions", () => {
  const incoming = tree(`
export interface Session { stopped_at?: Date; }
export function sessionDeserializer(item: any): Session {
  return { stopped_at: !item["stopped_at"] ? item["stopped_at"] : new Date(item["stopped_at"] * 1000) };
}
export function positiveCondition(item: any): Session {
  return { stopped_at: item.stopped_at ? new Date(item.stopped_at * 1000) : item.stopped_at };
}
export function unrelated(item: any): any { return !item.value ? item.value : new Date(item.other * 1000); }
`);
  const result = succeeded(new Map(), new Map(), incoming);
  const output = result.files.get(modelFile);
  const functions = evaluate(output);
  assert.equal(functions.sessionDeserializer({ stopped_at: 0 }).stopped_at.getTime(), 0);
  assert.equal(functions.sessionDeserializer({}).stopped_at, undefined);
  assert.equal(functions.sessionDeserializer({ stopped_at: null }).stopped_at, null);
  assert.equal(functions.positiveCondition({ stopped_at: 0 }).stopped_at.getTime(), 0);
  assert.match(output, /!item\.value/);
});

test("only the three documented telephony reason types receive open-string compatibility", () => {
  const incoming = tree(`
export type TelephonyCallEndReason = "busy";
export type TelephonyCallLifecycleEventReason =
  | "started"
  | "ended";
export type TelephonyCallJobTerminalReason = "cancelled";
export type OtherReason = "bounded";
`);
  const result = succeeded(new Map(), new Map(), incoming);
  const source = ts.createSourceFile(
    modelFile,
    result.files.get(modelFile),
    ts.ScriptTarget.Latest,
    true,
  );
  for (const declaration of source.statements.filter(ts.isTypeAliasDeclaration)) {
    const members = ts.isUnionTypeNode(declaration.type)
      ? declaration.type.types
      : [declaration.type];
    assert.equal(
      members.some((member) => member.kind === ts.SyntaxKind.StringKeyword),
      declaration.name.text !== "OtherReason",
    );
  }
});

test("malformed modules and unresolved export targets produce diagnostics before merging", () => {
  for (const incoming of [
    tree("export interface Broken { value: ; }"),
    tree("export interface Example {}", 'export type { Missing } from "./models.js";'),
    tree("export interface Example {}", 'export type { Missing } from "./absent.js";'),
  ]) {
    const result = plan(new Map(), new Map(), incoming);
    assert.equal(result.files.size, 0);
    assert.ok(result.diagnostics.length > 0);
  }
});

test(
  "real emitted model tree is reconciled without SDK writes",
  {
    skip: !process.env.AI_PROJECTS_CUSTOMIZATION_PREVIEW_DIR,
  },
  () => {
    const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
    const baseline = readBaseline(packageRoot);
    const incoming = readTree(process.env.AI_PROJECTS_CUSTOMIZATION_PREVIEW_DIR);
    const result = plan(baseline.generated, baseline.source, incoming);
    assert.deepEqual(result.diagnostics, []);
    const before = ts.createSourceFile(
      modelFile,
      baseline.source.get(modelFile),
      ts.ScriptTarget.Latest,
      true,
    );
    const after = ts.createSourceFile(
      modelFile,
      result.files.get(modelFile),
      ts.ScriptTarget.Latest,
      true,
    );
    const names = new Set(after.statements.map((node) => node.name?.text).filter(Boolean));
    for (const node of before.statements)
      if (node.name?.text) assert.ok(names.has(node.name.text), node.name.text);
    assert.ok(result.files.size > 0);
    assertModelTypes(result.files, packageRoot);
  },
);
