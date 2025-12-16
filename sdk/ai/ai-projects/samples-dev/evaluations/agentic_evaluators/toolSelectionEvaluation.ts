// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and run an evaluation for Tool Selection
 * using the AIProjectClient with inline dataset content.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation for Tool Selection
 * with inline data, run the evaluation, and retrieve results.
 *
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o-mini";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  console.log("Creating an OpenAI client from the AI Project client");

  // Define data source config with custom schema for tool selection
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
        tool_calls: {
          anyOf: [{ type: "object" }, { type: "array", items: { type: "object" } }],
        },
        tool_definitions: {
          anyOf: [{ type: "object" }, { type: "array", items: { type: "object" } }],
        },
      },
      required: ["query", "response", "tool_definitions"],
    },
    include_sample_schema: true,
  };

  // Define testing criteria for tool selection evaluator
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "tool_selection",
      evaluator_name: "builtin.tool_selection",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        query: "{{item.query}}",
        response: "{{item.response}}",
        tool_calls: "{{item.tool_calls}}",
        tool_definitions: "{{item.tool_definitions}}",
      },
    } as any,
  ];

  // Create evaluation
  console.log("Creating Evaluation");
  const evalObject = await openAIClient.evals.create({
    name: "Test Tool Selection Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log("Evaluation created");

  // Get evaluation by ID
  console.log("Get Evaluation by Id");
  const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalObjectResponse, null, 2));

  // Example: Conversation format with tool calls
  const query = "Can you send me an email with weather information for Seattle?";
  const response = [
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
      content: [{ type: "tool_result", tool_result: { weather: "Rainy, 14�C" } }],
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
            body: "The current weather in Seattle is rainy with a temperature of 14�C.",
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
          text: "I have successfully sent you an email with the weather information for Seattle. The current weather is rainy with a temperature of 14�C.",
        },
      ],
    },
  ];

  const toolDefinitions = [
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
      type: "jsonl" as const,
      source: {
        type: "file_content" as const,
        content: [
          {
            item: {
              query,
              response,
              tool_calls: null,
              tool_definitions: toolDefinitions,
            },
          },
        ],
      },
    } as any,
  });

  console.log("Eval Run created");
  console.log(JSON.stringify(evalRunObject, null, 2));

  // Get evaluation run by ID
  console.log("Get Eval Run by Id");
  let evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalRunResponse, null, 2));

  console.log("\n\n----Eval Run Output Items----\n\n");

  // Poll for completion
  while (!["completed", "failed"].includes(evalRunResponse.status)) {
    evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
      eval_id: evalObject.id,
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Waiting for eval run to complete...");
  }

  if (evalRunResponse.status === "completed") {
    const outputItems = [];
    for await (const item of openAIClient.evals.runs.outputItems.list(evalObject.id, {
      eval_id: evalRunResponse.id,
    })) {
      outputItems.push(item);
    }
    console.log(JSON.stringify(outputItems, null, 2));
    console.log(`Eval Run Status: ${evalRunResponse.status}`);
    console.log(`Eval Run Report URL: ${evalRunResponse.report_url}`);
  } else {
    console.log(`Eval Run Status: ${evalRunResponse.status}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
