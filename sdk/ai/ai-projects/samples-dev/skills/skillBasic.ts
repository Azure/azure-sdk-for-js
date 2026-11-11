// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to perform CRUD operations on Skills
 * using the AIProjectClient.
 *
 * Skills are currently a preview feature. In the JS SDK, you access
 * these operations via `project.skills`.
 *
 * @summary Demonstrates CRUD operations on Skills using the skills API.
 */

import { AIProjectClient, isRestError } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const skillName = "sample-skill";

  // Clean up any existing skill with this name
  try {
    await project.skills.delete(skillName);
    console.log(`Skill \`${skillName}\` deleted`);
  } catch (e) {
    if (!(isRestError(e) && e.statusCode === 404)) {
      throw e;
    }
  }

  // Create a new skill
  const created = await project.skills.create(skillName, {
    inlineContent: {
      description: "Example skill created by the @azure/ai-projects sample.",
      instructions: "You are a helpful assistant that answers questions concisely.",
      metadata: { owner: "sample" },
    },
  });
  console.log(`Skill created: ${created.name} (id: ${created.id})`);

  // Retrieve the skill
  const fetched = await project.skills.get(skillName);
  console.log(`Retrieved skill: ${fetched.name} (id: ${fetched.id}), ${JSON.stringify(fetched)}`);

  // List skills
  const skills = [];
  for await (const item of project.skills.list({ limit: 10 })) {
    skills.push(item);
  }
  console.log(`Found ${skills.length} skill(s)`);
  for (const item of skills) {
    console.log(`  - ${item.name} (id: ${item.id})`);
  }

  // Delete the skill
  const deleteResult = await project.skills.delete(skillName);
  console.log(`Deleted skill: ${deleteResult.name} (deleted: ${deleteResult.deleted})`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
