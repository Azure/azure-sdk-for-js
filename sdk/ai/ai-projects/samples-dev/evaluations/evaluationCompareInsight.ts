// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to compare evaluation runs and generate
 * insights using the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation, run it multiple times,
 * and then compare the runs using the insights API to generate comparison insights.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) AZURE_AI_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *    Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 * 2) MODEL_DEPLOYMENT_NAME - The deployment name of the AI model to use for evaluation.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create a sample evaluation with two eval runs to compare
  const dataSourceConfig = {
    type: "custom" as const,
    item_schema: {
      type: "object",
      properties: { query: { type: "string" } },
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
          role: "developer" as const,
          content:
            "Classify the sentiment of the following statement as one of 'positive', 'neutral', or 'negative'",
        },
        { role: "user" as const, content: "Statement: {{item.query}}" },
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

  // Create first evaluation run
  console.log("\nCreating Evaluation Run 1...");
  const evalRun1 = await openAIClient.evals.runs.create(evalObject.id, {
    name: "Evaluation Run 1",
    data_source: {
      type: "jsonl" as const,
      source: {
        type: "file_content" as const,
        content: [{ item: { query: "I love programming!" } }, { item: { query: "I hate bugs." } }],
      },
    },
  });
  console.log(`Evaluation run created (id: ${evalRun1.id})`);

  // Create second evaluation run
  console.log("\nCreating Evaluation Run 2...");
  const evalRun2 = await openAIClient.evals.runs.create(evalObject.id, {
    name: "Evaluation Run 2",
    data_source: {
      type: "jsonl" as const,
      source: {
        type: "file_content" as const,
        content: [
          { item: { query: "The weather is nice today." } },
          { item: { query: "This is the worst movie ever." } },
        ],
      },
    },
  });
  console.log(`Evaluation run created (id: ${evalRun2.id})`);

  // Wait for both evaluation runs to complete
  const runsToWait = [evalRun1, evalRun2];
  const completedRuns: Map<string, any> = new Map();

  console.log("\nWaiting for evaluation runs to complete...");
  while (completedRuns.size < runsToWait.length) {
    for (const evalRun of runsToWait) {
      if (completedRuns.has(evalRun.id)) {
        continue;
      }
      const run = await openAIClient.evals.runs.retrieve(evalRun.id, {
        eval_id: evalObject.id,
      });
      if (run.status === "completed" || run.status === "failed") {
        console.log(`Evaluation run ${run.id} ${run.status}`);
        completedRuns.set(evalRun.id, run);
      }
    }
    if (completedRuns.size < runsToWait.length) {
      console.log(
        `Waiting for ${runsToWait.length - completedRuns.size} evaluation run(s) to complete...`,
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  // Check if any runs failed
  const failedRuns = Array.from(completedRuns.values()).filter((run) => run.status === "failed");

  if (failedRuns.length === 0) {
    console.log("\n Both evaluation runs completed successfully!");

    // Generate comparison insights
    console.log("\nGenerating comparison insights...");
    let compareInsight = await project.beta.insights.generate({
      displayName: "Comparison of Evaluation Runs",
      request: {
        type: "EvaluationComparison",
        evalId: evalObject.id,
        baselineRunId: evalRun1.id,
        treatmentRunIds: [evalRun2.id],
      },
    });
    console.log(`Started insight generation (id: ${compareInsight.id})`);

    // Poll for insight completion
    while (
      compareInsight.state !== "Succeeded" &&
      compareInsight.state !== "Failed" &&
      compareInsight.state !== "Canceled"
    ) {
      compareInsight = await project.beta.insights.get(compareInsight.id ?? "");
      console.log(`Waiting for insight to be generated...current status: ${compareInsight.state}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (compareInsight.state === "Succeeded") {
      console.log("\n Evaluation comparison generated successfully!");
      console.log("\nComparison Insight:");
      console.log(JSON.stringify(compareInsight, null, 2));
    } else {
      console.log(`\n Insight generation failed with state: ${compareInsight.state}`);
    }
  } else {
    console.log("\n One or more eval runs failed. Cannot generate comparison insight.");
  }

  // Clean up
  console.log("\nCleaning up...");
  await openAIClient.evals.delete(evalObject.id);
  console.log("Evaluation deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
