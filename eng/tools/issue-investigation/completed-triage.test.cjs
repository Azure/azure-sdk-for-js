// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const { test } = require("node:test");
const { getCompletedTriage, validateArtifacts } = require("./completed-triage.cjs");
const { prepareCompletedTriage } = require("./continuation.cjs");

function fixture() {
  const run = {
    id: 100,
    run_attempt: 1,
    workflow_id: 200,
    event: "issues",
    status: "completed",
    conclusion: "success",
    repository: { id: 1 },
    head_repository: { id: 1 },
    head_sha: "a".repeat(40),
    head_branch: "main",
    display_title: "Agentic Triage #42",
  };
  const jobs = ["agent", "detection", "safe_outputs", "mention_owners"].map((name) => ({
    name,
    status: "completed",
    conclusion: name === "mention_owners" ? "skipped" : "success",
    started_at: "2026-10-16T18:00:00Z",
    completed_at: "2026-10-16T18:01:00Z",
  }));
  const context = {
    eventName: "workflow_run",
    ref: "refs/heads/main",
    repo: { owner: "Azure", repo: "azure-sdk-for-js" },
    payload: {
      repository: { id: 1, default_branch: "main" },
      workflow_run: { id: 100, run_attempt: 1, head_sha: "a".repeat(40) },
    },
  };
  const github = {
    rest: {
      actions: {
        async getWorkflow(request) {
          assert.equal(request.workflow_id, "issue-triage.lock.yml");
          return { data: { id: 200 } };
        },
        async getWorkflowRun(request) {
          assert.equal(request.run_id, 100);
          return { data: run };
        },
        listJobsForWorkflowRunAttempt() {},
      },
    },
    async paginate(_method, request) {
      assert.equal(request.run_id, 100);
      assert.equal(request.attempt_number, 1);
      return jobs;
    },
  };
  return { run, jobs, context, github, get: () => getCompletedTriage({ github, context }) };
}

test("observer binds a successful default-branch run to its trusted issue title", async () => {
  const f = fixture();
  assert.deepEqual(await f.get(), {
    runId: 100,
    attempt: 1,
    number: 42,
    sha: "a".repeat(40),
    event: "issues",
    ownerNotification: "skipped",
    appliedAfter: Date.parse("2026-10-16T18:00:00Z"),
    appliedBefore: Date.parse("2026-10-16T18:01:00Z"),
  });
});

test("manual triage is observed without changing its dispatch inputs", async () => {
  const f = fixture();
  f.run.event = "workflow_dispatch";
  assert.equal((await f.get()).event, "workflow_dispatch");
});

for (const [name, mutate] of [
  [
    "another repository",
    (f) => {
      f.run.repository.id = 2;
    },
  ],
  [
    "forked head repository",
    (f) => {
      f.run.head_repository.id = 2;
    },
  ],
  [
    "same-name different workflow",
    (f) => {
      f.run.workflow_id = 201;
    },
  ],
  [
    "unexpected event",
    (f) => {
      f.run.event = "pull_request";
    },
  ],
  [
    "untrusted observer ref",
    (f) => {
      f.context.ref = "refs/heads/feature";
    },
  ],
]) {
  test(`observer rejects ${name}`, async () => {
    const f = fixture();
    mutate(f);
    await assert.rejects(f.get(), /trusted|default-branch/);
  });
}

for (const [name, mutate] of [
  [
    "failed parent",
    (f) => {
      f.run.conclusion = "failure";
    },
  ],
  [
    "incomplete parent",
    (f) => {
      f.run.status = "in_progress";
    },
  ],
  [
    "newer attempt",
    (f) => {
      f.run.run_attempt = 2;
    },
  ],
  [
    "different source SHA",
    (f) => {
      f.run.head_sha = "b".repeat(40);
    },
  ],
  [
    "non-default source branch",
    (f) => {
      f.run.head_branch = "feature";
    },
  ],
  [
    "opt-out title",
    (f) => {
      f.run.display_title = "Agentic Triage";
    },
  ],
  [
    "invalid target suffix",
    (f) => {
      f.run.display_title = "Agentic Triage #42garbage";
    },
  ],
  [
    "notification failure",
    (f) => {
      f.jobs[3].conclusion = "failure";
    },
  ],
]) {
  test(`observer safely skips ${name}`, async () => {
    const f = fixture();
    mutate(f);
    assert.ok((await f.get()).reason);
  });
}

for (const name of ["agent", "detection", "safe_outputs"]) {
  test(`a failed ${name} job cannot authorize investigation`, async () => {
    const f = fixture();
    f.jobs.find((job) => job.name === name).conclusion = "failure";
    assert.ok((await f.get()).reason);
  });
}

function artifactFixture() {
  const f = fixture();
  const parent = { runId: 100, attempt: 1, sha: "a".repeat(40), event: "issues" };
  const info = {
    run_id: "100",
    run_attempt: "1",
    repository: "Azure/azure-sdk-for-js",
    sha: parent.sha,
    ref: "refs/heads/main",
    event_name: "issues",
    workflow_name: "Agentic Triage",
    staged: false,
  };
  const execution = { component: "detection", run_id: 100, run_attempt: 1, state: "started" };
  const verdict = {
    prompt_injection: false,
    secret_leak: false,
    malicious_patch: false,
    warnings: [],
  };
  return { info, execution, verdict, parent, context: f.context };
}

