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
import { planCustomization } from "./planner.mjs";
import { validateCustomization } from "./guards.mjs";
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

const dataGenerationValues = '"simple_qna" | "traces" | "tool_use" | "simulation_seed"';

test("data generation schema renames adopt only the explicitly approved upstream discriminator", () => {
  const discriminator = `export type DataGenerationJobType = ${dataGenerationValues};`;
  const conversations = discriminator.replace(";", ' | "conversations";');
  const options = `
export interface DataGenerationJobOptions { type: DataGenerationJobType; }
${["simple_qna", "traces", "tool_use", "simulation_seed"]
  .map(
    (value, index) =>
      `export interface Old${index} extends DataGenerationJobOptions { type: "${value}"; }`,
  )
  .join("\n")}`;
  const base = tree(discriminator + options);
  const custom = tree(
    discriminator.replace(";", ' | "task_generation";') +
      options +
      'export type Unrelated = "kept";',
  );
  const incoming = tree(
    conversations +
      "export interface DataGenerationJobConfiguration { type: DataGenerationJobType; }",
  );
  const result = succeeded(base, custom, incoming);
  const text = result.files.get(modelFile);
  assert.doesNotMatch(text, /"task_generation"/);
  assert.match(text, /type Unrelated = "kept"/);
  for (const value of ["simple_qna", "traces", "tool_use", "simulation_seed", "conversations"])
    assert.ok(text.includes(`"${value}"`));
  assertModelTypes(result.files, path.resolve(fileURLToPath(new URL("../..", import.meta.url))));

  // A subsequent regeneration must not resurrect the customized discriminator.
  const repeated = succeeded(incoming, result.files, incoming);
  assert.doesNotMatch(repeated.files.get(modelFile), /"task_generation"/);
  assert.match(repeated.files.get(modelFile), /"conversations"/);
});

test("data generation discriminator follows the exact approved incoming values", () => {
  const previous = tree(`export type DataGenerationJobType = ${dataGenerationValues};`);
  const expanded = tree(
    `export type DataGenerationJobType = ${dataGenerationValues} | "conversations";`,
  );
  const result = succeeded(expanded, expanded, previous);
  assert.doesNotMatch(result.files.get(modelFile), /"conversations"/);
});

test("unapproved data generation values and unrelated full-union retention still require review", () => {
  const base = tree(`export type DataGenerationJobType = ${dataGenerationValues};`);
  for (const incoming of [
    tree(`export type DataGenerationJobType = ${dataGenerationValues} | "future";`),
    tree(`export type DataGenerationJobType = ${dataGenerationValues} | "task_generation";`),
    tree(`export type DataGenerationJobType = ${dataGenerationValues} | "traces";`),
    tree('export type DataGenerationJobType = "simple_qna";'),
    tree("export type DataGenerationJobType = string;"),
  ]) {
    const result = plan(base, base, incoming);
    assert.equal(result.files.size, 0);
    assert.match(result.diagnostics[0].message, /approved upstream-values policy/);
  }
  const unrelated = tree(`
export type OtherKind = "legacy";
export interface Other { kind: OtherKind; }
export interface Legacy extends Other { kind: "legacy"; }
`);
  const result = plan(unrelated, unrelated, tree('export type OtherKind = "new";'));
  assert.equal(result.files.size, 0);
  assert.ok(result.diagnostics.some((item) => /explicit compatibility policy/.test(item.message)));
});

test("reviewed conversation data generation adds only the new discriminator", () => {
  const base = tree(`export type DataGenerationJobType = ${dataGenerationValues};`);
  const incoming = tree(
    `export type DataGenerationJobType = ${dataGenerationValues} | "conversations";`,
  );
  const result = succeeded(base, base, incoming);
  assert.match(result.files.get(modelFile), /"conversations"/);
  for (const extra of [' | "future"', ' | "conversations"']) {
    const unsafe = plan(
      base,
      base,
      tree(
        `export type DataGenerationJobType = ${dataGenerationValues} | "conversations"${extra};`,
      ),
    );
    assert.ok(unsafe.diagnostics.length > 0);
  }
});

