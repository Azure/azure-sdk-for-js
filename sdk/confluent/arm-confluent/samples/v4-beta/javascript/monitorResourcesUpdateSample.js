// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the Azure resource tags assigned to a monitor.
 *
 * @summary updates the Azure resource tags assigned to a monitor.
 * x-ms-original-file: 2026-10-21-preview/MonitorResources_Update_MaximumSet_Gen.json
 */
async function monitorResourcesUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.monitorResources.update(
    "rgconfluent",
    "myOrganization",
    "productionLogs",
    { tags: { environment: "staging" } },
  );
  console.log(result);
}

async function main() {
  await monitorResourcesUpdateMaximumSet();
}

main().catch(console.error);
