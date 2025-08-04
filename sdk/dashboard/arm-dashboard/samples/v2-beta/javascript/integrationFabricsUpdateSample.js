// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a IntegrationFabric
 *
 * @summary update a IntegrationFabric
 * x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Update.json
 */
async function integrationFabricsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.integrationFabrics.update(
    "myResourceGroup",
    "myWorkspace",
    "sampleIntegration",
    {
      properties: { scenarios: ["scenario1"] },
      tags: { Environment: "Dev 2" },
    },
  );
  console.log(result);
}

async function main() {
  await integrationFabricsUpdate();
}

main().catch(console.error);
