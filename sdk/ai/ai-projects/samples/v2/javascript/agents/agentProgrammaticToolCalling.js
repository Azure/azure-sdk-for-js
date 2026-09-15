// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to configure an agent for programmatic tool calling.
 *
 * @summary Demonstrates how to create an agent with a programmatic tool-calling
 * tool and a function that permits programmatic invocation.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating an agent configured for programmatic tool calling...");
  const agent = await project.agents.createVersion("programmatic-tool-calling-agent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "Use the available tools when they help answer the user's request.",
    tools: [
      {
        type: "function",
        name: "get_weather",
        description: "Get the current weather for a city.",
        strict: true,
        parameters: {
          type: "object",
          properties: {
            city: { type: "string", description: "The city to look up." },
          },
          required: ["city"],
          additionalProperties: false,
        },
        allowed_callers: ["programmatic"],
      },
      {
        type: "programmatic_tool_calling",
      },
    ],
  });

  console.log(`Created agent ${agent.name} version ${agent.version}.`);

  console.log("Cleaning up the agent version...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent version deleted.");
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});

module.exports = { main };
