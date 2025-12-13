// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the synchronous OpenAI-compatible Evals API
 * to create, get and list evaluations and eval runs using inline dataset content
 * with the fluency evaluator.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation with the fluency evaluator,
 * run it with inline data, and retrieve results.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  // Define the data source config with custom schema
  const dataSourceConfig = {
    type: "custom",
    item_schema: {
      type: "object",
      properties: {
        query: { type: "string" },
        response: { type: "string" },
      },
      required: ["response"],
    },
    include_sample_schema: true,
  };

  // Define testing criteria using the built-in fluency evaluator
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "fluency",
      evaluator_name: "builtin.fluency",
      initialization_parameters: {
        deployment_name: modelDeploymentName,
      },
      data_mapping: {
        query: "{{item.query}}",
        response: "{{item.response}}",
      },
    },
  ];

  // Create evaluation
  console.log("Creating Evaluation");
  const evalObject = await openAIClient.evals.create({
    name: "Test Fluency Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Get evaluation by ID
  console.log("\nGet Evaluation by Id");
  const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Eval Response:");
  console.log(JSON.stringify(evalObjectResponse, null, 2));

  // Sample inline data
  const query = "What is the capital of France?";
  const response = "The capital of France is Paris.";

  // Create evaluation run with inline data
  console.log("\nCreating Eval Run with Inline Data");
  let evalRunObject = await openAIClient.evals.runs.create(evalObject.id, {
    name: "inline_data_run",
    metadata: {
      team: "eval-exp",
      scenario: "inline-data-v1",
    },
    data_source: {
      type: "jsonl",
      source: {
        type: "file_content",
        content: [
          {
            item: {
              query: query,
              response: response,
            },
          },
        ],
      },
    },
  });
  console.log(`Eval Run created (id: ${evalRunObject.id})`);
  console.log(JSON.stringify(evalRunObject, null, 2));

  // Get eval run by ID
  console.log("\nGet Eval Run by Id");
  const evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalRunResponse, null, 2));

  // Poll for completion
  console.log("\n\n----Eval Run Output Items----\n");
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

module.exports = { main };
