// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

const root = path.resolve(__dirname, "../../..");
const workflow = (name) =>
  readFileSync(path.join(root, ".github", "workflows", name), "utf8").replace(/\r\n/g, "\n");
const source = workflow("issue-investigation.md");
const lock = workflow("issue-investigation.lock.yml");

// Execute the actual inline scripts, not a second implementation of their policy.
function stepScript(text, name) {
  const allLines = text.split("\n");
  const start = allLines.findIndex((line) =>
    [`- name: ${name}`, `name: ${name}`].includes(line.trim()),
  );
  assert.notEqual(start, -1, `Missing step: ${name}`);
  const match = allLines
    .slice(start)
    .join("\n")
    .match(/\n( +)script: \|[-+]?\n((?:\n| +[^\n]*\n)*)/);
  assert.ok(match, `Missing script: ${name}`);
  const indent = match[1].length + 2;
  const lines = [];
  for (const line of match[2].split("\n")) {
    if (line.trim() && line.search(/\S/) < indent) break;
    lines.push(line.slice(indent));
  }
  return lines.join("\n").trim();
}

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const execute = (script, values) =>
  new AsyncFunction(...Object.keys(values), script)(...Object.values(values));

function validateTarget(value, issue = {}, apiError) {
  return execute(stepScript(source, "Validate issue target"), {
    process: { env: { ISSUE_NUMBER: value } },
    context: { repo: { owner: "Azure", repo: "azure-sdk-for-js" } },
    github: {
      rest: {
        issues: {
          async get(request) {
            assert.deepEqual(request, {
              owner: "Azure",
              repo: "azure-sdk-for-js",
              issue_number: Number(value),
            });
            if (apiError) throw apiError;
            return { data: issue };
          },
        },
      },
    },
  });
}

const validIssue = () => ({
  state: "open",
  labels: [
    { name: "customer-reported", color: "3800e0" },
    { name: "KeyVault", color: "e99695" },
    { name: "Client", color: "ffeb77" },
    { name: "question", color: "eaa875" },
    { name: "needs-team-attention", color: "ededed" },
  ],
});
const comment = () => ({ type: "add_comment", item_number: 42, body: "Investigation" });
const close = () => ({ type: "close_issue", issue_number: 42, body: "Service explanation" });
const assign = () => ({ type: "assign_to_agent", issue_number: 42, agent: "copilot" });

function verify(issue = validIssue(), items = [comment()], apiError) {
  return execute(stepScript(source, "Revalidate issue before publishing investigation"), {
    process: { env: { ISSUE_NUMBER: "42" } },
    context: { repo: { owner: "Azure", repo: "azure-sdk-for-js" } },
    require: (name) => {
      assert.equal(name, "fs");
      return {
        readFileSync(file) {
          assert.equal(file, "/tmp/gh-aw/agent_output.json");
          return JSON.stringify({ items });
        },
      };
    },
    github: {
      rest: {
        issues: {
          async get(request) {
            assert.deepEqual(request, {
              owner: "Azure",
              repo: "azure-sdk-for-js",
              issue_number: 42,
            });
            if (apiError) throw apiError;
            return { data: issue };
          },
        },
      },
    },
  });
}

test("input validation accepts positive decimal safe integers", async () => {
  for (const value of ["1", "42", String(Number.MAX_SAFE_INTEGER)]) {
    await validateTarget(value);
  }
});

for (const value of [
  undefined,
  "",
  "0",
  "-1",
  "01",
  "1.5",
  "1e2",
  " 42",
  "42\n",
  "42;echo",
  "9007199254740992",
]) {
  test(`input validation rejects ${JSON.stringify(value)}`, async () => {
    await assert.rejects(validateTarget(value), /positive decimal safe integer/);
  });
}

test("target validation rejects pull requests before running the agent", async () => {
  await assert.rejects(
    validateTarget("42", { pull_request: {} }),
    /only issues can be investigated/,
  );
});

test("target validation propagates lookup failures", async () => {
  const error = new Error("Issue lookup unavailable");
  await assert.rejects(validateTarget("42", {}, error), (actual) => actual === error);
});

