// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const { prepareReview, routeReviewRequest } = require("./review-request.cjs");

const headSha = "a".repeat(40);
const updatedSha = "b".repeat(40);
const label = "architecture-review-needed";
const reviewFlows = {
  archie: "architecture",
  dash: "performance",
  dexter: "dependency",
  "mgmt-review": "mgmt",
  scribe: "docs",
  sentinel: "security",
  tester: "test",
};
const automationBot = { login: "azure-sdk-automation[bot]", type: "Bot" };
const allLabels = () =>
  Object.values(reviewFlows).map((prefix) => ({ name: `${prefix}-review-needed` }));

function fixture(reviewerId = "archie") {
  const state = {
    context: {
      eventName: "workflow_run",
      actor: "maintainer",
      ref: "refs/heads/main",
      repo: { owner: "Azure", repo: "azure-sdk-for-js" },
      payload: {
        repository: { id: 1, default_branch: "main" },
        workflow_run: { id: 100 },
      },
    },
    run: {
      id: 100,
      run_attempt: 1,
      workflow_id: 10,
      event: "pull_request",
      status: "completed",
      conclusion: "success",
      repository: { id: 1 },
      head_repository: { id: 2, fork: true },
      head_sha: headSha,
      actor: { login: "maintainer", type: "User" },
      triggering_actor: { login: "maintainer", type: "User" },
      pull_requests: [],
    },
    jobsByAttempt: {
      1: [{ name: "request", status: "completed", conclusion: "success" }],
    },
    pr: {
      number: 42,
      state: "open",
      base: { repo: { id: 1 } },
      head: { repo: { id: 2 }, sha: headSha },
      labels: [{ name: `${reviewFlows[reviewerId]}-review-needed` }],
    },
    roles: { maintainer: "write", outsider: "read" },
    calls: {
      dispatches: [],
      additions: [],
      removals: [],
      actors: [],
      jobAttempts: [],
      messages: [],
      errors: [],
    },
  };
  state.associatedPRs = [structuredClone(state.pr)];
  state.core = {
    info: (message) => state.calls.messages.push(message),
    error: (message) => state.calls.errors.push(message),
  };
  state.github = {
    rest: {
      actions: {
        getWorkflowRun: async ({ run_id }) => {
          assert.equal(run_id, 100);
          return { data: state.run };
        },
        getWorkflow: async ({ workflow_id }) => {
          assert.equal(workflow_id, "pr-review-intake.yml");
          return { data: { id: 10 } };
        },
        listJobsForWorkflowRunAttempt: async ({ run_id, attempt_number }) => {
          assert.equal(run_id, 100);
          state.calls.jobAttempts.push(attempt_number);
          return { data: { jobs: state.jobsByAttempt[attempt_number] ?? [] } };
        },
        createWorkflowDispatch: async (request) => state.calls.dispatches.push(request),
      },
      repos: {
        getCollaboratorPermissionLevel: async ({ username }) => {
          state.calls.actors.push(username);
          return { data: { permission: state.roles[username] ?? "none" } };
        },
        listPullRequestsAssociatedWithCommit: async ({ commit_sha }) => {
          assert.equal(commit_sha, state.run.head_sha);
          return { data: state.associatedPRs };
        },
      },
      pulls: {
        get: async ({ pull_number }) => {
          const pr =
            pull_number === state.pr.number
              ? state.pr
              : state.associatedPRs.find((candidate) => candidate.number === pull_number);
          assert.ok(pr, `No fixture PR #${pull_number}`);
          return { data: pr };
        },
      },
      issues: {
        addLabels: async (request) => {
          state.calls.additions.push(request);
          state.pr.labels.push(...request.labels.map((name) => ({ name })));
        },
        removeLabel: async (request) => {
          state.calls.removals.push(request);
          state.pr.labels = state.pr.labels.filter((item) => item.name !== request.name);
        },
      },
    },
    paginate: async (method, parameters) => {
      const { data } = await method(parameters);
      return Array.isArray(data) ? data : data.jobs;
    },
  };
  return state;
}

