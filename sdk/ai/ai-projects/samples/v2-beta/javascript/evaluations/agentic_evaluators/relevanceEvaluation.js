// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the OpenAI compatible evals API to create,
 * get and list evaluation and eval runs for Relevance evaluator using inline dataset content.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation for the Relevance evaluator
 * with inline data, run the evaluation, and retrieve results.
 *
 * Before running the sample:
 * 1. Set AZURE_AI_PROJECT_ENDPOINT - The Azure AI Project endpoint, as found in the overview page
 *    of your Microsoft Foundry project. Format: https://<account_name>.services.ai.azure.com/api/projects/<project_name>
 * 2. Set MODEL_DEPLOYMENT_NAME - The name of the model deployment to use for evaluation.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o-mini";

async function main() {
  // Create AI Project client and OpenAI client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const client = project.getOpenAIClient();

  // Define data source configuration
  const dataSourceConfig = {
    type: "custom",
    item_schema: {
      type: "object",
      properties: {
        query: {
          anyOf: [{ type: "string" }, { type: "array", items: { type: "object" } }],
        },
        response: {
          anyOf: [{ type: "string" }, { type: "array", items: { type: "object" } }],
        },
      },
      required: ["query", "response"],
    },
    include_sample_schema: true,
  };

  // Define testing criteria for relevance evaluator
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "relevance",
      evaluator_name: "builtin.relevance",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: { query: "{{item.query}}", response: "{{item.response}}" },
    },
  ];

  // Create evaluation
  console.log("Creating Evaluation");
  const evalObject = await client.evals.create({
    name: "Test Relevance Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Get Evaluation by Id
  console.log("\nGet Evaluation by Id");
  const evalObjectResponse = await client.evals.retrieve(evalObject.id);
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalObjectResponse, null, 2));

  // Success example - relevant response
  const successQuery = "What is the capital of Japan?";
  const successResponse = "The capital of Japan is Tokyo.";

  // Failure example - irrelevant response
  const failureQuery = "What is the capital of Japan?";
  const failureResponse =
    "Japan is known for its beautiful cherry blossoms and advanced technology. The country has a rich cultural heritage and is famous for sushi and anime.";

  // Conversation example
  const queryConversationQuery = [
    {
      createdAt: "2025-03-26T17:30:00Z",
      run_id: "run_SimpleTask789",
      role: "user",
      content: [{ type: "text", text: "Please calculate 15% tip on a $80 dinner bill" }],
    },
  ];
  const queryConversationResponse = [
    {
      createdAt: "2025-03-26T17:30:05Z",
      run_id: "run_SimpleTask789",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "The 15% tip on an $80 dinner bill is $12.00. Your total bill including tip would be $92.00.",
        },
      ],
    },
  ];

  // Create Eval Run with Inline Data
  console.log("\nCreating Eval Run with Inline Data");
  let evalRunObject = await client.evals.runs.create(evalObject.id, {
    name: "inline_data_run",
    metadata: { team: "eval-exp", scenario: "inline-data-v1" },
    data_source: {
      type: "jsonl",
      source: {
        type: "file_content",
        content: [
          // Success example - relevant response
          { item: { query: successQuery, response: successResponse } },
          // Failure example - irrelevant response
          { item: { query: failureQuery, response: failureResponse } },
          // Conversation example
          { item: { query: queryConversationQuery, response: queryConversationResponse } },
        ],
      },
    },
  });

  console.log(`Eval Run created (id: ${evalRunObject.id})`);
  console.log(JSON.stringify(evalRunObject, null, 2));

  // Get Eval Run by Id
  console.log("\nGet Eval Run by Id");
  evalRunObject = await client.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalRunObject, null, 2));

  console.log("\n\n----Eval Run Output Items----\n\n");

  // Poll for completion
  while (!["completed", "failed"].includes(evalRunObject.status)) {
    evalRunObject = await client.evals.runs.retrieve(evalRunObject.id, {
      eval_id: evalObject.id,
    });
    console.log("Waiting for eval run to complete...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // Retrieve and display output items
  const outputItems = [];
  for await (const item of client.evals.runs.outputItems.list(evalObject.id, {
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
