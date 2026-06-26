// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a scenario run.
 *
 * This endpoint is also the polling target for ScenarioConfigurations.execute
 * and ScenarioRuns.cancel (final-state-via: location). While the run is in
 * progress the service returns 202 with a Location header pointing back to
 * this URL; clients must keep polling until they receive 200, which carries
 * the final ScenarioRun body.
 *
 * @summary get a scenario run.
 *
 * This endpoint is also the polling target for ScenarioConfigurations.execute
 * and ScenarioRuns.cancel (final-state-via: location). While the run is in
 * progress the service returns 202 with a Location header pointing back to
 * this URL; clients must keep polling until they receive 200, which carries
 * the final ScenarioRun body.
 * x-ms-original-file: 2026-05-01-preview/ScenarioRuns_Get.json
 */
async function getAScenarioRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.scenarioRuns.get(
    "exampleRG",
    "exampleWorkspace",
    "12345678-1234-1234-1234-123456789012",
    "abcd1234-5678-9012-3456-789012345678",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAScenarioRun();
}

main().catch(console.error);
