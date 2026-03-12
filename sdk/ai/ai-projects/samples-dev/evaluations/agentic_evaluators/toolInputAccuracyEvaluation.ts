// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the Tool Input Accuracy evaluator
 * with the AIProjectClient and inline dataset content.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation for Tool Input Accuracy
 * using inline dataset content with various query and response formats.
 *
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName =
  process.env["AZURE_AI_MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Define data source config with custom schema for tool input accuracy
  const dataSourceConfig = {
    type: "custom" as const,
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
      required: ["query", "response", "tool_definitions"],
    },
    include_sample_schema: true,
  };

  // Define testing criteria with Tool Input Accuracy evaluator
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "tool_input_accuracy",
      evaluator_name: "builtin.tool_input_accuracy",
      initialization_parameters: {
        deployment_name: modelDeploymentName,
      },
      data_mapping: {
        query: "{{item.query}}",
        response: "{{item.response}}",
        tool_definitions: "{{item.tool_definitions}}",
      },
    } as any,
  ];

  // Create evaluation
  console.log("Creating evaluation...");
  const evalObject = await openAIClient.evals.create({
    name: "Test Tool Input Accuracy Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

  // Get evaluation by id
  console.log("\nRetrieving evaluation...");
  const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Evaluation retrieved:");
  console.log(JSON.stringify(evalObjectResponse, null, 2));

  // Success example - accurate tool inputs (string query, complex response)
  const successQuery = "Get the weather for Boston";
  const successResponse = [
    {
      createdAt: "2025-03-26T17:27:35Z",
      run_id: "run_ToolInputAccuracy123",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_WeatherBoston456",
          name: "get_weather",
          arguments: { location: "Boston" },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:27:37Z",
      run_id: "run_ToolInputAccuracy123",
      tool_call_id: "call_WeatherBoston456",
      role: "tool",
      content: [{ type: "tool_result", tool_result: { weather: "Sunny, 22°C" } }],
    },
    {
      createdAt: "2025-03-26T17:27:39Z",
      run_id: "run_ToolInputAccuracy123",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "The current weather in Boston is sunny with a temperature of 22°C.",
        },
      ],
    },
  ];
  const successToolDefinitions = [
    {
      name: "get_weather",
      description: "Get weather information for a location",
      parameters: {
        type: "object",
        properties: {
          location: { type: "string", description: "The city name" },
        },
      },
    },
  ];

  // Failure example - inaccurate tool inputs (string query, complex response)
  const failureQuery = "Send an email to john@example.com with the meeting details";
  const failureResponse = [
    {
      createdAt: "2025-03-26T17:28:10Z",
      run_id: "run_ToolInputFail789",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_EmailFail101",
          name: "send_email",
          arguments: { recipient: "john@example.com" },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:28:12Z",
      run_id: "run_ToolInputFail789",
      tool_call_id: "call_EmailFail101",
      role: "tool",
      content: [
        {
          type: "tool_result",
          tool_result: { error: "Missing required fields: subject and body" },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:28:14Z",
      run_id: "run_ToolInputFail789",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "I encountered an error sending the email. Please provide the subject and message content.",
        },
      ],
    },
  ];
  const failureToolDefinitions = [
    {
      name: "send_email",
      description: "Send an email to specified recipient",
      parameters: {
        type: "object",
        properties: {
          recipient: { type: "string", description: "Recipient email address" },
          subject: { type: "string", description: "Email subject line" },
          body: { type: "string", description: "Email message body" },
        },
      },
    },
  ];

  // Complex example - accurate tool inputs (complex query, complex response)
  const complexQuery = [
    {
      createdAt: "2025-03-26T17:29:00Z",
      run_id: "run_ComplexToolInput321",
      role: "user",
      content: [
        {
          type: "text",
          text: "Book a meeting room for Friday from 2 PM to 4 PM for the project review",
        },
      ],
    },
  ];
  const complexResponse = [
    {
      createdAt: "2025-03-26T17:29:05Z",
      run_id: "run_ComplexToolInput321",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_BookRoom654",
          name: "book_meeting_room",
          arguments: {
            date: "2025-03-29",
            start_time: "14:00",
            end_time: "16:00",
            purpose: "project review",
          },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:29:07Z",
      run_id: "run_ComplexToolInput321",
      tool_call_id: "call_BookRoom654",
      role: "tool",
      content: [
        {
          type: "tool_result",
          tool_result: {
            room_id: "Conference Room B",
            confirmation: "Room booked successfully",
          },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:29:09Z",
      run_id: "run_ComplexToolInput321",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "I've successfully booked Conference Room B for Friday, March 29th from 2:00 PM to 4:00 PM for your project review.",
        },
      ],
    },
  ];
  const complexToolDefinitions = [
    {
      name: "book_meeting_room",
      description: "Book a meeting room for specified date and time",
      parameters: {
        type: "object",
        properties: {
          date: { type: "string", description: "Date in YYYY-MM-DD format" },
          start_time: { type: "string", description: "Start time in HH:MM format" },
          end_time: { type: "string", description: "End time in HH:MM format" },
          purpose: { type: "string", description: "Meeting purpose" },
        },
      },
    },
  ];

  // Create evaluation run with inline data
  console.log("\nCreating evaluation run with inline data...");
  let evalRun = await openAIClient.evals.runs.create(evalObject.id, {
    name: "inline_data_run",
    metadata: { team: "eval-exp", scenario: "inline-data-v1" },
    data_source: {
      type: "jsonl" as const,
      source: {
        type: "file_content" as const,
        content: [
          // Success example - accurate tool inputs
          {
            item: {
              query: successQuery,
              response: successResponse,
              tool_definitions: successToolDefinitions,
            },
          },
          // Failure example - inaccurate tool inputs
          {
            item: {
              query: failureQuery,
              response: failureResponse,
              tool_definitions: failureToolDefinitions,
            },
          },
          // Complex example - conversation format with accurate tool inputs
          {
            item: {
              query: complexQuery,
              response: complexResponse,
              tool_definitions: complexToolDefinitions,
            },
          },
        ],
      },
    },
  });
  console.log(`Evaluation run created (id: ${evalRun.id})`);

  // Get evaluation run by id
  console.log("\nRetrieving evaluation run...");
  const evalRunResponse = await openAIClient.evals.runs.retrieve(evalRun.id, {
    eval_id: evalObject.id,
  });
  console.log("Evaluation run retrieved:");
  console.log(JSON.stringify(evalRunResponse, null, 2));

  // Poll for completion
  console.log("\nWaiting for eval run to complete...");
  while (!["completed", "failed"].includes(evalRun.status)) {
    evalRun = await openAIClient.evals.runs.retrieve(evalRun.id, {
      eval_id: evalObject.id,
    });
    console.log(`Current status: ${evalRun.status}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // Display results
  if (evalRun.status === "completed") {
    console.log("\n Evaluation run completed successfully!");
    console.log(`Report URL: ${evalRun.report_url}`);

    console.log("\n----Eval Run Output Items----\n");
    const outputItems = [];
    for await (const item of openAIClient.evals.runs.outputItems.list(evalObject.id, {
      eval_id: evalRun.id,
    })) {
      outputItems.push(item);
    }
    console.log(JSON.stringify(outputItems, null, 2));
    console.log(`\nTotal output items: ${outputItems.length}`);
  } else {
    console.log("\n Evaluation run failed.");
  }

  // Clean up
  console.log("\nCleaning up resources...");
  await openAIClient.evals.delete(evalObject.id);
  console.log("Evaluation deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
