// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Computer Use tool (preview)
 * using a synchronous client. This sample uses fake screenshots to demonstrate how output actions work,
 * but the actual implementation would involve mapping the output action types to their corresponding
 * API calls in the user's preferred managed environment framework (e.g. Playwright or Docker).
 *
 * NOTE: Usage of the computer-use-preview model currently requires approval. Please see
 * https://learn.microsoft.com/azure/ai-foundry/openai/how-to/computer-use for more information.
 * 
 * @summary demonstrates how to use agent operations with the Computer Use tool.
 */

import type {
  ComputerUseEnvironment,
  MessageInputContentBlock,
  MessageInputTextBlock,
  MessageInputImageUrlBlock,
  MessageImageUrlParam,
  RunStepToolCallDetails,
  RunStepComputerUseToolCall,
  RequiredComputerUseToolCall,
  SubmitToolOutputsAction,
  TypeAction,
  ScreenshotAction,
  ComputerScreenshot,
  StructuredToolOutputUnion,
} from "@azure/ai-agents";
import { AgentsClient, isOutputOfType, ToolUtility } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["COMPUTER_USE_MODEL"] || "computer-use-preview";
const environment = (process.env["COMPUTER_USE_ENVIRONMENT"] as ComputerUseEnvironment) || "windows";

/**
 * Convert an image file to a Base64-encoded string.
 *
 * @param imagePath - The path to the image file (e.g. 'image_file.png')
 * @returns A Base64-encoded string representing the image.
 * @throws Error if the provided file path does not exist or there's an error reading the file.
 */
function imageToBase64(imagePath: string): string {
  if (!existsSync(imagePath)) {
    throw new Error(`File not found at: ${imagePath}`);
  }

  try {
    const fileData = readFileSync(imagePath);
    return fileData.toString("base64");
  } catch (error) {
    throw new Error(`Error reading file '${imagePath}': ${error}`);
  }
}