test("retained telephony provider variants merge with an upstream provider addition", () => {
  const base = tree(`
export type TelephonyProvider = "teams_phone_extensibility" | "twilio";
export interface Binding { provider: TelephonyProvider; }
export interface TeamsRequest extends Binding { provider: "teams_phone_extensibility"; }
export interface TwilioRequest extends Binding { provider: "twilio"; }
export type BindingUnion = TeamsRequest | TwilioRequest | Binding;
`);
  const custom = tree(
    base.get(modelFile).replace('provider: "twilio";', 'provider: "twilio"; custom?: boolean;'),
  );
  const incoming = tree(`
export type TelephonyProvider = "teams_phone_extensibility" | "twilio" | "sip";
export interface Binding { provider: TelephonyProvider; }
export interface SipBinding extends Binding { provider: "sip"; }
export type BindingUnion = SipBinding | Binding;
`);
  const result = succeeded(base, custom, incoming);
  const text = result.files.get(modelFile);
  assert.match(text, /type TelephonyProvider =[\s\S]*"sip"/);
  assert.match(text, /interface TwilioRequest[\s\S]*custom\?: boolean/);
  assert.match(text, /BindingUnion =[\s\S]*SipBinding/);
  for (const providers of [
    '"sip"',
    '"twilio" | "twilio" | "sip"',
    '"teams_phone_extensibility" | "twilio" | boolean | "sip"',
  ]) {
    const unsafe = plan(
      base,
      custom,
      tree(
        incoming
          .get(modelFile)
          .replace(
            'type TelephonyProvider = "teams_phone_extensibility" | "twilio" | "sip";',
            `type TelephonyProvider = ${providers};`,
          ),
      ),
    );
    assert.ok(
      unsafe.diagnostics.some((item) => /explicit compatibility policy/.test(item.message)),
    );
  }
});

test("uses the emitted snake-case voice discriminator in the union serializer", () => {
  const incoming = tree(`
export interface VoiceAgentBaseDefinition { sub_protocol: "realtime" | "live"; }
export interface Other { subProtocol: string; }
export function voiceAgentBaseDefinitionUnionSerializer(
  item: VoiceAgentBaseDefinition,
): VoiceAgentBaseDefinition {
  const byOptions = (options: Other) => {
    switch (options.subProtocol) { default: return item; }
  };
  const nested = (item: Other) => {
    switch (item.subProtocol) { default: return item; }
  };
  switch (item.subProtocol) {
    default: return item;
  }
}
`);
  const result = succeeded(new Map(), new Map(), incoming);
  const text = result.files.get(modelFile);
  assert.match(text, /switch \(item\.sub_protocol\)/);
  assert.match(text, /switch \(options\.subProtocol\)/);
  assert.equal((text.match(/switch \(item\.subProtocol\)/g) ?? []).length, 1);
});

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

test("daily schedule converters keep their direct array when hours become optional", () => {
  const mapped = 'item["hours"].map((p: any) => { return p; })';
  const direct = 'item["hours"]';
  const model = (optional, hours) => `
export interface DailyRecurrenceSchedule { hours${optional ? "?" : ""}: number[]; }
export function dailyRecurrenceScheduleSerializer(item: DailyRecurrenceSchedule): any {
  return { hours: ${hours} };
}
export function dailyRecurrenceScheduleDeserializer(item: any): DailyRecurrenceSchedule {
  return { hours: ${hours} };
}`;
  const base = tree(model(false, mapped));
  const custom = tree(model(false, direct));
  const incoming = tree(model(true, `!${direct} ? ${direct} : ${mapped}`));
  const result = succeeded(base, custom, incoming);
  const output = result.files.get(modelFile);
  assert.match(output, /hours\?: number\[\]/);
  assertModelTypes(result.files, path.resolve(fileURLToPath(new URL("../..", import.meta.url))));
  const converters = evaluate(output);
  for (const name of ["dailyRecurrenceScheduleSerializer", "dailyRecurrenceScheduleDeserializer"]) {
    const hours = [0, 5, 23];
    assert.equal(converters[name]({ hours }).hours, hours);
    assert.equal(converters[name]({}).hours, undefined);
  }
  const changed = tree(
    model(true, `!${direct} ? ${direct} : ${mapped.replace("return p", "return p + 1")}`),
  );
  assert.ok(plan(base, custom, changed).diagnostics.length);
});

