// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to generate cluster insights from evaluation runs
 * using the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation with sentiment analysis,
 * run it on a dataset, and generate cluster insights from the results.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) AZURE_AI_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *    Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 * 2) MODEL_DEPLOYMENT_NAME - The deployment name of the AI model, as found under the "Name" column in
 *    the "Models + endpoints" tab in your Microsoft Foundry project.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import { writeFileSync, unlinkSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  // Create an evaluation
  const dataSourceConfig = {
    type: "custom" as const,
    item_schema: {
      type: "object",
      properties: {
        query: { type: "string" },
      },
      required: ["query"],
    },
  };

  const testingCriteria = [
    {
      type: "label_model" as const,
      name: "sentiment_analysis",
      model: modelDeploymentName,
      input: [
        {
          role: "developer",
          content:
            "Classify the sentiment of the following statement as one of 'positive', 'neutral', or 'negative'",
        },
        {
          role: "user",
          content: "Statement: {{item.query}}",
        },
      ],
      passing_labels: ["positive", "neutral"],
      labels: ["positive", "neutral", "negative"],
    },
  ];

  console.log("Creating evaluation...");
  const evalObject = await openAIClient.evals.create({
    name: "Sentiment Evaluation",
    data_source_config: dataSourceConfig,
    testing_criteria: testingCriteria,
  });
  console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

  // Create and upload JSONL data as a dataset
  const evalData = [
    { item: { query: "I love programming!" } },
    { item: { query: "I hate bugs." } },
    { item: { query: "The weather is nice today." } },
    { item: { query: "This is the worst movie ever." } },
    { item: { query: "Python is an amazing language." } },
  ];

  // Write data to a temporary JSONL file
  const tempFilePath = join(tmpdir(), `sentiment-eval-data-${Date.now()}.jsonl`);
  const jsonlContent = evalData.map((item) => JSON.stringify(item)).join("\n");
  writeFileSync(tempFilePath, jsonlContent);

  console.log("\nUploading dataset...");
  const dataset = await project.datasets.uploadFile(
    "sentiment-eval-data",
    Date.now().toString(),
    tempFilePath,
  );
  unlinkSync(tempFilePath);
  console.log(
    `Dataset created (id: ${dataset.id}, name: ${dataset.name}, version: ${dataset.version})`,
  );

  if (!dataset.id) {
    throw new Error("Dataset ID is undefined");
  }

  // Create an eval run using the uploaded dataset
  console.log("\nCreating evaluation run...");
  let evalRun = await openAIClient.evals.runs.create(evalObject.id, {
    name: "Eval Run",
    data_source: {
      type: "jsonl" as const,
      source: {
        type: "file_id" as const,
        id: dataset.id,
      },
    },
  });
  console.log(`Evaluation run created (id: ${evalRun.id})`);

  // Poll for eval run completion
  while (!["completed", "failed"].includes(evalRun.status)) {
    console.log("Waiting for eval run to complete...");
    evalRun = await openAIClient.evals.runs.retrieve(evalRun.id, {
      eval_id: evalObject.id,
    });
    console.log(`Evaluation run status: ${evalRun.status}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // If the eval run completed successfully, generate cluster insights
  if (evalRun.status === "completed") {
    console.log("\n Evaluation run completed successfully!");
    console.log(`Evaluation run result counts: ${JSON.stringify(evalRun.result_counts)}`);

    console.log("\nGenerating cluster insights...");
    let clusterInsight = await project.insights.generate({
      displayName: "Cluster analysis",
      request: {
        type: "EvaluationRunClusterInsight",
        evalId: evalObject.id,
        runIds: [evalRun.id],
        modelConfiguration: {
          modelDeploymentName: modelDeploymentName,
        },
      },
    });
    console.log(`Started insight generation (id: ${clusterInsight.id})`);

    // Poll for insight completion
    while (!["Succeeded", "Failed"].includes(clusterInsight.state ?? "")) {
      console.log("Waiting for insight to be generated...");
      clusterInsight = await project.insights.get(clusterInsight.id ?? "");
      console.log(`Insight status: ${clusterInsight.state}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (clusterInsight.state === "Succeeded") {
      console.log("\n Cluster insights generated successfully!");
      console.log(JSON.stringify(clusterInsight, null, 2));
    } else {
      console.log("\n Cluster insight generation failed.");
    }
  } else {
    console.log("\n Evaluation run failed. Cannot generate cluster insights.");
  }

  // Clean up
  console.log("\nCleaning up resources...");
  await project.datasets.delete(dataset.name, dataset.version ?? "");
  console.log("Dataset deleted");

  await openAIClient.evals.delete(evalObject.id);
  console.log("Evaluation deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