function dispatchFixture(automatic = true, reviewerId = "archie") {
  const state = fixture(reviewerId);
  state.context.eventName = "workflow_dispatch";
  state.context.actor = automatic ? "github-actions[bot]" : "maintainer";
  state.context.payload.sender = {
    login: state.context.actor,
    type: automatic ? "Bot" : "User",
  };
  state.context.payload.inputs = {
    item_number: "42",
    head_sha: automatic ? headSha : "",
    request_run_id: automatic ? "100" : "",
  };
  return state;
}

test("routes a fork PR with empty run.pull_requests using API-owned commit metadata", async () => {
  const state = fixture();
  await routeReviewRequest(state);
  assert.deepEqual(state.calls.dispatches, [
    {
      owner: "Azure",
      repo: "azure-sdk-for-js",
      workflow_id: "archie.lock.yml",
      ref: "main",
      inputs: { item_number: "42", head_sha: headSha, request_run_id: "100" },
    },
  ]);
  assert.deepEqual(state.calls.actors, ["maintainer"]);
  assert.equal(state.calls.additions.length + state.calls.removals.length, 0);
});

test("routes same-repository PRs as well as forks", async () => {
  const state = fixture();
  state.run.head_repository = { id: 1, fork: false };
  state.pr.head.repo.id = 1;
  state.associatedPRs[0].head.repo.id = 1;
  await routeReviewRequest(state);
  assert.equal(state.calls.dispatches.length, 1);
});

for (const [name, change] of [
  ["a different workflow", (state) => (state.run.workflow_id = 11)],
  ["a different repository", (state) => (state.run.repository.id = 3)],
  ["a non-PR run", (state) => (state.run.event = "push")],
  ["a failed run", (state) => (state.run.conclusion = "failure")],
  ["an unfinished run", (state) => (state.run.status = "in_progress")],
]) {
  test(`rejects intake provenance from ${name}`, async () => {
    const state = fixture();
    change(state);
    await assert.rejects(routeReviewRequest(state), /successful PR Review Intake run/);
    assert.equal(state.calls.dispatches.length, 0);
  });
}

for (const entryPoint of ["router", "reviewer"]) {
  const makeFixture = () => (entryPoint === "router" ? fixture() : dispatchFixture());
  const run = (state) =>
    entryPoint === "router" ? routeReviewRequest(state) : prepareReview(state, "archie");

  test(`${entryPoint} ignores a skipped intake job despite a successful workflow conclusion`, async () => {
    const state = makeFixture();
    state.jobsByAttempt[1][0].conclusion = "skipped";
    assert.equal(await run(state), undefined);
    assert.equal(state.calls.dispatches.length + state.calls.additions.length, 0);
    assert.deepEqual(state.pr.labels, [{ name: label }]);
    assert.ok(state.calls.messages.some((message) => message.includes("request job was skipped")));
  });

  for (const [name, jobs] of [
    ["a missing request job", []],
    [
      "only an unrelated successful job",
      [{ name: "other", status: "completed", conclusion: "success" }],
    ],
    ["a failed request job", [{ name: "request", status: "completed", conclusion: "failure" }]],
    ["an unfinished request job", [{ name: "request", status: "in_progress", conclusion: null }]],
    [
      "duplicate request jobs",
      [
        { name: "request", status: "completed", conclusion: "success" },
        { name: "request", status: "completed", conclusion: "skipped" },
      ],
    ],
  ]) {
    test(`${entryPoint} rejects ${name}`, async () => {
      const state = makeFixture();
      state.jobsByAttempt[1] = jobs;
      await assert.rejects(run(state), /intake request job must complete successfully/);
      assert.equal(state.calls.dispatches.length + state.calls.additions.length, 0);
    });
  }

  test(`${entryPoint} checks the current run attempt instead of reusing an earlier success`, async () => {
    const state = makeFixture();
    state.run.run_attempt = 2;
    state.jobsByAttempt[2] = [{ name: "request", status: "completed", conclusion: "skipped" }];
    assert.equal(await run(state), undefined);
    assert.deepEqual(state.calls.jobAttempts, [2]);
    assert.equal(state.calls.dispatches.length + state.calls.additions.length, 0);
  });

  test(`${entryPoint} accepts a successful current attempt after an earlier skipped attempt`, async () => {
    const state = makeFixture();
    state.run.run_attempt = 2;
    state.jobsByAttempt[1][0].conclusion = "skipped";
    state.jobsByAttempt[2] = [{ name: "request", status: "completed", conclusion: "success" }];
    await run(state);
    assert.deepEqual(state.calls.jobAttempts, [2]);
    assert.equal(state.calls.dispatches.length + state.calls.additions.length, 1);
  });

  test(`${entryPoint} surfaces failures to read the intake job status`, async () => {
    const state = makeFixture();
    state.github.rest.actions.listJobsForWorkflowRunAttempt = async () => {
      throw new Error("Jobs API unavailable");
    };
    await assert.rejects(run(state), /Jobs API unavailable/);
    assert.equal(state.calls.dispatches.length + state.calls.additions.length, 0);
  });
}

