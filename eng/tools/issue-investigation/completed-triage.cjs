// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const fs = require("node:fs");
const path = require("node:path");
const { executeContinuation } = require("./continuation.cjs");

function positiveInteger(value, name) {
  const text = String(value ?? "");
  if (!/^[1-9]\d*$/.test(text) || !Number.isSafeInteger(Number(text))) {
    throw new Error(`${name} must be a positive decimal integer.`);
  }
  return Number(text);
}

async function getCompletedTriage({ github, context }) {
  if (
    context.eventName !== "workflow_run" ||
    context.ref !== `refs/heads/${context.payload.repository.default_branch}`
  ) {
    throw new Error("Investigation routing must use a trusted default-branch workflow_run event.");
  }
  const eventRun = context.payload.workflow_run;
  const runId = positiveInteger(eventRun?.id, "Source run ID");
  const { data: workflow } = await github.rest.actions.getWorkflow({
    ...context.repo,
    workflow_id: "issue-triage.lock.yml",
  });
  const { data: run } = await github.rest.actions.getWorkflowRun({
    ...context.repo,
    run_id: runId,
  });
  const repositoryId = positiveInteger(context.payload.repository.id, "Repository ID");
  if (
    run.repository?.id !== repositoryId ||
    run.head_repository?.id !== repositoryId ||
    run.workflow_id !== workflow.id ||
    !["issues", "workflow_dispatch"].includes(run.event)
  ) {
    throw new Error(
      "The source run is not the current repository's trusted issue-triage workflow.",
    );
  }
  if (
    run.status !== "completed" ||
    run.conclusion !== "success" ||
    run.run_attempt !== eventRun.run_attempt ||
    run.head_sha !== eventRun.head_sha
  ) {
    return { reason: "the source run failed, is incomplete, or has a newer attempt" };
  }
  if (run.head_branch !== context.payload.repository.default_branch) {
    return { reason: "source triage did not run from the default branch" };
  }
  const match = run.display_title?.match(/^Agentic Triage #([1-9]\d*)$/);
  if (!match) return { reason: "this source run did not opt into investigation correlation" };
  const number = positiveInteger(match[1], "Issue number");
  const attempt = positiveInteger(run.run_attempt, "Source attempt");
  const jobs = await github.paginate(github.rest.actions.listJobsForWorkflowRunAttempt, {
    ...context.repo,
    run_id: runId,
    attempt_number: attempt,
    per_page: 100,
  });
  for (const name of ["agent", "detection", "safe_outputs"]) {
    const matches = jobs.filter((job) => job.name === name);
    if (
      matches.length !== 1 ||
      matches[0].status !== "completed" ||
      matches[0].conclusion !== "success"
    ) {
      return { reason: `the source ${name} job did not succeed` };
    }
  }
  const mentions = jobs.filter((job) => job.name === "mention_owners");
  if (
    mentions.length !== 1 ||
    mentions[0].status !== "completed" ||
    !["success", "skipped"].includes(mentions[0].conclusion)
  ) {
    return { reason: "source owner notification did not complete successfully" };
  }
  const processor = jobs.find((job) => job.name === "safe_outputs");
  const appliedAfter = Date.parse(processor.started_at);
  const appliedBefore = Date.parse(processor.completed_at);
  if (
    !Number.isFinite(appliedAfter) ||
    !Number.isFinite(appliedBefore) ||
    appliedBefore < appliedAfter
  ) {
    throw new Error("Source processing timestamps are unavailable.");
  }
  return {
    runId,
    attempt,
    number,
    sha: run.head_sha,
    event: run.event,
    ownerNotification: mentions[0].conclusion,
    appliedAfter,
    appliedBefore,
  };
}

function validateArtifacts({ info, execution, verdict, parent, context }) {
  const repository = `${context.repo.owner}/${context.repo.repo}`;
  if (
    positiveInteger(info.run_id, "Artifact run ID") !== parent.runId ||
    positiveInteger(info.run_attempt, "Artifact attempt") !== parent.attempt ||
    info.repository?.toLowerCase() !== repository.toLowerCase() ||
    info.sha !== parent.sha ||
    info.ref !== context.ref ||
    info.event_name !== parent.event ||
    info.workflow_name !== "Agentic Triage" ||
    info.staged !== false
  ) {
    throw new Error("Triage metadata does not describe this source run or is staged.");
  }
  if (
    execution.component !== "detection" ||
    positiveInteger(execution.run_id, "Detection run ID") !== parent.runId ||
    positiveInteger(execution.run_attempt, "Detection attempt") !== parent.attempt
  ) {
    throw new Error("Detection metadata belongs to another source run.");
  }
  if (
    verdict.prompt_injection !== false ||
    verdict.secret_leak !== false ||
    verdict.malicious_patch !== false ||
    !Array.isArray(verdict.warnings) ||
    verdict.warnings.length
  ) {
    throw new Error(
      "Source detection did not produce a clean verdict; investigation is not authorized.",
    );
  }
}

async function routeCompletedTriage({
  github,
  context,
  core,
  actionsDirectory,
  artifactDirectory,
}) {
  // Recheck after downloads: a rerun can replace artifacts while the observer waits.
  const parent = await getCompletedTriage({ github, context });
  if (parent.reason) {
    core.notice(`Investigation handoff skipped: ${parent.reason}`);
    return;
  }
  const read = (folder, name) =>
    JSON.parse(fs.readFileSync(path.join(artifactDirectory, folder, name), "utf8"));
  validateArtifacts({
    info: read("activation", "aw_info.json"),
    execution: read("detection", "execution.json"),
    verdict: read("detection", "detection_result.json"),
    parent,
    context,
  });
  const output = read("requests", "agent_output.json");
  if (!Array.isArray(output.items)) throw new Error("Invalid source requests.");
  if (
    !output.items.some(
      (item) =>
        item?.type === "add_comment" &&
        typeof item.body === "string" &&
        /^## .*Agentic Issue Triage\b/m.test(item.body),
    )
  ) {
    core.notice("Source triage intentionally skipped or produced no analysis; no handoff.");
    return;
  }
  const latest = await getCompletedTriage({ github, context });
  if (latest.reason) {
    core.notice(`Investigation handoff skipped: ${latest.reason}`);
    return;
  }
  process.env.GH_AW_DETECTION_CONCLUSION = "success";
  await executeContinuation({
    github,
    context,
    core,
    mode: "completed-triage",
    number: parent.number,
    sourceWindow: { after: parent.appliedAfter, before: parent.appliedBefore },
    ownerNotification: parent.ownerNotification,
    actionsDirectory,
    requestsDirectory: path.join(artifactDirectory, "requests"),
    receiptsDirectory: path.join(artifactDirectory, "receipts"),
  });
}

module.exports = { getCompletedTriage, validateArtifacts, routeCompletedTriage };
