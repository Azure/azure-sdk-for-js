// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const { test } = require("node:test");
const { prepareAssignment, prepareDispatch } = require("./continuation.cjs");

test("multi-owner routing verifies assignment as well as successful mentions", async () => {
  const f = fixture("dispatch");
  f.options.output.items.push({ type: "mention_owners", owners: "owner,other-owner" });
  f.options.ownerNotification = "success";
  assert.ok((await f.run()).output);
  f.options.receipts.pop();
  await assert.rejects(f.run(), /not applied/);
});

test("multi-owner notification cannot hide an assignment to the wrong person", async () => {
  const f = fixture("dispatch");
  f.options.output.items.push({ type: "mention_owners", owners: "owner,other-owner" });
  f.options.ownerNotification = "success";
  f.state.issue.assignees = [{ login: "unrelated-owner" }];
  await assert.rejects(f.run(), /not applied/);
});

function fixture(kind = "assignment") {
  const context = {
    repo: { owner: "Azure", repo: "azure-sdk-for-js" },
    payload: { repository: { default_branch: "main" } },
  };
  const issue = {
    number: 42,
    state: "open",
    locked: false,
    url: "https://api.github.com/repos/Azure/azure-sdk-for-js/issues/42",
    labels: [
      { name: "customer-reported", color: "3800e0" },
      { name: "KeyVault", color: "e99695" },
      { name: "Client", color: "ffeb77" },
    ],
    assignees: [{ login: "owner" }],
  };
  const body =
    kind === "assignment"
      ? "## Agentic Issue Investigation\n\n**Decision:** Recommended for Copilot\n\nA bounded fix."
      : "## Agentic Issue Triage\n\nAnalysis for this issue.";
  const state = { issue, body, reads: 0, commentReads: 0, afterAnalysis: undefined };
  const options = {
    context,
    number: "42",
    ownerNotification: "skipped",
    output: {
      items:
        kind === "assignment"
          ? [
              { type: "add_comment", item_number: 42, body },
              { type: "assign_to_agent", issue_number: 42, agent: "copilot" },
            ]
          : [
              { type: "add_comment", item_number: 42, body },
              { type: "assign_to_user", issue_number: 42, assignees: ["owner"] },
              {
                type: "dispatch_workflow",
                workflow_name: "issue-investigation",
                inputs: { issue_number: "42" },
              },
            ],
      errors: [],
    },
    receipts: [
      {
        type: "add_comment",
        number: 42,
        repo: "Azure/azure-sdk-for-js",
        url: "https://github.com/Azure/azure-sdk-for-js/issues/42#issuecomment-123",
      },
      // Real gh-aw single-owner assignment receipts omit number.
      ...(kind === "dispatch" ? [{ type: "assign_to_user" }] : []),
    ],
    normalizeAssignment: (item) => ({
      success: true,
      issueNumber: item.issue_number,
      assignees: item.assignees,
    }),
    github: {
      rest: {
        issues: {
          async get(request) {
            assert.equal(request.issue_number, 42);
            state.reads++;
            return {
              data: state.afterAnalysis && state.reads > 1 ? state.afterAnalysis : state.issue,
            };
          },
          async getComment(request) {
            assert.equal(request.comment_id, 123);
            state.commentReads++;
            return { data: { issue_url: state.commentIssue || state.issue.url, body: state.body } };
          },
        },
      },
    },
  };
  return {
    state,
    options,
    run: () => (kind === "assignment" ? prepareAssignment(options) : prepareDispatch(options)),
  };
}

test("assignment is reconstructed only after applied analysis and current eligibility", async () => {
  const f = fixture();
  const result = await f.run();
  assert.deepEqual(result.output.items, [
    { type: "assign_to_agent", agent: "copilot", issue_number: 42 },
  ]);
  assert.equal(result.config.assign_to_agent["ignore-if-error"], true);
  assert.equal(result.config.assign_to_agent.issue_intent, false);
  assert.equal(result.config.assign_to_agent.target, "42");
  assert.equal(f.state.reads, 2);
  assert.equal(f.state.commentReads, 1);
});

test("single-owner handoff accepts the real numberless receipt shape", async () => {
  const f = fixture("dispatch");
  const result = await f.run();
  assert.deepEqual(result.output.items, [
    {
      type: "dispatch_workflow",
      workflow_name: "issue-investigation",
      inputs: { issue_number: "42" },
      ref: "refs/heads/main",
    },
  ]);
  assert.equal(result.config.dispatch_workflow.max, 1);
});

test("handoff honors a default branch other than main", async () => {
  const f = fixture("dispatch");
  f.options.context.payload.repository.default_branch = "trunk";
  assert.equal((await f.run()).output.items[0].ref, "refs/heads/trunk");
});
test("SDK team-only ownership routes through notification without a fictitious assignee", async () => {
  const f = fixture("dispatch");
  f.options.output.items[1] = { type: "mention_owners", owners: "Azure/azure-sdk-write-keyvault" };
  f.options.ownerNotification = "success";
  f.options.receipts.pop();
  f.state.issue.assignees = [];
  assert.ok((await f.run()).output);
});

test("service-owner mention routing needs no single-owner assignment", async () => {
  const f = fixture("dispatch");
  f.options.output.items[1] = { type: "mention_owners", owners: "team-owner" };
  f.options.ownerNotification = "success";
  f.options.receipts.pop();
  assert.ok((await f.run()).output);
});