test("does not let a maintainer rerun authorize the original untrusted actor", async () => {
  const state = fixture();
  state.run.actor.login = "outsider";
  await assert.rejects(routeReviewRequest(state), /outsider needs repository write/);
  assert.deepEqual(state.calls.actors, ["outsider"]);
  assert.equal(state.calls.dispatches.length, 0);
});

for (const permission of ["admin", "maintain", "write"]) {
  test(`allows an originating actor with ${permission} permission`, async () => {
    const state = fixture();
    state.roles.maintainer = permission;
    await routeReviewRequest(state);
    assert.equal(state.calls.dispatches.length, 1);
  });
}

test("does not dispatch unrelated labels", async () => {
  const state = fixture();
  state.associatedPRs[0].labels = [{ name: "customer-reported" }];
  await routeReviewRequest(state);
  assert.equal(state.calls.dispatches.length, 0);
  assert.match(state.calls.messages[0], /nothing to dispatch/);
});

for (const [reviewerId, prefix] of Object.entries(reviewFlows)) {
  test(`routes ${prefix}-review-needed only to ${reviewerId}`, async () => {
    const state = fixture(reviewerId);
    await routeReviewRequest(state);
    assert.deepEqual(
      state.calls.dispatches.map((request) => request.workflow_id),
      [`${reviewerId}.lock.yml`],
    );
    assert.deepEqual(state.calls.dispatches[0].inputs, {
      item_number: "42",
      head_sha: headSha,
      request_run_id: "100",
    });
  });

  test(`${reviewerId} validates, claims, and deduplicates its own label`, async () => {
    const state = dispatchFixture(true, reviewerId);
    assert.deepEqual(await prepareReview(state, reviewerId), { number: 42, headSha });
    assert.deepEqual(state.calls.additions[0].labels, [`${prefix}-review-in-progress`]);
    assert.equal(state.calls.removals[0].name, `${prefix}-review-needed`);
    assert.equal(await prepareReview(state, reviewerId), undefined);
    assert.equal(state.calls.additions.length, 1);
  });

  test(`${reviewerId} supports manual reviews without a request label`, async () => {
    const state = dispatchFixture(false, reviewerId);
    state.pr.labels = [];
    assert.deepEqual(await prepareReview(state, reviewerId), { number: 42, headSha });
    assert.equal(state.calls.removals.length, 0);
  });
}