export async function main(): Promise<void> {
  // Get the directory of the current script
  let currentDir: string;
  try {
    currentDir = dirname(fileURLToPath(import.meta.url));
  } catch {
    // Fallback for environments where import.meta.url is not available
    currentDir = process.cwd();
  }
  
  const assetFilePath = join(currentDir, "../data/cua_screenshot.jpg");
  const actionResultFilePath = join(currentDir, "../data/cua_screenshot_next.jpg");

  // Create an Azure AI Agents Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Initialize Computer Use tool with a browser-sized viewport
  const computerUse = ToolUtility.createComputerUseTool(1026, 769, environment);

  // Create a new Agent that has the Computer Use tool attached.
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent-computer-use",
    instructions: `
      You are a computer automation assistant. 
      Use the computer_use_preview tool to interact with the screen when needed.
    `,
    tools: [computerUse.definition],
  });

  console.log(`Created agent, ID: ${agent.id}`);

  // Create thread for communication
  const thread = await client.threads.create();
  console.log(`Created thread, ID: ${thread.id}`);

  const inputMessage = 
    "I can see a web browser with bing.com open and the cursor in the search box. " +
    "Type 'movies near me' without pressing Enter or any other key. Only type 'movies near me'.";

  const imageBase64 = imageToBase64(assetFilePath);
  const imgUrl = `data:image/jpeg;base64,${imageBase64}`;
  const urlParam: MessageImageUrlParam = { url: imgUrl, detail: "high" };
  console.log("urlParam ", urlParam);

  const textBlock: MessageInputTextBlock = { type: "text", text: inputMessage };
  const imageBlock: MessageInputImageUrlBlock = { type: "image_url", imageUrl: urlParam };
  const contentBlocks: MessageInputContentBlock[] = [
    textBlock,
    imageBlock,
  ];

  // Create message to thread
  const message = await client.messages.create(thread.id, "user", contentBlocks);
  console.log(`Created message, ID: ${message.id}`);

  const run = await client.runs.create(thread.id, agent.id);
  console.log(`Created run, ID: ${run.id}`);

  // Create a fake screenshot showing the text typed in
  const resultImageBase64 = imageToBase64(actionResultFilePath);
  const resultImgUrl = `data:image/jpeg;base64,${resultImageBase64}`;
  const computerScreenshot: ComputerScreenshot = { 
    type: "computer_screenshot",
    imageUrl: resultImgUrl 
  };

  while (run.status === "queued" || run.status === "in_progress" || run.status === "requires_action") {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const updatedRun = await client.runs.get(thread.id, run.id);
    
    if (updatedRun.status === "requires_action" && updatedRun.requiredAction) {
      if (isOutputOfType<SubmitToolOutputsAction>(updatedRun.requiredAction, "submit_tool_outputs")) {
        console.log("Run requires action:");
        const toolCalls = updatedRun.requiredAction.submitToolOutputs.toolCalls;
        
        if (!toolCalls || toolCalls.length === 0) {
          console.log("No tool calls provided - cancelling run");
          await client.runs.cancel(thread.id, run.id);
          break;
        }

        const toolOutputs: StructuredToolOutputUnion[] = [];
        for (const toolCall of toolCalls) {
          if (isOutputOfType<RequiredComputerUseToolCall>(toolCall, "computer_use_preview")) {
            console.log(toolCall);
            try {
              const action = toolCall.computerUsePreview.action;
              console.log(`Executing computer use action: ${action.type}`);
              
              if (isOutputOfType<TypeAction>(action, "type")) {
                console.log(`  Text to type: ${action.text}`);
                // (add hook to input text in managed environment API here)

                toolOutputs.push({
                  type: "computer_call_output",
                  toolCallId: toolCall.id,
                  output: computerScreenshot,
                });
              } else if (isOutputOfType<ScreenshotAction>(action, "screenshot")) {
                console.log("  Screenshot requested");
                // (add hook to take screenshot in managed environment API here)

                toolOutputs.push({
                  type: "computer_call_output",
                  toolCallId: toolCall.id,
                  output: computerScreenshot,
                });
              }
            } catch (error) {
              console.log(`Error executing tool_call ${toolCall.id}: ${error}`);
            }
          }
        }

        console.log(`Tool outputs: ${JSON.stringify(toolOutputs, null, 2)}`);
        if (toolOutputs.length > 0) {
          await client.runs.submitToolOutputs(thread.id, run.id, toolOutputs);
        }
      }
    }

    // Update run status for the loop condition
    const currentRun = await client.runs.get(thread.id, run.id);
    Object.assign(run, currentRun);
    console.log(`Current run status: ${run.status}`);
  }

  console.log(`Run completed with status: ${run.status}`);
  if (run.status === "failed") {
    console.log(`Run failed: ${JSON.stringify(run.lastError)}`);
  }

  // Fetch run steps to get the details of the agent run
  const runStepsIterator = client.runSteps.list(thread.id, run.id);
  console.log("\nRun Steps:");

  for await (const step of runStepsIterator) {
    console.log(`Step ${step.id} status: ${step.status}`);
    console.log(step);

    if (isOutputOfType<RunStepToolCallDetails>(step.stepDetails, "tool_calls")) {
      console.log("  Tool calls:");
      const runStepToolCalls = step.stepDetails.toolCalls;

      for (const call of runStepToolCalls) {
        console.log(`    Tool call ID: ${call.id}`);
        console.log(`    Tool call type: ${call.type}`);

        if (isOutputOfType<RunStepComputerUseToolCall>(call, "computer_use_preview")) {
          const details = call.computerUsePreview;
          console.log(`    Computer use action type: ${details.action.type}`);
        }

        console.log(); // extra newline between tool calls
      }
    }

    console.log(); // extra newline between run steps
  }

  // Optional: Delete the agent once the run is finished.
  await client.deleteAgent(agent.id);
  console.log("Deleted agent");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