for (const category of [
  "Client",
  "Mgmt",
  "Provisioning",
  "Service",
  "Central-EngSys",
  "Mgmt-EngSys",
]) {
  test(`eligibility accepts the ${category} category without a bug label`, async () => {
    const issue = validIssue();
    issue.labels[2].name = category;
    await verify(issue);
  });
}

test("eligibility uses colors rather than service/category name allowlists", async () => {
  const issue = validIssue();
  issue.labels[1] = { name: "New service", color: "E99695" };
  issue.labels[2] = { name: "New category", color: "FFEB77" };
  issue.assignees = [{ login: "human-owner" }];
  await verify(issue, [comment(), assign()]);
});

for (const excluded of [
  "needs-triage",
  "needs-team-triage",
  "issue-addressed",
  "needs-author-feedback",
]) {
  test(`eligibility rejects ${excluded} added during investigation`, async () => {
    const issue = validIssue();
    issue.labels.push({ name: excluded, color: "ededed" });
    await assert.rejects(verify(issue), /no longer eligible/);
  });
}

for (const index of [0, 1, 2]) {
  test(`eligibility rejects missing required label ${index}`, async () => {
    const issue = validIssue();
    issue.labels.splice(index, 1);
    await assert.rejects(verify(issue), /no longer eligible/);
  });
}

for (const color of ["e99695", "ffeb77"]) {
  test(`eligibility rejects multiple labels with color ${color}`, async () => {
    const issue = validIssue();
    issue.labels.push({ name: "Another label", color });
    await assert.rejects(verify(issue), /no longer eligible/);
  });
}

test("eligibility rejects closed issues and pull requests", async () => {
  await assert.rejects(verify({ ...validIssue(), state: "closed" }), /no longer eligible/);
  await assert.rejects(verify({ ...validIssue(), pull_request: {} }), /no longer eligible/);
});

test("eligibility propagates API failures rather than authorizing writes", async () => {
  const error = new Error("GitHub unavailable");
  await assert.rejects(verify(validIssue(), [comment()], error), (actual) => actual === error);
});

for (const item of [
  { ...comment(), item_number: 43 },
  { ...close(), issue_number: 43 },
  { ...assign(), issue_number: 43 },
  { ...comment(), repo: "other/repository" },
  { ...comment(), repo: null },
  { ...assign(), repo: 42 },
  { ...close(), issue_number: "42anything" },
  { ...assign(), issue_number: undefined },
]) {
  test(`rejects redirected ${JSON.stringify(item)}`, async () => {
    await assert.rejects(verify(validIssue(), [item]), /only the dispatched issue/);
  });
}

test("accepts explicit current repository without case sensitivity", async () => {
  await verify(validIssue(), [{ ...comment(), repo: "azure/AZURE-SDK-FOR-JS", item_number: "42" }]);
});

test("closure posts only its own explanation and never also assigns", async () => {
  await verify(validIssue(), [close()]);
  await assert.rejects(verify(validIssue(), [comment(), close()]), /do not also comment or assign/);
  await assert.rejects(verify(validIssue(), [close(), assign()]), /do not also comment or assign/);
});

test("output postcondition rejects missing, malformed, and empty artifacts", async () => {
  const script = stepScript(source, "Verify investigation produced output");
  for (const contents of [undefined, "", "{", "null", "{}", '{"items":{}}', '{"items":[]}']) {
    await assert.rejects(
      execute(script, {
        require: () => ({
          existsSync: () => contents !== undefined,
          readFileSync: () => contents,
        }),
        core: { info() {} },
      }),
    );
  }
  for (const item of [comment(), { type: "noop", message: "Ineligible" }]) {
    await execute(script, {
      require: () => ({
        existsSync: () => true,
        readFileSync: () => JSON.stringify({ items: [item] }),
      }),
      core: { info() {} },
    });
  }
});