test("one intake can dispatch all requested reviewers independently", async () => {
  const state = fixture();
  state.pr.labels = allLabels();
  state.associatedPRs[0].labels = allLabels();
  await routeReviewRequest(state);
  assert.deepEqual(
    state.calls.dispatches.map((request) => request.workflow_id).sort(),
    Object.keys(reviewFlows)
      .map((id) => `${id}.lock.yml`)
      .sort(),
  );
  assert.deepEqual(state.calls.actors, ["maintainer"]);
});

test("a failed reviewer dispatch does not block other reviewers and is reported", async () => {
  const state = fixture();
  state.pr.labels = allLabels();
  state.associatedPRs[0].labels = allLabels();
  const dispatch = state.github.rest.actions.createWorkflowDispatch;
  state.github.rest.actions.createWorkflowDispatch = async (request) => {
    if (request.workflow_id === "archie.lock.yml") throw new Error("Archie dispatch unavailable");
    await dispatch(request);
  };
  await assert.rejects(routeReviewRequest(state), /Archie dispatch unavailable/);
  assert.equal(state.calls.dispatches.length, 6);
  assert.deepEqual(state.calls.errors, ["Archie dispatch unavailable"]);
  assert.deepEqual(state.pr.labels, allLabels());
});

test("claiming one review does not consume another reviewer's request", async () => {
  const state = dispatchFixture();
  state.pr.labels = allLabels();
  for (const reviewerId of Object.keys(reviewFlows)) {
    assert.deepEqual(await prepareReview(state, reviewerId), { number: 42, headSha });
  }
  assert.equal(state.calls.removals.length, 7);
  for (const reviewerId of Object.keys(reviewFlows)) {
    assert.equal(await prepareReview(state, reviewerId), undefined);
  }
  assert.equal(state.calls.additions.length, 7);
});

test("management automation can route only the management reviewer", async () => {
  const state = fixture("mgmt-review");
  state.run.actor = automationBot;
  state.pr.labels = allLabels();
  state.associatedPRs[0].labels = allLabels();
  await routeReviewRequest(state);
  assert.deepEqual(
    state.calls.dispatches.map((request) => request.workflow_id),
    ["mgmt-review.lock.yml"],
  );
  assert.deepEqual(state.calls.actors, []);
  assert.ok(state.calls.messages.some((message) => message.includes("Skipping archie")));
});

test("management review independently authorizes the original automation bot", async () => {
  const state = dispatchFixture(true, "mgmt-review");
  state.run.actor = automationBot;
  assert.deepEqual(await prepareReview(state, "mgmt-review"), { number: 42, headSha });
  assert.deepEqual(state.calls.actors, []);
});

test("management automation retains direct dispatch access", async () => {
  const state = dispatchFixture(false, "mgmt-review");
  state.context.actor = automationBot.login;
  state.context.payload.sender = automationBot;
  assert.deepEqual(await prepareReview(state, "mgmt-review"), { number: 42, headSha });
});

for (const reviewerId of Object.keys(reviewFlows).filter((id) => id !== "mgmt-review")) {
  test(`management automation cannot authorize ${reviewerId} through intake`, async () => {
    const state = dispatchFixture(true, reviewerId);
    state.run.actor = automationBot;
    await assert.rejects(prepareReview(state, reviewerId), /not authorized to request/);
    assert.equal(state.calls.additions.length, 0);
  });

  test(`management automation cannot directly dispatch ${reviewerId}`, async () => {
    const state = dispatchFixture(false, reviewerId);
    state.context.actor = automationBot.login;
    state.context.payload.sender = automationBot;
    await assert.rejects(prepareReview(state, reviewerId), /not authorized to request/);
    assert.equal(state.calls.additions.length, 0);
  });
}

test("a bot's name without GitHub's Bot identity does not grant access", async () => {
  const state = fixture("mgmt-review");
  state.run.actor = { login: automationBot.login, type: "User" };
  await assert.rejects(routeReviewRequest(state), /needs repository write/);
  assert.equal(state.calls.dispatches.length, 0);
});

