// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the synchronous `openai.evals.*` methods
 * to create, get and list evaluation and eval runs for Response Completeness
 * evaluator using inline dataset content.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation for Response Completeness
 * evaluator with inline data, run the evaluation, and retrieve results.
 *
 * Before running the sample:
 *
 * Set these environment variables with your own values:
 * 1) AZURE_AI_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview
 *    page of your Microsoft Foundry project. It has the form:
 *    https://<account_name>.services.ai.azure.com/api/projects/<project_name>
 * 2) MODEL_DEPLOYMENT_NAME - Required. The name of the model deployment to use for evaluation.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o-mini";

async function main() {
  // Create AI Project client
  console.log("Creating an OpenAI client from the AI Project client");
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Define data source config
  const dataSourceConfig = {
    type: "custom",
    item_schema: {
      type: "object",
      properties: {
        ground_truth: { type: "string" },
        response: { type: "string" },
      },
      required: ["ground_truth", "response"],
    },
    include_sample_schema: true,
  };

  // Define testing criteria for Response Completeness evaluator
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "response_completeness",
      evaluator_name: "builtin.response_completeness",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        ground_truth: "{{item.ground_truth}}",
        response: "{{item.response}}",
      },
    },
  ];

  // Create Evaluation
  console.log("Creating Evaluation");
  const evalObject = await openAIClient.evals.create({
    name: "Test Response Completeness Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

  // Get Evaluation by Id
  console.log("\nGet Evaluation by Id");
  const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalObjectResponse, null, 2));

  // Complete response example
  const completeResponse =
    "Itinerary: Day 1 check out the downtown district of the city on train; for Day 2, we can rest in hotel.";
  const completeGroundTruth =
    "Itinerary: Day 1 take a train to visit the downtown area for city sightseeing; Day 2 rests in hotel.";

  // Incomplete response example
  const incompleteResponse =
    "The order with ID 124 is delayed and should now arrive by March 20, 2025.";
  const incompleteGroundTruth =
    "The order with ID 123 has been shipped and is expected to be delivered on March 15, 2025. However, the order with ID 124 is delayed and should now arrive by March 20, 2025.";

  // Create Eval Run with Inline Data
  console.log("\nCreating Eval Run with Inline Data");
  let evalRunObject = await openAIClient.evals.runs.create(evalObject.id, {
    name: "inline_data_run",
    metadata: { team: "eval-exp", scenario: "inline-data-v1" },
    data_source: {
      type: "jsonl",
      source: {
        type: "file_content",
        content: [
          // Complete response example
          {
            item: {
              ground_truth: completeGroundTruth,
              response: completeResponse,
            },
          },
          // Incomplete response example
          {
            item: {
              ground_truth: incompleteGroundTruth,
              response: incompleteResponse,
            },
          },
        ],
      },
    },
  });
  console.log(`Eval Run created (id: ${evalRunObject.id})`);
  console.log(JSON.stringify(evalRunObject, null, 2));

  // Get Eval Run by Id
  console.log("\nGet Eval Run by Id");
  const evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalRunResponse, null, 2));

  console.log("\n\n----Eval Run Output Items----\n\n");

  // Poll for completion
  while (!["completed", "failed"].includes(evalRunObject.status)) {
    evalRunObject = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
      eval_id: evalObject.id,
    });
    console.log("Waiting for eval run to complete...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // Retrieve and display output items
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
