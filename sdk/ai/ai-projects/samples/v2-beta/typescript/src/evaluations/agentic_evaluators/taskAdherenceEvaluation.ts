// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the Task Adherence evaluator
 * with inline dataset content using the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation for Task Adherence
 * and run it with inline data containing various query/response scenarios.
 *
 * Set these environment variables before running the sample:
 * 1) AZURE_AI_PROJECT_ENDPOINT - The Azure AI Project endpoint
 * 2) MODEL_DEPLOYMENT_NAME - The name of the model deployment to use for evaluation
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

  // Define the data source configuration for Task Adherence evaluator
  console.log("Creating data source configuration...");
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
      required: ["query", "response"],
    },
    include_sample_schema: true,
  };

  // Define testing criteria with Task Adherence evaluator
  const testingCriteria = [
    {
      type: "azure_ai_evaluator",
      name: "task_adherence",
      evaluator_name: "builtin.task_adherence",
      initialization_parameters: { deployment_name: modelDeploymentName },
      data_mapping: {
        query: "{{item.query}}",
        response: "{{item.response}}",
        tool_definitions: "{{item.tool_definitions}}",
      },
    } as any,
  ];

  // Create evaluation
  console.log("\nCreating evaluation...");
  const evalObject = await openAIClient.evals.create({
    name: "Test Task Adherence Evaluator with inline data",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

  // Get evaluation by ID
  console.log("\nRetrieving evaluation...");
  const retrievedEval = await openAIClient.evals.retrieve(evalObject.id);
  console.log("Evaluation details:");
  console.log(JSON.stringify(retrievedEval, null, 2));

  // Prepare inline data samples
  // Failure example - vague adherence to the task
  const failureQuery =
    "What are the best practices for maintaining a healthy rose garden during the summer?";
  const failureResponse = "Make sure to water your roses regularly and trim them occasionally.";

  // Success example - full adherence to the task
  const successQuery =
    "What are the best practices for maintaining a healthy rose garden during the summer?";
  const successResponse =
    "For optimal summer care of your rose garden, start by watering deeply early in the morning to ensure the roots are well-hydrated without encouraging fungal growth. Apply a 2-3 inch layer of organic mulch around the base of the plants to conserve moisture and regulate soil temperature. Fertilize with a balanced rose fertilizer every 46 weeks to support healthy growth. Prune away any dead or diseased wood to promote good air circulation, and inspect regularly for pests such as aphids or spider mites, treating them promptly with an appropriate organic insecticidal soap. Finally, ensure that your roses receive at least 6 hours of direct sunlight daily for robust flowering.";

  // Complex conversation example with tool calls
  const complexQuery = [
    {
      role: "system",
      content: "You are an expert in literature and can provide book recommendations.",
    },
    {
      createdAt: "2025-03-14T08:00:00Z",
      role: "user",
      content: [
        {
          type: "text",
          text: "I love historical fiction. Can you recommend a good book from that genre?",
        },
      ],
    },
  ];

  const complexResponse = [
    {
      createdAt: "2025-03-14T08:00:05Z",
      role: "assistant",
      content: [{ type: "text", text: "Let me fetch a recommendation for historical fiction." }],
    },
    {
      createdAt: "2025-03-14T08:00:10Z",
      role: "assistant",
      content: [
        {
          type: "tool_call",
          tool_call_id: "tool_call_20250314_001",
          name: "get_book",
          arguments: { genre: "historical fiction" },
        },
      ],
    },
    {
      createdAt: "2025-03-14T08:00:15Z",
      role: "tool",
      tool_call_id: "tool_call_20250314_001",
      content: [
        {
          type: "tool_result",
          tool_result:
            '{ "book": { "title": "The Pillars of the Earth", "author": "Ken Follett", "summary": "A captivating tale set in medieval England that weaves historical events with personal drama." } }',
        },
      ],
    },
    {
      createdAt: "2025-03-14T08:00:20Z",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "Based on our records, I recommend 'The Pillars of the Earth' by Ken Follett. This novel is an excellent example of historical fiction with a rich narrative and well-developed characters. Would you like more details or another suggestion?",
        },
      ],
    },
  ];

  const complexToolDefinitions = [
    {
      name: "get_book",
      description: "Retrieve a book recommendation for a specified genre.",
      parameters: {
        type: "object",
        properties: {
          genre: {
            type: "string",
            description: "The genre for which a book recommendation is requested.",
          },
        },
      },
    },
  ];

  // Create evaluation run with inline data
  console.log("\nCreating evaluation run with inline data...");
  let evalRunObject = await openAIClient.evals.runs.create(evalObject.id, {
    name: "inline_data_run",
    metadata: { team: "eval-exp", scenario: "inline-data-v1" },
    data_source: {
      type: "jsonl" as const,
      source: {
        type: "file_content" as const,
        content: [
          // Failure example - vague adherence
          {
            item: {
              query: failureQuery,
              response: failureResponse,
              tool_definitions: null,
            },
          },
          // Success example - full adherence
          {
            item: {
              query: successQuery,
              response: successResponse,
              tool_definitions: null,
            },
          },
          // Complex conversation example with tool calls
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

  console.log(`Evaluation run created (id: ${evalRunObject.id})`);
  console.log(JSON.stringify(evalRunObject, null, 2));

  // Get evaluation run by ID
  console.log("\nRetrieving evaluation run...");
  evalRunObject = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
    eval_id: evalObject.id,
  });
  console.log("Evaluation run details:");
  console.log(JSON.stringify(evalRunObject, null, 2));

  // Poll for completion
  console.log("\n----Waiting for Eval Run to Complete----\n");
  while (!["completed", "failed"].includes(evalRunObject.status)) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    evalRunObject = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
      eval_id: evalObject.id,
    });
    console.log("Waiting for eval run to complete...");
  }

  // Get output items
  if (evalRunObject.status === "completed") {
    console.log("\n----Eval Run Output Items----\n");
    const outputItems = [];
    for await (const item of openAIClient.evals.runs.outputItems.list(evalObject.id, {
      eval_id: evalRunObject.id,
    })) {
      outputItems.push(item);
    }
    console.log(JSON.stringify(outputItems, null, 2));
    console.log(`\nEval Run Status: ${evalRunObject.status}`);
    console.log(`Eval Run Report URL: ${evalRunObject.report_url}`);
  } else {
    console.log(`\nEval Run Status: ${evalRunObject.status}`);
    console.log("Evaluation run failed.");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