test("unlisted bots are rejected even if they have a collaborator permission", async () => {
  const state = fixture("mgmt-review");
  state.run.actor = { login: "unlisted[bot]", type: "Bot" };
  state.roles["unlisted[bot]"] = "write";
  await assert.rejects(routeReviewRequest(state), /not authorized to request any reviewer/);
  assert.equal(state.calls.dispatches.length, 0);
});

for (const [name, change] of [
  ["a different head repository", (pr) => (pr.head.repo.id = 3)],
  ["a different base repository", (pr) => (pr.base.repo.id = 3)],
  ["an older commit", (pr) => (pr.head.sha = updatedSha)],
  ["a closed PR", (pr) => (pr.state = "closed")],
  ["a deleted fork", (pr) => (pr.head.repo = null)],
]) {
  test(`ignores commit associations with ${name}`, async () => {
    const state = fixture();
    change(state.associatedPRs[0]);
    await routeReviewRequest(state);
    assert.equal(state.calls.dispatches.length, 0);
  });
}

test("refuses to choose between multiple labeled PRs for the same head", async () => {
  const state = fixture();
  const secondPR = structuredClone(state.pr);
  secondPR.number = 43;
  state.associatedPRs.push(secondPR);
  await assert.rejects(routeReviewRequest(state), /Multiple PRs match/);
  assert.equal(state.calls.dispatches.length, 0);
});

test("rejects different reviewer labels on different PRs before dispatching any reviewer", async () => {
  const state = fixture();
  const secondPR = structuredClone(state.pr);
  secondPR.number = 43;
  secondPR.labels = [{ name: "test-review-needed" }];
  state.associatedPRs.push(secondPR);
  await assert.rejects(routeReviewRequest(state), /Multiple PRs match/);
  assert.equal(state.calls.dispatches.length, 0);
});

test("does not resolve PR ambiguity by filtering to the requester's allowed reviewers", async () => {
  const state = fixture("mgmt-review");
  state.run.actor = automationBot;
  const secondPR = structuredClone(state.pr);
  secondPR.number = 43;
  secondPR.labels = [{ name: label }];
  state.associatedPRs.push(secondPR);
  await assert.rejects(routeReviewRequest(state), /Multiple PRs match/);
  assert.equal(state.calls.dispatches.length, 0);
});

test("ignores unlabeled commit associations when resolving a unique review target", async () => {
  const state = fixture();
  const secondPR = structuredClone(state.pr);
  secondPR.number = 43;
  secondPR.labels = [{ name: "customer-reported" }];
  state.associatedPRs.push(secondPR);
  await routeReviewRequest(state);
  assert.equal(state.calls.dispatches.length, 1);
  assert.equal(state.calls.dispatches[0].inputs.item_number, "42");
});

test("the reviewer independently rejects cross-PR ambiguity before claiming a label", async () => {
  const state = dispatchFixture();
  const secondPR = structuredClone(state.pr);
  secondPR.number = 43;
  secondPR.labels = [{ name: "test-review-needed" }];
  state.associatedPRs.push(secondPR);
  await assert.rejects(prepareReview(state, "archie"), /Multiple PRs match/);
  assert.equal(state.calls.additions.length + state.calls.removals.length, 0);
});

test("an automatic dispatch cannot choose a PR other than the resolved intake target", async () => {
  const state = dispatchFixture();
  state.associatedPRs[0].number = 43;
  await assert.rejects(
    prepareReview(state, "archie"),
    /does not match the intake's uniquely resolved target/,
  );
  assert.equal(state.calls.additions.length + state.calls.removals.length, 0);
});

test("manual dispatch can explicitly select a PR when commit associations are ambiguous", async () => {
  const state = dispatchFixture(false);
  const secondPR = structuredClone(state.pr);
  secondPR.number = 43;
  secondPR.labels = [{ name: "test-review-needed" }];
  state.associatedPRs.push(secondPR);
  assert.deepEqual(await prepareReview(state, "archie"), { number: 42, headSha });
});

