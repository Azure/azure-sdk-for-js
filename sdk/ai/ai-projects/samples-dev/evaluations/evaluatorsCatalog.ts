// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create, get, update, delete, and list evaluators
 * with the AIProjectClient.
 *
 * @summary This sample demonstrates how to create prompt-based and code-based custom evaluators,
 * retrieve them, update them, list them, and clean up resources.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) AZURE_AI_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *    Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Create a prompt-based custom evaluator
  console.log("Creating Prompt based custom evaluator version (object style)");
  const promptEvaluator = await project.beta.evaluators.createVersion(
    "my_custom_evaluator_code_prompt_based",
    {
      name: "my_custom_evaluator_code_prompt_based",
      evaluator_type: "custom",
      categories: ["quality"],
      display_name: "my_custom_evaluator",
      description: "Custom evaluator to detect violent content",
      definition: {
        type: "prompt",
        prompt_text: `You are an evaluator.
                Rate the GROUNDEDNESS (factual correctness without unsupported claims) of the system response to the customer query.

                Scoring (1-5):
                1 = Mostly fabricated/incorrect
                2 = Many unsupported claims
                3 = Mixed: some facts but notable errors/guesses
                4 = Mostly factual; minor issues
                5 = Fully factual; no unsupported claims

                Return ONLY a single integer 1-5 as score in valid json response e.g {"score": int}.

                Query:
                {query}

                Response:
                {response}
                `,
        init_parameters: {
          type: "object",
          properties: {
            deployment_name: { type: "string" },
            threshold: { type: "number" },
          },
          required: ["deployment_name", "threshold"],
        },
        data_schema: {
          type: "object",
          properties: {
            query: { type: "string" },
            response: { type: "string" },
          },
          required: ["query", "response"],
        },
        metrics: {
          score: {
            type: "ordinal",
            desirable_direction: "increase",
            min_value: 1,
            max_value: 5,
          },
        },
      },
    },
  );
  console.log(
    `Prompt evaluator created (name: ${promptEvaluator.name}, version: ${promptEvaluator.version})`,
  );
  console.log(JSON.stringify(promptEvaluator, null, 2));

  // Create a code-based custom evaluator
  console.log("\nCreating Code based custom evaluator version (object style)");
  const codeEvaluator = await project.beta.evaluators.createVersion(
    "my_custom_evaluator_code_based",
    {
      name: "my_custom_evaluator_code_based",
      evaluator_type: "custom",
      categories: ["quality"],
      display_name: "my_custom_evaluator",
      description: "Custom evaluator to detect violent content",
      definition: {
        type: "code",
        code_text: "def grade(sample, item):\n    return 1.0",
        init_parameters: {
          type: "object",
          properties: {
            deployment_name: { type: "string" },
          },
          required: ["deployment_name"],
        },
        data_schema: {
          type: "object",
          properties: {
            item: { type: "string" },
            response: { type: "string" },
          },
          required: ["query", "response"],
        },
        metrics: {
          tool_selection: {
            type: "ordinal",
            desirable_direction: "increase",
            min_value: 0,
            max_value: 5,
          },
        },
      },
    },
  );
  console.log(
    `Code evaluator created (name: ${codeEvaluator.name}, version: ${codeEvaluator.version})`,
  );
  console.log(JSON.stringify(codeEvaluator, null, 2));

  // Get code based evaluator version
  console.log("\nGet code based evaluator version");
  const codeEvaluatorLatest = await project.beta.evaluators.getVersion(
    codeEvaluator.name,
    codeEvaluator.version ?? "",
  );
  console.log(JSON.stringify(codeEvaluatorLatest, null, 2));

  // Get prompt based evaluator version
  console.log("\nGet prompt based evaluator version");
  const promptEvaluatorLatest = await project.beta.evaluators.getVersion(
    promptEvaluator.name,
    promptEvaluator.version ?? "",
  );
  console.log(JSON.stringify(promptEvaluatorLatest, null, 2));

  // Delete code based evaluator version
  console.log("\nDeleting code based evaluator version");
  await project.beta.evaluators.deleteVersion(
    codeEvaluatorLatest.name,
    codeEvaluatorLatest.version ?? "",
  );
  console.log("Code evaluator version deleted");

  // Delete prompt based evaluator version
  await project.beta.evaluators.deleteVersion(
    promptEvaluatorLatest.name,
    promptEvaluatorLatest.version ?? "",
  );
  console.log("Prompt evaluator version deleted");

  // List builtin evaluator versions
  console.log("\nGetting list of builtin evaluator versions");
  const builtinEvaluators = project.beta.evaluators.listVersions(codeEvaluatorLatest.name, {
    typeParam: "builtin",
  });
  console.log("List of builtin evaluator versions:");
  for await (const evaluator of builtinEvaluators) {
    console.log(JSON.stringify(evaluator, null, 2));
  }

  // List custom evaluator versions
  console.log("\nGetting list of custom evaluator versions");
  const customEvaluators = project.beta.evaluators.listVersions(codeEvaluatorLatest.name, {
    typeParam: "custom",
  });
  console.log("List of custom evaluator versions:");
  for await (const evaluator of customEvaluators) {
    console.log(JSON.stringify(evaluator, null, 2));
  }

  console.log("\nSample completed successfully");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
