// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run Prompt Agent operations using the Code
 * Interpreter Tool with structured inputs.
 *
 * It is intentionally very similar to `agentCodeInterpreter.ts`, but shows how
 * to use structured inputs to pass an uploaded file id at runtime. The key idea
 * is that a structured input acts as a placeholder in the tool definition and
 * is later bound to actual data in the response call.
 *
 * @summary Demonstrates a code interpreter agent whose file id is supplied at
 * runtime via structured inputs.
 */

import type { StructuredInputDefinition } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Upload a tiny CSV so the code interpreter has a file to work with.
  const csvContent = "x\n1\n2\n3\n";
  const csvFile = new File([csvContent], "numbers.csv", { type: "text/csv" });
  const uploaded = await openAIClient.files.create({ purpose: "assistants", file: csvFile });
  console.log(`File uploaded (id: ${uploaded.id})`);

  // The container file id is templated and resolved at runtime via structured inputs.
  const structuredInputs: Record<string, StructuredInputDefinition> = {
    analysis_file_id: {
      description: "File id available to the code interpreter",
      required: true,
      schema: { type: "string" },
    },
  };

  // Create agent with code interpreter tool
  console.log("\nCreating agent with code interpreter tool...");
  const agent = await project.agents.createVersion(
    agentName,
    {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant.",
      tools: [
        {
          type: "code_interpreter",
          container: { type: "auto", file_ids: ["{{analysis_file_id}}"] },
        },
      ],
      structured_inputs: structuredInputs,
    },
    { description: "Code interpreter agent for data analysis and visualization." },
  );
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  try {
    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send request for the agent to generate a multiplication chart, binding the
    // structured input to the uploaded file id.
    const response = await openAIClient.responses.create(
      {
        conversation: conversation.id,
        input:
          "Could you please generate a multiplication chart showing the products for 1-10 multiplied by 1-10 " +
          "(a 10x10 times table)? Also, using the code interpreter, read numbers.csv and return the sum of x.",
        tool_choice: "required",
      },
      {
        body: {
          agent_reference: { name: agent.name, type: "agent_reference" },
          structured_inputs: { analysis_file_id: uploaded.id },
        },
      },
    );
    console.log(`Response completed (id: ${response.id})`);

    // Print code executed by the code interpreter tool.
    const codeItem = response.output.find((output) => output.type === "code_interpreter_call");
    console.log("Code Interpreter code:");
    console.log(codeItem && "code" in codeItem ? codeItem.code : "");

    // Print final assistant text output.
    console.log(`Agent response: ${response.output_text}`);

    await openAIClient.conversations.delete(conversation.id);
    console.log("Conversation deleted");
  } finally {
    console.log("\nCleaning up...");
    await project.agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
