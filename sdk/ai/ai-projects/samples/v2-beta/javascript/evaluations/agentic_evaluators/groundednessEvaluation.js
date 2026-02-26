// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and run a Groundedness evaluation
 * using the AIProjectClient with inline dataset content.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to use the synchronous
 * `openai.evals.*` methods to create, get and list evaluation and eval runs
 * for Groundedness evaluator using inline dataset content.
 *
 * DESCRIPTION:
 *    Given an AIProjectClient, this sample demonstrates how to use the
 *    `openai.evals.*` methods to create, get and list evaluation and eval runs
 *    for Groundedness evaluator using inline dataset content.
 *
 * USAGE:
 *    Set these environment variables with your own values:
 *    1) AZURE_AI_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *       Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 *    2) MODEL_DEPLOYMENT_NAME - Required. The name of the model deployment to use for evaluation.
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

  // Define data source configuration
  const dataSourceConfig = {
    type: "custom",
    item_schema: {
      type: "object",
      properties: {
        context: { type: "string" },
        query: {
          anyOf: [{ type: "string" }, { type: "array", items: { type: "object" } }],
        },
        response: {
          anyOf: [{ type: "string" }, { type: "array", items: { type: "object" } }],
        },
        tool_definitions: {
          anyOf: [
            { type: "string" },
            { type: "object" },
            { type: "array", items: { type: "object" } },
          ],
        },
      },
      required: ["response"],
    },
    include_sample_schema: true,
  };

  // Define testing criteria
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "groundedness",
      evaluator_name: "builtin.groundedness",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        context: "{{item.context}}",
        query: "{{item.query}}",
        response: "{{item.response}}",
        tool_definitions: "{{item.tool_definitions}}",
      },
    },
  ];

  // Create evaluation
  console.log("Creating Evaluation");
  const evalObject = await openAIClient.evals.create({
    name: "Test Groundedness Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Get evaluation by Id
  console.log("\nGet Evaluation by Id");
  const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Eval Response:");
  console.log(JSON.stringify(evalObjectResponse, null, 2));

  // Success example - response grounded in context
  const successContext =
    "France, a country in Western Europe, is known for its rich history and cultural heritage. " +
    "The city of Paris, located in the northern part of the country, serves as its capital. " +
    "Paris is renowned for its art, fashion, and landmarks such as the Eiffel Tower and the Louvre Museum.";
  const successResponse = "Paris is the capital of France.";

  // Failure example - response not grounded in context
  const failureContext =
    "France, a country in Western Europe, is known for its rich history and cultural heritage. " +
    "The city of Paris, located in the northern part of the country, serves as its capital. " +
    "Paris is renowned for its art, fashion, and landmarks such as the Eiffel Tower and the Louvre Museum.";
  const failureResponse =
    "London is the capital of France and has a population of over 10 million people.";

  // Simple example with query
  const simpleQuery = "What is the population of Tokyo?";
  const simpleContext =
    "Tokyo, the capital of Japan, has a population of approximately 14 million people in the city proper and 38 million in the greater metropolitan area.";
  const simpleResponse =
    "According to the information provided, Tokyo has approximately 14 million people in the city proper and 38 million in the greater metropolitan area.";

  // Complex example - conversation format with grounded response
  const complexContext = "Weather service provides current weather information for any location.";
  const complexResponse = [
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
      createdAt: "2025-03-26T17:27:42Z",
      run_id: "run_zblZyGCNyx6aOYTadmaqM4QN",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "The current weather in Seattle is rainy with a temperature of 14°C.",
        },
      ],
    },
  ];

  const complexToolDefinitions = [
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
  ];

  // Another complex example - conversation format with query but no tool calls
  const queryConversationContext =
    "The company's employee handbook states that vacation days must be requested at least 2 weeks in advance and approved by your direct supervisor.";
  const queryConversationQuery = [
    {
      createdAt: "2025-03-26T17:30:00Z",
      run_id: "run_ABC123DEF456",
      role: "user",
      content: [{ type: "text", text: "What's the policy for requesting vacation days?" }],
    },
  ];
  const queryConversationResponse = [
    {
      createdAt: "2025-03-26T17:30:05Z",
      run_id: "run_ABC123DEF456",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "According to the employee handbook, vacation days must be requested at least 2 weeks in advance and need approval from your direct supervisor.",
        },
      ],
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
          // Success example - grounded response
          {
            item: {
              context: successContext,
              response: successResponse,
              query: null,
              tool_definitions: null,
            },
          },
          // Failure example - ungrounded response
          {
            item: {
              context: failureContext,
              response: failureResponse,
              query: null,
              tool_definitions: null,
            },
          },
          // Simple example with query
          {
            item: {
              context: simpleContext,
              query: simpleQuery,
              response: simpleResponse,
              tool_definitions: null,
            },
          },
          // Complex example - conversation format with grounded response
          {
            item: {
              context: complexContext,
              response: complexResponse,
              query: null,
              tool_definitions: complexToolDefinitions,
            },
          },
          // Another complex example - conversation format with query but no tool calls
          {
            item: {
              context: queryConversationContext,
              query: queryConversationQuery,
              response: queryConversationResponse,
              tool_definitions: null,
            },
          },
        ],
      },
    },
  });

  console.log(`Eval Run created (id: ${evalRunObject.id})`);
  console.log(JSON.stringify(evalRunObject, null, 2));

  // Get evaluation run by Id
  console.log("\nGet Eval Run by Id");
  let evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalRunResponse, null, 2));

  // Poll for completion
  console.log("\n\n----Eval Run Output Items----\n");
  while (!["completed", "failed"].includes(evalRunResponse.status)) {
    evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
      eval_id: evalObject.id,
    });
    console.log("Waiting for eval run to complete...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // Get output items once completed
  const outputItems = [];
  for await (const item of openAIClient.evals.runs.outputItems.list(evalObject.id, {
    eval_id: evalRunObject.id,
  })) {
    outputItems.push(item);
  }
  console.log(JSON.stringify(outputItems, null, 2));
  console.log(`Eval Run Status: ${evalRunResponse.status}`);
  console.log(`Eval Run Report URL: ${evalRunResponse.report_url}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
