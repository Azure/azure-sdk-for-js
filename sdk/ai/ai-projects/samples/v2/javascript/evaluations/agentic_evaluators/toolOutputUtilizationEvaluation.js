// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the AIProjectClient to create and run
 * an evaluation for Tool Output Utilization evaluator using inline dataset content.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation, run it with
 * inline data for tool output utilization, and retrieve the results.
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

  // Configure data source schema for tool output utilization
  console.log("Creating evaluation...");
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

  // Configure testing criteria with tool output utilization evaluator
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "tool_output_utilization",
      evaluator_name: "builtin.tool_output_utilization",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        query: "{{item.query}}",
        response: "{{item.response}}",
        tool_definitions: "{{item.tool_definitions}}",
      },
    },
  ];

  // Create evaluation
  const evalObject = await openAIClient.evals.create({
    name: "Test Tool Output Utilization Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

  // Get evaluation by ID
  console.log("\nRetrieving evaluation...");
  const evalResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Evaluation response:", JSON.stringify(evalResponse, null, 2));

  // Example 1: Good utilization - uses tool output effectively
  const query1 = [
    {
      createdAt: "2025-03-26T17:27:30Z",
      run_id: "run_ToolOutput123",
      role: "user",
      content: [
        { type: "text", text: "What's the weather like in Paris and should I bring an umbrella?" },
      ],
    },
  ];

  const response1 = [
    {
      createdAt: "2025-03-26T17:27:35Z",
      run_id: "run_ToolOutput123",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_WeatherParis456",
          name: "get_weather",
          arguments: { location: "Paris" },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:27:37Z",
      run_id: "run_ToolOutput123",
      tool_call_id: "call_WeatherParis456",
      role: "tool",
      content: [
        {
          type: "tool_result",
          tool_result: {
            weather: "Rainy, 16�C",
            humidity: "85%",
            precipitation: "Heavy rain expected",
          },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:27:39Z",
      run_id: "run_ToolOutput123",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "The weather in Paris is currently rainy with a temperature of 16�C and high humidity at 85%. Heavy rain is expected, so yes, you should definitely bring an umbrella!",
        },
      ],
    },
  ];

  const toolDefinitions1 = [
    {
      name: "get_weather",
      description: "Get detailed weather information for a location",
      parameters: {
        type: "object",
        properties: { location: { type: "string", description: "The city name" } },
      },
    },
  ];

  // Example 2: Poor utilization - ignores tool output
  const query2 = [
    {
      createdAt: "2025-03-26T17:28:00Z",
      run_id: "run_ToolOutputPoor789",
      role: "user",
      content: [{ type: "text", text: "What's the current stock price of AAPL and should I buy?" }],
    },
  ];

  const response2 = [
    {
      createdAt: "2025-03-26T17:28:05Z",
      run_id: "run_ToolOutputPoor789",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_StockPrice101",
          name: "get_stock_price",
          arguments: { symbol: "AAPL" },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:28:07Z",
      run_id: "run_ToolOutputPoor789",
      tool_call_id: "call_StockPrice101",
      role: "tool",
      content: [
        {
          type: "tool_result",
          tool_result: {
            price: "$190.50",
            change: "+2.5%",
            volume: "50M",
            market_cap: "$2.9T",
          },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:28:09Z",
      run_id: "run_ToolOutputPoor789",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "I can't provide investment advice. Please consult with a financial advisor for investment decisions.",
        },
      ],
    },
  ];

  const toolDefinitions2 = [
    {
      name: "get_stock_price",
      description: "Get current stock price and market data",
      parameters: {
        type: "object",
        properties: { symbol: { type: "string", description: "Stock symbol (e.g., AAPL)" } },
      },
    },
  ];

  // Create evaluation run with inline data
  console.log("\nCreating evaluation run with inline data...");
  const evalRunObject = await openAIClient.evals.runs.create(evalObject.id, {
    name: "inline_data_run",
    metadata: { team: "eval-exp", scenario: "inline-data-v1" },
    data_source: {
      type: "jsonl",
      source: {
        type: "file_content",
        content: [
          // Example 1: Good tool output utilization
          {
            item: { query: query1, response: response1, tool_definitions: toolDefinitions1 },
          },
          // Example 2: Poor tool output utilization
          {
            item: { query: query2, response: response2, tool_definitions: toolDefinitions2 },
          },
        ],
      },
    },
  });
  console.log(`Evaluation run created (id: ${evalRunObject.id})`);
  console.log("Evaluation run object:", JSON.stringify(evalRunObject, null, 2));

  // Get evaluation run by ID
  console.log("\nRetrieving evaluation run...");
  let evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Evaluation run response:", JSON.stringify(evalRunResponse, null, 2));

  // Poll for completion
  console.log("\n----Eval Run Output Items----\n");
  while (!["completed", "failed"].includes(evalRunResponse.status)) {
    evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunResponse.id, {
      eval_id: evalObject.id,
    });
    console.log(`Waiting for eval run to complete... current status: ${evalRunResponse.status}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // Display results
  if (evalRunResponse.status === "completed") {
    const outputItems = [];
    for await (const item of openAIClient.evals.runs.outputItems.list(evalObject.id, {
      eval_id: evalRunResponse.id,
    })) {
      outputItems.push(item);
    }
    console.log("Output items:", JSON.stringify(outputItems, null, 2));
    console.log(`Eval Run Status: ${evalRunResponse.status}`);
    console.log(`Eval Run Report URL: ${evalRunResponse.report_url}`);
  } else {
    console.log(`Eval Run Status: ${evalRunResponse.status}`);
  }

  // Clean up
  console.log("\nCleaning up evaluation...");
  await openAIClient.evals.delete(evalObject.id);
  console.log("Evaluation deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
