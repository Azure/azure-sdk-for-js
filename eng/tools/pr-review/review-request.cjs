// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const intakeWorkflow = "pr-review-intake.yml";
const reviewers = {
  archie: {
    workflow: "archie.lock.yml",
    label: "architecture-review-needed",
    inProgressLabel: "architecture-review-in-progress",
  },
  dash: {
    workflow: "dash.lock.yml",
    label: "performance-review-needed",
    inProgressLabel: "performance-review-in-progress",
  },
  dexter: {
    workflow: "dexter.lock.yml",
    label: "dependency-review-needed",
    inProgressLabel: "dependency-review-in-progress",
  },
  "mgmt-review": {
    workflow: "mgmt-review.lock.yml",
    label: "mgmt-review-needed",
    inProgressLabel: "mgmt-review-in-progress",
    bots: ["azure-sdk-automation[bot]"],
  },
  scribe: {
    workflow: "scribe.lock.yml",
    label: "docs-review-needed",
    inProgressLabel: "docs-review-in-progress",
  },
  sentinel: {
    workflow: "sentinel.lock.yml",
    label: "security-review-needed",
    inProgressLabel: "security-review-in-progress",
  },
  tester: {
    workflow: "tester.lock.yml",
    label: "test-review-needed",
    inProgressLabel: "test-review-in-progress",
  },
};

function positiveInteger(value, name) {
  const text = String(value ?? "");
  const number = Number(text);
  if (!/^[1-9]\d*$/.test(text) || !Number.isSafeInteger(number)) {
    throw new Error(`${name} must be a positive integer.`);
  }
  return number;
}

function commitSha(value) {
  if (typeof value !== "string" || !/^[a-f0-9]{40}$/i.test(value)) {
    throw new Error("head_sha must be a full commit SHA.");
  }
  return value.toLowerCase();
}

function requireDefaultBranch(context) {
  const defaultBranch = context.payload.repository.default_branch;
  if (!defaultBranch || context.ref !== `refs/heads/${defaultBranch}`) {
    throw new Error("Review routing and execution must run from the default branch.");
  }
}

async function getAuthorizedReviewers(github, context, actor) {
  if (typeof actor?.login !== "string" || !actor.login) {
    throw new Error("The review request has no originating actor.");
  }
  // Only GitHub-owned event/API metadata identifies an allowlisted bot.
  if (actor.type === "Bot") {
    const allowed = Object.entries(reviewers)
      .filter(([, reviewer]) => reviewer.bots?.includes(actor.login))
      .map(([id]) => id);
    if (allowed.length === 0) {
      throw new Error(`${actor.login} is not authorized to request any reviewer.`);
    }
    return new Set(allowed);
  }
  const { data } = await github.rest.repos.getCollaboratorPermissionLevel({
    ...context.repo,
    username: actor.login,
  });
  if (!["admin", "maintain", "write"].includes(data.permission)) {
    throw new Error(
      `${actor.login} needs repository write, maintain, or admin access to request a review.`,
    );
  }
  return new Set(Object.keys(reviewers));
}

async function requireReviewerPermission(github, context, actor, reviewerId) {
  const allowed = await getAuthorizedReviewers(github, context, actor);
  if (!allowed.has(reviewerId)) {
    throw new Error(`${actor.login} is not authorized to request ${reviewerId}.`);
  }
}

async function getIntakeRun({ github, context, core }, runId) {
  const { data: run } = await github.rest.actions.getWorkflowRun({
    ...context.repo,
    run_id: positiveInteger(runId, "request_run_id"),
  });
  const { data: workflow } = await github.rest.actions.getWorkflow({
    ...context.repo,
    workflow_id: intakeWorkflow,
  });
  if (
    run.repository?.id !== context.payload.repository.id ||
    run.workflow_id !== workflow.id ||
    run.event !== "pull_request" ||
    run.status !== "completed" ||
    run.conclusion !== "success"
  ) {
    throw new Error(
      "The request must originate from a successful PR Review Intake run in this repository.",
    );
  }
  commitSha(run.head_sha);
  positiveInteger(run.head_repository?.id, "head repository ID");
  const jobs = await github.paginate(github.rest.actions.listJobsForWorkflowRunAttempt, {
    ...context.repo,
    run_id: run.id,
    attempt_number: positiveInteger(run.run_attempt, "run attempt"),
    per_page: 100,
  });
  const requestJobs = jobs.filter((job) => job.name === "request");
  if (requestJobs.length !== 1 || requestJobs[0].status !== "completed") {
    throw new Error("The intake request job must complete successfully before requesting reviews.");
  }
  // An unrelated label can skip the only job while the workflow still succeeds.
  if (requestJobs[0].conclusion === "skipped") {
    core.info(`Skipping intake run ${run.id}: its request job was skipped.`);
    return undefined;
  }
  if (requestJobs[0].conclusion !== "success") {
    throw new Error("The intake request job must complete successfully before requesting reviews.");
  }
  return run;
}

function hasLabel(pr, name) {
  return pr.labels.some((label) => (typeof label === "string" ? label : label.name) === name);
}

function matchesRun(pr, run, repositoryId) {
  return (
    pr.state === "open" &&
    pr.base.repo.id === repositoryId &&
    pr.head.repo?.id === run.head_repository.id &&
    pr.head.sha === run.head_sha
  );
}

