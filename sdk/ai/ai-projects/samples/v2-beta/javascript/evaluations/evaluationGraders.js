// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use various OpenAI graders (label_model, text_similarity,
 * string_check, and score_model) with the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation using OpenAI graders,
 * upload a dataset file, run the evaluation, monitor its progress, and clean up resources.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) AZURE_AI_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *    Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 * 2) MODEL_DEPLOYMENT_NAME - Required. The name of the model deployment to use for evaluation.
 * 3) DATASET_VERSION - Optional. The version of the Dataset to create and use in this sample.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const path = require("path");
const { tmpdir } = require("os");
require("dotenv/config");
const fs = require("fs");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const datasetVersion = process.env["DATASET_VERSION"] || "1";

// Sample evaluation data with query, response, context, and ground_truth fields
const evalData = [
  {
    query: "What is the capital of France?",
    response: "Paris is the capital of France.",
    context: "France is in Europe",
    ground_truth: "Paris",
  },
  {
    query: "Who wrote Romeo and Juliet?",
    response: "William Shakespeare wrote Romeo and Juliet.",
    context: "Shakespeare was an English playwright",
    ground_truth: "William Shakespeare",
  },
];

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  try {
    // Determine data file path
    // Create a temporary file
    const dataFilePath = path.join(tmpdir(), `eval-data-${Date.now()}.jsonl`);
    const jsonlContent = evalData.map((item) => JSON.stringify(item)).join("\n");
    fs.writeFileSync(dataFilePath, jsonlContent);

    // Upload a single file and create a new Dataset to reference the file
    console.log("Upload a single file and create a new Dataset to reference the file.");
    const dataset = await project.datasets.uploadFile("eval-data", datasetVersion, dataFilePath);
    console.log(JSON.stringify(dataset, null, 2));

    // Define data source configuration with custom schema
    const dataSourceConfig = {
      type: "custom",
      item_schema: {
        type: "object",
        properties: {
          query: { type: "string" },
          response: { type: "string" },
          context: { type: "string" },
          ground_truth: { type: "string" },
        },
        required: [],
      },
      include_sample_schema: true,
    };

    // Define testing criteria with various OpenAI graders
    const testingCriteria = [
      // Label model grader - classifies sentiment
      {
        type: "label_model",
        model: modelDeploymentName,
        input: [
          {
            role: "developer",
            content:
              "Classify the sentiment of the following statement as one of 'positive', 'neutral', or 'negative'",
          },
          { role: "user", content: "Statement: {{item.query}}" },
        ],
        passing_labels: ["positive", "neutral"],
        labels: ["positive", "neutral", "negative"],
        name: "label_grader",
      },
      // Text similarity grader - uses BLEU metric
      {
        type: "text_similarity",
        input: "{{item.ground_truth}}",
        evaluation_metric: "bleu",
        reference: "{{item.response}}",
        pass_threshold: 1,
        name: "text_check_grader",
      },
      // String check grader - exact string comparison
      {
        type: "string_check",
        input: "{{item.ground_truth}}",
        reference: "{{item.ground_truth}}",
        operation: "eq",
        name: "string_check_grader",
      },
      // Score model grader - evaluates similarity with chain of thought
      {
        type: "score_model",
        name: "score",
        model: modelDeploymentName,
        input: [
          {
            role: "system",
            content:
              'Evaluate the degree of similarity between the given output and the ground truth on a scale from 1 to 5, using a chain of thought to ensure step-by-step reasoning before reaching the conclusion.\n\nConsider the following criteria:\n\n- 5: Highly similar - The output and ground truth are nearly identical, with only minor, insignificant differences.\n- 4: Somewhat similar - The output is largely similar to the ground truth but has few noticeable differences.\n- 3: Moderately similar - There are some evident differences, but the core essence is captured in the output.\n- 2: Slightly similar - The output only captures a few elements of the ground truth and contains several differences.\n- 1: Not similar - The output is significantly different from the ground truth, with few or no matching elements.\n\n# Steps\n\n1. Identify and list the key elements present in both the output and the ground truth.\n2. Compare these key elements to evaluate their similarities and differences, considering both content and structure.\n3. Analyze the semantic meaning conveyed by both the output and the ground truth, noting any significant deviations.\n4. Based on these comparisons, categorize the level of similarity according to the defined criteria above.\n5. Write out the reasoning for why a particular score is chosen, to ensure transparency and correctness.\n6. Assign a similarity score based on the defined criteria above.\n\n# Output Format\n\nProvide the final similarity score as an integer (1, 2, 3, 4, or 5).\n\n# Examples\n\n**Example 1:**\n\n- Output: "The cat sat on the mat."\n- Ground Truth: "The feline is sitting on the rug."\n- Reasoning: Both sentences describe a cat sitting on a surface, but they use different wording. The structure is slightly different, but the core meaning is preserved. There are noticeable differences, but the overall meaning is conveyed well.\n- Similarity Score: 3\n\n**Example 2:**\n\n- Output: "The quick brown fox jumps over the lazy dog."\n- Ground Truth: "A fast brown animal leaps over a sleeping canine."\n- Reasoning: The meaning of both sentences is very similar, with only minor differences in wording. The structure and intent are well preserved.\n- Similarity Score: 4\n\n# Notes\n\n- Always aim to provide a fair and balanced assessment.\n- Consider both syntactic and semantic differences in your evaluation.\n- Consistency in scoring similar pairs is crucial for accurate measurement.',
          },
          {
            role: "user",
            content: "Output: {{item.response}}\nGround Truth: {{item.ground_truth}}",
          },
        ],
        image_tag: "2025-05-08",
        pass_threshold: 0.5,
      },
    ];

    // Create evaluation
    console.log("\nCreating evaluation");
    const evalObject = await openAIClient.evals.create({
      name: "OpenAI graders test",
      data_source_config: dataSourceConfig,
      testing_criteria: testingCriteria,
    });
    console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

    // Get evaluation by ID
    console.log("\nGet evaluation by Id");
    const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
    console.log("Evaluation Response:");
    console.log(JSON.stringify(evalObjectResponse, null, 2));

    // Create evaluation run
    console.log("\nCreating Eval Run");
    const evalRunObject = await openAIClient.evals.runs.create(evalObject.id, {
      name: "dataset",
      metadata: { team: "eval-exp", scenario: "notifications-v1" },
      data_source: {
        type: "jsonl",
        source: {
          type: "file_id",
          id: dataset.id || "",
        },
      },
    });

    console.log(`Eval Run created (id: ${evalRunObject.id}, name: ${evalRunObject.name})`);
    console.log(JSON.stringify(evalRunObject, null, 2));

    // Get evaluation run by ID
    console.log("\nGet Eval Run by Id");
    let evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
      eval_id: evalObject.id,
    });
    console.log("Eval Run Response:");
    console.log(JSON.stringify(evalRunResponse, null, 2));

    // Poll for completion
    while (!["completed", "failed"].includes(evalRunResponse.status)) {
      evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunResponse.id, {
        eval_id: evalObject.id,
      });
      console.log("Waiting for eval run to complete...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (evalRunResponse.status === "completed" || evalRunResponse.status === "failed") {
      const outputItems = [];
      for await (const item of openAIClient.evals.runs.outputItems.list(evalRunResponse.id, {
        eval_id: evalObject.id,
      })) {
        outputItems.push(item);
      }
      console.log("\nEvaluation output items:");
      console.log(JSON.stringify(outputItems, null, 2));
      console.log(`Eval Run Report URL: ${evalRunResponse.report_url}`);
    }

    // Clean up
    console.log("\nDeleting dataset");
    await project.datasets.delete(dataset.name, dataset.version);
    console.log("Dataset deleted");

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