for (const [name, change] of [
  ["head SHA", (pr) => (pr.head.sha = updatedSha)],
  ["request label", (pr) => (pr.labels = [])],
  ["open state", (pr) => (pr.state = "closed")],
]) {
  test(`rechecks the ${name} after resolving the commit association`, async () => {
    const state = fixture();
    change(state.pr);
    await routeReviewRequest(state);
    assert.equal(state.calls.dispatches.length, 0);
  });
}

test("surfaces dispatch failures without consuming the request label", async () => {
  const state = fixture();
  state.github.rest.actions.createWorkflowDispatch = async () => {
    throw new Error("Dispatch unavailable");
  };
  await assert.rejects(routeReviewRequest(state), /Dispatch unavailable/);
  assert.deepEqual(state.pr.labels, [{ name: label }]);
});

test("the worker independently authorizes and consumes an automatic request", async () => {
  const state = dispatchFixture();
  assert.deepEqual(await prepareReview(state, "archie"), { number: 42, headSha });
  assert.deepEqual(state.calls.actors, ["maintainer"]);
  assert.deepEqual(state.calls.additions[0].labels, ["architecture-review-in-progress"]);
  assert.equal(state.calls.removals[0].name, label);

  assert.equal(await prepareReview(state, "archie"), undefined);
  assert.equal(state.calls.additions.length, 1);
  assert.match(state.calls.messages.at(-1), /removed or already consumed/);
});

test("requires an intake run for bot dispatches", async () => {
  const state = dispatchFixture();
  state.context.payload.inputs.request_run_id = "";
  await assert.rejects(prepareReview(state, "archie"), /must include an intake run/);
  assert.equal(state.calls.additions.length, 0);
});

test("requires the dispatched SHA to match the intake run", async () => {
  const state = dispatchFixture();
  state.context.payload.inputs.head_sha = updatedSha;
  await assert.rejects(prepareReview(state, "archie"), /does not match the intake run/);
  assert.equal(state.calls.additions.length, 0);
});

for (const [name, change] of [
  ["the head SHA changed", (pr) => (pr.head.sha = updatedSha)],
  ["the fork changed", (pr) => (pr.head.repo.id = 3)],
  ["the PR closed", (pr) => (pr.state = "closed")],
  ["the request was withdrawn", (pr) => (pr.labels = [])],
]) {
  test(`skips an automatic worker when ${name}`, async () => {
    const state = dispatchFixture();
    change(state.pr);
    assert.equal(await prepareReview(state, "archie"), undefined);
    assert.equal(state.calls.additions.length + state.calls.removals.length, 0);
    assert.ok(state.calls.messages.length > 0);
  });
}

test("manual reviews capture the current head and do not require the request label", async () => {
  const state = dispatchFixture(false);
  state.pr.labels = [];
  assert.deepEqual(await prepareReview(state, "archie"), { number: 42, headSha });
  assert.deepEqual(state.calls.actors, ["maintainer"]);
  assert.equal(state.calls.removals.length, 0);
});

test("manual reviews still require repository write access", async () => {
  const state = dispatchFixture(false);
  state.context.actor = "outsider";
  await assert.rejects(prepareReview(state, "archie"), /outsider needs repository write/);
  assert.equal(state.calls.additions.length, 0);
});

test("an intake run does not authorize an untrusted human dispatcher", async () => {
  const state = dispatchFixture();
  state.context.actor = "outsider";
  state.context.payload.sender = { login: "outsider", type: "User" };
  await assert.rejects(prepareReview(state, "archie"), /outsider needs repository write/);
  assert.equal(state.calls.additions.length, 0);
});

