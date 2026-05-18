// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel the currently running scenario execution.
 *
 * @summary cancel the currently running scenario execution.
 * x-ms-original-file: 2026-05-01-preview/ScenarioRuns_Cancel.json
 */
async function cancelARunningScenarioRun() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  await client.scenarioRuns.cancel(
    "exampleRG",
    "exampleWorkspace",
    "12345678-1234-1234-1234-123456789012",
    "abcd1234-5678-9012-3456-789012345678",
  );
}

async function main() {
  await cancelARunningScenarioRun();
}

main().catch(console.error);
