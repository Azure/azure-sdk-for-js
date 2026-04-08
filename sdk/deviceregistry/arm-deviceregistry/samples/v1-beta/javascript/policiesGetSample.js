// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Policy
 *
 * @summary get a Policy
 * x-ms-original-file: 2026-03-01-preview/Get_Policies.json
 */
async function getPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.policies.get("rgdeviceregistry", "mynamespace", "myPolicy");
  console.log(result);
}

async function main() {
  await getPolicies();
}

main().catch(console.error);
