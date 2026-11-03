// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a conversation simulation evaluation against
 * a Foundry agent using the AIProjectClient. The service generates multi-turn
 * conversations by simulating a user interacting with your agent based on seed
 * scenarios, then evaluates the generated conversations with conversation-level
 * metrics.
 *
 * This is Scenario 4 of multi-turn evaluations: you provide seed scenarios (each
 * describing a test case), and the service generates full conversations by replaying
 * simulated user turns against your agent. The generated conversations are then
 * scored by conversation-level evaluators.
 *
 * Key concepts:
 *   - data_source type is "azure_ai_user_conversation_simulation" with a seed-scenarios
 *     source, a model_configuration, and a target agent.
 *   - default_simulation_configuration.conversation_repetitions is per seed scenario.
 *   - default_simulation_configuration.max_num_turns controls the maximum exchanges
 *     per conversation.
 *   - data_mapping binds seed-dataset columns to simulation inputs.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary Demonstrates a multi-turn conversation simulation evaluation that generates
 * conversations from seed scenarios against a Foundry agent.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) FOUNDRY_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *    Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 * 2) FOUNDRY_MODEL_NAME - Required. The model deployment name for the simulator and AI-assisted evaluators.
 * 3) FOUNDRY_AGENT_NAME - Optional. The name of the AI agent. If not set, defaults to "my-agent-simulation".
 * 4) DATASET_VERSION - Optional. The version of the seed-scenarios Dataset to create and use.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as path from "path";
import { tmpdir } from "os";
import "dotenv/config";
import * as fs from "node:fs/promises";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "my-agent-simulation";
const datasetVersion = process.env["DATASET_VERSION"] || "1";

// Seed scenarios: each row is a test case the simulator expands into a conversation.
const scenarios = [
  {
    id: "scenario-1-greeting",
    test_case_description:
      "User starts with a casual greeting; agent should respond warmly and offer help.",
    desired_num_turns: 3,
  },
  {
    id: "scenario-2-weather-followup",
    test_case_description:
      "User asks about the weather in a major city, then asks a follow-up about whether to bring an umbrella.",
    desired_num_turns: 4,
  },
  {
    id: "scenario-3-store-hours",
    test_case_description:
      "User asks if a store is open, then progressively narrows down to curbside-pickup hours, then places an order.",
    desired_num_turns: 5,
  },
];

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create (or update) an agent to simulate against.
  console.log("Creating agent...");
  const agent = await project.agents.createVersion(agentName, {
    kind: "prompt",
    model: modelDeploymentName,
    instructions: "You are a helpful customer service agent. Be empathetic and solution-oriented.",
  });
  console.log(`Agent created (name: ${agent.name}, version: ${agent.version})`);

  // Upload the seed scenarios dataset.
  const tempFilePath = path.join(tmpdir(), `simulation-scenarios-${Date.now()}.jsonl`);
  const jsonlContent = scenarios.map((item) => JSON.stringify(item)).join("\n");
  await fs.writeFile(tempFilePath, jsonlContent);

  console.log("Uploading simulation scenarios dataset...");
  const dataset = await project.datasets.uploadFile(
    "simulation-scenarios",
    datasetVersion,
    tempFilePath,
  );
  console.log(`Scenarios dataset uploaded (id: ${dataset.id})`);

  // Simulation uses the same "custom" eval group type as dataset evaluation (S1),
  // since the generated conversations follow the same messages schema.
  const dataSourceConfig = {
    type: "custom" as const,
    item_schema: {
      type: "object",
      properties: { messages: { type: "array" } },
      required: ["messages"],
    },
    include_sample_schema: false,
  };

  // Conversation-level evaluators.
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
      data_mapping: { messages: "{{item.messages}}" },
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
      data_mapping: { messages: "{{item.messages}}" },
    },
  ];

  console.log("\nCreating simulation evaluation group...");
  const evalObject = await openAIClient.evals.create({
    name: "Multi-turn Conversation Simulation",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria as any,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Create a simulation run:
  //   - source: the seed scenarios dataset (each row is a test case)
  //   - model_configuration: the model that drives the simulated user
  //   - default_simulation_configuration: controls conversation generation
  //   - data_mapping: maps seed-dataset field names to simulation inputs
  //   - target: the agent to simulate against
  // evaluation_level is the JS analog of Python's extra_body — the OpenAI client
  // forwards unknown body fields to the service.
  console.log("\nCreating simulation run...");
  let run = await openAIClient.evals.runs.create(evalObject.id, {
    name: "conversation-simulation-run",
    data_source: {
      type: "azure_ai_user_conversation_simulation",
      source: { type: "file_id", id: dataset.id || "" },
      model_configuration: {
        model: modelDeploymentName,
        sampling_params: { temperature: 0.7, top_p: 1.0, max_completion_tokens: 800 },
      },
      default_simulation_configuration: {
        max_num_turns: 2,
        conversation_repetitions: 1,
        desired_num_turns: 1,
        enable_conversation_dataset_generation: true,
        output_conversation_dataset_name: "conversation-simulation-output",
      },
      data_mapping: { test_case_description: "test_case_description", id: "id" },
      target: { type: "azure_ai_agent", name: agent.name, version: agent.version },
    },
    evaluation_level: "conversation",
  } as any);
  console.log(`Simulation run created (id: ${run.id})`);
  console.log("Simulation runs are slow (3-8 min). Polling...");

  // Poll for completion
  while (!["completed", "failed"].includes(run.status)) {
    run = await openAIClient.evals.runs.retrieve(run.id, { eval_id: evalObject.id });
    console.log(`Waiting for simulation to complete... current status: ${run.status}`);
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }

  if (run.status === "completed") {
    console.log("\nSimulation run completed successfully!");
    console.log(`Result Counts: ${JSON.stringify(run.result_counts)}`);
    console.log("Expected: one conversation per seed scenario (conversation_repetitions=1)");

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
  } else {
    console.log("\nSimulation run failed.");
  }

  // Clean up
  console.log("\nDeleting evaluation...");
  await openAIClient.evals.delete(evalObject.id);
  console.log("Evaluation deleted");

  console.log("Deleting dataset...");
  await project.datasets.delete(dataset.name, dataset.version);
  console.log("Dataset deleted");

  console.log("Deleting agent...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