test("telephony resource replacement preserves only unchanged approved discriminator contracts", () => {
  for (const [name, values] of [
    ["TelephonyProvider", ["teams_phone_extensibility", "twilio", "sip"]],
    ["TelephonyOutboundRetryPolicyType", ["fixed_interval"]],
  ]) {
    const alias = `export type ${name} = ${values.map(JSON.stringify).join(" | ")};`;
    const baseText = `${alias}
export interface Parent { kind: ${name}; }
${values.map((value, index) => `export interface Legacy${index} extends Parent { kind: ${JSON.stringify(value)}; }`).join("\n")}`;
    const base = tree(baseText);
    const incoming = tree(`${alias}
export interface Replacement { kind: ${name}; }`);
    const result = succeeded(base, base, incoming);
    assert.ok(result.files.get(modelFile).includes(alias));
    for (const changed of [
      `export type ${name} = "future";`,
      alias.replace(";", ' | "future";'),
      `export type ${name} = string;`,
    ]) {
      const rejected = plan(base, base, tree(changed));
      assert.equal(rejected.files.size, 0);
      assert.ok(
        rejected.diagnostics.some((item) => /explicit compatibility policy/.test(item.message)),
      );
    }
    const unrelated = baseText.replaceAll(name, "UnrelatedKind");
    const rejected = plan(
      tree(unrelated),
      tree(unrelated),
      tree(alias.replaceAll(name, "UnrelatedKind")),
    );
    assert.ok(
      rejected.diagnostics.some((item) => /explicit compatibility policy/.test(item.message)),
    );
  }
});

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
  assert.equal(result.files.has("models/openAI/models.ts"), false);
  assert.match(result.reexportModules.get("models/openAI/models.ts"), /from "\.\.\/models\.js"/);
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

