// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to manage rubric evaluator versions using AIProjectClient.
 * Rubric definitions use project.evaluators without preview headers. Custom code, prompt,
 * and endpoint definitions remain preview; blob uploads remain under project.beta.evaluators.
 *
 * @summary Create, retrieve, update, list, and delete a rubric evaluator version.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const name = `sample-rubric-${Date.now()}`;

  console.log("Creating a rubric evaluator version...");
  const evaluator = await project.evaluators.createVersion(name, {
    name,
    evaluator_type: "custom",
    categories: ["quality"],
    display_name: "Response relevance",
    definition: {
      type: "rubric",
      dimensions: [
        {
          id: "response_relevance",
          description: "The response directly addresses the user's question.",
          weight: 10,
          always_applicable: true,
        },
      ],
      pass_threshold: 0.5,
    },
  });
  if (!evaluator.version) {
    throw new Error("The service did not return the created evaluator version.");
  }

  try {
    console.log("Retrieving the rubric evaluator version...");
    const retrieved = await project.evaluators.getVersion(name, evaluator.version);
    console.log(JSON.stringify(retrieved, null, 2));

    console.log("Updating the evaluator description...");
    const updated = await project.evaluators.updateVersion(name, evaluator.version, {
      ...retrieved,
      description: "Scores how directly a response addresses the user's question.",
    });
    console.log(JSON.stringify(updated, null, 2));

    console.log("Listing versions of this evaluator...");
    for await (const version of project.evaluators.listVersions(name)) {
      console.log(`  - ${version.name}:${version.version}`);
    }

    console.log("Listing the latest evaluator versions...");
    for await (const latest of project.evaluators.list({ evaluatorType: "custom", limit: 5 })) {
      console.log(`  - ${latest.name}:${latest.version}`);
    }
  } finally {
    console.log("Deleting the sample evaluator version...");
    await project.evaluators.deleteVersion(name, evaluator.version);
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