test("current native activation and detection artifact shapes are accepted", () => {
  validateArtifacts(artifactFixture());
});

for (const [name, mutate] of [
  [
    "another source run",
    (f) => {
      f.info.run_id = 101;
    },
  ],
  [
    "stale activation attempt",
    (f) => {
      f.info.run_attempt = 2;
    },
  ],
  [
    "staged processing",
    (f) => {
      f.info.staged = true;
    },
  ],
  [
    "different repository",
    (f) => {
      f.info.repository = "other/repo";
    },
  ],
  [
    "different source ref",
    (f) => {
      f.info.ref = "refs/heads/feature";
    },
  ],
  [
    "different source SHA",
    (f) => {
      f.info.sha = "b".repeat(40);
    },
  ],
  [
    "stale detection attempt",
    (f) => {
      f.execution.run_attempt = 2;
    },
  ],
  [
    "different detector run",
    (f) => {
      f.execution.run_id = 101;
    },
  ],
  [
    "warning verdict",
    (f) => {
      f.verdict.warnings = ["uncertain"];
    },
  ],
  [
    "injected prompt",
    (f) => {
      f.verdict.prompt_injection = true;
    },
  ],
  [
    "missing verdict",
    (f) => {
      delete f.verdict.secret_leak;
    },
  ],
]) {
  test(`artifact validation rejects ${name}`, () => {
    const f = artifactFixture();
    mutate(f);
    assert.throws(() => validateArtifacts(f));
  });
}

test("legacy intentional skips and deprecated-package closure need no new handoff", async () => {
  for (const items of [
    [{ type: "noop", message: "already labelled" }],
    [{ type: "set_issue_type", issue_number: 42, issue_type: "Task" }],
    [{ type: "close_issue", issue_number: 42, body: "deprecated" }],
  ]) {
    assert.ok((await prepareCompletedTriage({ output: { items, errors: [] } })).reason);
  }
});

test("the observer never rewrites the parent's requests to create its authorization", async () => {
  const output = {
    items: [
      { type: "add_comment", item_number: 42, body: "## Agentic Issue Triage\nAnalysis" },
      { type: "mention_owners", owners: "Azure/team" },
    ],
    errors: [],
  };
  const original = JSON.stringify(output);
  const context = {
    repo: { owner: "Azure", repo: "azure-sdk-for-js" },
    payload: { repository: { default_branch: "main" } },
  };
  const issue = {
    number: 42,
    state: "open",
    locked: false,
    url: "https://api.github.com/repos/Azure/azure-sdk-for-js/issues/42",
    assignees: [],
    labels: [
      { name: "customer-reported", color: "3800e0" },
      { name: "KeyVault", color: "e99695" },
      { name: "Client", color: "ffeb77" },
    ],
  };
  const github = {
    rest: {
      issues: {
        async get() {
          return { data: issue };
        },
        async getComment() {
          return { data: { issue_url: issue.url, body: output.items[0].body } };
        },
      },
    },
  };
  const result = await prepareCompletedTriage({
    github,
    context,
    number: 42,
    output,
    ownerNotification: "success",
    receipts: [
      {
        type: "add_comment",
        number: 42,
        repo: "Azure/azure-sdk-for-js",
        url: "https://github.com/Azure/azure-sdk-for-js/issues/42#issuecomment-123",
      },
    ],
  });
  assert.equal(result.output.items[0].type, "dispatch_workflow");
  assert.equal(JSON.stringify(output), original);
});

for (const value of [
  "",
  "Agentic Triage #0",
  "Agentic Triage #-1",
  "Agentic Triage #01",
  "Agentic Triage #1e3",
  "Agentic Triage #42\ntext",
  "Customer #42",
]) {
  test(`observer skips invalid correlation title ${JSON.stringify(value)}`, async () => {
    const f = fixture();
    f.run.display_title = value;
    assert.ok((await f.get()).reason);
  });
}

for (const name of ["agent", "detection", "safe_outputs", "mention_owners"]) {
  for (const state of ["failure", "cancelled", "timed_out", "skipped"]) {
    if (name === "mention_owners" && state === "skipped") continue;
    test(`observer refuses ${name} ${state}`, async () => {
      const f = fixture();
      f.jobs.find((job) => job.name === name).conclusion = state;
      assert.ok((await f.get()).reason);
    });
  }
  test(`observer refuses duplicate ${name} jobs`, async () => {
    const f = fixture();
    f.jobs.push({ ...f.jobs.find((job) => job.name === name) });
    assert.ok((await f.get()).reason);
  });
}

test("observer preserves parent errors instead of dispatching on lookup failure", async () => {
  const f = fixture();
  f.github.rest.actions.getWorkflowRun = async () => {
    throw new Error("API unavailable");
  };
  await assert.rejects(f.get(), /API unavailable/);
});

test("non-main default branches are accepted without assuming main", async () => {
  const f = fixture();
  f.context.payload.repository.default_branch = "trunk";
  f.context.ref = "refs/heads/trunk";
  f.run.head_branch = "trunk";
  assert.equal((await f.get()).number, 42);
});

test("missing source timestamps cannot authorize stale receipt reuse", async () => {
  const f = fixture();
  delete f.jobs[2].started_at;
  await assert.rejects(f.get(), /timestamps/);
});