test("approved emitted telephony model renames adopt the new client names", () => {
  function telephonyModels(renamed) {
    const address = renamed
      ? ["TelephonyPhoneNumber", "TelephonyTeamsAddress", "TelephonySipAddress"]
      : ["PhoneNumber", "TeamsAddress", "SipAddress"];
    const schedule = renamed
      ? [
          "TelephonyCampaignImmediateSchedule",
          "TelephonyCampaignAtTimeSchedule",
          "TelephonyCampaignPerRecipientSchedule",
        ]
      : ["ImmediateSchedule", "AtTimeSchedule", "PerRecipientSchedule"];
    const lower = (name) => name[0].toLowerCase() + name.slice(1);
    const model = (name, kind, parent) => `
export interface ${name} extends ${parent} {
  type: "${kind}";
  value: string;
}
export function ${lower(name)}Serializer(item: ${name}): any {
  return { type: item.type, value: item.value };
}
export function ${lower(name)}Deserializer(item: any): ${name} {
  return { type: item.type, value: item.value };
}`;
    return `
export type TelephonyAddressType = "phone_number" | "teams" | "sip";
export interface TelephonyAddress { type: TelephonyAddressType; }
${model(address[0], "phone_number", "TelephonyAddress")}
${model(address[1], "teams", "TelephonyAddress")}
${model(address[2], "sip", "TelephonyAddress")}
export type TelephonyAddressUnion = ${address.join(" | ")} | TelephonyAddress;
export type TelephonyCampaignScheduleType = "immediate" | "scheduled" | "recipient";
export interface TelephonyCampaignSchedule { type: TelephonyCampaignScheduleType; }
${model(schedule[0], "immediate", "TelephonyCampaignSchedule")}
${model(schedule[1], "scheduled", "TelephonyCampaignSchedule")}
${model(schedule[2], "recipient", "TelephonyCampaignSchedule")}
export type TelephonyCampaignScheduleUnion =
  ${schedule.join(" | ")} | TelephonyCampaignSchedule;`;
  }
  const base = tree(telephonyModels(false));
  const custom = tree(
    telephonyModels(false)
      .replace(
        'export interface PhoneNumber extends TelephonyAddress {\n  type: "phone_number";\n  value: string;',
        'export interface PhoneNumber extends TelephonyAddress {\n  type: "phone_number";\n  value: string;\n  custom?: boolean;',
      )
      .replace(
        "return { type: item.type, value: item.value };",
        "return { type: item.type, value: item.value, custom: item.custom };",
      ),
  );
  const generated = tree(telephonyModels(true));
  const result = succeeded(base, custom, generated);
  const text = result.files.get(modelFile);
  for (const [before, after] of [
    ["PhoneNumber", "TelephonyPhoneNumber"],
    ["TeamsAddress", "TelephonyTeamsAddress"],
    ["SipAddress", "TelephonySipAddress"],
    ["ImmediateSchedule", "TelephonyCampaignImmediateSchedule"],
    ["AtTimeSchedule", "TelephonyCampaignAtTimeSchedule"],
    ["PerRecipientSchedule", "TelephonyCampaignPerRecipientSchedule"],
  ]) {
    assert.equal(result.renames.get(before), after);
    assert.doesNotMatch(text, new RegExp(`\\b${before}\\b`));
    assert.match(text, new RegExp(`interface ${after}\\b`));
  }
  assert.match(text, /custom\?: boolean/);
  assert.match(text, /custom: item.custom/);
  const planned = planCustomization({ baseGenerated: base, baseSource: custom, generated });
  assert.deepEqual(planned.diagnostics, []);
  const guardInputs = {
    baseGenerated: base,
    baseSource: custom,
    generated,
    source: planned.source,
    matches: planned.matches,
    modelRenames: planned.modelRenames,
  };
  assert.deepEqual(validateCustomization(guardInputs), []);
  const tampered = new Map(planned.source);
  tampered.set(modelFile, text.replace(", custom: item.custom", ""));
  assert.ok(validateCustomization({ ...guardInputs, source: tampered }).length > 0);
});

for (const suffix of ["Serializer", "Deserializer", "ArraySerializer", "ArrayDeserializer"]) {
  test(`rejects an emitted model rename when its customized ${suffix} cannot follow`, () => {
    const baseText = `
export interface PhoneNumber { value: string; }
export function phoneNumber${suffix}(item: PhoneNumber): any {
  return { value: item.value };
}`;
    const customText = baseText.replace(
      "return { value: item.value };",
      "return { value: item.value, custom: true };",
    );
    const incomingText = baseText
      .replaceAll("PhoneNumber", "TelephonyPhoneNumber")
      .replaceAll("phoneNumber", "telephonyPhoneNumber");
    for (const generated of [
      tree(incomingText.replace("value: item.value", "value: String(item.value)")),
      tree(incomingText.slice(0, incomingText.indexOf("export function"))),
      tree(incomingText),
    ]) {
      const base = tree(baseText);
      const custom = tree(
        customText +
          (generated.get(modelFile) === incomingText
            ? `\nexport function telephonyPhoneNumber${suffix}(): any { return {}; }`
            : ""),
      );
      const result = plan(base, custom, generated);
      assert.equal(result.files.size, 0);
      assert.ok(
        result.diagnostics.some(
          (item) =>
            item.declaration === `phoneNumber${suffix}` &&
            /cannot preserve converter/.test(item.message),
        ),
      );
      if (generated.get(modelFile) !== incomingText)
        assert.ok(
          validateCustomization({
            baseGenerated: base,
            baseSource: custom,
            generated,
            source: generated,
            matches: [],
            modelRenames: new Map([
              ["PhoneNumber", "TelephonyPhoneNumber"],
              [`phoneNumber${suffix}`, `telephonyPhoneNumber${suffix}`],
            ]),
          }).length > 0,
        );
    }
  });
}

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

