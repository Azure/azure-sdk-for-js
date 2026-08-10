// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Routine that fires when a GitHub
 * issue is opened in a GitHub repository, then poll the run history to observe
 * the resulting runs.
 *
 * The routine is bound to an existing hosted agent and configured with a
 * `GitHubIssueRoutineTrigger`. The trigger uses a GitHub-compatible Foundry
 * RemoteTool connection supplied through `GITHUB_CONNECTION_NAME`. If
 * `GITHUB_PAT_TOKEN` is set, the sample creates a `Testing routine` issue
 * assigned to `GITHUB_USERNAME` to fire the routine automatically; otherwise
 * open an issue in the configured repository manually while the sample polls.
 *
 * Routines are a preview feature. In the JS SDK, you access these operations
 * via `project.beta.routines`.
 *
 * @summary Demonstrates a routine with a GitHub issue trigger.
 */

import type {
  GitHubIssueRoutineTrigger,
  InvokeAgentResponsesApiRoutineAction,
} from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "<hosted agent name>";
const githubConnectionName = process.env["GITHUB_CONNECTION_NAME"] || "<github connection name>";
const githubOwner = process.env["GITHUB_USERNAME"] || "<github owner>";
const githubRepositoryName = process.env["GITHUB_REPOSITORY_NAME"] || "<github repository name>";
const githubPatToken = process.env["GITHUB_PAT_TOKEN"];
const pollIntervalSeconds = Number(process.env["POLL_INTERVAL_SECONDS"] || "10");
console.log("githubPatToken is set:", githubPatToken);
const routineName = "sample-routine-github-issue";

// Create and assign a GitHub issue using the REST API so the routine fires
// without manual intervention. The trigger only observes newly opened issues,
// so an existing issue cannot be reused to fire it again.
async function createGitHubIssue(title: string): Promise<void> {
  if (!githubPatToken) {
    console.log("GITHUB_PAT_TOKEN is not set; skipping automatic issue creation.");
    return;
  }

  const response = await fetch(
    `https://api.github.com/repos/${githubOwner}/${githubRepositoryName}/issues`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${githubPatToken}`,
        "User-Agent": "azure-ai-projects-sample",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ title, assignees: [githubOwner] }),
    },
  );

  if (!response.ok) {
    console.log(`Failed to create GitHub issue: ${response.status} ${await response.text()}`);
    return;
  }

  const issue = (await response.json()) as { number: number; html_url: string };
  console.log(`Created GitHub issue #${issue.number}: ${issue.html_url}`);
}

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Clean up any leftover routine from a prior run
  try {
    await project.beta.routines.delete(routineName);
  } catch {
    // ignore 404
  }

  console.log(`Creating routine \`${routineName}\` for ${githubOwner}/${githubRepositoryName}.`);
  const routine = await project.beta.routines.createOrUpdate(routineName, {
    description: "Routine used by the GitHub issue trigger sample.",
    enabled: true,
    triggers: {
      "on-issue": {
        type: "github_issue",
        connection_id: githubConnectionName, // Currently accepts a connection name.
        owner: githubOwner,
        repository: githubRepositoryName,
        issue_event: "opened",
      } as GitHubIssueRoutineTrigger,
    },
    action: {
      type: "invoke_agent_responses_api",
      agent_name: agentName,
    } as InvokeAgentResponsesApiRoutineAction,
  });
  console.log(
    `Created routine: ${routine.name} enabled=${routine.enabled} ` +
      `repo=${githubOwner}/${githubRepositoryName} event=opened`,
  );

  // Give the trigger registration a moment to settle before firing it.
  await new Promise((resolve) => setTimeout(resolve, 5_000));

  // Fire the routine by opening a new issue. The trigger only observes issues
  // opened while the routine is enabled, so reusing an existing issue or opening
  // one after the sample exits will not produce a run.
  await createGitHubIssue("Testing routine");
  if (!githubPatToken) {
    console.log(
      `Open a GitHub issue in ${githubOwner}/${githubRepositoryName} now to fire the routine.`,
    );
  }

  // Poll run history until a terminal state is reached or timeout
  console.log("Waiting for a routine run for up to 5 minutes...");
  const terminalStatuses = new Set(["finished", "failed", "killed"]);
  const seenPhases = new Map<string, string>();
  const deadline = Date.now() + 300_000; // 5 minutes
  let finished = false;
  let runObserved = false;

  while (Date.now() < deadline && !finished) {
    await new Promise((resolve) => setTimeout(resolve, pollIntervalSeconds * 1000));
    for await (const run of project.beta.routines.listRuns(routineName, {
      limit: 20,
      order: "desc",
    })) {
      runObserved = true;
      const currentPhase = String(run.phase);
      if (seenPhases.get(run.id) === currentPhase) {
        continue;
      }
      seenPhases.set(run.id, currentPhase);
      console.log(
        `  run_id=${run.id} phase=${run.phase} status=${run.status} ` +
          `trigger_type=${run.trigger_type} triggered_at=${run.triggered_at} ended_at=${run.ended_at}`,
      );
      if (run.status && terminalStatuses.has(run.status.toLowerCase())) {
        finished = true;
      }
    }
  }

  if (!finished && runObserved) {
    console.log(
      "A routine run was observed, but no terminal run state was reached within the deadline.",
    );
  } else if (!runObserved) {
    console.log("No GitHub issue-triggered run was observed within the deadline.");
  }

  // Clean up
  await project.beta.routines.delete(routineName);
  console.log("Routine deleted");
}

main().catch(console.error);
