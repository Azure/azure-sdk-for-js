// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancel the currently running scenario execution.
 *
 * @summary cancel the currently running scenario execution.
 * x-ms-original-file: 2026-05-01-preview/ScenarioRuns_Cancel.json
 */
async function cancelARunningScenarioRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.scenarioRuns.cancel(
    "exampleRG",
    "exampleWorkspace",
    "12345678-1234-1234-1234-123456789012",
    "abcd1234-5678-9012-3456-789012345678",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cancelARunningScenarioRun();
}

main().catch(console.error);
