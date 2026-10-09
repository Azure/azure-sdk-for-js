// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Routine that fires automatically
 * from a one-shot timer trigger, then poll the run history until a terminal
 * state is reached.
 *
 * The sample uploads the basic hosted-agent code from
 * `assets/responses-echo-agent.zip` as a temporary hosted-agent version,
 * routes the configured hosted agent name to that version, and schedules the
 * routine to fire a short time in the future. The sample then polls the run
 * history until a terminal phase is reached (or a deadline elapses), printing
 * each observed transition. The routine and hosted-agent version are deleted
 * at the end of the sample.
 *
 * Routines are a preview feature. In the JS SDK, you access
 * these operations via `project.beta.routines`.
 *
 * @summary Demonstrates a routine with a one-shot timer trigger.
 */

import type {
  TimerRoutineTrigger,
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
const useRemoteBuild =
  (process.env["FOUNDRY_HOSTED_AGENT_REMOTE_BUILD"] || "false").trim().toLowerCase() === "true";

const codeZipPath = path.resolve(__dirname, "../assets/responses-echo-agent.zip");
const routineName = "sample-routine-timer";

function sha256Hex(data: Uint8Array): string {
  return createHash("sha256").update(data).digest("hex");
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
      description: "Routines timer hosted agent uploaded from assets.",
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

    // Schedule the routine to fire 20 seconds from now
    const fireAt = new Date(Date.now() + 20_000);

    const routine = await project.beta.routines.createOrUpdate(routineName, {
      description: "Routine used by the timer-trigger sample.",
      enabled: true,
      triggers: {
        once: {
          type: "timer",
          at: fireAt,
        } as TimerRoutineTrigger,
      },
      action: {
        type: "invoke_agent_responses_api",
        agent_name: agentName,
      } as InvokeAgentResponsesApiRoutineAction,
    });
    console.log(
      `Created routine: ${routine.name} enabled=${routine.enabled} fire_at=${fireAt.toISOString()}`,
    );

    // Poll run history until a terminal state is reached
    const terminalStatuses = new Set(["finished", "failed", "killed"]);
    const seenPhases = new Map<string, string>();
    const deadline = Date.now() + 180_000;
    let finished = false;
    while (Date.now() < deadline && !finished) {
      await new Promise((resolve) => setTimeout(resolve, 5_000));
      for await (const run of project.beta.routines.listRuns(routineName, {
        limit: 20,
        order: "desc",
      })) {
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

    if (!finished) {
      console.log("Timer did not produce a terminal run within the deadline.");
    }

    // Clean up
    await project.beta.routines.delete(routineName);
    console.log("Routine deleted");
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