for (const number of ["0", "-1", "1.5", "42; echo unsafe", "9007199254740992"]) {
  test(`rejects invalid item_number ${JSON.stringify(number)}`, async () => {
    const state = dispatchFixture();
    state.context.payload.inputs.item_number = number;
    await assert.rejects(prepareReview(state, "archie"), /item_number must be a positive integer/);
    assert.equal(state.calls.additions.length, 0);
  });
}

test("rejects abbreviated head SHAs", async () => {
  const state = dispatchFixture();
  state.context.payload.inputs.head_sha = "abcdef";
  await assert.rejects(prepareReview(state, "archie"), /head_sha must be a full commit SHA/);
});

test("both routing and execution require the default branch", async () => {
  const router = fixture();
  router.context.ref = "refs/heads/feature";
  await assert.rejects(routeReviewRequest(router), /default branch/);
  const worker = dispatchFixture();
  worker.context.ref = "refs/heads/feature";
  await assert.rejects(prepareReview(worker, "archie"), /default branch/);
});

test("keeps the request label when starting the review fails", async () => {
  const state = dispatchFixture();
  state.github.rest.issues.addLabels = async () => {
    throw new Error("Labels unavailable");
  };
  await assert.rejects(prepareReview(state, "archie"), /Labels unavailable/);
  assert.equal(state.calls.removals.length, 0);
  assert.deepEqual(state.pr.labels, [{ name: label }]);
});

test("does not hide API failures while validating the PR", async () => {
  const state = dispatchFixture();
  state.github.rest.pulls.get = async () => {
    throw new Error("API unavailable");
  };
  await assert.rejects(prepareReview(state, "archie"), /API unavailable/);
  assert.equal(state.calls.additions.length, 0);
});

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const workflowText = (name) =>
  readFileSync(path.join(repoRoot, ".github", "workflows", name), "utf8").replace(/\r\n/g, "\n");
