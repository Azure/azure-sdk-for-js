// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the synchronous openai.evals.* methods
 * to create, get and list evaluation and eval runs for Tool Success evaluator
 * using inline dataset content.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation for the Tool Call Success
 * evaluator with inline data, run the evaluation, and retrieve results.
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
  const openAIClient = project.getOpenAIClient();

  console.log("Creating an OpenAI client from the AI Project client");

  // Define data source configuration for tool call success evaluation
  const dataSourceConfig = {
    type: "custom" as const,
    item_schema: {
      type: "object",
      properties: {
        tool_definitions: {
          anyOf: [{ type: "object" }, { type: "array", items: { type: "object" } }],
        },
        response: {
          anyOf: [{ type: "string" }, { type: "array", items: { type: "object" } }],
        },
      },
      required: ["response"],
    },
    include_sample_schema: true,
  };

  // Define testing criteria for tool call success evaluator
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "tool_call_success",
      evaluator_name: "builtin.tool_call_success",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        tool_definitions: "{{item.tool_definitions}}",
        response: "{{item.response}}",
      },
    } as any,
  ];

  // Create evaluation
  console.log("Creating Evaluation");
  const evalObject = await openAIClient.evals.create({
    name: "Test Tool Call Success Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log("Evaluation created");

  // Get evaluation by ID
  console.log("Get Evaluation by Id");
  const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Eval Run Response:");
  console.log(JSON.stringify(evalObjectResponse, null, 2));

  // Example 1: Successful tool execution
  const response1 = [
    {
      createdAt: "2025-03-26T17:27:35Z",
      run_id: "run_ToolSuccess123",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_FileUpload456",
          name: "upload_file",
          arguments: {
            file_path: "/documents/report.pdf",
            destination: "cloud_storage",
          },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:27:37Z",
      run_id: "run_ToolSuccess123",
      tool_call_id: "call_FileUpload456",
      role: "tool",
      content: [
        {
          type: "tool_result",
          tool_result: {
            status: "success",
            file_id: "file_12345",
            upload_url: "https://storage.example.com/file_12345",
            message: "File uploaded successfully",
          },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:27:39Z",
      run_id: "run_ToolSuccess123",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "I've successfully uploaded your report.pdf to cloud storage. The file ID is file_12345 and it's available at the provided URL.",
        },
      ],
    },
  ];

  const toolDefinitions1 = [
    {
      name: "upload_file",
      description: "Upload a file to cloud storage",
      parameters: {
        type: "object",
        properties: {
          file_path: {
            type: "string",
            description: "Path to the file to upload",
          },
          destination: {
            type: "string",
            description: "Destination storage location",
          },
        },
      },
    },
  ];

  // Example 2: Failed tool execution
  const response2 = [
    {
      createdAt: "2025-03-26T17:28:10Z",
      run_id: "run_ToolFail789",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "call_DatabaseQuery101",
          name: "query_database",
          arguments: {
            table: "users",
            query: "SELECT * FROM users WHERE age > 25",
          },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:28:12Z",
      run_id: "run_ToolFail789",
      tool_call_id: "call_DatabaseQuery101",
      role: "tool",
      content: [
        {
          type: "tool_result",
          tool_result: {
            status: "error",
            error_code: "DB_CONNECTION_FAILED",
            message: "Unable to connect to database. Connection timeout after 30 seconds.",
          },
        },
      ],
    },
    {
      createdAt: "2025-03-26T17:28:14Z",
      run_id: "run_ToolFail789",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "I encountered an error while trying to query the database. The connection timed out after 30 seconds. Please try again later or contact your database administrator.",
        },
      ],
    },
  ];

  const toolDefinitions2 = [
    {
      name: "query_database",
      description: "Execute SQL queries on the database",
      parameters: {
        type: "object",
        properties: {
          table: {
            type: "string",
            description: "Database table name",
          },
          query: {
            type: "string",
            description: "SQL query to execute",
          },
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
          // Example 1: Successful tool execution
          { item: { tool_definitions: toolDefinitions1, response: response1 } },
          // Example 2: Failed tool execution
          { item: { tool_definitions: toolDefinitions2, response: response2 } },
        ],
      },
    },
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

  const outputItems = [];
  for await (const item of openAIClient.evals.runs.outputItems.list(evalObject.id, {
    eval_id: evalRunResponse.id,
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
