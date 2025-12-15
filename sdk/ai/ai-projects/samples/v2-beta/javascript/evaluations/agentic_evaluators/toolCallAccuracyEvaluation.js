// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the synchronous openai.evals.* methods
 * to create, get and list evaluation and eval runs for Tool Call Accuracy
 * evaluator using inline dataset content.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation for Tool Call Accuracy
 * with inline data, run the evaluation, and retrieve results.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) AZURE_AI_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *    Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
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
  const openAIClient = await project.getOpenAIClient();

  console.log("Creating an OpenAI client from the AI Project client");

  // Define the data source configuration
  const dataSourceConfig = {
    type: "custom",
    item_schema: {
      type: "object",
      properties: {
        query: { anyOf: [{ type: "string" }, { type: "array", items: { type: "object" } }] },
        tool_definitions: {
          anyOf: [{ type: "object" }, { type: "array", items: { type: "object" } }],
        },
        tool_calls: { anyOf: [{ type: "object" }, { type: "array", items: { type: "object" } }] },
        response: { anyOf: [{ type: "string" }, { type: "array", items: { type: "object" } }] },
      },
      required: ["query", "tool_definitions"],
    },
    include_sample_schema: true,
  };

  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "tool_call_accuracy",
      evaluator_name: "builtin.tool_call_accuracy",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        query: "{{item.query}}",
        tool_definitions: "{{item.tool_definitions}}",
        tool_calls: "{{item.tool_calls}}",
        response: "{{item.response}}",
      },
    },
  ];

  // Create evaluation
  console.log("Creating Evaluation");
  const evalObject = await openAIClient.evals.create({
    name: "Test Tool Call Accuracy Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Retrieve evaluation by ID
  console.log("Get Evaluation by Id");
  const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalObjectResponse, null, 2));

  // Example 1: Simple tool call evaluation
  const query1 = "What's the weather like in New York?";
  const toolDefinitions1 = [
    {
      type: "function",
      name: "get_weather",
      description: "Get weather information for a location",
      parameters: {
        type: "object",
        properties: { location: { type: "string", description: "The city name" } },
      },
    },
  ];

  const toolCalls1 = [
    {
      type: "tool_call",
      tool_call_id: "call_1",
      name: "get_weather",
      arguments: { location: "New York" },
    },
  ];

  // Example 2: Multiple tool calls
  const query2 = "Search for customer orders and send an email update";
  const toolDefinitions2 = [
    {
      type: "function",
      id: "search_database_tool",
      name: "search_database",
      description: "Search database for information",
      parameters: {
        type: "object",
        properties: { query: { type: "string" }, table: { type: "string" } },
      },
    },
    {
      type: "function",
      id: "send_email_tool",
      name: "send_email",
      description: "Send an email",
      parameters: {
        type: "object",
        properties: { to: { type: "string" }, subject: { type: "string" } },
      },
    },
  ];
  const toolCalls2 = [
    {
      type: "tool_call",
      tool_call_id: "call_1",
      name: "search_database",
      arguments: { query: "customer orders", table: "orders" },
    },
    {
      type: "tool_call",
      tool_call_id: "call_2",
      name: "send_email",
      arguments: { to: "customer@example.com", subject: "Order Update" },
    },
  ];

  // Example 3: Conversation format
  const query3 = "Can you send me an email with weather information for Seattle?";
  const response3 = [
    {
      createdAt: "2025-03-26T17:27:35Z",
      run_id: "run_zblZyGCNyx6aOYTadmaqM4QN",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_CUdbkBfvVBla2YP3p24uhElJ",
          name: "fetch_weather",
          arguments: { location: "Seattle" },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:27:37Z",
      run_id: "run_zblZyGCNyx6aOYTadmaqM4QN",
      tool_call_id: "call_CUdbkBfvVBla2YP3p24uhElJ",
      role: "tool",
      content: [{ type: "tool_result", tool_result: { weather: "Rainy, 14°C" } }],
    },
    {
      createdAt: "2025-03-26T17:27:38Z",
      run_id: "run_zblZyGCNyx6aOYTadmaqM4QN",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_iq9RuPxqzykebvACgX8pqRW2",
          name: "send_email",
          arguments: {
            recipient: "your_email@example.com",
            subject: "Weather Information for Seattle",
            body: "The current weather in Seattle is rainy with a temperature of 14°C.",
          },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:27:41Z",
      run_id: "run_zblZyGCNyx6aOYTadmaqM4QN",
      tool_call_id: "call_iq9RuPxqzykebvACgX8pqRW2",
      role: "tool",
      content: [
        {
          type: "tool_result",
          tool_result: { message: "Email successfully sent to your_email@example.com." },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:27:42Z",
      run_id: "run_zblZyGCNyx6aOYTadmaqM4QN",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "I have successfully sent you an email with the weather information for Seattle. The current weather is rainy with a temperature of 14°C.",
        },
      ],
    },
  ];

  const toolDefinitions3 = [
    {
      name: "fetch_weather",
      description: "Fetches the weather information for the specified location.",
      parameters: {
        type: "object",
        properties: {
          location: { type: "string", description: "The location to fetch weather for." },
        },
      },
    },
    {
      name: "send_email",
      description: "Sends an email with the specified subject and body to the recipient.",
      parameters: {
        type: "object",
        properties: {
          recipient: { type: "string", description: "Email address of the recipient." },
          subject: { type: "string", description: "Subject of the email." },
          body: { type: "string", description: "Body content of the email." },
        },
      },
    },
  ];

  // Create evaluation run with inline data
  console.log("Creating Eval Run with Inline Data");
  const evalRunObject = await openAIClient.evals.runs.create(evalObject.id, {
    name: "inline_data_run",
    metadata: { team: "eval-exp", scenario: "inline-data-v1" },
    data_source: {
      type: "jsonl",
      source: {
        type: "file_content",
        content: [
          // Example 1: Simple tool call evaluation
          {
            item: {
              query: query1,
              tool_definitions: toolDefinitions1,
              tool_calls: toolCalls1,
              response: null,
            },
          },
          // Example 2: Multiple tool calls
          {
            item: {
              query: query2,
              tool_definitions: toolDefinitions2,
              tool_calls: toolCalls2,
              response: null,
            },
          },
          // Example 3: Conversation format with object types
          {
            item: {
              query: query3,
              tool_definitions: toolDefinitions3,
              response: response3,
              tool_calls: null,
            },
          },
        ],
      },
    },
  });

  console.log(`Eval Run created (id: ${evalRunObject.id})`);
  console.log(JSON.stringify(evalRunObject, null, 2));

  console.log("Get Eval Run by Id");
  let evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalRunResponse, null, 2));

  // Poll for completion
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