test("generated inline guards match their sources and precede mutations", () => {
  for (const name of [
    "Validate issue target",
    "Verify investigation produced output",
    "Revalidate issue before publishing investigation",
  ]) {
    assert.equal(stepScript(lock, name), stepScript(source, name));
  }
  assert.ok(
    lock.indexOf("name: Revalidate issue before publishing investigation") <
      lock.indexOf("name: Process Safe Outputs"),
  );
  assert.match(lock, /\(needs\.agent\.result == 'success'\)/);
});

test("generated safe-output scope and closure policy remain bounded", () => {
  const configLine = lock.match(/^\s+GH_AW_SAFE_OUTPUTS_HANDLER_CONFIG: (.+)$/m)[1];
  const config = JSON.parse(JSON.parse(configLine));
  for (const type of ["add_comment", "close_issue", "assign_to_agent"]) {
    assert.equal(config[type].max, 1);
    assert.equal(config[type].target, "${{ github.event.inputs.issue_number }}");
  }
  assert.equal(config.close_issue.state_reason, "not_planned");
  assert.equal(config.assign_to_agent["ignore-if-error"], true);
  assert.equal(config.assign_to_agent.issue_intent, false);
  assert.equal(config.add_labels, undefined);
  assert.equal(config.remove_labels, undefined);
  assert.match(
    lock,
    /gh-aw-conclusion-issue-investigation-\$\{\{ github\.event\.inputs\.issue_number \|\| github\.run_id \}\}/,
  );
});

test("triage dispatch waits for requested owner notification and successful agent output", () => {
  const triage = workflow("issue-triage.lock.yml");
  const job = triage.slice(triage.indexOf("\n  safe_outputs:\n"));
  assert.match(job, /needs:\n(?:      - .+\n)*      - mention_owners\n/);
  assert.match(job, /needs\.agent\.result == 'success'/);
  assert.match(job, /!contains\(needs\.agent\.outputs\.output_types, 'mention_owners'\)/);
  assert.match(job, /needs\.mention_owners\.result == 'success'/);
  const config = JSON.parse(
    JSON.parse(job.match(/^\s+GH_AW_SAFE_OUTPUTS_HANDLER_CONFIG: (.+)$/m)[1]),
  );
  assert.deepEqual(config.dispatch_workflow.workflows, ["issue-investigation"]);
  assert.equal(config.dispatch_workflow.max, 1);
  assert.deepEqual(config.set_issue_type.allowed, ["Bug", "Feature", "Task"]);
});

for (const [label, outputTypes, ownerResult, agentResult, detectionResult, cancelled, expected] of [
  [
    "no owner mention requested",
    "add_comment,dispatch_workflow",
    "skipped",
    "success",
    "success",
    false,
    true,
  ],
  [
    "owner notification succeeded",
    "mention_owners,dispatch_workflow",
    "success",
    "success",
    "success",
    false,
    true,
  ],
  [
    "owner notification failed",
    "mention_owners,dispatch_workflow",
    "failure",
    "success",
    "success",
    false,
    false,
  ],
  [
    "owner notification skipped",
    "mention_owners,dispatch_workflow",
    "skipped",
    "success",
    "success",
    false,
    false,
  ],
  [
    "agent failed with partial outputs",
    "dispatch_workflow",
    "skipped",
    "failure",
    "success",
    false,
    false,
  ],
  ["detection failed", "dispatch_workflow", "skipped", "success", "failure", false, false],
  ["workflow cancelled", "dispatch_workflow", "skipped", "success", "success", true, false],
]) {
  test(`compiled dispatch condition: ${label}`, () => {
    const triage = workflow("issue-triage.lock.yml");
    const job = triage.slice(triage.indexOf("\n  safe_outputs:\n"));
    const expression = job.match(/^    if: >\n((?:      .+\n)+)/m)[1].trim();
    const condition = new Function("needs", "cancelled", "contains", `return (${expression});`);
    assert.equal(
      condition(
        {
          agent: { result: agentResult, outputs: { output_types: outputTypes } },
          detection: { result: detectionResult },
          mention_owners: { result: ownerResult },
        },
        () => cancelled,
        (value, substring) => value.includes(substring),
      ),
      expected,
    );
  });
}
