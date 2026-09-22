// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceConnectorManagementClient } = require("@azure/arm-resourceconnector");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the cluster customer credentials for the dedicated appliance.
 *
 * @summary returns the cluster customer credentials for the dedicated appliance.
 * x-ms-original-file: 2025-03-01-preview/AppliancesListKeys.json
 */
async function listKeysAppliance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const result = await client.appliances.listKeys("testresourcegroup", "appliance01");
  console.log(result);
}

async function main() {
  await listKeysAppliance();
}

main().catch(console.error);