async function getReviewTarget(github, context, run) {
  // Fork runs can have an empty pull_requests array. Resolve via the GitHub API.
  const associatedPRs = await github.paginate(
    github.rest.repos.listPullRequestsAssociatedWithCommit,
    {
      ...context.repo,
      commit_sha: run.head_sha,
      per_page: 100,
    },
  );
  const candidates = associatedPRs.filter(
    (pr) =>
      matchesRun(pr, run, context.payload.repository.id) &&
      Object.values(reviewers).some((reviewer) => hasLabel(pr, reviewer.label)),
  );
  if (candidates.length > 1) {
    throw new Error(
      "Multiple PRs match this commit and carry review labels; use a manual reviewer dispatch.",
    );
  }
  return candidates[0];
}

async function getCurrentPullRequest({ github, context, core }, number, headSha, headRepositoryId) {
  const { data: pr } = await github.rest.pulls.get({
    ...context.repo,
    pull_number: number,
  });
  if (pr.number !== number || pr.base.repo.id !== context.payload.repository.id) {
    throw new Error("The review target does not belong to this repository.");
  }
  if (
    pr.state !== "open" ||
    !pr.head.repo ||
    (headSha && pr.head.sha !== headSha) ||
    (headRepositoryId && pr.head.repo.id !== headRepositoryId)
  ) {
    core.info(
      `Skipping PR #${number}: the request is stale, closed, or its head repository is unavailable.`,
    );
    return undefined;
  }
  commitSha(pr.head.sha);
  return pr;
}

async function routeReviewRequest({ github, context, core }) {
  requireDefaultBranch(context);
  if (context.eventName !== "workflow_run") {
    throw new Error("The review router requires a workflow_run event.");
  }
  const run = await getIntakeRun({ github, context, core }, context.payload.workflow_run.id);
  if (!run) return;
  // A rerun must not promote an unauthorized original actor's request.
  const allowed = await getAuthorizedReviewers(github, context, run.actor);
  const target = await getReviewTarget(github, context, run);
  if (!target) {
    core.info("No current PR carries a review request for this commit; nothing to dispatch.");
    return;
  }

  const results = await Promise.allSettled(
    Object.entries(reviewers).map(async ([reviewerId, reviewer]) => {
      if (!hasLabel(target, reviewer.label)) {
        core.info(`No current PR requests ${reviewer.label}; nothing to dispatch.`);
        return;
      }
      if (!allowed.has(reviewerId)) {
        core.info(
          `Skipping ${reviewerId}: ${run.actor.login} is not authorized for this reviewer.`,
        );
        return;
      }
      const pr = await getCurrentPullRequest(
        { github, context, core },
        target.number,
        run.head_sha,
        run.head_repository.id,
      );
      if (!pr || !hasLabel(pr, reviewer.label)) {
        core.info(`The ${reviewer.label} request is no longer current; nothing to dispatch.`);
        return;
      }
      await github.rest.actions.createWorkflowDispatch({
        ...context.repo,
        workflow_id: reviewer.workflow,
        ref: context.payload.repository.default_branch,
        inputs: {
          item_number: String(pr.number),
          head_sha: run.head_sha,
          request_run_id: String(run.id),
        },
      });
      core.info(`Dispatched ${reviewer.workflow} for PR #${pr.number} at ${run.head_sha}.`);
    }),
  );
  const failures = results.filter((result) => result.status === "rejected");
  if (failures.length > 0) {
    const errors = failures.map((result) => result.reason);
    for (const error of errors) core.error(error.message);
    throw new AggregateError(errors, errors.map((error) => error.message).join("; "));
  }
}

async function prepareReview({ github, context, core }, reviewerId) {
  requireDefaultBranch(context);
  if (context.eventName !== "workflow_dispatch" || !Object.hasOwn(reviewers, reviewerId)) {
    throw new Error("A known reviewer must be invoked through workflow_dispatch.");
  }
  const reviewer = reviewers[reviewerId];
  const inputs = context.payload.inputs;
  const number = positiveInteger(inputs.item_number, "item_number");
  let headSha = inputs.head_sha ? commitSha(inputs.head_sha) : undefined;
  let run;
  if (context.actor !== "github-actions[bot]") {
    await requireReviewerPermission(
      github,
      context,
      { login: context.actor, type: context.payload.sender?.type },
      reviewerId,
    );
  }
  if (inputs.request_run_id) {
    run = await getIntakeRun({ github, context, core }, inputs.request_run_id);
    if (!run) return undefined;
    await requireReviewerPermission(github, context, run.actor, reviewerId);
    if (headSha !== run.head_sha) {
      throw new Error("The dispatched head SHA does not match the intake run.");
    }
  } else if (context.actor === "github-actions[bot]") {
    throw new Error("Automated reviewer dispatches must include an intake run.");
  }
  const pr = await getCurrentPullRequest(
    { github, context, core },
    number,
    headSha,
    run?.head_repository.id,
  );
  if (!pr) return undefined;
  const requested = hasLabel(pr, reviewer.label);
  if (run && !requested) {
    core.info(`Skipping PR #${number}: ${reviewer.label} was removed or already consumed.`);
    return undefined;
  }
  if (run) {
    const target = await getReviewTarget(github, context, run);
    if (!target || target.number !== number) {
      throw new Error("The dispatched PR does not match the intake's uniquely resolved target.");
    }
  }
  headSha = pr.head.sha;
  // Preserve the request if adding the in-progress label fails.
  await github.rest.issues.addLabels({
    ...context.repo,
    issue_number: number,
    labels: [reviewer.inProgressLabel],
  });
  if (requested) {
    await github.rest.issues.removeLabel({
      ...context.repo,
      issue_number: number,
      name: reviewer.label,
    });
  }
  core.info(`Starting ${reviewerId} for PR #${number} at ${headSha}.`);
  return { number, headSha };
}

module.exports = { routeReviewRequest, prepareReview };
