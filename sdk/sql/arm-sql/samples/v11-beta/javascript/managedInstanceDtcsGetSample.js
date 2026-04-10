// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets managed instance DTC settings.
 *
 * @summary gets managed instance DTC settings.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceDtcGet.json
 */
async function getsManagedInstanceDTCSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceDtcs.get("testrg", "testinstance", "current");
  console.log(result);
}

async function main() {
  await getsManagedInstanceDTCSettings();
}

main().catch(console.error);
