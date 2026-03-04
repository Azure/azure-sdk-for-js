// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the synchronous OpenAI evals.* methods to create,
 * get and list evaluation and eval runs for Intent Resolution evaluator using inline dataset content.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation for Intent Resolution
 * evaluator with inline data and retrieve the results.
 *
 * Before running the sample:
 *
 * Set these environment variables with your own values:
 * 1) AZURE_AI_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview
 *    page of your Microsoft Foundry project. It has the form:
 *    https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 * 2) MODEL_DEPLOYMENT_NAME - Required. The name of the model deployment to use for evaluation.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o-mini";

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Define the data source config for Intent Resolution evaluator
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
        tool_definitions: {
          anyOf: [{ type: "object" }, { type: "array", items: { type: "object" } }],
        },
      },
      required: ["query", "response"],
    },
    include_sample_schema: true,
  };

  // Define the testing criteria using Intent Resolution evaluator
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "intent_resolution",
      evaluator_name: "builtin.intent_resolution",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        query: "{{item.query}}",
        response: "{{item.response}}",
        tool_definitions: "{{item.tool_definitions}}",
      },
    },
  ];

  // Create evaluation
  console.log("Creating Evaluation");
  const evalObject = await openAIClient.evals.create({
    name: "Test Intent Resolution Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Get Evaluation by Id
  console.log("\nGet Evaluation by Id");
  const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Eval Response:");
  console.log(JSON.stringify(evalObjectResponse, null, 2));

  // Success example - Intent is identified and understood and the response correctly resolves user intent
  const successQuery = "What are the opening hours of the Eiffel Tower?";
  const successResponse = "Opening hours of the Eiffel Tower are 9:00 AM to 11:00 PM.";

  // Failure example - Even though intent is correctly identified, the response does not resolve the user intent
  const failureQuery = "What is the opening hours of the Eiffel Tower?";
  const failureResponse =
    "Please check the official website for the up-to-date information on Eiffel Tower opening hours.";

  // Complex conversation example with tool calls
  const complexQuery = [
    { role: "system", content: "You are a friendly and helpful customer service agent." },
    {
      createdAt: "2025-03-14T06:14:20Z",
      role: "user",
      content: [
        {
          type: "text",
          text: "Hi, I need help with my order #123 status?",
        },
      ],
    },
  ];

  const complexResponse = [
    {
      createdAt: "2025-03-14T06:14:30Z",
      run_id: "0",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "tool_call_001",
          name: "get_order",
          arguments: { order_id: "123" },
        },
      ],
    },
    {
      createdAt: "2025-03-14T06:14:35Z",
      run_id: "0",
      tool_call_id: "tool_call_001",
      role: "tool",
      content: [
        {
          type: "tool_result",
          tool_result:
            '{ "order": { "id": "123", "status": "shipped", "delivery_date": "2025-03-15" } }',
        },
      ],
    },
    {
      createdAt: "2025-03-14T06:14:40Z",
      run_id: "0",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "tool_call_002",
          name: "get_tracking",
          arguments: { order_id: "123" },
        },
      ],
    },
    {
      createdAt: "2025-03-14T06:14:45Z",
      run_id: "0",
      tool_call_id: "tool_call_002",
      role: "tool",
      content: [
        {
          type: "tool_result",
          tool_result: '{ "tracking_number": "ABC123", "carrier": "UPS" }',
        },
      ],
    },
    {
      createdAt: "2025-03-14T06:14:50Z",
      run_id: "0",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "Your order #123 has been shipped and is expected to be delivered on March 15, 2025. The tracking number is ABC123 with UPS.",
        },
      ],
    },
  ];

  // Tool definitions for the complex example
  const toolDefinitions = [
    {
      name: "get_order",
      description: "Get the details of a specific order.",
      parameters: {
        type: "object",
        properties: {
          order_id: { type: "string", description: "The order ID to get the details for." },
        },
      },
    },
    {
      name: "get_tracking",
      description: "Get tracking information for an order.",
      parameters: {
        type: "object",
        properties: {
          order_id: { type: "string", description: "The order ID to get tracking for." },
        },
      },
    },
  ];

  // Create evaluation run with inline data
  console.log("\nCreating Eval Run with Inline Data");
  const evalRunObject = await openAIClient.evals.runs.create(evalObject.id, {
    name: "inline_data_run",
    metadata: { team: "eval-exp", scenario: "inline-data-v1" },
    data_source: {
      type: "jsonl",
      source: {
        type: "file_content",
        content: [
          // Example 1: Success case - simple string query and response
          { item: { query: successQuery, response: successResponse } },
          // Example 2: Failure case - simple string query and response
          { item: { query: failureQuery, response: failureResponse } },
          // Example 3: Complex conversation with tool calls and tool definitions
          {
            item: {
              query: complexQuery,
              response: complexResponse,
              tool_definitions: toolDefinitions,
            },
          },
          // Example 4: Complex conversation without tool definitions
          { item: { query: complexQuery, response: complexResponse } },
        ],
      },
    },
  });

  console.log(`Eval Run created (id: ${evalRunObject.id})`);
  console.log(JSON.stringify(evalRunObject, null, 2));

  // Get Eval Run by Id
  console.log("\nGet Eval Run by Id");
  let evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalRunResponse, null, 2));

  // Poll for completion and get output items
  console.log("\n\n----Waiting for Eval Run to Complete----\n");

  while (!["completed", "failed"].includes(evalRunResponse.status)) {
    evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
      eval_id: evalObject.id,
    });
    console.log(`Waiting for eval run to complete... current status: ${evalRunResponse.status}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // Get output items
  if (evalRunResponse.status === "completed") {
    console.log("\n----Eval Run Output Items----\n");
    const outputItems = [];
    for await (const item of openAIClient.evals.runs.outputItems.list(evalObject.id, {
      eval_id: evalRunObject.id,
    })) {
      outputItems.push(item);
    }
    console.log(JSON.stringify(outputItems, null, 2));
    console.log(`\nEval Run Status: ${evalRunResponse.status}`);
    console.log(`Eval Run Report URL: ${evalRunResponse.report_url}`);
  } else {
    console.log("\nEval Run failed");
    console.log(`Status: ${evalRunResponse.status}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
