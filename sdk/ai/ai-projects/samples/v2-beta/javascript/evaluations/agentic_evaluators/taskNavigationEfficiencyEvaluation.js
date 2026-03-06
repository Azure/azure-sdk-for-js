// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the Task Navigation Efficiency evaluator
 * with inline dataset content using the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation for Task Navigation
 * Efficiency evaluator, run it with inline data, and retrieve results.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating an OpenAI client from the AI Project client");

  // Define data source configuration
  const dataSourceConfig = {
    type: "custom",
    item_schema: {
      type: "object",
      properties: {
        response: { type: "array" },
        ground_truth: { type: "array" },
      },
      required: ["response", "ground_truth"],
    },
    include_sample_schema: true,
  };

  // Define testing criteria with Task Navigation Efficiency evaluator
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "task_navigation_efficiency",
      evaluator_name: "builtin.task_navigation_efficiency",
      initialization_parameters: {
        matching_mode: "exact_match", // Can be "exact_match", "in_order_match", or "any_order_match"
      },
      data_mapping: {
        response: "{{item.response}}",
        ground_truth: "{{item.ground_truth}}",
      },
    },
  ];

  // Create evaluation
  console.log("Creating Evaluation");
  const evalObject = await openAIClient.evals.create({
    name: "Test Task Navigation Efficiency Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Get evaluation by ID
  console.log("\nGet Evaluation by Id");
  const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalObjectResponse, null, 2));

  // Simple inline data with response and ground truth without parameters
  const simpleResponse = [
    {
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_1",
          name: "identify_tools_to_call",
          arguments: {},
        },
      ],
    },
    {
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_2",
          name: "call_tool_A",
          arguments: {},
        },
      ],
    },
    {
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_3",
          name: "call_tool_B",
          arguments: {},
        },
      ],
    },
    {
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_4",
          name: "response_synthesis",
          arguments: {},
        },
      ],
    },
  ];

  const simpleGroundTruth = [
    "identify_tools_to_call",
    "call_tool_A",
    "call_tool_B",
    "response_synthesis",
  ];

  // Another example with parameters in tool calls
  const response = [
    {
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_1",
          name: "search",
          arguments: { query: "weather", location: "NYC" },
        },
      ],
    },
    {
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_2",
          name: "format_result",
          arguments: { format: "json" },
        },
      ],
    },
  ];

  const groundTruth = [
    ["search", "format_result"],
    {
      search: { query: "weather", location: "NYC" },
      format_result: { format: "json" },
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
          {
            item: {
              response: simpleResponse,
              ground_truth: simpleGroundTruth,
            },
          },
          {
            item: {
              response: response,
              ground_truth: groundTruth,
            },
          },
        ],
      },
    },
  });
  console.log(`Eval Run created (id: ${evalRunObject.id})`);
  console.log(JSON.stringify(evalRunObject, null, 2));

  // Get evaluation run by ID
  console.log("\nGet Eval Run by Id");
  let evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalRunResponse, null, 2));

  // Poll for completion and retrieve output items
  console.log("\n\n----Eval Run Output Items----\n\n");
  while (!["completed", "failed"].includes(evalRunResponse.status)) {
    evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
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
  console.log(`Eval Run Status: ${evalRunResponse.status}`);
  console.log(`Eval Run Report URL: ${evalRunResponse.report_url}`);

  // Clean up
  console.log("\nCleaning up resources...");
  await openAIClient.evals.delete(evalObject.id);
  console.log("Evaluation deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
