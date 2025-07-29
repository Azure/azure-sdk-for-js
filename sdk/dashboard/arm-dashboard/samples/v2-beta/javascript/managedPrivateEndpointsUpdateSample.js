// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a managed private endpoint for an existing grafana resource.
 *
 * @summary update a managed private endpoint for an existing grafana resource.
 * x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Patch.json
 */
async function managedPrivateEndpointsPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.update(
    "myResourceGroup",
    "myWorkspace",
    "myMPEName",
    { tags: { Environment: "Dev 2" } },
  );
  console.log(result);
}

async function main() {
  await managedPrivateEndpointsPatch();
}

main().catch(console.error);
