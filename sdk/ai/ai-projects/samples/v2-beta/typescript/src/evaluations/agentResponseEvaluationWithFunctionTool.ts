// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and run an evaluation for an Azure AI agent response
 * with function tool usage using the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an agent with function tools,
 * generate responses with tool calls, create an evaluation, run the evaluation
 * with agent response target, and clean up resources.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import type OpenAI from "openai";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["AZURE_AI_AGENT_NAME"] || "my-agent-function-tool";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

// Define a function tool for the model to use
const funcTool = {
  type: "function" as const,
  name: "get_horoscope",
  description: "Get today's horoscope for an astrological sign.",
  parameters: {
    type: "object",
    properties: {
      sign: {
        type: "string",
        description: "An astrological sign like Taurus or Aquarius",
      },
    },
    required: ["sign"],
    additionalProperties: false,
  },
  strict: true,
};

function getHoroscope(sign: string): string {
  return `${sign}: Next Tuesday you will befriend a baby otter.`;
}

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  // [START agent_response_evaluation_with_function_tool]
  // Create agent with function tools
  console.log("Creating agent...");
  const agent = await project.agents.createVersion(agentName, {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant that can use function tools.",
    tools: [funcTool],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Prompt the model with tools defined
  console.log("\nGenerating response with agent...");
  let response = await openAIClient.responses.create(
    {
      input: "What is my horoscope? I am an Aquarius.",
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Response output: ${response.output_text}`);

  const inputList: OpenAI.Responses.ResponseInput = [];
  // Process function calls
  for (const item of response.output) {
    if (item.type === "function_call") {
      if (item.name === "get_horoscope") {
        // Execute the function logic for get_horoscope
        const args = JSON.parse(item.arguments);
        const horoscope = getHoroscope(args.sign);

        // Provide function call results to the model
        inputList.push({
          type: "function_call_output",
          call_id: item.call_id,
          output: JSON.stringify({ horoscope }),
        });
      }
    }
  }

  console.log("Final input:");
  console.log(JSON.stringify(inputList, null, 2));

  // Get final response with function call results
  response = await openAIClient.responses.create(
    {
      input: inputList,
      previous_response_id: response.id,
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Response output: ${response.output_text} (id: ${response.id})`);

  // Create evaluation
  console.log("\nCreating evaluation...");

  const evalObject = await openAIClient.evals.create({
    name: "Agent Response Evaluation",
    data_source_config: {
      type: "azure_ai_source" as const,
      scenario: "responses",
    } as any,
    testing_criteria: [
      {
        type: "azure_ai_evaluator",
        name: "tool_call_accuracy",
        evaluator_name: "builtin.tool_call_accuracy",
        initialization_parameters: { deployment_name: deploymentName },
      } as any,
    ],
  });
  console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

  // Create evaluation run with agent response target
  console.log("\nCreating evaluation run...");

  let responseEvalRun = await openAIClient.evals.runs.create(evalObject.id, {
    name: `Evaluation Run for Agent ${agent.name}`,
    data_source: {
      type: "azure_ai_responses" as const,
      item_generation_params: {
        type: "response_retrieval" as const,
        data_mapping: { response_id: "{{item.resp_id}}" },
        source: {
          type: "file_content" as const,
          content: [{ item: { resp_id: response.id } }],
        },
      },
    } as any,
  });
  console.log(`Evaluation run created (id: ${responseEvalRun.id})`);
  // [END agent_response_evaluation_with_function_tool]

  // Poll for completion
  while (!["completed", "failed"].includes(responseEvalRun.status)) {
    responseEvalRun = await openAIClient.evals.runs.retrieve(responseEvalRun.id, {
      eval_id: evalObject.id,
    });
    console.log(`Waiting for eval run to complete... current status: ${responseEvalRun.status}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  if (responseEvalRun.status === "completed") {
    console.log("\n Evaluation run completed successfully!");
    console.log(`Result Counts: ${JSON.stringify(responseEvalRun.result_counts)}`);

    const outputItems = [];
    for await (const item of openAIClient.evals.runs.outputItems.list(responseEvalRun.id, {
      eval_id: evalObject.id,
    })) {
      outputItems.push(item);
    }
    console.log(`\nOUTPUT ITEMS (Total: ${outputItems.length})`);
    console.log(`Eval Run Report URL: ${responseEvalRun.report_url}`);
    console.log("-".repeat(60));
    console.log(JSON.stringify(outputItems, null, 2));
    console.log("-".repeat(60));
  } else {
    console.log(`Eval Run Report URL: ${responseEvalRun.report_url}`);
    console.log("\n Evaluation run failed.");
  }

  // Clean up
  console.log("\nCleaning up resources...");
  await openAIClient.evals.delete(evalObject.id);
  console.log("Evaluation deleted");

  await project.agents.delete(agent.name);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
