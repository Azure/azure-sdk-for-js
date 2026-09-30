// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const blockedLabels = [
  "needs-triage",
  "needs-team-triage",
  "issue-addressed",
  "needs-author-feedback",
];

function issueNumber(value) {
  const text = String(value);
  if (!/^#?[1-9]\d*$/.test(text) || !Number.isSafeInteger(Number(text.replace(/^#/, "")))) {
    throw new Error("Expected a positive decimal issue number.");
  }
  return Number(text.replace(/^#/, ""));
}

function requests(output) {
  if (
    !Array.isArray(output?.items) ||
    output.items.some((item) => !item || typeof item.type !== "string") ||
    (output.errors !== undefined && (!Array.isArray(output.errors) || output.errors.length))
  ) {
    throw new Error("Invalid agent output; continuation is not authorized.");
  }
  if (
    output.items.some((item) =>
      ["missing_tool", "missing_data", "report_incomplete"].includes(item.type),
    )
  ) {
    throw new Error("The agent reported incomplete work; continuation is not authorized.");
  }
  return output.items;
}

function assertTarget(item, number, context) {
  const fields = [
    "item_number",
    "issue_number",
    "pull_number",
    "pr_number",
    "pr",
    "pull_request_number",
  ];
  const targets = fields.filter((field) => item[field] !== undefined);
  if (
    !targets.length ||
    targets.some((field) => issueNumber(item[field]) !== number) ||
    (item.repo !== undefined &&
      (typeof item.repo !== "string" ||
        item.repo.toLowerCase() !== `${context.repo.owner}/${context.repo.repo}`.toLowerCase()))
  ) {
    throw new Error("Continuation must target only the investigated issue in this repository.");
  }
}

function ineligibleReason(issue, number) {
  if (issue.number !== number || issue.pull_request) throw new Error("Unexpected issue target.");
  if (issue.state !== "open" || issue.locked) return "the issue is closed or locked";
  if (
    !Array.isArray(issue.labels) ||
    issue.labels.some(
      (label) => !label || typeof label.name !== "string" || typeof label.color !== "string",
    )
  ) {
    throw new Error("Issue labels are incomplete; cannot validate handoff.");
  }
  const names = issue.labels.map((label) => label.name.toLowerCase());
  if (
    !names.includes("customer-reported") ||
    blockedLabels.some((label) => names.includes(label))
  ) {
    return "the issue no longer satisfies the triage handoff";
  }
  const colors = issue.labels.map((label) => label.color.toLowerCase());
  if (
    colors.filter((color) => color === "e99695").length !== 1 ||
    colors.filter((color) => color === "ffeb77").length !== 1
  ) {
    return "the issue does not have exactly one service and category label";
  }
  return null;
}

async function appliedAnalysis({ github, context, issue, receipts, heading, recommendation }) {
  if (!Array.isArray(receipts) || receipts.some((item) => !item || typeof item.type !== "string")) {
    throw new Error("Applied receipts are missing or malformed.");
  }
  const repository = `${context.repo.owner}/${context.repo.repo}`;
  const server = new URL(context.serverUrl || "https://github.com");
  for (const receipt of receipts.filter((item) => item.type === "add_comment")) {
    if (
      receipt.number !== issue.number ||
      typeof receipt.repo !== "string" ||
      receipt.repo.toLowerCase() !== repository.toLowerCase() ||
      typeof receipt.url !== "string"
    ) {
      throw new Error("Applied comment receipt does not belong to the investigated issue.");
    }
    const url = new URL(receipt.url);
    const match = url.hash.match(/^#issuecomment-([1-9]\d*)$/);
    if (
      url.origin !== server.origin ||
      url.pathname.toLowerCase() !== `/${repository}/issues/${issue.number}`.toLowerCase() ||
      !match
    ) {
      throw new Error("Applied comment receipt has an unexpected URL.");
    }
    const { data: comment } = await github.rest.issues.getComment({
      ...context.repo,
      comment_id: issueNumber(match[1]),
    });
    if (typeof issue.url !== "string" || comment.issue_url !== issue.url) {
      throw new Error("The applied analysis comment belongs to another issue.");
    }
    if (
      typeof comment.body === "string" &&
      heading.test(comment.body) &&
      (!recommendation || comment.body.includes("**Decision:** Recommended for Copilot"))
    ) {
      return;
    }
  }
  throw new Error("No applied analysis comment authorizes continuation.");
}

async function prepareAssignment({ github, context, number: input, output, receipts }) {
  const number = issueNumber(input);
  const items = requests(output);
  const assignments = items.filter((item) => item.type === "assign_to_agent");
  if (!assignments.length) return { reason: "Copilot assignment was not requested" };
  if (assignments.length !== 1 || items.some((item) => item.type === "close_issue")) {
    throw new Error("Expected one exclusive assignment request.");
  }
  assertTarget(assignments[0], number, context);
  if (assignments[0].agent !== undefined && assignments[0].agent !== "copilot") {
    throw new Error("Only Copilot assignment is permitted.");
  }
  const comments = items.filter((item) => item.type === "add_comment");
  if (comments.length !== 1) throw new Error("Expected one investigation analysis request.");
  assertTarget(comments[0], number, context);
  const { data: issue } = await github.rest.issues.get({ ...context.repo, issue_number: number });
  const reason = ineligibleReason(issue, number);
  if (reason) return { reason };
  await appliedAnalysis({
    github,
    context,
    issue,
    receipts,
    heading: /^## Agentic Issue Investigation\b/m,
    recommendation: true,
  });
  const { data: current } = await github.rest.issues.get({ ...context.repo, issue_number: number });
  const changed = ineligibleReason(current, number);
  if (changed) return { reason: changed };
  return {
    output: {
      items: [{ type: "assign_to_agent", agent: "copilot", issue_number: number }],
      errors: [],
    },
    config: {
      assign_to_agent: {
        name: "copilot",
        allowed: ["copilot"],
        target: String(number),
        max: 1,
        "ignore-if-error": true,
        issue_intent: false,
      },
    },
  };
}

async function prepareDispatch({
  github,
  context,
  number: input,
  output,
  receipts,
  ownerNotification,
  normalizeAssignment,
}) {
  const number = issueNumber(input);
  const items = requests(output);
  const dispatches = items.filter((item) => item.type === "dispatch_workflow");
  if (!dispatches.length) return { reason: "investigation handoff was not requested" };
  if (
    dispatches.length !== 1 ||
    dispatches[0].workflow_name !== "issue-investigation" ||
    issueNumber(dispatches[0].inputs?.issue_number) !== number ||
    items.some((item) => item.type === "close_issue")
  ) {
    throw new Error("Expected one investigation handoff for this issue.");
  }
  for (const item of items.filter((item) =>
    ["add_comment", "add_labels", "remove_labels", "assign_to_user", "set_issue_type"].includes(
      item.type,
    ),
  )) {
    assertTarget(item, number, context);
  }
  const { data: issue } = await github.rest.issues.get({ ...context.repo, issue_number: number });
  const reason = ineligibleReason(issue, number);
  if (reason) return { reason };
  const mentions = items.filter((item) => item.type === "mention_owners");
  if (mentions.length) {
    if (mentions.length !== 1 || ownerNotification !== "success") {
      throw new Error("Requested owner notification did not succeed.");
    }
  }
  const assignments = items.filter((item) => item.type === "assign_to_user");
  if (!mentions.length || assignments.length) {
    if (assignments.length !== 1 || typeof normalizeAssignment !== "function") {
      throw new Error("Expected one completed single-owner assignment.");
    }
    const normalized = normalizeAssignment(assignments[0]);
    const assignmentReceipts = receipts.filter((item) => item.type === "assign_to_user");
    // Native receipts may omit number; a single validated request plus current owner state binds it.
    if (
      !normalized.success ||
      normalized.issueNumber !== number ||
      !Array.isArray(normalized.assignees) ||
      normalized.assignees.length !== 1 ||
      assignmentReceipts.length !== 1 ||
      (assignmentReceipts[0].number !== undefined && assignmentReceipts[0].number !== number) ||
      !issue.assignees?.some(
        (user) => user.login.toLowerCase() === normalized.assignees[0].toLowerCase(),
      )
    ) {
      throw new Error("The single-owner assignment was not applied to this issue.");
    }
  }
  await appliedAnalysis({
    github,
    context,
    issue,
    receipts,
    heading: /^## .*Agentic Issue Triage\b/m,
  });
  const { data: current } = await github.rest.issues.get({ ...context.repo, issue_number: number });
  const changed = ineligibleReason(current, number);
  if (changed) return { reason: changed };
  const branch = context.payload.repository?.default_branch;
  if (typeof branch !== "string" || !branch) throw new Error("Missing trusted default branch.");
  const ref = `refs/heads/${branch}`;
  return {
    output: {
      items: [
        {
          type: "dispatch_workflow",
          workflow_name: "issue-investigation",
          inputs: { issue_number: String(number) },
          ref,
        },
      ],
      errors: [],
    },
    config: {
      dispatch_workflow: {
        workflows: ["issue-investigation"],
        workflow_files: { "issue-investigation": ".lock.yml" },
        aw_context_workflows: ["issue-investigation"],
        allowed_refs: [ref],
        max: 1,
      },
    },
  };
}

async function executeContinuation({
  github,
  context,
  core,
  mode,
  number,
  requestsDirectory,
  receiptsDirectory,
  actionsDirectory,
  ownerNotification,
}) {
  const fs = require("node:fs");
  const path = require("node:path");
  const output = JSON.parse(
    fs.readFileSync(path.join(requestsDirectory, "agent_output.json"), "utf8"),
  );
  const receipts = fs
    .readFileSync(path.join(receiptsDirectory, "safe-output-items.jsonl"), "utf8")
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));
  let prepared;
  if (mode === "assignment") {
    prepared = await prepareAssignment({ github, context, number, output, receipts });
  } else if (mode === "dispatch") {
    const { resolveTarget, extractAssignees } = require(
      path.join(actionsDirectory, "safe_output_helpers.cjs"),
    );
    const { processItems } = require(path.join(actionsDirectory, "safe_output_processor.cjs"));
    prepared = await prepareDispatch({
      github,
      context,
      number,
      output,
      receipts,
      ownerNotification,
      normalizeAssignment(item) {
        const target = resolveTarget({
          targetConfig: "*",
          item,
          context,
          itemType: "assign_to_user",
          supportsIssue: true,
        });
        return {
          success: target.success,
          issueNumber: target.number,
          assignees: processItems(extractAssignees(item), [], 1, []),
        };
      },
    });
  } else {
    throw new Error("Unexpected continuation mode.");
  }
  if (!prepared.output) {
    core.notice(`Continuation skipped: ${prepared.reason}`);
    return;
  }
  const file = path.join(process.env.RUNNER_TEMP, `${mode}-continuation.json`);
  fs.writeFileSync(file, JSON.stringify(prepared.output));
  process.env.GH_AW_AGENT_OUTPUT = file;
  process.env.GH_AW_SAFE_OUTPUTS_HANDLER_CONFIG = JSON.stringify(prepared.config);
  const { MANIFEST_FILE_PATH } = require(path.join(actionsDirectory, "constants.cjs"));
  fs.mkdirSync(path.dirname(MANIFEST_FILE_PATH), { recursive: true });
  core.setOutput("continuation_requested", "true");
  await require(path.join(actionsDirectory, "process_safe_outputs.cjs")).main();
  if (mode === "assignment") {
    const { data: current } = await github.rest.issues.get({
      ...context.repo,
      issue_number: issueNumber(number),
    });
    const { getAgentName } = require(path.join(actionsDirectory, "assign_agent_helpers.cjs"));
    if (!current.assignees?.some((user) => getAgentName(user.login.toLowerCase()) === "copilot")) {
      core.warning(
        "Copilot is not attached to the issue. A maintainer may need to assign it with a suitable user credential.",
      );
    }
  }
}

module.exports = { prepareAssignment, prepareDispatch, executeContinuation };
