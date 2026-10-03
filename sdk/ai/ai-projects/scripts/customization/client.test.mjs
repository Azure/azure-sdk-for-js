// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { wireOperationGroups, wiredOperationGroup } from "./client.mjs";
import { validateCustomization } from "./guards.mjs";
import { parse } from "./modules.mjs";
import { planCustomization } from "./planner.mjs";

const file = "aiProjectClient.ts";

function generatedClient(groups) {
  const names = groups.map((group) => group[0].toUpperCase() + group.slice(1));
  return `import { AIProjectContext, AIProjectClientOptionalParams, createAIProject } from "./api/index.js";
${groups.map((group, index) => `import { ${names[index]}Operations, _get${names[index]}Operations } from "./classic/${group}/index.js";`).join("\n")}

export class AIProjectClient {
  private _client: AIProjectContext;

  constructor(endpoint: string, options: AIProjectClientOptionalParams = {}) {
    this._client = createAIProject(endpoint, options);
${groups.map((group, index) => `    this.${group} = _get${names[index]}Operations(this._client);`).join("\n")}
  }

${groups.map((group, index) => `  /** The operation groups for ${group} */\n  public readonly ${group}: ${names[index]}Operations;`).join("\n")}
}
`;
}

const customClient = `import type { AIProjectContext, AIProjectClientOptionalParams } from "./api/index.js";
import { createAIProject } from "./api/index.js";
import type { ConnectionsOperations } from "./classic/connections/index.js";
import { _getConnectionsOperations } from "./classic/connections/index.js";
import type { AgentsOperations } from "./classic/agents/index.js";
import { _getAgentsOperations } from "./classic/agents/index.js";
import { resolveTracingConfig } from "./tracing/configuration.js";

export class AIProjectClient {
  private _cognitiveScopeClient: AIProjectContext;
  private _azureScopeClient: AIProjectContext;

  constructor(endpoint: string, options: AIProjectClientOptionalParams = {}) {
    this._cognitiveScopeClient = createAIProject(endpoint, { ...options, credentials: { scopes: ["https://ai.azure.com/.default"] } });
    this._azureScopeClient = createAIProject(endpoint, options);
    this.connections = _getConnectionsOperations(this._azureScopeClient);
    this.agents = _getAgentsOperations(this._azureScopeClient, resolveTracingConfig(options));
  }

  /** The operation groups for connections */
  public readonly connections: ConnectionsOperations;
  /** The operation groups for agents */
  public readonly agents: AgentsOperations;

  /** Maintained helper. */
  getEndpointUrl(): string {
    return "maintained";
  }
}
`;

function trees(incomingGroups, custom = customClient) {
  return {
    baseGenerated: new Map([[file, generatedClient(["connections", "agents"])]]),
    baseSource: new Map([[file, custom]]),
    generated: new Map([[file, generatedClient(incomingGroups)]]),
  };
}

function wire(inputs) {
  return wireOperationGroups({
    file,
    baseText: inputs.baseGenerated.get(file),
    customText: inputs.baseSource.get(file),
    incomingText: inputs.generated.get(file),
  });
}

test("wires a newly emitted operation group into the protected client", () => {
  const inputs = trees(["connections", "jobs", "agents"]);
  const result = wire(inputs);
  assert.deepEqual(result.diagnostics, []);
  parse(result.text);
  assert.match(
    result.text,
    /import type \{ JobsOperations \} from "\.\/classic\/jobs\/index\.js";\nimport \{ _getJobsOperations \} from "\.\/classic\/jobs\/index\.js";/,
  );
  assert.match(
    result.text,
    /this\.connections = _getConnectionsOperations\(this\._azureScopeClient\);\nthis\.jobs = _getJobsOperations\(this\._azureScopeClient\);/,
  );
  assert.match(
    result.text,
    /public readonly connections: ConnectionsOperations;\n\/\*\* The operation groups for jobs \*\/\n  public readonly jobs: JobsOperations;/,
  );
  // Maintained scopes, arguments, and behavior are retained verbatim.
  const stripped = result.text
    .replace(
      '\nimport type { JobsOperations } from "./classic/jobs/index.js";\nimport { _getJobsOperations } from "./classic/jobs/index.js";',
      "",
    )
    .replace("\nthis.jobs = _getJobsOperations(this._azureScopeClient);", "")
    .replace("\n/** The operation groups for jobs */\n  public readonly jobs: JobsOperations;", "");
  assert.equal(stripped, customClient);
  const source = new Map([[file, result.text]]);
  assert.deepEqual(validateCustomization({ ...inputs, source }), []);
  // Neither another maintained context nor the raw emitted `_client` form
  // passes as generated-backed wiring.
  for (const context of ["this._cognitiveScopeClient", "this._client"]) {
    const rewired = result.text.replace(
      "_getJobsOperations(this._azureScopeClient)",
      `_getJobsOperations(${context})`,
    );
    assert.notEqual(rewired, result.text);
    assert.ok(
      validateCustomization({ ...inputs, source: new Map([[file, rewired]]) }).some(
        (item) => item.file === file && /additive wiring/.test(item.message),
      ),
      `${context} is not the reviewed client context`,
    );
  }
});

test("reports operation groups the client cannot wire and groups the emitter removed", () => {
  const extra = trees(["connections", "jobs", "agents"]);
  extra.generated.set(
    file,
    extra.generated
      .get(file)
      .replace("_getJobsOperations(this._client)", "_getJobsOperations(this._client, options)"),
  );
  const unplain = wire(extra);
  assert.equal(unplain.text, extra.baseSource.get(file));
  assert.ok(unplain.diagnostics.some((item) => item.member === "jobs"));
  const removed = wire(trees(["agents"]));
  assert.ok(removed.diagnostics.some((item) => item.member === "connections"));
  const unchanged = wire(trees(["connections", "agents"]));
  assert.deepEqual(unchanged, { text: customClient, diagnostics: [] });
});

