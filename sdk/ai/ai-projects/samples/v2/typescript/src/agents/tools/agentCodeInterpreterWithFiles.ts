// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run Prompt Agent operations using the Code Interpreter Tool
 * with file uploads, followed by downloading the generated file.
 *
 * @summary This sample demonstrates how to create an agent with a code interpreter tool
 * that processes an uploaded CSV file, generates a chart, and downloads the resulting file.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Upload a CSV file for the code interpreter
  const assetFilePath = path.join(__dirname, "..", "assets", "synthetic_500_quarterly_results.csv");
  console.log("Uploading CSV file...");
  const file = await openAIClient.files.create({
    purpose: "assistants",
    file: fs.createReadStream(assetFilePath),
  });
  console.log(`File uploaded (id: ${file.id})`);

  // Create agent with code interpreter tool and uploaded file
  console.log("Creating agent with code interpreter tool...");
  const agent = await project.agents.createVersion("agent-code-interpreter-files", {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant.",
    tools: [
      {
        type: "code_interpreter",
        container: {
          type: "auto",
          file_ids: [file.id],
        },
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Extract file information from response annotations
  let fileId = "";
  let filename = "";
  let containerId = "";

  try {
    // Create a conversation
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send request to create a chart and generate a file
    console.log("\nRequesting chart generation from uploaded CSV...");
    const response = await openAIClient.responses.create(
      {
        conversation: conversation.id,
        input:
          "Could you please create bar chart in TRANSPORTATION sector for the operating profit from the uploaded csv file and provide file to me?",
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );
    console.log(`Response completed (id: ${response.id})`);

    // Safely extract file information from response annotations, guarding against empty arrays.
    if (Array.isArray(response.output) && response.output.length > 0) {
      const lastMessage = response.output[response.output.length - 1];
      if (lastMessage && lastMessage.type === "message" && Array.isArray(lastMessage.content) && lastMessage.content.length > 0) {
        const lastContent = lastMessage.content[lastMessage.content.length - 1];
        if (lastContent && lastContent.type === "output_text" && Array.isArray(lastContent.annotations) && lastContent.annotations.length > 0) {
          const fileCitation = lastContent.annotations[lastContent.annotations.length - 1];
          if (fileCitation && fileCitation.type === "container_file_citation") {
            fileId = fileCitation.file_id;
            filename = fileCitation.filename;
            containerId = fileCitation.container_id;
            console.log(`Found generated file: ${filename} (ID: ${fileId})`);
          }
        }
      }
    }

    // Download the generated file if available
    if (fileId && filename) {
      const fileContent = await openAIClient.containers.files.content.retrieve(fileId, {
        container_id: containerId,
      });
      const filePath = path.join(os.tmpdir(), filename);
      const buffer = Buffer.from(await fileContent.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      console.log(`File downloaded successfully: ${filePath}`);
    } else {
      console.log("No file generated in response");
    }
  } finally {
    // Clean up agent
    console.log("\nCleaning up...");
    await project.agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