test("voice transcription additions preserve customized member order without recovery", () => {
  const fields = new Map([
    ["language", "string"],
    ["languages", "string[]"],
    ["keywords", "string[]"],
    ["prompt", "string"],
    ["delay", '"minimal" | "low" | "medium" | "high" | "xhigh"'],
    ["model", "VoiceAgentInputTranscriptionModel"],
    ["custom_speech", "Record<string, string>"],
    ["phrase_list", "string[]"],
    ["profanity_filter", "VoiceAgentProfanityFilterMode"],
  ]);
  const emittedOrder = [...fields.keys()].filter((name) => name !== "profanity_filter");
  const customOrder = [
    "language",
    "prompt",
    "delay",
    "model",
    "custom_speech",
    "phrase_list",
    "languages",
    "keywords",
  ];
  const declarations = (order) => `
export type VoiceAgentInputTranscriptionModel = string;
export interface VoiceAgentInputTranscription {
${order.map((name) => `${name}${name === "model" ? "" : "?"}: ${fields.get(name)};`).join("\n")}
}
export function voiceAgentInputTranscriptionSerializer(item: VoiceAgentInputTranscription): any {
  return { ${order.map((name) => `${name}: item["${name}"]`).join(", ")} };
}
export function voiceAgentInputTranscriptionDeserializer(item: any): VoiceAgentInputTranscription {
  return { ${order.map((name) => `${name}: item["${name}"]`).join(", ")} };
}
`;
  const result = succeeded(
    tree(declarations(emittedOrder)),
    tree(declarations(customOrder)),
    tree(
      declarations([...emittedOrder, "profanity_filter"]) +
        "export type VoiceAgentProfanityFilterMode = string;",
    ),
  );
  const text = result.files.get(modelFile);
  const source = ts.createSourceFile(modelFile, text, ts.ScriptTarget.Latest, true);
  const transcription = source.statements.find(
    (node) => node.name?.text === "VoiceAgentInputTranscription",
  );
  assert.deepEqual(
    transcription.members.map((member) => member.name.text),
    [...customOrder, "profanity_filter"],
  );
  assert.match(text, /profanity_filter\?: VoiceAgentProfanityFilterMode/);
  const converters = evaluate(text);
  const item = {
    language: "en",
    languages: ["en", "es"],
    keywords: ["Foundry"],
    prompt: "Technical terms",
    delay: "low",
    model: "azure-speech",
    custom_speech: { en: "custom-model" },
    phrase_list: ["Foundry"],
    profanity_filter: "masked",
  };
  for (const name of [
    "voiceAgentInputTranscriptionSerializer",
    "voiceAgentInputTranscriptionDeserializer",
  ]) {
    assert.deepEqual(JSON.parse(JSON.stringify(converters[name](item))), item);
  }
});

