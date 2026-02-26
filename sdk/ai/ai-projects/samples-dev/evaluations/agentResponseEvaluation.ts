// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and run an evaluation for an Azure AI agent response
 * using the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an agent, generate a response,
 * create an evaluation, run the evaluation with agent response target, and clean up resources.
 *
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["AZURE_AI_AGENT_NAME"] || "my-agent";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create agent
  console.log("Creating agent...");
  const agent = await project.agents.createVersion(agentName, {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant that answers general questions",
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Create conversation with initial user message
  console.log("\nCreating conversation...");
  const conversation = await openAIClient.conversations.create({
    items: [
      {
        type: "message",
        role: "user",
        content: "What is the size of France in square miles?",
      },
    ],
  });
  console.log(`Created conversation with initial user message (id: ${conversation.id})`);

  // Generate response
  console.log("\nGenerating response...");
  const response = await openAIClient.responses.create(
    {
      conversation: conversation.id,
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Response output: ${response.output_text} (id: ${response.id})`);

  // Create evaluation
  console.log("\nCreating evaluation...");

  const evalObject = await openAIClient.evals.create({
    name: "Agent Response Evaluation",
    data_source_config: {
      type: "azure_ai_source" as const,
      scenario: "responses",
    } as any,
    testing_criteria: [
      {
        type: "azure_ai_evaluator",
        name: "violence_detection",
        evaluator_name: "builtin.violence",
      } as any,
    ],
  });
  console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

  // Create evaluation run with agent response target
  console.log("\nCreating evaluation run...");

  let responseEvalRun = await openAIClient.evals.runs.create(evalObject.id, {
    name: `Evaluation Run for Agent ${agent.name}`,
    data_source: {
      type: "azure_ai_responses" as const,
      item_generation_params: {
        type: "response_retrieval" as const,
        data_mapping: { response_id: "{{item.resp_id}}" },
        source: {
          type: "file_content" as const,
          content: [{ item: { resp_id: response.id } }],
        },
      },
    } as any,
  });
  console.log(`Evaluation run created (id: ${responseEvalRun.id})`);

  // Poll for completion
  while (!["completed", "failed"].includes(responseEvalRun.status)) {
    responseEvalRun = await openAIClient.evals.runs.retrieve(responseEvalRun.id, {
      eval_id: evalObject.id,
    });
    console.log(`Waiting for eval run to complete... current status: ${responseEvalRun.status}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  if (responseEvalRun.status === "completed") {
    console.log("\n Evaluation run completed successfully!");
    console.log(`Result Counts: ${JSON.stringify(responseEvalRun.result_counts)}`);

    const outputItems = [];
    for await (const item of openAIClient.evals.runs.outputItems.list(responseEvalRun.id, {
      eval_id: evalObject.id,
    })) {
      outputItems.push(item);
    }
    console.log(`\nOUTPUT ITEMS (Total: ${outputItems.length})`);
    console.log(`Eval Run Report URL: ${responseEvalRun.report_url}`);
    console.log("-".repeat(60));
    console.log(JSON.stringify(outputItems, null, 2));
    console.log("-".repeat(60));
  } else {
    console.log(`Eval Run Report URL: ${responseEvalRun.report_url}`);
    console.log("\n Evaluation run failed.");
  }

  // Clean up
  console.log("\nCleaning up resources...");
  await openAIClient.evals.delete(evalObject.id);
  console.log("Evaluation deleted");

  await project.agents.delete(agent.name);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
