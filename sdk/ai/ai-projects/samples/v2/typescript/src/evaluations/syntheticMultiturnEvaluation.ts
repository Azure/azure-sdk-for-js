// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * End-to-end multi-turn evaluation with no hand-authored test data. A single
 * `azure_ai_synthetic_data_generation_with_simulation` data source has the service:
 *
 *   1. Synthesize test-case scenarios from the agent's instructions.
 *   2. Simulate multi-turn conversations for those scenarios against a Foundry agent.
 *   3. Score the generated conversations with conversation-level evaluators.
 *
 * Generation and simulation happen in one eval run — no separate data generation job
 * is required. Use `multiturnConversationSimulation.ts` when you want to author the
 * seed scenarios yourself; use this sample to derive scenarios from an agent's
 * instructions.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary Demonstrates a synthetic multi-turn evaluation that generates scenarios,
 * simulates conversations, and scores them in a single eval run.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) FOUNDRY_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *    Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 * 2) FOUNDRY_MODEL_NAME - Required. The model deployment name used to generate seed scenarios,
 *    drive the simulated user, and run AI-assisted evaluators.
 * 3) FOUNDRY_AGENT_NAME - Optional. The name of the AI agent. If not set, defaults to "my-agent-synthetic".
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "my-agent-synthetic";

const SEED_COUNT = 1;
const CONVERSATIONS_PER_SEED = 1;
const MAX_TURNS = 2;
const DESIRED_TURNS = 1;

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create (or update) the agent whose instructions seed the synthetic scenarios.
  console.log("Creating agent...");
  const agent = await project.agents.createVersion(agentName, {
    kind: "prompt",
    model: modelDeploymentName,
    instructions: "You are a helpful customer service agent. Be empathetic and solution-oriented.",
  });
  console.log(`Agent created (name: ${agent.name}, version: ${agent.version})`);

  // Synthetic-data-generation-with-simulation groups declare an "azure_ai_source"
  // config with the "synthetic_data_gen" scenario. The service generates the seed
  // scenarios and simulated conversations at run time, so no inline item schema is supplied.
  const dataSourceConfig = {
    type: "azure_ai_source",
    scenario: "synthetic_data_gen",
  };

  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "tool_use_quality",
      evaluator_name: "builtin.tool_use_quality",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        messages: "{{item.messages}}",
        tool_definitions: "{{item.tool_definitions}}",
      },
    },
    {
      type: "azure_ai_evaluator",
      name: "output_quality",
      evaluator_name: "builtin.output_quality",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        messages: "{{item.messages}}",
        tool_definitions: "{{item.tool_definitions}}",
      },
    },
    {
      type: "azure_ai_evaluator",
      name: "deflection_rate",
      evaluator_name: "builtin.deflection_rate",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        messages: "{{item.messages}}",
        tool_definitions: "{{item.tool_definitions}}",
      },
    },
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
      name: "coherence",
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

  console.log("\nCreating evaluation group...");
  const evalObject = await openAIClient.evals.create({
    name: "Synthetic Multi-turn Evaluation",
    data_source_config: dataSourceConfig as any,
    testing_criteria: testingCriteria as any,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  try {
    // A single data source generates synthetic scenarios from the agent's instructions
    // and simulates multi-turn conversations for them. evaluation_level is the JS analog
    // of Python's extra_body — the OpenAI client forwards unknown body fields.
    console.log("\nCreating synthetic multi-turn run...");
    let run = await openAIClient.evals.runs.create(evalObject.id, {
      name: "synthetic-multiturn-run",
      data_source: {
        type: "azure_ai_synthetic_data_generation_with_simulation",
        synthetic_data_generation_configuration: {
          test_case_count: SEED_COUNT,
          output_test_case_dataset_name: `${agentName}-synthetic-scenarios`,
          generation_sources: [
            { type: "agent", agent_name: agent.name, agent_version: agent.version },
          ],
        },
        model_configuration: { model: modelDeploymentName },
        default_simulation_configuration: {
          max_num_turns: MAX_TURNS,
          conversation_repetitions: CONVERSATIONS_PER_SEED,
          desired_num_turns: DESIRED_TURNS,
          enable_conversation_dataset_generation: true,
          output_conversation_dataset_name: `${agentName}-synthetic-conversations`,
        },
        target: { type: "azure_ai_agent", name: agent.name, version: agent.version },
      },
      evaluation_level: "conversation",
    } as any);
    console.log(`Simulation run created (id: ${run.id})`);
    console.log("Simulation runs can take several minutes. Polling...");

    // Poll for completion
    while (!["completed", "failed", "canceled"].includes(run.status)) {
      run = await openAIClient.evals.runs.retrieve(run.id, { eval_id: evalObject.id });
      console.log(`Waiting for simulation to complete... current status: ${run.status}`);
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }

    if (run.status !== "completed") {
      throw new Error(`Simulation run did not complete (status: ${run.status})`);
    }

    console.log("\nSynthetic multi-turn evaluation completed successfully.");
    console.log(`Result Counts: ${JSON.stringify(run.result_counts)}`);

    const expectedConversations = SEED_COUNT * CONVERSATIONS_PER_SEED;
    console.log(
      `Expected up to: ${expectedConversations} conversations ` +
        `(${SEED_COUNT} synthetic scenarios x ${CONVERSATIONS_PER_SEED} per scenario)`,
    );

    const outputItems = [];
    for await (const item of openAIClient.evals.runs.outputItems.list(run.id, {
      eval_id: evalObject.id,
    })) {
      outputItems.push(item);
    }
    console.log(`\nOutput items: ${outputItems.length}`);
    if (outputItems.length > 0) {
      console.log("First output item:");
      console.log(JSON.stringify(outputItems[0], null, 2));
    }
    console.log(`\nEval Run Report URL: ${run.report_url}`);
  } finally {
    console.log("\nDeleting evaluation...");
    await openAIClient.evals.delete(evalObject.id);
    console.log("Evaluation deleted");

    console.log("Deleting agent...");
    await project.agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
