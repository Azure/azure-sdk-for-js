// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to author a rubric evaluator and use it in an
 * OpenAI evaluation run.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary Create a rubric evaluator, score inline responses, and clean up resources.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

function formatResultSummary(results: unknown): string {
  if (!Array.isArray(results)) {
    return "";
  }
  return results
    .map((result: unknown) => {
      if (typeof result !== "object" || result === null) {
        return "unknown result";
      }
      const fields = result as Record<string, unknown>;
      return `${String(fields["name"])}=${String(fields["score"])} (${String(fields["passed"])})`;
    })
    .join(", ");
}

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();
  const evaluatorName = `reservation-quality-${Date.now()}`;
  let evaluationId: string | undefined;

  console.log("Creating a rubric evaluator version...");
  const evaluator = await project.evaluators.createVersion(evaluatorName, {
    name: evaluatorName,
    evaluator_type: "custom",
    categories: ["quality"],
    display_name: "Reservation Quality",
    description: "Evaluates a reservation assistant for intent resolution, completeness, and tone.",
    definition: {
      type: "rubric",
      dimensions: [
        {
          id: "intent_resolution",
          description: "The response correctly understands and addresses the user's request.",
          weight: 10,
          always_applicable: true,
        },
        {
          id: "completeness",
          description: "The response includes the details needed to complete the reservation.",
          weight: 8,
          always_applicable: true,
        },
        {
          id: "tone",
          description: "The response is clear, courteous, and appropriate for customer support.",
          weight: 5,
          always_applicable: true,
        },
      ],
      pass_threshold: 0.6,
    },
  });
  if (!evaluator.version) {
    throw new Error("The service did not return the created evaluator version.");
  }
  console.log(`Evaluator created (name: ${evaluator.name}, version: ${evaluator.version})`);

  try {
    console.log("\nCreating an evaluation that uses the rubric...");
    const evaluation = await openAIClient.evals.create({
      name: "Reservation Quality Evaluation",
      data_source_config: {
        type: "custom",
        item_schema: {
          type: "object",
          properties: {
            query: { type: "string" },
            response: { type: "string" },
          },
          required: ["query", "response"],
        },
        include_sample_schema: true,
      },
      testing_criteria: [
        {
          type: "azure_ai_evaluator",
          name: evaluatorName,
          evaluator_name: evaluatorName,
          initialization_parameters: { deployment_name: deploymentName },
          data_mapping: {
            query: "{{item.query}}",
            response: "{{item.response}}",
          },
        },
      ] as any,
    });
    evaluationId = evaluation.id;
    console.log(`Evaluation created (id: ${evaluation.id})`);

    let run = await openAIClient.evals.runs.create(evaluation.id, {
      name: "Reservation Quality Evaluation Run",
      data_source: {
        type: "jsonl",
        source: {
          type: "file_content",
          content: [
            {
              item: {
                query: "Please reserve a table for two at 7 PM tonight.",
                response: "I can help with that. Which restaurant and city would you like to book?",
              },
            },
            {
              item: {
                query: "Book a table at Contoso Bistro for four tomorrow at 6 PM.",
                response: "Your table for four at Contoso Bistro is reserved for tomorrow at 6 PM.",
              },
            },
            {
              item: {
                query: "Can you move my reservation from 6 PM to 8 PM?",
                response: "Reservations are a thing restaurants have.",
              },
            },
          ],
        },
      },
    });
    console.log(`Evaluation run created (id: ${run.id})`);

    while (!["completed", "failed", "canceled"].includes(run.status)) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      run = await openAIClient.evals.runs.retrieve(run.id, { eval_id: evaluation.id });
      console.log(`Waiting for evaluation run... current status: ${run.status}`);
    }

    if (run.status !== "completed") {
      throw new Error(`Evaluation run did not complete successfully (status: ${run.status}).`);
    }

    console.log(`Result counts: ${JSON.stringify(run.result_counts)}`);
    for await (const item of openAIClient.evals.runs.outputItems.list(run.id, {
      eval_id: evaluation.id,
    })) {
      const summary = formatResultSummary(item.results);
      console.log(`  item ${item.id}: status=${item.status} | ${summary}`);
    }
    console.log(`Eval run report URL: ${run.report_url}`);
  } finally {
    if (evaluationId) {
      console.log(`Deleting evaluation ${evaluationId}...`);
      await openAIClient.evals.delete(evaluationId);
    }
    console.log(`Deleting evaluator ${evaluator.name}/${evaluator.version}...`);
    await project.evaluators.deleteVersion(evaluator.name, evaluator.version);
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
