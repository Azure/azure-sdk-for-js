// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the coherence evaluator with inline dataset content.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation using the builtin coherence
 * evaluator, run it with inline JSONL data, and retrieve results.
 *
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o-mini";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  // Define data source configuration
  const dataSourceConfig = {
    type: "custom" as const,
    item_schema: {
      type: "object",
      properties: {
        query: { type: "string" },
        response: { type: "string" },
      },
      required: ["query", "response"],
    },
    include_sample_schema: true,
  };

  // Define testing criteria with coherence evaluator
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "coherence",
      evaluator_name: "builtin.coherence",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        query: "{{item.query}}",
        response: "{{item.response}}",
      },
    } as any,
  ];

  // Create evaluation
  console.log("Creating evaluation...");
  const evalObject = await openAIClient.evals.create({
    name: "Test Coherence Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Get evaluation by ID
  console.log("\nGet evaluation by ID...");
  const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Eval Response:");
  console.log(JSON.stringify(evalObjectResponse, null, 2));

  // Sample inline data
  const successQuery = "What is the capital of France?";
  const successResponse = "The capital of France is Paris.";

  // Failure example - incoherent response
  const failureQuery = "What is the capital of France?";
  const failureResponse =
    "France capital is... well, the city where government sits is Paris but no wait, Lyon is bigger actually maybe Rome? The French people live in many cities but the main one, I think it's definitely Paris or maybe not, depends on what you mean by capital.";

  // Create evaluation run with inline data
  console.log("\nCreating evaluation run with inline data...");
  let evalRunObject = await openAIClient.evals.runs.create(evalObject.id, {
    name: "inline_data_run",
    metadata: { team: "eval-exp", scenario: "inline-data-v1" },
    data_source: {
      type: "jsonl" as const,
      source: {
        type: "file_content" as const,
        content: [
          // Success example - coherent response
          { item: { query: successQuery, response: successResponse } },
          // Failure example - incoherent response
          { item: { query: failureQuery, response: failureResponse } },
        ],
      },
    },
  });
  console.log(`Evaluation run created (id: ${evalRunObject.id})`);
  console.log(JSON.stringify(evalRunObject, null, 2));

  // Get evaluation run by ID
  console.log("\nGet evaluation run by ID...");
  const evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalRunResponse, null, 2));

  // Poll for completion
  console.log("\n----Eval Run Output Items----\n");
  while (!["completed", "failed"].includes(evalRunObject.status)) {
    evalRunObject = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
      eval_id: evalObject.id,
    });
    console.log("Waiting for eval run to complete...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // Get output items
  const outputItems = [];
  for await (const item of openAIClient.evals.runs.outputItems.list(evalObject.id, {
    eval_id: evalRunObject.id,
  })) {
    outputItems.push(item);
  }
  console.log(JSON.stringify(outputItems, null, 2));
  console.log(`Eval Run Status: ${evalRunObject.status}`);
  console.log(`Eval Run Report URL: ${evalRunObject.report_url}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
