// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a BillingContainer
 *
 * @summary get a BillingContainer
 * x-ms-original-file: 2024-11-01/Get_BillingContainer.json
 */
async function getBillingContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.billingContainers.get("my-billingContainer");
  console.log(result);
}

async function main() {
  await getBillingContainer();
}

main().catch(console.error);
