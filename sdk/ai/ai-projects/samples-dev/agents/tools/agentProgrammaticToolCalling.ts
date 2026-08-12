// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to configure a prompt agent for programmatic tool calling.
 *
 * @summary Configure a prompt agent to invoke a function from programmatic tool-calling code.
 *
 * @azsdk-weight 80
 */

import type { FunctionTool, ProgrammaticToolCallingParam } from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

const getWeatherTool: FunctionTool = {
  type: "function",
  name: "get_weather",
  description: "Get the weather for a location.",
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "The city and state, for example Seattle, WA.",
      },
    },
    required: ["location"],
    additionalProperties: false,
  },
  output_schema: {
    type: "object",
    properties: {
      temperature: { type: "number" },
      conditions: { type: "string" },
    },
    required: ["temperature", "conditions"],
    additionalProperties: false,
  },
  strict: true,
  allowed_callers: ["programmatic"],
};

const programmaticTool: ProgrammaticToolCallingParam = {
  type: "programmatic_tool_calling",
};

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating an agent configured for programmatic tool calling...");
  const agent = await project.agents.createVersion("programmatic-tool-calling-agent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "Use programmatic tool calling to invoke get_weather when answering questions.",
    tools: [programmaticTool, getWeatherTool],
  });
  console.log(`Agent created (name: ${agent.name}, version: ${agent.version}).`);

  console.log("Cleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted.");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
