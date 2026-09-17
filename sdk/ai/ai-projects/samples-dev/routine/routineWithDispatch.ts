// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Routine with a timer trigger and
 * manually dispatch it using the Azure AI Projects SDK. The sample:
 *
 * - Uploads the code in `assets/responses-echo-agent.zip` as a temporary
 *   Hosted Agent version.
 * - Creates a Routine associated with the Hosted Agent.
 * - Dispatches the Routine using an
 *   `InvokeAgentResponsesApiDispatchPayload`.
 * - Polls the Routine run history until execution reaches a terminal state.
 * - Prints status transitions during execution.
 * - Deletes the created Routine and Hosted Agent version when finished.
 *
 * Because the Routine uses a `TimerRoutineTrigger` set far in the future, it
 * does not run automatically on its own schedule; the sample explicitly
 * invokes it through `project.beta.routines.dispatch()` before the scheduled
 * fire time.
 *
 * Routines are currently a preview feature and are available through
 * `project.beta.routines`.
 *
 * @summary Demonstrates dispatching a timer routine on demand and polling runs.
 */

import type {
  TimerRoutineTrigger,
  InvokeAgentResponsesApiRoutineAction,
  InvokeAgentResponsesApiDispatchPayload,
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
const routineName = "sample-routine-dispatch";

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
      description: "Routines dispatch hosted agent uploaded from assets.",
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
      console.log(`Routine \`${routineName}\` deleted`);
    } catch {
      // ignore 404
    }

    // ── Create a routine with a timer trigger set 1 hour in the future
    const fireAt = new Date(Date.now() + 60 * 60 * 1000);

    const routine = await project.beta.routines.createOrUpdate(routineName, {
      description: "Long-timer routine dispatched before its scheduled fire time.",
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

    // ── Dispatch the routine manually ─────────────────────────────────
    const dispatchResult = await project.beta.routines.dispatch(routineName, {
      payload: {
        type: "invoke_agent_responses_api",
        input: "Say hello from a timer routine dispatched before its scheduled fire time.",
      } as InvokeAgentResponsesApiDispatchPayload,
    });
    console.log(
      `Dispatched routine: dispatch_id=${dispatchResult.dispatch_id} task_id=${dispatchResult.task_id}`,
    );

    // ── Poll run history until a terminal state is reached ────────────
    const deadline = Date.now() + 180_000;
    let finalRun: Record<string, unknown> | undefined;
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 5_000));
      for await (const run of project.beta.routines.listRuns(routineName, {
        limit: 20,
        order: "desc",
      })) {
        if (
          run.dispatch_id === dispatchResult.dispatch_id &&
          (run.phase === "completed" || run.phase === "failed")
        ) {
          finalRun = run as unknown as Record<string, unknown>;
          break;
        }
      }
      if (finalRun) break;
    }

    if (finalRun) {
      console.log("Final run:");
      console.log(JSON.stringify(finalRun, null, 2));
      const triggeredAt = finalRun.triggered_at
        ? new Date(finalRun.triggered_at as string)
        : undefined;
      if (triggeredAt) {
        console.log(
          `Routine was scheduled to trigger around ${fireAt.toLocaleTimeString()}, ` +
            `but dispatch caused it to trigger at ${triggeredAt.toLocaleTimeString()}.`,
        );
      }
    } else {
      console.log("Dispatch did not produce a terminal run within the deadline.");
    }

    // ── Clean up routine ──────────────────────────────────────────────
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
