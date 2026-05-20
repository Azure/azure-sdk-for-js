// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fixes resource permissions for the given scenario configuration.
 *
 * @summary fixes resource permissions for the given scenario configuration.
 * x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_FixResourcePermissions.json
 */
async function fixesResourcePermissionsForTheGivenScenarioConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.scenarioConfigurations.fixResourcePermissions(
    "exampleRG",
    "exampleWorkspace",
    "12345678-1234-1234-1234-123456789012",
    "config-5678-9012-3456-789012345678",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await fixesResourcePermissionsForTheGivenScenarioConfiguration();
}

main().catch(console.error);
