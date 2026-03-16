// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use function tools with the Azure AI Projects client.
 * It shows the complete workflow of defining a function tool, handling function calls
 * from the model, executing the function, and providing results back to get a final response.
 *
 * @summary Demonstrates how to create an agent with function tools, handle function calls,
 * and provide function results to get the final response.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

/**
 * Define a function tool for the model to use
 */
const funcTool = {
  type: "function" as const,
  name: "get_horoscope",
  description: "Get today's horoscope for an astrological sign.",
  strict: true,
  parameters: {
    type: "object",
    properties: {
      sign: {
        type: "string",
        description: "An astrological sign like Taurus or Aquarius",
      },
    },
    required: ["sign"],
    additionalProperties: false,
  },
};

/**
 * Generate a horoscope for the given astrological sign.
 */
function getHoroscope(sign: string): string {
  return `${sign}: Next Tuesday you will befriend a baby otter.`;
}

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create agent with function tools
  console.log("Creating agent with function tools...");
  const agent = await project.agents.createVersion("function-tool-agent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant that can use function tools.",
    tools: [funcTool],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Prompt the model with tools defined
  console.log("\nGenerating initial response...");
  const response = await openAIClient.responses.create(
    {
      input: [
        {
          type: "message",
          role: "user",
          content: "What is my horoscope? I am an Aquarius.",
        },
      ],
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Response output: ${response.output_text}`);

  // Process function calls
  const inputList: Array<{
    type: "function_call_output";
    call_id: string;
    output: string;
  }> = [];

  for (const item of response.output) {
    if (item.type === "function_call") {
      if (item.name === "get_horoscope") {
        // Parse the function arguments
        const args = JSON.parse(item.arguments);

        // Execute the function logic for get_horoscope
        const horoscope = getHoroscope(args.sign);

        // Provide function call results to the model
        inputList.push({
          type: "function_call_output",
          call_id: item.call_id,
          output: JSON.stringify({ horoscope }),
        });
      }
    }
  }

  console.log("\nFinal input:");
  console.log(JSON.stringify(inputList, null, 2));

  // Submit function results to get final response
  const finalResponse = await openAIClient.responses.create(
    {
      input: inputList,
      previous_response_id: response.id,
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );

  // The model should be able to give a response!
  console.log("\nFinal output:");
  console.log(finalResponse.output_text);

  // Clean up
  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