test("the planner wires new operation groups and the guards accept the result", () => {
  const inputs = trees(["connections", "jobs", "agents"]);
  const plan = planCustomization(inputs);
  assert.deepEqual(plan.diagnostics, []);
  assert.match(
    plan.source.get(file),
    /this\.jobs = _getJobsOperations\(this\._azureScopeClient\);/,
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
  // Without the wiring the guards still reject the protected client.
  const unwired = validateCustomization({ ...inputs, source: inputs.baseSource });
  assert.ok(unwired.some((item) => item.file === file && item.member === "jobs"));
});

test("only plain emitted operation-group initializers have a maintained form", () => {
  assert.equal(
    wiredOperationGroup("this.jobs = _getJobsOperations(this._client);"),
    "this.jobs = _getJobsOperations(this._azureScopeClient);",
  );
  assert.equal(
    wiredOperationGroup("this.jobs = _getJobsOperations(this._client, options);"),
    undefined,
  );
  assert.equal(wiredOperationGroup("this.pipeline = this._client.pipeline;"), undefined);
  assert.equal(wiredOperationGroup("return value;"), undefined);
});

test("does not accept re-emitted baseline wiring that replaces a maintained group", () => {
  const inputs = trees(["connections", "jobs", "agents"]);
  const result = wire(inputs);
  assert.deepEqual(result.diagnostics, []);
  const replaced = result.text.replace(
    "this.agents = _getAgentsOperations(this._azureScopeClient, resolveTracingConfig(options));",
    "this.agents = _getAgentsOperations(this._azureScopeClient, resolveTracingConfig(options));\nthis.agents = _getAgentsOperations(this._azureScopeClient);",
  );
  assert.notEqual(replaced, result.text);
  assert.ok(
    validateCustomization({ ...inputs, source: new Map([[file, replaced]]) }).some(
      (item) => item.file === file && /additive wiring/.test(item.message),
    ),
    "a second initializer for an existing group must not pass as generated wiring",
  );
});

test("reports emitted wiring changes to an existing operation group", () => {
  const inputs = trees(["connections", "jobs", "agents"]);
  inputs.generated.set(
    file,
    inputs.generated
      .get(file)
      .replace(
        "_getConnectionsOperations(this._client)",
        "_getConnectionsOperations(this._client, options)",
      ),
  );
  const result = wire(inputs);
  assert.ok(
    result.diagnostics.some(
      (item) => item.member === "connections" && /changed/.test(item.message),
    ),
  );
  assert.ok(
    validateCustomization({ ...inputs, source: new Map([[file, result.text]]) }).some(
      (item) => item.member === "connections" && /changed the initialization/.test(item.message),
    ),
    "the guards also reject stale wiring of an existing group",
  );
});

test("reports a newly emitted group that collides with a maintained client member", () => {
  const groups = ["connections", "jobs", "agents"];
  const wired = wire(trees(groups)).text;
  // A maintained client already wired exactly per the policy needs no change.
  const prewired = trees(groups, wired);
  assert.deepEqual(wire(prewired), { text: wired, diagnostics: [] });
  assert.deepEqual(validateCustomization({ ...prewired, source: prewired.baseSource }), []);
  // Wired some other way, the collision is reviewed instead of kept silently.
  const cognitive = wired.replace(
    "_getJobsOperations(this._azureScopeClient)",
    "_getJobsOperations(this._cognitiveScopeClient)",
  );
  assert.notEqual(cognitive, wired);
  const collided = trees(groups, cognitive);
  const result = wire(collided);
  assert.equal(result.text, cognitive);
  assert.ok(
    result.diagnostics.some((item) => item.member === "jobs" && /collides/.test(item.message)),
  );
  assert.ok(
    validateCustomization({ ...collided, source: collided.baseSource }).some(
      (item) => item.member === "jobs" && /unproven initialization/.test(item.message),
    ),
    "the guards require the reviewed context for a newly emitted group",
  );
});

test("preserves aliased classic bindings when wiring a new operation group", () => {
  const inputs = trees(["connections", "jobs", "agents"]);
  const emitted = inputs.generated.get(file);
  const aliased = emitted
    .replace(
      "import { JobsOperations, _getJobsOperations } from",
      "import { JobsOperations as JobsOps, _getJobsOperations as getJobs } from",
    )
    .replace("this.jobs = _getJobsOperations(this._client);", "this.jobs = getJobs(this._client);")
    .replace("public readonly jobs: JobsOperations;", "public readonly jobs: JobsOps;");
  assert.notEqual(aliased, emitted);
  inputs.generated.set(file, aliased);
  const result = wire(inputs);
  assert.deepEqual(result.diagnostics, []);
  assert.match(
    result.text,
    /import type \{ JobsOperations as JobsOps \} from "\.\/classic\/jobs\/index\.js";/,
  );
  assert.match(
    result.text,
    /import \{ _getJobsOperations as getJobs \} from "\.\/classic\/jobs\/index\.js";/,
  );
  assert.match(result.text, /this\.jobs = getJobs\(this\._azureScopeClient\);/);
  assert.match(result.text, /public readonly jobs: JobsOps;/);
  assert.deepEqual(
    validateCustomization({ ...inputs, source: new Map([[file, result.text]]) }),
    [],
  );
  // The same aliased wiring already in the maintained client needs no change.
  const prewired = { ...inputs, baseSource: new Map([[file, result.text]]) };
  assert.deepEqual(wire(prewired), { text: result.text, diagnostics: [] });
});