test("the shared intake and router preserve the trust boundary", () => {
  const intake = workflowText("pr-review-intake.yml");
  assert.match(intake, /permissions: \{\}/);
  assert.doesNotMatch(intake, /uses:|secrets\./);
  assert.doesNotMatch(intake, /concurrency:/);
  const labels = JSON.parse(intake.match(/fromJSON\('([^']+)'\)/)[1]);
  assert.deepEqual(
    labels.sort(),
    allLabels()
      .map(({ name }) => name)
      .sort(),
  );
  const router = workflowText("pr-review-router.yml");
  assert.match(router, /ref: \$\{\{ github\.sha \}\}/);
  assert.doesNotMatch(router, /ref:.*workflow_run\.head|download-artifact/);
});

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
for (const [reviewerId, prefix] of Object.entries(reviewFlows)) {
  const source = workflowText(`${reviewerId}.md`);

  test(`${reviewerId} uses validated dispatch inputs and independent worker concurrency`, () => {
    assert.doesNotMatch(source, /pull_request_target:|pull_request:|github\.event\.pull_request/);
    assert.match(source, /checkout: false/);
    assert.match(source, /if: needs\.validate_request\.outputs\.ready == 'true'/);
    assert.ok(source.includes(`prepareReview({ github, context, core }, '${reviewerId}')`));
    assert.ok(
      source.includes(
        'group: "gh-aw-${{ github.workflow }}-${{ github.event.inputs.item_number }}"',
      ),
    );
    assert.match(source, /cancel-in-progress: false/);
    assert.match(source, /allowed-events: \[COMMENT\]/);
    assert.equal(
      source.match(/commit-id: "\$\{\{ needs\.validate_request\.outputs\.head_sha \}\}"/g).length,
      2,
    );
    assert.equal(
      source.match(/target: "\$\{\{ needs\.validate_request\.outputs\.pr_number \}\}"/g).length,
      4,
    );
    assert.doesNotMatch(source, /bash: true|git:\*|node bench\.mjs/);
    assert.match(source, /do not check out or execute PR code/);
    assert.doesNotMatch(source, /and stop\./);
    assert.match(source, /Use the `remove-labels` and `add-labels` safe outputs/);
  });

  test(`${reviewerId} compiles to commit-pinned reviews and scoped label writes`, () => {
    const compiled = workflowText(`${reviewerId}.lock.yml`);
    assert.doesNotMatch(compiled, /^\s+pull_request_target:/m);
    assert.match(
      compiled,
      /^  safe_outputs:\n    needs:\n(?:      - [\w-]+\n)*      - validate_request\n/m,
    );
    const jobStart = compiled.indexOf("\n  safe_outputs:\n");
    const guard = compiled.indexOf("- name: Reject stale review outputs", jobStart);
    const publish = compiled.indexOf("- name: Process Safe Outputs", jobStart);
    assert.ok(guard > jobStart && publish > guard);
    const encoded = compiled.match(/^\s+GH_AW_SAFE_OUTPUTS_HANDLER_CONFIG: (.+)$/m)[1];
    const config = JSON.parse(JSON.parse(encoded));
    for (const handler of ["create_pull_request_review_comment", "submit_pull_request_review"]) {
      assert.equal(config[handler].target, "${{ needs.validate_request.outputs.pr_number }}");
      assert.equal(config[handler].commit_id, "${{ needs.validate_request.outputs.head_sha }}");
    }
    assert.deepEqual(config.submit_pull_request_review.allowed_events, ["COMMENT"]);
    assert.deepEqual(config.add_labels.allowed, [`${prefix}-review-added`]);
    assert.deepEqual(config.remove_labels.allowed, [`${prefix}-review-in-progress`]);
    const agent = compiled.split("\n  agent:\n")[1].split(/\n  [\w-]+:\n/)[0];
    assert.doesNotMatch(agent, /uses: actions\/checkout@/);
    assert.doesNotMatch(agent, /^\s+(?:contents|pull-requests|issues|actions): write$/m);
  });

  // Exercise each actual safe-output step, not a separate copy of its logic.
  const guardStep = source
    .split("    - name: Reject stale review outputs\n")[1]
    .split(/\n  [\w-]+:/)[0];
  const guardScript = guardStep
    .split("        script: |\n")[1]
    .split("\n")
    .map((line) => line.slice(10))
    .join("\n");
  const runOutputGuard = new AsyncFunction("github", "context", "process", guardScript);

  test(`${reviewerId} allows publication at the reviewed head`, async () => {
    const state = fixture();
    await runOutputGuard(state.github, state.context, {
      env: { REVIEW_PR_NUMBER: "42", REVIEW_HEAD_SHA: headSha },
    });
  });

  for (const [name, change] of [
    ["a new commit", (pr) => (pr.head.sha = updatedSha)],
    ["a closed PR", (pr) => (pr.state = "closed")],
  ]) {
    test(`${reviewerId} blocks safe outputs after ${name}`, async () => {
      const state = fixture();
      change(state.pr);
      await assert.rejects(
        runOutputGuard(state.github, state.context, {
          env: { REVIEW_PR_NUMBER: "42", REVIEW_HEAD_SHA: headSha },
        }),
        /No review outputs were published/,
      );
    });
  }
}

test("Dash requires external benchmark evidence instead of executing PR-derived benchmarks", () => {
  const dash = workflowText("dash.md");
  assert.match(dash, /existing benchmark\s+results from unprivileged CI/);
  assert.match(dash, /performance claim\s+is unverified/);
  assert.doesNotMatch(dash, /write and run a quick|Run it with `node/);
});

test("management review retains its specialized threat detection and format-fix dispatch", () => {
  const management = workflowText("mgmt-review.md");
  assert.match(management, /bots: \[github-actions, azure-sdk-automation\]/);
  assert.match(management, /threat-detection:/);
  assert.match(management, /model: gpt-5\.6-sol/);
  assert.match(management, /dispatch-workflow:\s+- format-auto-fix/);
});
