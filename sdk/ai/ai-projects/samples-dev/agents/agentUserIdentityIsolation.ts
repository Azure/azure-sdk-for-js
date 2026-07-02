// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates per-user Prompt Agent isolation while sending
 * delegated end-user identities in the `x-ms-user-identity` header.
 *
 * It invokes the same Prompt Agent as two different delegated users. Each
 * user gets a separate response chain, and the sample shows that each
 * follow-up request continues only that user's own prior math context:
 *
 *   - First delegated user: "1 + 1 = ?" then "+ 10" -> 12
 *   - Second delegated user: "2 + 2 = ?" then "+ 10" -> 14
 *
 * @summary This sample demonstrates how to isolate Prompt Agent responses
 * per delegated end-user using the `x-ms-user-identity` header.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import { randomUUID } from "node:crypto";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client and OpenAI client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Generate two delegated end-user identities
  const delegatedUserIdentity = randomUUID();
  const delegatedUserIdentity2 = randomUUID();

  // Create agent
  console.log("Creating agent...");
  const agent = await project.agents.createVersion("DelegatedUserAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "You are a helpful assistant that answers arithmetic questions. " +
      "Use the prior response context to resolve follow-up math questions like 'then + 10'.",
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
  console.log(`User 1: ${delegatedUserIdentity}`);
  console.log(`User 2: ${delegatedUserIdentity2}`);

  // First delegated user asks their initial question
  console.log("\nUser 1 input: 1 + 1 = ?");
  let response = await openAIClient.responses.create(
    {
      input: "1 + 1 = ?",
    },
    {
      headers: { "x-ms-user-identity": delegatedUserIdentity },
      body: { agent_reference: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Agent: ${response.output_text}`);

  // Second delegated user asks their initial question
  console.log("\nUser 2 input: 2 + 2 = ?");
  let response2 = await openAIClient.responses.create(
    {
      input: "2 + 2 = ?",
    },
    {
      headers: { "x-ms-user-identity": delegatedUserIdentity2 },
      body: { agent_reference: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Agent: ${response2.output_text}`);

  // First delegated user's follow-up continues only their own context
  console.log("\nUser 1 input: then + 10");
  response = await openAIClient.responses.create(
    {
      input: "then + 10",
      previous_response_id: response.id,
    },
    {
      headers: { "x-ms-user-identity": delegatedUserIdentity },
      body: { agent_reference: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Agent: ${response.output_text}`);

  // Second delegated user's follow-up continues only their own context
  console.log("\nUser 2 input: then + 10");
  response2 = await openAIClient.responses.create(
    {
      input: "then + 10",
      previous_response_id: response2.id,
    },
    {
      headers: { "x-ms-user-identity": delegatedUserIdentity2 },
      body: { agent_reference: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Agent: ${response2.output_text}`);

  // Clean up
  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
