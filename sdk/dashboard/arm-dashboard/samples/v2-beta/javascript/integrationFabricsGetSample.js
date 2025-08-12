// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a IntegrationFabric
 *
 * @summary get a IntegrationFabric
 * x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Get.json
 */
async function integrationFabricsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.integrationFabrics.get(
    "myResourceGroup",
    "myWorkspace",
    "sampleIntegration",
  );
  console.log(result);
}

async function main() {
  await integrationFabricsGet();
}

main().catch(console.error);
