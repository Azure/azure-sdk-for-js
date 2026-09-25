// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Routine that fires when a GitHub
 * issue is opened in a GitHub repository, then poll the run history to observe
 * the resulting runs.
 *
 * The sample first uploads the basic hosted-agent code from
 * `assets/responses-echo-agent.zip` as a temporary hosted-agent version,
 * routes the configured hosted agent name to that version, and then creates a
 * routine configured with a `GitHubIssueRoutineTrigger`. The trigger uses a
 * GitHub-compatible Foundry RemoteTool connection supplied through
 * `GITHUB_CONNECTION_NAME`. If `GITHUB_PAT_TOKEN` is set, the sample creates
 * a `Testing routine` issue assigned to `GITHUB_USERNAME` to fire the routine
 * automatically; otherwise open an issue in the configured repository manually
 * while the sample polls.
 *
 * Routines are a preview feature. In the JS SDK, you access these operations
 * via `project.beta.routines`.
 *
 * @summary Demonstrates a routine with a GitHub issue trigger.
 */

import type {
  GitHubIssueRoutineTrigger,
  InvokeAgentResponsesApiRoutineAction,
  CreateAgentVersionFromCodeContent,
  HostedAgentDefinition,
  CodeDependencyResolution,
  AgentEndpointConfig,
} from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "MyHostedAgent";
const modelName = process.env["FOUNDRY_MODEL_NAME"] || "<model name>";
const githubConnectionName = process.env["GITHUB_CONNECTION_NAME"] || "<github connection name>";
const githubOwner = process.env["GITHUB_USERNAME"] || "<github owner>";
const githubRepositoryName = process.env["GITHUB_REPOSITORY_NAME"] || "<github repository name>";
const githubPatToken = process.env["GITHUB_PAT_TOKEN"];
const pollIntervalSeconds = Number(process.env["POLL_INTERVAL_SECONDS"] || "10");
const useRemoteBuild =
  (process.env["FOUNDRY_HOSTED_AGENT_REMOTE_BUILD"] || "false").trim().toLowerCase() === "true";

const codeZipPath = path.resolve(__dirname, "../assets/responses-echo-agent.zip");
const routineName = "sample-routine-github-issue";

function sha256Hex(data: Uint8Array): string {
  return createHash("sha256").update(data).digest("hex");
}

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
    const details = await response.text();
    console.log(`Failed to create GitHub issue: ${response.status} ${details}`);
    return;
  }

  const issue = (await response.json()) as { number: number; html_url: string };
  console.log(`Created GitHub issue #${issue.number}: ${issue.html_url}`);
}

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const dependencyResolution: CodeDependencyResolution = useRemoteBuild
    ? "remote_build"
    : "bundled";

  // ── Upload a temporary hosted agent version ───────────────────────────
  const codeZip = readFileSync(codeZipPath);
  const codeZipSha256 = sha256Hex(codeZip);

  const definition: HostedAgentDefinition = {
    kind: "hosted",
    cpu: "0.5",
    memory: "1Gi",
    protocol_versions: [{ protocol: "responses", version: "2.0.0" }],
    code_configuration: {
      runtime: "python_3_14",
      entry_point: ["python", "main.py"],
      dependency_resolution: dependencyResolution,
    },
    environment_variables: {
      FOUNDRY_PROJECT_ENDPOINT: projectEndpoint,
      FOUNDRY_MODEL_NAME: modelName,
    },
  };

  console.log(
    `Creating code-based agent version (dependency_resolution=${dependencyResolution})...`,
  );
  const content: CreateAgentVersionFromCodeContent = {
    metadata: {
      description: "GitHub issue routine sample hosted agent uploaded from assets.",
      definition,
    },
    code: { contents: codeZip, contentType: "application/zip", filename: "code.zip" },
  };

  const created = await project.agents.createVersionFromCode(agentName, codeZipSha256, content);
  const createdVersion = created.version;
  console.log(`Created code-based hosted agent version: ${createdVersion}`);

  let originalAgentEndpoint: AgentEndpointConfig | undefined;

  try {
    // ── Poll until agent version is active ────────────────────────────
    for (let attempt = 0; attempt < 60; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      const versionDetails = await project.agents.getVersion(agentName, createdVersion);
      const status = versionDetails.status;
      console.log(`Agent version status: ${status} (attempt ${attempt + 1})`);
      if (status === "active") break;
      if (status === "failed") {
        throw new Error(`Agent version provisioning failed: ${JSON.stringify(versionDetails)}`);
      }
      if (attempt === 59) {
        throw new Error("Timed out waiting for agent version to become active");
      }
    }

    // ── Point agent endpoint at the new version ───────────────────────
    const agent = await project.agents.get(agentName);
    originalAgentEndpoint = agent.agent_endpoint;

    await project.agents.updateAgent(agentName, {
      agentEndpoint: {
        version_selector: {
          version_selection_rules: [
            { agent_version: createdVersion, traffic_percentage: 100 },
          ],
        },
        protocol_configuration: {
          responses: {},
        },
      },
    });
    console.log(`Agent endpoint configured for version ${createdVersion}`);

    // ── Clean up any leftover routine from a prior run ────────────────
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
          connection_id: githubConnectionName,
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

    // Give the trigger registration a moment to settle before firing it.
    await new Promise((resolve) => setTimeout(resolve, 5_000));

    console.log(
      `Created routine: ${routine.name} enabled=${routine.enabled} ` +
        `repo=${githubOwner}/${githubRepositoryName} event=opened`,
    );

    // Fire the routine by opening a new issue in parallel so polling can begin immediately.
    createGitHubIssue("Testing routine").catch(() => {});
    console.log(
      `Open a GitHub issue in ${githubOwner}/${githubRepositoryName} to fire the routine.`,
    );

    // Poll run history until a terminal state is reached or timeout
    console.log("Waiting for a routine run for up to 10 minutes...");
    try {
      const terminalStatuses = new Set(["finished", "failed", "killed"]);
      const seenPhases = new Map<string, string>();
      const deadline = Date.now() + 600_000; // 10 minutes
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
            console.log(`The response Id is ${(run as Record<string, unknown>).response_id}`);
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
    } finally {
      await project.beta.routines.delete(routineName);
      console.log("Routine deleted");
    }
  } finally {
    // ── Restore original agent endpoint and delete the version ─────────
    if (originalAgentEndpoint) {
      await project.agents.updateAgent(agentName, {
        agentEndpoint: originalAgentEndpoint,
      });
      console.log("Agent endpoint restored");
    }

    await project.agents.deleteVersion(agentName, createdVersion, { force: true });
    console.log(`Hosted agent version ${createdVersion} deleted`);
  }
}

main().catch(console.error);
