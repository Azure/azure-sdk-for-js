// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { wireTrainingJobsClient } from "./training-jobs-client.mjs";
import { planCustomization } from "./planner.mjs";
import { validateCustomization } from "./guards.mjs";

const file = "aiProjectClient.ts";
// Historical pre-Jobs fixtures must not change when the package is regenerated.
const base = `
import { AIProjectContext, createAIProject } from "./api/index.js";
import { AgentsOperations, _getAgentsOperations } from "./classic/agents/index.js";
export class AIProjectClient {
  private _client: AIProjectContext;
  public readonly pipeline: Pipeline;
  constructor(endpoint, credential, options = {}) {
    this._client = createAIProject(endpoint, credential, options);
    this.pipeline = this._client.pipeline;
    this.agents = _getAgentsOperations(this._client);
  }
  public readonly agents: AgentsOperations;
}`;
const customized = `
import { AIProjectContext, createAIProject } from "./api/index.js";
import { AgentsOperations, _getAgentsOperations } from "./classic/agents/index.js";
import { createOpenAI, createTelemetry } from "./custom.js";
export class AIProjectClient {
  private _cognitiveScopeClient: AIProjectContext;
  private _azureScopeClient: AIProjectContext;
  constructor(endpoint, credential, options = {}) {
    const userAgentPrefix = "azsdk-js-client";
    this._cognitiveScopeClient = createAIProject(endpoint, credential, {
      ...options, credentials: { scopes: ["https://ai.azure.com/.default"] }
    });
    this._azureScopeClient = createAIProject(endpoint, credential, { ...options, userAgentPrefix });
    this.agents = _getAgentsOperations(this._azureScopeClient, options.tracing);
    this.telemetry = createTelemetry(this.agents);
  }
  public readonly agents: AgentsOperations;
  getOpenAIClient(options) { return createOpenAI(this._cognitiveScopeClient, options); }
}`;
const declaration = "public readonly jobs: JobsOperations;";
const incoming = base
  .replace(
    "export class AIProjectClient {",
    'import { JobsOperations, _getJobsOperations } from "./classic/jobs/index.js";\nexport class AIProjectClient {',
  )
  .replace(
    "this.pipeline = this._client.pipeline;",
    "this.pipeline = this._client.pipeline;\nthis.jobs = _getJobsOperations(this._client);",
  )
  .replace(
    "private _client: AIProjectContext;",
    `private _client: AIProjectContext;\n${declaration}`,
  );

function trees(source = customized) {
  return {
    baseGenerated: new Map([[file, base]]),
    baseSource: new Map([[file, customized]]),
    generated: new Map([[file, incoming]]),
    source: new Map([[file, source]]),
  };
}

test("reproduces the emitted Jobs member and initialization failure", () => {
  const diagnostics = validateCustomization(trees());
  assert(diagnostics.some((item) => /newly emitted protected client/.test(item.message)));
  assert(diagnostics.some((item) => /initialization/.test(item.message)));
});

test("planner wires Jobs and guards accept only the reviewed maintained-client mapping", () => {
  const inputs = trees();
  const result = planCustomization(inputs);
  assert.deepEqual(result.diagnostics, []);
  const output = result.source.get(file);
  assert.match(output, /this\.jobs = _getJobsOperations\(this\._azureScopeClient\);/);
  assert.match(output, /public readonly jobs: JobsOperations;/);
  assert.deepEqual(validateCustomization({ ...inputs, source: result.source }), []);
  const withoutAdditions = output
    .replace('\nimport type { JobsOperations } from "./classic/jobs/index.js";', "")
    .replace('\nimport { _getJobsOperations } from "./classic/jobs/index.js";', "")
    .replace("\n    this.jobs = _getJobsOperations(this._azureScopeClient);", "")
    .replace(
      "\n\n  /** The operation group for command training jobs. */\n  public readonly jobs: JobsOperations;",
      "",
    );
  assert.equal(withoutAdditions, customized);
});

test("does nothing for the default generated baseline or existing customized Jobs", () => {
  assert.equal(wireTrainingJobsClient(base, customized, base).text, customized);
  const first = wireTrainingJobsClient(base, customized, incoming);
  assert.equal(wireTrainingJobsClient(base, first.text, incoming).text, first.text);
  assert.equal(wireTrainingJobsClient(incoming, first.text, incoming).text, first.text);
});

for (const [name, changed] of [
  ["type", incoming.replace(declaration, "public readonly jobs: OtherOperations;")],
  ["factory", incoming.replace("_getJobsOperations(this._client)", "getUnknown(this._client)")],
  [
    "arguments",
    incoming.replace(
      "_getJobsOperations(this._client)",
      "_getJobsOperations(this._client, options)",
    ),
  ],
  ["import", incoming.replace('"./classic/jobs/index.js"', '"./unexpected.js"')],
]) {
  test(`rejects an unreviewed Jobs ${name} without changing source`, () => {
    const result = wireTrainingJobsClient(base, customized, changed);
    assert.equal(result.text, customized);
    assert.equal(result.diagnostics.length, 1);
  });
}

test("rejects a missing maintained context without substituting an authentication scope", () => {
  const source = customized.replace(
    "this._azureScopeClient = createAIProject",
    "this.other = createAIProject",
  );
  const result = wireTrainingJobsClient(base, source, incoming);
  assert.equal(result.text, source);
  assert.equal(result.diagnostics.length, 1);
});

test("does not hide unrelated newly emitted protected members", () => {
  const inputs = trees();
  inputs.generated.set(
    file,
    incoming.replace(declaration, `${declaration}\npublic readonly other: OtherOperations;`),
  );
  const result = planCustomization(inputs);
  assert(
    validateCustomization({ ...inputs, source: result.source }).some(
      (item) => /protected client/.test(item.message) && item.member === "other",
    ),
  );
});

test("guard rejects a different Jobs context or changes to the maintained context", () => {
  const inputs = trees();
  const result = planCustomization(inputs);
  const output = result.source.get(file);
  for (const changed of [
    output.replace(
      "_getJobsOperations(this._azureScopeClient)",
      "_getJobsOperations(this._cognitiveScopeClient)",
    ),
    output.replace(
      'scopes: ["https://ai.azure.com/.default"]',
      'scopes: ["https://unexpected.example/.default"]',
    ),
  ]) {
    assert(
      validateCustomization({ ...inputs, source: new Map([[file, changed]]) }).some((item) =>
        /Protected customization/.test(item.message),
      ),
    );
  }
});