for (const kind of ["assignment", "dispatch"]) {
  for (const field of ["number", "repo", "url"]) {
    test(`${kind} rejects a receipt with redirected ${field}`, async () => {
      const f = fixture(kind);
      f.options.receipts[0][field] = {
        number: 43,
        repo: "other/repo",
        url: "https://github.com/other/repo/issues/42#issuecomment-123",
      }[field];
      await assert.rejects(f.run(), /receipt/);
    });
  }
  test(`${kind} rejects a failed comment with no applied receipt`, async () => {
    const f = fixture(kind);
    f.options.receipts = f.options.receipts.filter((item) => item.type !== "add_comment");
    await assert.rejects(f.run(), /applied analysis/);
  });
  test(`${kind} rejects an applied comment belonging to another issue`, async () => {
    const f = fixture(kind);
    f.state.commentIssue = "https://api.github.com/repos/Azure/azure-sdk-for-js/issues/43";
    await assert.rejects(f.run(), /another issue/);
  });
  test(`${kind} rejects a comment without the analysis heading`, async () => {
    const f = fixture(kind);
    f.state.body = "Owner routing only";
    await assert.rejects(f.run(), /No applied analysis/);
  });
  test(`${kind} does not continue after labels change during receipt lookup`, async () => {
    const f = fixture(kind);
    f.state.afterAnalysis = {
      ...f.state.issue,
      labels: [...f.state.issue.labels, { name: "needs-author-feedback", color: "ededed" }],
    };
    assert.match((await f.run()).reason, /no longer satisfies/);
  });
  for (const label of [
    "needs-triage",
    "needs-team-triage",
    "issue-addressed",
    "needs-author-feedback",
  ]) {
    test(`${kind} skips ${label}`, async () => {
      const f = fixture(kind);
      f.state.issue.labels.push({ name: label, color: "ededed" });
      assert.match((await f.run()).reason, /handoff/);
      assert.equal(f.state.commentReads, 0);
    });
  }
  for (const type of ["missing_tool", "missing_data", "report_incomplete"]) {
    test(`${kind} rejects incomplete work: ${type}`, async () => {
      const f = fixture(kind);
      f.options.output.items.push({ type });
      await assert.rejects(f.run(), /incomplete work/);
    });
  }
  for (const category of [
    "Client",
    "Mgmt",
    "Provisioning",
    "Service",
    "Central-EngSys",
    "Mgmt-EngSys",
  ]) {
    test(`${kind} retains ${category} eligibility`, async () => {
      const f = fixture(kind);
      f.state.issue.labels[2].name = category;
      assert.ok((await f.run()).output);
    });
  }
}

test("assignment does not use a posted analysis lacking the explicit recommendation", async () => {
  const f = fixture();
  f.state.body = "## Agentic Issue Investigation\n\nNot recommended for Copilot";
  await assert.rejects(f.run(), /No applied analysis/);
});

test("assignment rejects conflicting target aliases and non-Copilot agents", async () => {
  const f = fixture();
  f.options.output.items[1].item_number = 43;
  await assert.rejects(f.run(), /only the investigated issue/);
  delete f.options.output.items[1].item_number;
  f.options.output.items[1].agent = "other-agent";
  await assert.rejects(f.run(), /Only Copilot/);
});

test("single-owner routing requires exactly one matching assignment request and receipt", async () => {
  const f = fixture("dispatch");
  f.options.output.items.splice(1, 0, {
    type: "assign_to_user",
    issue_number: 43,
    assignees: ["owner"],
  });
  await assert.rejects(f.run(), /only the investigated issue/);
  f.options.output.items.splice(1, 1);
  f.options.receipts[1].number = 43;
  await assert.rejects(f.run(), /not applied/);
  delete f.options.receipts[1].number;
  f.options.receipts.push({ type: "assign_to_user" });
  await assert.rejects(f.run(), /not applied/);
});

test("single-owner routing checks the actual assigned owner", async () => {
  const f = fixture("dispatch");
  f.state.issue.assignees = [{ login: "other-owner" }];
  await assert.rejects(f.run(), /not applied/);
});

test("failed, skipped, or repeated mention requests do not authorize dispatch", async () => {
  for (const result of ["failure", "skipped"]) {
    const f = fixture("dispatch");
    f.options.output.items[1] = { type: "mention_owners", owners: "owner" };
    f.options.ownerNotification = result;
    await assert.rejects(f.run(), /notification did not succeed/);
  }
});

test("an investigation handoff cannot redirect the requested issue or workflow", async () => {
  const f = fixture("dispatch");
  f.options.output.items[2].inputs.issue_number = "43";
  await assert.rejects(f.run(), /one investigation handoff/);
  f.options.output.items[2].inputs.issue_number = "42";
  f.options.output.items[2].workflow_name = "other-workflow";
  await assert.rejects(f.run(), /one investigation handoff/);
});

test("comment receipt validation supports the trusted enterprise server", async () => {
  const f = fixture();
  f.options.context.serverUrl = "https://github.example.com";
  f.options.receipts[0].url =
    "https://github.example.com/Azure/azure-sdk-for-js/issues/42#issuecomment-123";
  assert.ok((await f.run()).output);
});

test("API failures propagate rather than authorizing continuation", async () => {
  const f = fixture();
  f.options.github.rest.issues.getComment = async () => {
    throw new Error("Comment lookup unavailable");
  };
  await assert.rejects(f.run(), /Comment lookup unavailable/);
});
