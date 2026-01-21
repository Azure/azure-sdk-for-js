// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and run an evaluation for an Azure AI agent
 * using the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an agent, create an evaluation,
 * run the evaluation with agent target, and clean up resources.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["AZURE_AI_AGENT_NAME"] || "my-agent-evaluation";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  // Create agent
  console.log("Creating agent...");
  const agent = await project.agents.createVersion(agentName, {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant that answers general questions",
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Create evaluation
  console.log("\nCreating evaluation...");
  const dataSourceConfig = {
    type: "custom" as const,
    item_schema: {
      type: "object",
      properties: { query: { type: "string" } },
      required: ["query"],
    },
    include_sample_schema: true,
  };

  const evalObject = await openAIClient.evals.create({
    name: "Agent Evaluation",
    data_source_config: dataSourceConfig,
    testing_criteria: [
      {
        type: "azure_ai_evaluator",
        name: "violence_detection",
        evaluator_name: "builtin.violence",
        data_mapping: { query: "{{item.query}}", response: "{{item.response}}" },
      } as any,
    ],
  });
  console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

  // Create evaluation run with agent target
  console.log("\nCreating evaluation run...");

  let agentEvalRun = await openAIClient.evals.runs.create(evalObject.id, {
    name: `Evaluation Run for Agent ${agent.name}`,
    data_source: {
      type: "azure_ai_target_completions" as const,
      source: {
        type: "file_content" as const,
        content: [
          { item: { query: "What is the capital of France?" } },
          { item: { query: "How do I reverse a string in Python?" } },
        ],
      },
      input_messages: {
        type: "template" as const,
        template: [
          {
            type: "message" as const,
            role: "user" as const,
            content: { type: "input_text" as const, text: "{{item.query}}" },
          },
        ],
      },
      target: {
        type: "azure_ai_agent" as const,
        name: agent.name,
        version: agent.version, // Version is optional. Defaults to latest version if not specified
      },
    } as any,
  });
  console.log(`Evaluation run created (id: ${agentEvalRun.id})`);

  // Poll for completion
  while (!["completed", "failed"].includes(agentEvalRun.status)) {
    agentEvalRun = await openAIClient.evals.runs.retrieve(agentEvalRun.id, {
      eval_id: evalObject.id,
    });
    console.log(`Waiting for eval run to complete... current status: ${agentEvalRun.status}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  if (agentEvalRun.status === "completed") {
    console.log("\n Evaluation run completed successfully!");
    console.log(`Result Counts: ${JSON.stringify(agentEvalRun.result_counts)}`);

    const outputItems = [];
    for await (const item of openAIClient.evals.runs.outputItems.list(evalObject.id, {
      eval_id: agentEvalRun.id,
    })) {
      outputItems.push(item);
    }
    console.log(`\nOUTPUT ITEMS (Total: ${outputItems.length})`);
    console.log("-".repeat(60));
    console.log(JSON.stringify(outputItems, null, 2));
    console.log("-".repeat(60));
  } else {
    console.log("\n Evaluation run failed.");
  }

  // Clean up
  console.log("\nCleaning up resources...");
  await openAIClient.evals.delete(evalObject.id);
  console.log("Evaluation deleted");

  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
