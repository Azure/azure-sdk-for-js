// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use `restorePoller` to resume a long-running
 * `updateMemories` operation from its serialized state. This is useful when the
 * original poller is no longer in scope (e.g. the process restarted).
 *
 * @summary Serialize an updateMemories poller, then restore and complete it using restorePoller.
 * @azsdk-weight 40
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient, restorePoller } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const memoryStoreName = process.env["MEMORY_STORE_NAME"] || "my_memory_store";
const scope = "user_123";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Start an updateMemories long-running operation
  console.log(`Starting updateMemories for memory store '${memoryStoreName}'...`);
  const poller = project.beta.memoryStores.updateMemories(memoryStoreName, scope, {
    items: [{ role: "user", type: "message", content: "Hello from restore poller sample" }],
  });

  // Serialize the poller state so it can be resumed later
  const serializedState = (await poller).toString();
  console.log("Serialized poller state (truncated for display):", serializedState.slice(0, 100));

  // Restore the poller from the serialized state — simulates resuming after a restart
  console.log("Restoring poller from serialized state...");
  const restoredPoller = restorePoller(
    project,
    serializedState,
    project.beta.memoryStores.updateMemories.bind(project.beta.memoryStores),
  );

  // Wait for the operation to complete
  const result = await restoredPoller.pollUntilDone();
  console.log("updateMemories completed via restored poller:", JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("Sample failed:", err);
  process.exit(1);
});
