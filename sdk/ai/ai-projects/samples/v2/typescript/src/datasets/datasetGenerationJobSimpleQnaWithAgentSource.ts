// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample creates a temporary prompt agent and uses its instructions as the
 * source for a SimpleQnA evaluation dataset. It generates data from the agent
 * definition, rather than recorded conversation traces. The generated dataset
 * and temporary agent version are deleted before exiting.
 *
 * Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_MODEL_NAME before running this sample.
 * The model deployment must support the Azure OpenAI Responses API.
 * Agent creation reports elapsed time every 10 seconds and has a 60-second client timeout.
 * A timeout does not cancel server-side creation; check the logged agent name before retrying.
 *
 * @summary Generate a SimpleQnA evaluation dataset from a prompt agent's definition.
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
const modelDeploymentName = process.env["FOUNDRY_MODEL_NAME"]?.trim();

export async function main(): Promise<void> {
  if (!projectEndpoint || !modelDeploymentName) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_MODEL_NAME before running this sample.",
    );
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  // Unique names isolate this run; the output dataset name stays below 50 characters.
  const runId = randomUUID().replaceAll("-", "");
  const agentName = `qna-source-agent-${runId}`;
  const datasetName = `qna-agent-${runId}`;
  let generatedDataset: { name: string; version: string } | undefined;

  const createStarted = Date.now();
  console.log(`Creating prompt agent ${agentName} with deployment ${modelDeploymentName}...`);
  const progress = setInterval(() => {
    console.log(
      `Still waiting for agent creation (${Math.round((Date.now() - createStarted) / 1000)} seconds)...`,
    );
  }, 10_000);
  const agent = await project.agents
    .createVersion(
      agentName,
      {
        kind: "prompt",
        model: modelDeploymentName,
        instructions: `You are a customer support assistant for Contoso's Widgets and Gizmos.
Product catalog:
- Widgets are blue, made of carbon fiber, and sold in packs of four for USD 24.99.
- Gizmos are red, weigh 1.2 kilograms, and are sold individually for USD 49.99.
- Sprockets are green, made of stainless steel, and cost USD 14.99 each.
Support policies:
- Unopened products can be returned within 30 days with the original receipt.
- Opened products are eligible for repair only.
- Warranty requests must include the serial number printed under the product.
- Orders of 50 or more units qualify for an extended 90-day return window.
- Standard support responds within one business day; priority support responds within four hours.
- Shipping is free for orders over USD 75.
For questions outside this catalog and policy, explain that you do not have that information.`,
      },
      {
        abortSignal: AbortSignal.timeout(60_000),
        requestOptions: { timeout: 60_000 },
      },
    )
    .finally(() => clearInterval(progress));
  console.log(
    `Created agent ${agent.name}/${agent.version} in ${((Date.now() - createStarted) / 1000).toFixed(1)} seconds.`,
  );

  try {
    console.log(`Creating a SimpleQnA job from agent ${agent.name}, version ${agent.version}...`);
    const generationPoller = project.beta.datasets.createGenerationJob(
      {
        inputs: {
          name: `qna-agent-job-${runId}`,
          scenario: "evaluation",
          sources: [
            {
              type: "agent",
              agent_name: agent.name,
              agent_version: agent.version,
              description: "The prompt agent's catalog and customer support instructions.",
            },
          ],
          options: {
            type: "simple_qna",
            max_samples: 15,
            model_options: { model: modelDeploymentName },
          },
          output_options: {
            name: datasetName,
            description: "QnA pairs generated from a customer support agent's definition.",
            tags: { sample: "simple-qna-agent-source" },
          },
        },
      },
      { updateIntervalInMs: 10_000 },
    );

    try {
      await generationPoller.submitted();
      console.log(`Generation job submitted (id: ${generationPoller.operationState?.jobId})`);

      const result = await generationPoller.pollUntilDone();
      console.log(`Generated ${result.generated_samples} question-and-answer pairs.`);

      const output = result.outputs?.find(
        (item) => item.type === "dataset" && "name" in item && "version" in item,
      );
      if (
        !output ||
        !("name" in output) ||
        !("version" in output) ||
        !output.name ||
        !output.version
      ) {
        throw new Error("The generation job did not return a dataset name and version.");
      }

      generatedDataset = { name: output.name, version: output.version };
      const dataset = await project.datasets.get(output.name, output.version);
      console.log(
        `Generated dataset (name: ${dataset.name}, version: ${dataset.version}, id: ${dataset.id})`,
      );
    } finally {
      if (generatedDataset) {
        await project.datasets.delete(generatedDataset.name, generatedDataset.version);
        console.log("Deleted the generated dataset version.");
      }
    }
  } finally {
    await project.agents.deleteVersion(agent.name, agent.version);
    console.log(`Deleted the temporary agent version ${agent.name}/${agent.version}.`);
  }
}

main().catch((err) => {
  console.error("Sample failed:", err instanceof Error ? err.message : err);
});
