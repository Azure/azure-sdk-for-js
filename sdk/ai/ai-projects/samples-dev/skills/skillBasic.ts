// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to perform CRUD operations on Skills
 * using the AIProjectClient.
 *
 * Skills are currently a preview feature. In the JS SDK, you access
 * these operations via `project.beta.skills`.
 *
 * @summary Demonstrates CRUD operations on Skills using the beta skills API.
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { RestError } from "@azure/core-rest-pipeline";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const skillName = "sample-skill";

  // Clean up any existing skill with this name
  try {
    await project.beta.skills.delete(skillName);
    console.log(`Skill \`${skillName}\` deleted`);
  } catch (e) {
    if (!(e instanceof RestError && e.statusCode === 404)) {
      throw e;
    }
  }

  // Create a new skill
  const created = await project.beta.skills.create(skillName, {
    description: "Example skill created by the @azure/ai-projects sample.",
    instructions: "You are a helpful assistant that answers questions concisely.",
    metadata: { owner: "sample" },
  });
  console.log(`Skill created: ${created.name} (id: ${created.skill_id})`);

  // Retrieve the skill
  const fetched = await project.beta.skills.get(skillName);
  console.log(
    `Retrieved skill: ${fetched.name} (id: ${fetched.skill_id}), ${JSON.stringify(fetched)}`,
  );

  // List skills
  const skills = [];
  for await (const item of project.beta.skills.list({ limit: 10 })) {
    skills.push(item);
  }
  console.log(`Found ${skills.length} skill(s)`);
  for (const item of skills) {
    console.log(`  - ${item.name} (id: ${item.skill_id})`);
  }

  // Delete the skill
  const deleteResult = await project.beta.skills.delete(skillName);
  console.log(`Deleted skill: ${deleteResult.name} (deleted: ${deleteResult.deleted})`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
