// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and run a multi-turn conversation
 * evaluation using the AIProjectClient. Multi-turn evaluations assess complete
 * conversations—including tool-calling exchanges—using conversation-level metrics
 * such as customer satisfaction, task completion, coherence, and groundedness.
 *
 * This is Scenario 1 of multi-turn evaluations: you provide a JSONL dataset where
 * each row contains a `messages` array (and optional `tool_definitions`). The run
 * is created with `evaluation_level: "conversation"` so evaluators score each
 * conversation as a whole.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary Demonstrates a multi-turn conversation evaluation over a JSONL dataset
 * using conversation-level AI-assisted evaluators.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) FOUNDRY_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *    Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 * 2) FOUNDRY_MODEL_NAME - Required. The model deployment name to use for AI-assisted evaluators.
 * 3) DATASET_VERSION - Optional. The version of the Dataset to create and use in this sample.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as path from "path";
import { tmpdir } from "os";
import "dotenv/config";
import * as fs from "node:fs/promises";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const datasetVersion = process.env["DATASET_VERSION"] || "1";

// Each row is a full conversation. The second row also exercises tool-calling.
const conversations = [
  {
    messages: [
      { role: "system", content: "You are a helpful travel assistant." },
      { role: "user", content: "I need to book a flight to Paris." },
      {
        role: "assistant",
        content:
          "I'd be happy to help you book a flight to Paris. What dates are you looking to travel?",
      },
      { role: "user", content: "Next Friday, returning Sunday." },
      {
        role: "assistant",
        content:
          "I found several options for flights departing next Friday and returning Sunday. The best value is a direct flight on Air France for $450 round trip. Would you like me to book this for you?",
      },
    ],
  },
  {
    messages: [
      { role: "user", content: "What's the weather in Paris?" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_123",
            type: "function",
            function: { name: "get_weather", arguments: '{"location": "Paris"}' },
          },
        ],
      },
      {
        role: "tool",
        tool_call_id: "call_123",
        content: '{"temperature": 18, "condition": "sunny"}',
      },
      {
        role: "assistant",
        content: "The weather in Paris is currently sunny with a temperature of 18°C (64°F).",
      },
    ],
    tool_definitions: [
      {
        name: "get_weather",
        description: "Get current weather for a location",
        parameters: { type: "object", properties: { location: { type: "string" } } },
      },
    ],
  },
];

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Write the conversation dataset to a temporary JSONL file and upload it.
  const tempFilePath = path.join(tmpdir(), `multiturn-conversations-${Date.now()}.jsonl`);
  const jsonlContent = conversations.map((item) => JSON.stringify(item)).join("\n");
  await fs.writeFile(tempFilePath, jsonlContent);

  console.log("Uploading multi-turn conversation dataset...");
  const dataset = await project.datasets.uploadFile(
    "multiturn-conversation-data",
    datasetVersion,
    tempFilePath,
  );
  console.log(`Dataset uploaded (id: ${dataset.id})`);

  // Define the data source config for multi-turn conversations. The item_schema
  // declares the "messages" array and optional "tool_definitions". include_sample_schema
  // is false since conversation evaluators use {{item.messages}} mapping rather than
  // per-turn sample fields.
  const dataSourceConfig = {
    type: "custom" as const,
    item_schema: {
      type: "object",
      properties: {
        messages: { type: "array" },
        tool_definitions: { type: "array" },
      },
      required: ["messages"],
    },
    include_sample_schema: false,
  };

  // Conversation-level evaluators. All map to {{item.messages}} to assess the full conversation.
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "customer_satisfaction",
      evaluator_name: "builtin.customer_satisfaction",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: { messages: "{{item.messages}}" },
    },
    {
      type: "azure_ai_evaluator",
      name: "task_completion",
      evaluator_name: "builtin.task_completion",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        messages: "{{item.messages}}",
        tool_definitions: "{{item.tool_definitions}}",
      },
    },
    {
      type: "azure_ai_evaluator",
      name: "conversation_coherence",
      evaluator_name: "builtin.coherence",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: { messages: "{{item.messages}}" },
    },
    {
      type: "azure_ai_evaluator",
      name: "groundedness",
      evaluator_name: "builtin.groundedness",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        messages: "{{item.messages}}",
        tool_definitions: "{{item.tool_definitions}}",
      },
    },
  ];

  console.log("\nCreating multi-turn conversation evaluation...");
  const evalObject = await openAIClient.evals.create({
    name: "Multi-turn Conversation Evaluation",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria as any,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Create a run with evaluation_level set to "conversation" so evaluators score
  // each conversation as a whole. The OpenAI client forwards unknown body fields,
  // so `evaluation_level` here is the JS analog of Python's `extra_body`.
  console.log("\nCreating evaluation run...");
  let run = await openAIClient.evals.runs.create(evalObject.id, {
    name: "multiturn-conversation-run",
    data_source: {
      type: "jsonl",
      source: { type: "file_id", id: dataset.id || "" },
    },
    evaluation_level: "conversation",
  } as any);
  console.log(`Evaluation run created (id: ${run.id})`);

  // Poll for completion. Treat canceled/cancelled as terminal so the loop exits
  // for a canceled run.
  while (!["completed", "failed", "canceled", "cancelled"].includes(run.status)) {
    run = await openAIClient.evals.runs.retrieve(run.id, { eval_id: evalObject.id });
    console.log(`Waiting for eval run to complete... current status: ${run.status}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  if (run.status !== "completed") {
    throw new Error(`Evaluation run did not complete (status: ${run.status}).`);
  }

  console.log("\nEvaluation run completed successfully!");
  console.log(`Result Counts: ${JSON.stringify(run.result_counts)}`);

  const outputItems = [];
  for await (const item of openAIClient.evals.runs.outputItems.list(run.id, {
    eval_id: evalObject.id,
  })) {
    outputItems.push(item);
  }
  console.log(`\nOUTPUT ITEMS (Total: ${outputItems.length})`);
  console.log("-".repeat(60));
  console.log(JSON.stringify(outputItems, null, 2));
  console.log("-".repeat(60));
  console.log(`\nEval Run Report URL: ${run.report_url}`);

  // Clean up
  console.log("\nDeleting dataset...");
  await project.datasets.delete(dataset.name, dataset.version);
  console.log("Dataset deleted");

  console.log("Deleting evaluation...");
  await openAIClient.evals.delete(evalObject.id);
  console.log("Evaluation deleted");

  // Fail the sample if any evaluator errored, so a judge that can't resolve its
  // deployment surfaces as a failure rather than a silent success.
  const erroredCount = (run.result_counts as any)?.errored ?? 0;
  if (erroredCount > 0) {
    throw new Error(`Evaluation run had ${erroredCount} errored result(s).`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
