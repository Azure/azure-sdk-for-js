// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and run an evaluation for an Azure AI model
 * using the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation with a custom data source
 * configuration, run the evaluation against an Azure AI model with inline test data,
 * monitor its progress, and retrieve the results.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) AZURE_AI_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the Overview
 *    page of your Microsoft Foundry portal.
 * 2) MODEL_DEPLOYMENT_NAME - Required. The deployment name of the AI model, as found under the "Name" column in
 *    the "Models + endpoints" tab in your Microsoft Foundry project.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  try {
    // Define data source configuration with custom schema
    const dataSourceConfig = {
      type: "custom",
      item_schema: {
        type: "object",
        properties: {
          query: { type: "string" },
        },
        required: ["query"],
      },
      include_sample_schema: true,
    };

    // Define testing criteria with built-in evaluator
    const testingCriteria = [
      {
        type: "azure_ai_evaluator",
        name: "violence_detection",
        evaluator_name: "builtin.violence",
        data_mapping: {
          query: "{{item.query}}",
          response: "{{item.response}}",
        },
      },
    ];

    // Create evaluation
    console.log("Creating evaluation");
    const evalObject = await openAIClient.evals.create({
      name: "Agent Evaluation",
      data_source_config: dataSourceConfig,
      testing_criteria: testingCriteria,
    });
    console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

    // Define data source with inline test data targeting Azure AI model
    const dataSource = {
      type: "azure_ai_target_completions",
      source: {
        type: "file_content",
        content: [
          { item: { query: "What is the capital of France?" } },
          { item: { query: "How do I reverse a string in Python?" } },
        ],
      },
      input_messages: {
        type: "template",
        template: [
          {
            type: "message",
            role: "user",
            content: {
              type: "input_text",
              text: "{{item.query}}",
            },
          },
        ],
      },
      target: {
        type: "azure_ai_model",
        model: modelDeploymentName,
        sampling_params: {
          top_p: 1.0,
          max_completion_tokens: 2048,
        },
      },
    };

    // Create evaluation run
    console.log("\nCreating evaluation run");
    let agentEvalRun = await openAIClient.evals.runs.create(evalObject.id, {
      name: `Evaluation Run for Model ${modelDeploymentName}`,
      data_source: dataSource,
    });
    console.log(`Evaluation run created (id: ${agentEvalRun.id})`);

    // Poll for completion
    while (!["completed", "failed"].includes(agentEvalRun.status)) {
      agentEvalRun = await openAIClient.evals.runs.retrieve(agentEvalRun.id, {
        eval_id: evalObject.id,
      });
      console.log(`Waiting for eval run to complete... current status: ${agentEvalRun.status}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (agentEvalRun.status === "completed") {
      console.log("\n✓ Evaluation run completed successfully!");
      console.log(`Result Counts: ${JSON.stringify(agentEvalRun.result_counts)}`);

      // Retrieve output items
      const outputItems = [];
      for await (const item of openAIClient.evals.runs.outputItems.list(agentEvalRun.id, {
        eval_id: evalObject.id,
      })) {
        outputItems.push(item);
      }

      console.log(`\nOUTPUT ITEMS (Total: ${outputItems.length})`);
      console.log("-".repeat(60));
      console.log(JSON.stringify(outputItems, null, 2));
      console.log("-".repeat(60));
    } else {
      console.log("\n✗ Evaluation run failed.");
    }

    // Clean up
    console.log("\nDeleting evaluation");
    await openAIClient.evals.delete(evalObject.id);
    console.log("Evaluation deleted");
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