test("a customized converter keeps its member order and epoch handling when the emitter reorders it", () => {
  const converter = (members) => `
export interface Response { id?: string; usage?: unknown; metadata?: unknown; created_at?: Date; }
export function usageDeserializer(item: any): unknown { return { usage: item }; }
export function metadataDeserializer(item: any): unknown { return { metadata: item }; }
export function responseDeserializer(item: any): Response {
  return {
${members}
  };
}
`;
  const usage = 'usage: !item["usage"] ? item["usage"] : usageDeserializer(item["usage"]),';
  const fromEntries =
    'metadata: !item["metadata"] ? item["metadata"] : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),';
  const metadata =
    'metadata: !item["metadata"] ? item["metadata"] : metadataDeserializer(item["metadata"]),';
  const plainDate =
    'created_at: !item["created_at"] ? item["created_at"] : new Date(item["created_at"] * 1000),';
  const result = succeeded(
    tree(converter([usage, 'id: item["id"],', fromEntries, plainDate].join("\n"))),
    tree(
      converter(
        [
          'id: item["id"],',
          usage,
          fromEntries,
          'created_at: item["created_at"] === undefined || item["created_at"] === null ? item["created_at"] : new Date(item["created_at"] * 1000),',
        ].join("\n"),
      ),
    ),
    tree(converter(['id: item["id"],', metadata, usage, plainDate].join("\n"))),
  );
  const output = evaluate(result.files.get(modelFile)).responseDeserializer({
    id: "id",
    usage: 1,
    metadata: 2,
    created_at: 0,
  });
  assert.deepEqual(Object.keys(output), ["id", "usage", "metadata", "created_at"]);
  assert.deepEqual(JSON.parse(JSON.stringify(output.metadata)), { metadata: 2 });
  assert.equal(output.created_at.getTime(), 0);
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

test("historical Tool identities merge restored names without replacing compatibility aliases", () => {
  for (const [original, released, oldPrefix, prefix] of [
    ["ToolFunctionTool", "FunctionTool", "toolFunctionTool", "functionTool"],
    [
      "ToolCodeInterpreterTool",
      "CodeInterpreterTool",
      "toolCodeInterpreterTool",
      "codeInterpreterTool",
    ],
    ["ToolWebSearchTool", "WebSearchTool", "toolWebSearchTool", "webSearchTool"],
    ["ToolMcpTool", "MCPTool", "toolMcpTool", "mcpTool"],
    ["ToolCustomToolParam", "CustomToolParam", "toolCustomToolParam", "customToolParam"],
  ]) {
    const fixture = (name, converter, { custom = false, added = false } = {}) =>
      tree(
        `
export interface Tool {}
export interface ${name} extends Tool { name${custom ? "" : "?"}: string; ${added ? "strict?: boolean;" : ""} }
export function ${converter}Serializer(item: ${name}): any {
  return { name: ${custom ? "item.name.toUpperCase()" : "item.name"}, ${added ? "strict: item.strict," : ""} };
}
export function ${converter}Deserializer(item: any): ${name} {
  return { name: item.name, ${added ? "strict: item.strict," : ""} };
}
${
  ["ToolMcpTool", "ToolCustomToolParam"].includes(name)
    ? `
export interface ${released} { name?: string; }
export function ${prefix}Serializer(item: ${released}): any { return { name: item.name, }; }
export function ${prefix}Deserializer(item: any): ${released} { return { name: item.name, }; }
`
    : ""
}
${
  custom
    ? `
export type ${original} = ${released};
export const ${oldPrefix}Serializer = ${prefix}Serializer;
export const ${oldPrefix}Deserializer = ${prefix}Deserializer;
`
    : ""
}
`,
        `export type { ${name}${custom ? `, ${original}` : ""} } from "./models.js";`,
      );
    const incoming = fixture(released, prefix, { added: true });
    const result = succeeded(
      fixture(original, oldPrefix),
      fixture(released, prefix, { custom: true }),
      incoming,
    );
    const output = result.files.get(modelFile);
    assert.match(output, new RegExp(`type ${original} = ${released}`));
    assert.match(output, /name: string/);
    assert.ok(result.exports.some((entry) => entry.name === original));
    const converters = evaluate(output);
    assert.equal(converters[oldPrefix + "Serializer"], converters[prefix + "Serializer"]);
    assert.equal(converters[oldPrefix + "Deserializer"], converters[prefix + "Deserializer"]);
    assert.deepEqual(
      JSON.parse(
        JSON.stringify(converters[oldPrefix + "Serializer"]({ name: "kept", strict: true })),
      ),
      { name: "KEPT", strict: true },
    );
    const repeated = succeeded(incoming, result.files, incoming);
    assert.equal(
      evaluate(repeated.files.get(modelFile))[prefix + "Serializer"]({ name: "kept" }).name,
      "KEPT",
    );
  }
});

test("restored filter helpers reconcile alias syntax and retain established converter names", () => {
  const fixture = ({ old = false, custom = false, added = false } = {}) => {
    const value = old ? "_ToolFileSearchToolFiltersValue" : "FileSearchToolFiltersValue";
    const items = old ? "_ToolFileSearchToolFiltersValue1" : "_FileSearchToolFiltersValue";
    const converter = old
      ? "_toolFileSearchToolFiltersValue"
      : custom
        ? "_fileSearchToolFiltersValue"
        : "fileSearchToolFiltersValue";
    const itemConverter = old
      ? "_toolFileSearchToolFiltersValue1"
      : custom
        ? "_fileSearchToolFiltersValue1"
        : "_FileSearchToolFiltersValue";
    const union = `string | number | boolean | ${old ? "(string | number)" : items}[]${added ? " | null" : ""}`;
    return tree(`
export interface ComparisonFilter { value: ${old || custom ? union : value}; }
export type ${value} = ${union};
export type ${items} = string | number;
export function ${converter}Serializer(item: ${value}): any { return item; }
export function ${converter}Deserializer(item: any): ${value} { return item; }
export function ${itemConverter}Serializer(item: ${items}): any { return item; }
export function ${itemConverter}Deserializer(item: any): ${items} { return item; }
export function ${itemConverter}ArraySerializer(items: ${items}[]): any[] { return items.map(${itemConverter}Serializer); }
export function comparisonFilterSerializer(item: ComparisonFilter): any {
  return { value: ${converter}Serializer(item.value) };
}
${
  custom
    ? `
export type ComparisonFilterValueItems = string | number;
export type _ToolFileSearchToolFiltersValue = string | number | boolean | (string | number)[];
export type _ToolFileSearchToolFiltersValue1 = _FileSearchToolFiltersValue;
export const _toolFileSearchToolFiltersValueSerializer = _fileSearchToolFiltersValueSerializer;
export const _toolFileSearchToolFiltersValueDeserializer = _fileSearchToolFiltersValueDeserializer;
export const _toolFileSearchToolFiltersValue1Serializer = _fileSearchToolFiltersValue1Serializer;
export const _toolFileSearchToolFiltersValue1Deserializer = _fileSearchToolFiltersValue1Deserializer;
export const _toolFileSearchToolFiltersValue1ArraySerializer = _fileSearchToolFiltersValue1ArraySerializer;
`
    : ""
}
`);
  };
  const incoming = fixture({ added: true });
  const result = succeeded(fixture({ old: true }), fixture({ custom: true }), incoming);
  const output = result.files.get(modelFile);
  assert.match(
    output.replace(/\s+/g, " "),
    /value: string \| number \| boolean \| _FileSearchToolFiltersValue\[\] \| null/,
  );
  assert.match(output, /export type ComparisonFilterValueItems = string \| number;/);
  assert.ok(result.exports.some((entry) => entry.name === "ComparisonFilterValueItems"));
  const converters = evaluate(output);
  assert.equal(
    converters._toolFileSearchToolFiltersValueSerializer,
    converters._fileSearchToolFiltersValueSerializer,
  );
  assert.equal(
    converters._toolFileSearchToolFiltersValue1ArraySerializer,
    converters._fileSearchToolFiltersValue1ArraySerializer,
  );
  const values = ["kept", 0];
  assert.equal(converters.comparisonFilterSerializer({ value: values }).value, values);
  assert.equal(converters.comparisonFilterSerializer({ value: null }).value, null);
  const repeated = succeeded(incoming, result.files, incoming);
  assert.match(
    repeated.files.get(modelFile),
    /export type ComparisonFilterValueItems = string \| number;/,
  );
});

test("restored helper references retain released inline property types and emitted variants", () => {
  for (const [model, property, original, released, array] of [
    [
      "CodeInterpreterTool",
      "container",
      "_ToolCodeInterpreterToolContainer",
      "_CodeInterpreterToolContainer",
      false,
    ],
    ["MCPTool", "allowed_tools", "_ToolMcpToolAllowedTools", "_MCPToolAllowedTools", false],
    [
      "MCPTool",
      "require_approval",
      "_ToolMcpToolRequireApproval",
      "_MCPToolRequireApproval",
      false,
    ],
    [
      "CompoundFilter",
      "filters",
      "_ToolFileSearchToolFiltersFilter",
      "_FileSearchToolFiltersFilter",
      true,
    ],
  ]) {
    const fixture = ({ old = false, custom = false, added = false } = {}) => {
      const helper = old ? original : released;
      const union = `string | number${added ? " | boolean" : ""}`;
      const type = custom ? (array ? `(${union})[]` : union) : helper + (array ? "[]" : "");
      return tree(`
export interface ${model} { ${property}?: ${type}; ${custom ? "customized?: boolean;" : ""} }
export type ${helper} = ${union};
${custom ? `export type ${original} = ${released};` : ""}
`);
    };
    const incoming = fixture({ added: true });
    const result = succeeded(fixture({ old: true }), fixture({ custom: true }), incoming);
    const output = result.files.get(modelFile);
    assert.match(
      output.replace(/\s+/g, " "),
      new RegExp(
        `${property}\\?: ${array ? "\\(" : ""}string \\| number \\| boolean${array ? "\\)\\[\\]" : ""}`,
      ),
    );
    assert.match(output, /customized\?: boolean/);
    assert.deepEqual(succeeded(incoming, result.files, incoming).diagnostics, []);
  }
});

test("shared emitted tool helpers do not replace customized toolbox and voice converter calls", () => {
  for (const [original, released, oldPrefix, prefix, emittedPrefix] of [
    [
      "_ToolCodeInterpreterToolContainer",
      "_CodeInterpreterToolContainer",
      "_toolCodeInterpreterToolContainer",
      "_codeInterpreterToolContainer",
      "_CodeInterpreterToolContainer",
    ],
    [
      "_ToolMcpToolAllowedTools",
      "_MCPToolAllowedTools",
      "_toolMcpToolAllowedTools",
      "_mcpToolAllowedTools",
      "_MCPToolAllowedTools",
    ],
    [
      "_ToolMcpToolRequireApproval",
      "_MCPToolRequireApproval",
      "_toolMcpToolRequireApproval",
      "_mcpToolRequireApproval",
      "_MCPToolRequireApproval",
    ],
  ]) {
    const fixture = (name, converter, custom = false) =>
      tree(`
export type ${name} = string | number;
export function ${converter}Serializer(item: ${name}): any { return item; }
export function toolboxSerializer(item: { value: ${name} }): any {
  return { value: ${custom ? "customToolboxSerializer" : converter + "Serializer"}(item.value) };
}
${
  custom
    ? `
export function customToolboxSerializer(item: ${name}): any { return String(item).toUpperCase(); }
export type ${original} = ${released};
export const ${oldPrefix}Serializer = ${prefix}Serializer;
`
    : ""
}
`);
    const incoming = fixture(released, emittedPrefix);
    const result = succeeded(
      fixture(original, oldPrefix),
      fixture(released, prefix, true),
      incoming,
    );
    assert.equal(
      evaluate(result.files.get(modelFile)).toolboxSerializer({ value: "kept" }).value,
      "KEPT",
    );
    assert.equal(
      evaluate(succeeded(incoming, result.files, incoming).files.get(modelFile)).toolboxSerializer({
        value: "kept",
      }).value,
      "KEPT",
    );
  }
});

test("historical tool policy does not collapse independent declarations into released identities", () => {
  const base = tree("export interface ToolFunctionTool { name?: string; }");
  const custom = tree(`
export interface ToolFunctionTool { name: string; }
export interface FunctionTool { independent: boolean; }
`);
  const incoming = tree("export interface FunctionTool { name?: string; strict?: boolean; }");
  const result = plan(base, custom, incoming);
  assert.equal(result.renames.has("ToolFunctionTool"), false);
  assert.ok(result.diagnostics.some((entry) => entry.declaration === "FunctionTool"));
  const conflictingDefinitions = plan(
    tree(
      "export interface ToolMcpTool { name: string; } export interface MCPTool { independent: boolean; }",
    ),
    tree("export interface MCPTool { name: string; } export type ToolMcpTool = MCPTool;"),
    tree("export interface MCPTool { name: string; }"),
  );
  assert.ok(
    conflictingDefinitions.diagnostics.some((entry) =>
      entry.message.includes("Ambiguous model declaration"),
    ),
  );
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
