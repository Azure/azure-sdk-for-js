// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Route a Realtime voice-agent turn to an inline specialist and observe the completed handoff.
 * @azsdk-weight 50
 */

import { AIProjectClient } from "@azure/ai-projects";
import type { VoiceAgentConnection } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";
import "dotenv/config";

export async function main(): Promise<void> {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
  if (!projectEndpoint) throw new Error("Set FOUNDRY_PROJECT_ENDPOINT.");
  const model = process.env["FOUNDRY_VOICE_MODEL"]?.trim() || "gpt-realtime";
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const agentName = `voice-handoff-${randomUUID().slice(0, 8)}`;
  const options = {
    requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
  };
  console.log(`Creating voice agent ${agentName}...`);
  const agent = await project.agents.create(
    agentName,
    {
      kind: "voice",
      sub_protocol: "realtime",
      model_type: "managed",
      model,
      instructions: "Follow the user's request accurately. Keep ordinary replies brief.",
      output_modalities: ["text"],
      store: false,
      audio: {
        input: {
          format: { type: "audio/pcm", rate: 24000 },
          turn_detection: null,
        },
        output: { format: { type: "audio/pcm", rate: 24000 } },
      },
      subagent_config: {
        subagentType: "inline",
        subagents: [
          {
            id: "$entrypoint",
            source: "inline",
            interface: "voice",
            display_description: "General assistance and routing.",
            instructions:
              "When the user requests account help, immediately hand off using the accounts routing condition.",
            parallel_tool_calls: false,
            handoff_conditions: [
              {
                id: "to_accounts",
                target: "accounts",
                condition: "The user explicitly requests help with an account.",
                target_response: "auto",
                delay_ms: 0,
                cancel_on_interruption: false,
              },
            ],
          },
          {
            id: "accounts",
            source: "inline",
            interface: "voice",
            display_description: "Account assistance.",
            inherit_base_instructions: false,
            instructions:
              "Introduce yourself as the accounts specialist, then ask what account help is needed.",
            parallel_tool_calls: false,
          },
        ],
        handoff_policy: { max_transfers: 2, max_attempts: 3 },
      },
    },
    {
      ...options,
      abortSignal: AbortSignal.timeout(60_000),
      onResponse: (response) => console.log(`Agent creation HTTP status: ${response.status}`),
    },
  );
  try {
    const definition = agent.versions.latest.definition;
    if (
      !("subagent_config" in definition) ||
      definition.subagent_config?.subagentType !== "inline"
    ) {
      throw new Error("The saved agent did not retain the inline handoff configuration.");
    }
    const connection = await project.beta.voiceAgents.realtime.connect(agent.name, {
      store: false,
    });
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        requestAccountHelp(connection),
        new Promise<never>((_resolve, reject) => {
          timeout = setTimeout(
            () => reject(new Error("Timed out waiting for the handoff.")),
            60_000,
          );
        }),
      ]);
    } finally {
      clearTimeout(timeout);
      await connection.close();
    }
  } finally {
    console.log(`Deleting sample agent ${agent.name}...`);
    await project.agents.delete(agent.name, {
      requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
    });
  }
}

async function requestAccountHelp(connection: VoiceAgentConnection): Promise<void> {
  let startedId: string | undefined;
  let handoffCompleted = false;
  let activeNodeId: string | undefined;
  let responseId: string | undefined;
  let reply = "";
  let markReady: () => void = () => {
    throw new Error("The session readiness promise was not initialized.");
  };
  const ready = new Promise<void>((resolve) => {
    markReady = resolve;
  });
  const receive = (async () => {
    for await (const event of connection) {
      switch (event.type) {
        case "session.created":
        case "session.updated":
          activeNodeId = event.session.handoff?.active_node_id;
          if (activeNodeId === "$entrypoint") markReady();
          break;
        case "session.handoff.started":
          startedId = event.handoff_id;
          console.log(`Handoff ${startedId}: ${event.from_node_id} -> ${event.to_node_id}`);
          break;
        case "session.handoff.completed":
          if (event.handoff_id !== startedId || event.to_node_id !== "accounts") {
            throw new Error("The completed handoff did not match the requested specialist.");
          }
          handoffCompleted = true;
          console.log(`Handoff ${event.handoff_id} completed.`);
          break;
        case "session.handoff.aborted":
          throw new Error(`Handoff aborted: ${event.reason}`);
        case "response.created":
          console.log(`Response ${event.response.id} started on ${activeNodeId}.`);
          if (handoffCompleted) responseId = event.response.id;
          break;
        case "response.output_text.delta":
          if (event.response_id === responseId) {
            reply += event.delta;
            process.stdout.write(event.delta);
          }
          break;
        case "response.done":
          if (event.response.id !== responseId) break;
          if (
            event.response.status !== "completed" ||
            !reply.trim() ||
            activeNodeId !== "accounts"
          ) {
            throw new Error("The accounts specialist did not complete a response.");
          }
          process.stdout.write("\n");
          return;
        case "error":
          throw new Error(`Voice Agent error ${event.error.code}: ${event.error.message}`);
      }
    }
    throw new Error("The connection closed before the specialist completed a reply.");
  })();
  const send = (async () => {
    // session.created may contain backend defaults before the agent configuration is applied.
    await ready;
    console.log("Agent configuration received; requesting the accounts specialist.");
    await connection.sendText(
      "I need help with my account. Please connect the accounts specialist now.",
    );
    console.log("Account request sent.");
  })();
  await Promise.all([receive, send]);
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
