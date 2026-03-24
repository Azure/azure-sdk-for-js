// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a dashboard definition to update dashboard resource.
 *
 * @summary create a dashboard definition to update dashboard resource.
 * x-ms-original-file: 2025-09-01-preview/DashboardDefinition_Create.json
 */
async function dashboardDefinitionCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.dashboardDefinitions.create(
    "myResourceGroup",
    "myDashboard",
    "default",
    { properties: { serializedData: "<escapedDashboardJsonString>" } },
  );
  console.log(result);
}

async function main() {
  await dashboardDefinitionCreate();
}

main().catch(console.error);
