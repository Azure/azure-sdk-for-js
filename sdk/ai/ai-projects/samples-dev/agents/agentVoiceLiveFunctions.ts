// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Handles a GPT Live Responses-delegation function call and continues its backend response.
 * @azsdk-weight 100
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";
import { runVoiceAgentLiveFunctions } from "./utils/liveFunctions.js";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const model = process.env["FOUNDRY_LIVE_MODEL"];
  const backendModel = process.env["FOUNDRY_LIVE_BACKEND_MODEL"];
  if (!endpoint || !model || !backendModel) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT, FOUNDRY_LIVE_MODEL and FOUNDRY_LIVE_BACKEND_MODEL.",
    );
  }
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  const name = `live-functions-${randomUUID().slice(0, 8)}`;
  await project.agents.create(
    name,
    {
      kind: "voice",
      sub_protocol: "live",
      model_type: "self_deployed",
      model,
      instructions: "When given delegated commentary, communicate the result briefly.",
      delegation: {
        type: "responses",
        responses: {
          model: backendModel,
          instructions:
            "Use get_current_time for time requests. Return the answer in [commentary] tags.",
          parallel_tool_calls: false,
          tools: [
            {
              type: "function",
              name: "get_current_time",
              description: "Get the current UTC time.",
              parameters: { type: "object", properties: {}, additionalProperties: false },
              strict: true,
            },
          ],
        },
      },
      store: false,
    },
    { foundryFeatures: "VoiceAgents=V1Preview" },
  );
  try {
    const connection = await project.beta.voiceAgents.live.connect(name, { store: false });
    await runVoiceAgentLiveFunctions(connection);
  } finally {
    await project.agents.delete(name);
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
