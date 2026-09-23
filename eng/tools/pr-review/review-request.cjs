// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const intakeWorkflow = "pr-review-intake.yml";
const labelRequestWindowMs = 5 * 60 * 1000;
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

function timestamp(value, name) {
  const time = typeof value === "string" ? Date.parse(value) : NaN;
  if (!Number.isFinite(time)) {
    throw new Error(`${name} must be a valid timestamp.`);
  }
  return time;
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

async function getLabelEvents(github, context, number) {
  const events = await github.paginate(github.rest.issues.listEvents, {
    ...context.repo,
    issue_number: number,
    per_page: 100,
  });
  const changes = [];
  for (const event of events) {
    if (
      !["labeled", "unlabeled"].includes(event.event) ||
      !Object.values(reviewers).some((reviewer) => reviewer.label === event.label?.name)
    ) {
      continue;
    }
    positiveInteger(event.id, "label event ID");
    const time = timestamp(event.created_at, "label event creation time");
    changes.push({ event, time });
  }
  changes.sort((a, b) => a.time - b.time || a.event.id - b.event.id);
  return changes.map(({ event }) => event);
}

async function getLabelRequests({ github, context, core }, run, pr) {
  const createdAt = timestamp(run.created_at, "intake creation time");
  const actorId = positiveInteger(run.actor?.id, "intake actor ID");
  const events = await getLabelEvents(github, context, pr.number);
  const latest = new Map(events.map((event) => [event.label.name, event]));

  const requests = new Map();
  for (const [reviewerId, reviewer] of Object.entries(reviewers)) {
    if (!hasLabel(pr, reviewer.label)) continue;
    const event = latest.get(reviewer.label);
    // The PR controls the intake YAML and its job results, not the issue-events API.
    if (!event || event.event !== "labeled") {
      core.info(`Skipping ${reviewerId}: no active GitHub label event authorizes this request.`);
      continue;
    }
    if (event.actor?.id !== actorId) {
      core.info(`Skipping ${reviewerId}: its label was added by a different requester.`);
      continue;
    }
    // Use original run creation, not a rerun or runner start time, to prevent replay.
    const age = createdAt - timestamp(event.created_at, "label event creation time");
    if (age < 0 || age > labelRequestWindowMs) {
      core.info(
        `Skipping ${reviewerId}: its label event is outside the intake's five-minute window.`,
      );
      continue;
    }
    requests.set(reviewerId, event);
  }
  return requests;
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
  const target = await getReviewTarget(github, context, run);
  if (!target) {
    core.info("No current PR carries a review request for this commit; nothing to dispatch.");
    return;
  }
  const requests = await getLabelRequests({ github, context, core }, run, target);
  if (requests.size === 0) {
    core.info("No attributable label events authorize this intake; nothing to dispatch.");
    return;
  }
  // Every selected event has the same immutable actor ID; authorize that recorded actor.
  const allowed = await getAuthorizedReviewers(
    github,
    context,
    requests.values().next().value.actor,
  );

  const results = await Promise.allSettled(
    Object.entries(reviewers).map(async ([reviewerId, reviewer]) => {
      const event = requests.get(reviewerId);
      if (!event) return;
      if (!allowed.has(reviewerId)) {
        core.info(
          `Skipping ${reviewerId}: ${event.actor.login} is not authorized for this reviewer.`,
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
          request_event_id: String(event.id),
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

async function claimReview({ github, context, core }, pr, reviewer, eventId) {
  const hadInProgressLabel = hasLabel(pr, reviewer.inProgressLabel);
  let markedInProgress = false;
  let claimed = false;
  try {
    // Preserve the request if adding the in-progress label fails.
    await github.rest.issues.addLabels({
      ...context.repo,
      issue_number: pr.number,
      labels: [reviewer.inProgressLabel],
    });
    markedInProgress = true;
    const current = await getCurrentPullRequest(
      { github, context, core },
      pr.number,
      pr.head.sha,
      pr.head.repo.id,
    );
    if (!current) return false;
    if (eventId !== undefined) {
      const latest = (await getLabelEvents(github, context, pr.number))
        .filter((event) => event.label.name === reviewer.label)
        .at(-1);
      if (
        !hasLabel(current, reviewer.label) ||
        latest?.id !== eventId ||
        latest.event !== "labeled"
      ) {
        core.info(
          `Skipping PR #${pr.number}: the label request changed before it could be claimed.`,
        );
        return false;
      }
      try {
        await github.rest.issues.removeLabel({
          ...context.repo,
          issue_number: pr.number,
          name: reviewer.label,
        });
      } catch (error) {
        if (error.status !== 404) throw error;
        core.info(`Skipping PR #${pr.number}: the label request was withdrawn during the claim.`);
        return false;
      }

      // Label DELETE has no compare-and-swap. Verify which event it actually consumed.
      const history = (await getLabelEvents(github, context, pr.number)).filter(
        (event) => event.label.name === reviewer.label,
      );
      const removal = history.at(-1);
      const previous = history.at(-2);
      const removedByWorkflow =
        removal?.event === "unlabeled" &&
        removal.actor?.type === "Bot" &&
        removal.actor.login === "github-actions[bot]";
      if (!removedByWorkflow || previous?.id !== eventId) {
        if (removedByWorkflow && previous?.event === "labeled" && previous.id !== eventId) {
          const after = await getCurrentPullRequest(
            { github, context, core },
            pr.number,
            pr.head.sha,
            pr.head.repo.id,
          );
          if (after && !hasLabel(after, reviewer.label)) {
            await github.rest.issues.addLabels({
              ...context.repo,
              issue_number: pr.number,
              labels: [reviewer.label],
            });
          }
        }
        throw new Error(
          "The review request changed while claiming its label; no review was started. " +
            "Reapply the request label or use a manual dispatch. A restored bot label does not authorize a review.",
        );
      }
    }
    claimed = true;
    return true;
  } finally {
    if (markedInProgress && !claimed && !hadInProgressLabel) {
      try {
        await github.rest.issues.removeLabel({
          ...context.repo,
          issue_number: pr.number,
          name: reviewer.inProgressLabel,
        });
      } catch (error) {
        if (error.status !== 404) throw error;
        core.info(`PR #${pr.number}'s in-progress label was already removed.`);
      }
    }
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
  let eventId;
  if (context.actor !== "github-actions[bot]") {
    await requireReviewerPermission(
      github,
      context,
      { login: context.actor, type: context.payload.sender?.type },
      reviewerId,
    );
  }
  if (inputs.request_run_id) {
    eventId = positiveInteger(inputs.request_event_id, "request_event_id");
    run = await getIntakeRun({ github, context, core }, inputs.request_run_id);
    if (!run) return undefined;
    if (headSha !== run.head_sha) {
      throw new Error("The dispatched head SHA does not match the intake run.");
    }
  } else if (context.actor === "github-actions[bot]") {
    throw new Error("Automated reviewer dispatches must include an intake run.");
  } else if (inputs.request_event_id) {
    throw new Error("request_event_id requires request_run_id.");
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
    const requests = await getLabelRequests({ github, context, core }, run, pr);
    const event = requests.get(reviewerId);
    if (!event || event.id !== eventId) {
      core.info(
        `Skipping ${reviewerId}: the recorded label request is stale, replaced, or mismatched.`,
      );
      return undefined;
    }
    await requireReviewerPermission(github, context, event.actor, reviewerId);
  } else if (requested) {
    const latest = (await getLabelEvents(github, context, number))
      .filter((event) => event.label.name === reviewer.label)
      .at(-1);
    if (latest?.event !== "labeled") {
      throw new Error(
        "The existing review label has no current label event and cannot be claimed.",
      );
    }
    eventId = latest.id;
  }
  headSha = pr.head.sha;
  if (!(await claimReview({ github, context, core }, pr, reviewer, eventId))) return undefined;
  core.info(`Starting ${reviewerId} for PR #${number} at ${headSha}.`);
  return { number, headSha };
}

module.exports = { routeReviewRequest, prepareReview };
