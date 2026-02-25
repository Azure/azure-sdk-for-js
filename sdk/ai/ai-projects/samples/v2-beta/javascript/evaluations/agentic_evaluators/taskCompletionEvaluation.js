// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and run an evaluation for Task Completion
 * evaluator using inline dataset content with the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation, run it with inline
 * data for Task Completion evaluator, and retrieve the results.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating an OpenAI client from the AI Project client");

  // Define the data source configuration
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

  // Define the testing criteria
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "task_completion",
      evaluator_name: "builtin.task_completion",
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
    name: "Test Task Completion Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id})`);

  // Get evaluation by ID
  console.log("\nGet Evaluation by Id");
  const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Eval Response:");
  console.log(JSON.stringify(evalObjectResponse, null, 2));

  // Success example - task completed successfully
  const successQuery = "Book a flight from New York to Los Angeles for next Friday";
  const successResponse =
    "I've successfully booked your flight from New York (JFK) to Los Angeles (LAX) for Friday, March 29th. Your confirmation number is ABC123. The flight departs at 2:30 PM EST and arrives at 5:45 PM PST.";

  // Failure example - task not completed
  const failureQuery = "Cancel my subscription and refund my payment";
  const failureResponse =
    "I understand you want to cancel your subscription. Here are some helpful articles about our cancellation policy and refund terms that you might find useful.";

  // Complex example - conversation format with task completion
  const complexQuery = [
    {
      createdAt: "2025-03-26T17:27:35Z",
      run_id: "run_TaskCompletion123",
      role: "user",
      content: [
        {
          type: "text",
          text: "I need to transfer $500 from my checking account to my savings account",
        },
      ],
    },
  ];

  const complexResponse = [
    {
      createdAt: "2025-03-26T17:27:40Z",
      run_id: "run_TaskCompletion123",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_TransferMoney456",
          name: "transfer_money",
          arguments: { from_account: "checking", to_account: "savings", amount: 500 },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:27:42Z",
      run_id: "run_TaskCompletion123",
      tool_call_id: "call_TransferMoney456",
      role: "tool",
      content: [
        {
          type: "tool_result",
          tool_result: {
            status: "success",
            transaction_id: "TXN789",
            new_checking_balance: 2500.0,
            new_savings_balance: 8500.0,
          },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:27:45Z",
      run_id: "run_TaskCompletion123",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "I've successfully transferred $500 from your checking account to your savings account. Transaction ID: TXN789. Your new checking balance is $2,500.00 and your savings balance is $8,500.00.",
        },
      ],
    },
  ];

  const complexToolDefinitions = [
    {
      name: "transfer_money",
      description: "Transfers money between user accounts.",
      parameters: {
        type: "object",
        properties: {
          from_account: {
            type: "string",
            description: "The source account type (checking, savings, etc.)",
          },
          to_account: {
            type: "string",
            description: "The destination account type (checking, savings, etc.)",
          },
          amount: { type: "number", description: "The amount to transfer" },
        },
      },
    },
  ];

  // Another complex example - conversation format with query but no tool calls
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
          // Success example - task completed
          {
            item: {
              query: successQuery,
              response: successResponse,
              tool_definitions: null,
            },
          },
          // Failure example - task not completed
          {
            item: {
              query: failureQuery,
              response: failureResponse,
              tool_definitions: null,
            },
          },
          // Complex example - conversation format with tool usage
          {
            item: {
              query: complexQuery,
              response: complexResponse,
              tool_definitions: complexToolDefinitions,
            },
          },
          // Another complex example - conversation format without tool calls
          {
            item: {
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

  // Get evaluation run by ID
  console.log("\nGet Eval Run by Id");
  let evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalRunResponse, null, 2));

  // Poll for completion
  console.log("\n\n----Eval Run Output Items----\n\n");
  while (!["completed", "failed"].includes(evalRunResponse.status)) {
    evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunResponse.id, {
      eval_id: evalObject.id,
    });
    console.log("Waiting for eval run to complete...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  if (evalRunResponse.status === "completed") {
    const outputItems = [];
    for await (const item of openAIClient.evals.runs.outputItems.list(evalObject.id, {
      eval_id: evalRunResponse.id,
    })) {
      outputItems.push(item);
    }
    console.log(JSON.stringify(outputItems, null, 2));
    console.log(`\nEval Run Status: ${evalRunResponse.status}`);
    console.log(`Eval Run Report URL: ${evalRunResponse.report_url}`);
  } else {
    console.log(`\nEval Run Status: ${evalRunResponse.status}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
