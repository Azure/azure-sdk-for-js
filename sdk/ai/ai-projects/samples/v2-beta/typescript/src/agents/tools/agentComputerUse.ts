// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use Computer Use Agent (CUA) functionality
 * with the Azure AI Projects client. It simulates browser automation by
 * creating an agent that can interact with computer interfaces through
 * simulated actions and screenshots.
 *
 * The sample creates a Computer Use Agent that performs a web search simulation,
 * demonstrating how to handle computer actions like typing, clicking, and
 * taking screenshots in a controlled environment.
 *
 * @summary This sample demonstrates how to create a Computer Use Agent that can interact
 * with computer interfaces through simulated actions and screenshots.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";
import {
  SearchState,
  loadScreenshotAssets,
  handleComputerActionAndTakeScreenshot,
  printFinalOutput,
  type ComputerAction,
} from "./computerUseUtil.js";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName =
  process.env["COMPUTER_USE_MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Initialize state machine
  let currentState = SearchState.INITIAL;

  // Load screenshot assets
  const screenshots = await loadScreenshotAssets();
  console.log("Successfully loaded screenshot assets");

  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating Computer Use Agent...");
  const agent = await project.agents.createVersion("ComputerUseAgent", {
    kind: "prompt" as const,
    model: deploymentName,
    instructions: `
You are a computer automation assistant.

Be direct and efficient. When you reach the search results page, read and describe the actual search result titles and descriptions you can see.
    `.trim(),
    tools: [
      {
        type: "computer_use_preview",
        display_width: 1026,
        display_height: 769,
        environment: "windows" as const,
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Initial request with screenshot - start with Bing search page
  console.log(
    "Starting computer automation session (initial screenshot: cua_browser_search.png)...",
  );
  let response = await openAIClient.responses.create(
    {
      input: [
        {
          role: "user" as const,
          content: [
            {
              type: "input_text",
              text: "I need you to help me search for 'OpenAI news'. Please type 'OpenAI news' and submit the search. Once you see search results, the task is complete.",
            },
            {
              type: "input_image",
              image_url: screenshots.browser_search.url,
              detail: "high",
            },
          ],
        },
      ],
      truncation: "auto",
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );

  console.log(`Initial response received (ID: ${response.id})`);

  // Main interaction loop with deterministic completion
  const maxIterations = 10; // Allow enough iterations for completion
  let iteration = 0;

  while (iteration < maxIterations) {
    iteration++;
    console.log(`\n--- Iteration ${iteration} ---`);

    // Check for computer calls in the response
    const computerCalls = response.output.filter((item) => item.type === "computer_call");

    if (computerCalls.length === 0) {
      printFinalOutput({
        output: response.output,
        status: response.status ?? "",
      });
      break;
    }

    // Process the first computer call
    const computerCall = computerCalls[0];
    const action: ComputerAction = computerCall.action;
    const callId: string = computerCall.call_id;

    console.log(`Processing computer call (ID: ${callId})`);

    // Handle the action and get the screenshot info
    const [screenshotInfo, updatedState] = handleComputerActionAndTakeScreenshot(
      action,
      currentState,
      screenshots,
    );
    currentState = updatedState;

    console.log(`Sending action result back to agent (using ${screenshotInfo.filename})...`);
    // Regular response with just the screenshot
    response = await openAIClient.responses.create(
      {
        previous_response_id: response.id,
        input: [
          {
            call_id: callId,
            type: "computer_call_output",
            output: {
              type: "computer_screenshot",
              image_url: screenshotInfo.url,
            },
          },
        ],
        truncation: "auto",
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );

    console.log(`Follow-up response received (ID: ${response.id})`);
  }

  if (iteration >= maxIterations) {
    console.log(`\nReached maximum iterations (${maxIterations}). Stopping.`);
  }

  // Clean up resources
  console.log("\nCleaning up...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  console.log("\nComputer Use Agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
