// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Browser Automation tool from
 * the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Browser Automation tool.
 */

import type {
  MessageTextContent,
  ThreadMessage,
  RunStepToolCallDetails,
  RunStepBrowserAutomationToolCall,
  MessageTextUrlCitationAnnotation,
} from "@azure/ai-agents";
import { AgentsClient, isOutputOfType, ToolUtility } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";
const azurePlaywrightConnectionId = process.env["AZURE_PLAYWRIGHT_CONNECTION_ID"] || "<connection id>";

export async function main(): Promise<void> {
  const connectionId = azurePlaywrightConnectionId;

  // Initialize Browser Automation tool and add the connection id
  const browserAutomation = ToolUtility.createBrowserAutomationTool(connectionId);

  // Create an Azure AI Agents Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Create a new Agent that has the Browser Automation tool attached.
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: `
      You are an Agent helping with browser automation tasks. 
      You can answer questions, provide information, and assist with various tasks 
      related to web browsing using the Browser Automation tool available to you.
    `,
    tools: [browserAutomation.definition],
  });

  console.log(`Created agent, ID: ${agent.id}`);

  // Create thread for communication
  const thread = await client.threads.create();
  console.log(`Created thread, ID: ${thread.id}`);

  // Create message to thread
  const message = await client.messages.create(
    thread.id,
    "user",
    `
      Your goal is to report the percent of Microsoft year-to-date stock price change.
      To do that, go to the website finance.yahoo.com.
      At the top of the page, you will find a search bar.
      Enter the value 'MSFT', to get information about the Microsoft stock price.
      At the top of the resulting page you will see a default chart of Microsoft stock price.
      Click on 'YTD' at the top of that chart, and report the percent value that shows up just below it.
    `,
  );
  console.log(`Created message, ID: ${message.id}`);

  // Create and process agent run in thread with tools
  console.log("Waiting for Agent run to complete. Please wait...");
  const run = await client.runs.createAndPoll(thread.id, agent.id, {
    pollingOptions: {
      intervalInMs: 2000,
    },
  });

  console.log(`Run finished with status: ${run.status}`);

  if (run.status === "failed") {
    console.log(`Run failed: ${JSON.stringify(run.lastError)}`);
  }

  // Fetch run steps to get the details of the agent run
  const runStepsIterator = client.runSteps.list(thread.id, run.id);
  console.log("\nRun Steps:");

  for await (const step of runStepsIterator) {
    console.log(`Step ${step.id} status: ${step.status}`);

    if (isOutputOfType<RunStepToolCallDetails>(step.stepDetails, "tool_calls")) {
      console.log("  Tool calls:");
      const toolCalls = step.stepDetails.toolCalls;

      for (const call of toolCalls) {
        console.log(`    Tool call ID: ${call.id}`);
        console.log(`    Tool call type: ${call.type}`);

        if (isOutputOfType<RunStepBrowserAutomationToolCall>(call, "browser_automation")) {
          console.log(`    Browser automation input: ${call.browserAutomation.input}`);
          console.log(`    Browser automation output: ${call.browserAutomation.output}`);

          console.log("    Steps:");
          for (const toolStep of call.browserAutomation.steps) {
            console.log(`      Last step result: ${toolStep.lastStepResult}`);
            console.log(`      Current state: ${toolStep.currentState}`);
            console.log(`      Next step: ${toolStep.nextStep}`);
            console.log(); // add an extra newline between tool steps
          }
        }

        console.log(); // add an extra newline between tool calls
      }
    }

    console.log(); // add an extra newline between run steps
  }

  // Optional: Delete the agent once the run is finished.
  // Comment out this line if you plan to reuse the agent later.
  await client.deleteAgent(agent.id);
  console.log("Deleted agent");

  // Print the Agent's response message with optional citation
  const messagesIterator = client.messages.list(thread.id);
  const messages: ThreadMessage[] = [];

  for await (const msg of messagesIterator) {
    messages.unshift(msg); // Add to beginning to maintain chronological order
  }

  // Find the last assistant message
  const responseMessage = messages.find(
    (msg) => msg.role === "assistant" && msg.content.length > 0
  );

  if (responseMessage) {
    // Display URL citations if any
    for (const content of responseMessage.content) {
      if (isOutputOfType<MessageTextContent>(content, "text")) {
        console.log(`Agent response: ${content.text.value}`);
        for (const annotation of content.text.annotations || []) {
          if (isOutputOfType<MessageTextUrlCitationAnnotation>(annotation, "url_citation")) {
            console.log(
              `URL Citation: [${annotation.urlCitation.title}](${annotation.urlCitation.url})`,
            );
          }
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
