// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the Intent Resolution evaluator with inline dataset content.
 *
 * Given an AIProjectClient, this sample demonstrates how to use the
 * `openai.evals.*` methods to create, get and list evaluation and eval runs
 * for Intent Resolution evaluator using inline dataset content.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to evaluate intent resolution with inline data,
 * including simple string examples and complex conversation examples with tool calls.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["AZURE_AI_MODEL_DEPLOYMENT_NAME"] || "gpt-4o-mini";

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
        query: { anyOf: [{ type: "string" }, { type: "array", items: { type: "object" } }] },
        response: { anyOf: [{ type: "string" }, { type: "array", items: { type: "object" } }] },
        tool_definitions: {
          anyOf: [{ type: "object" }, { type: "array", items: { type: "object" } }],
        },
      },
      required: ["query", "response"],
    },
    include_sample_schema: true,
  };

  // Define testing criteria with Intent Resolution evaluator
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
    } as any,
  ];

  // Create evaluation
  console.log("Creating Evaluation");
  const evalObject = await openAIClient.evals.create({
    name: "Test Intent Resolution Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Retrieve evaluation by ID
  console.log("\nGet Evaluation by Id");
  const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Eval Run Response:");
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
          tool_result: '{ "order": { "id": "123", "status": "shipped", "delivery_date": "2025-03-15" } }',
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
        properties: { order_id: { type: "string", description: "The order ID to get tracking for." } },
      },
    },
  ];

  // Create evaluation run with inline data
  console.log("\nCreating Eval Run with Inline Data");
  const evalRunObject = await openAIClient.evals.runs.create(evalObject.id, {
    name: "inline_data_run",
    metadata: { team: "eval-exp", scenario: "inline-data-v1" },
    data_source: {
      type: "jsonl" as const,
      source: {
        type: "file_content" as const,
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

  // Retrieve evaluation run by ID
  console.log("\nGet Eval Run by Id");
  const evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalRunResponse, null, 2));

  console.log("\n\n----Eval Run Output Items----\n\n");

  // Poll for completion
  while (true) {
    const run = await openAIClient.evals.runs.retrieve(evalRunResponse.id, {
      eval_id: evalObject.id,
    });
    if (run.status === "completed" || run.status === "failed") {
      const outputItems = [];
      for await (const item of openAIClient.evals.runs.outputItems.list(evalObject.id, {
        eval_id: run.id,
      })) {
        outputItems.push(item);
      }
      console.log(JSON.stringify(outputItems, null, 2));
      console.log(`Eval Run Status: ${run.status}`);
      console.log(`Eval Run Report URL: ${run.report_url}`);
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Waiting for eval run to complete...");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
