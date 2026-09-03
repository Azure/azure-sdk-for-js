// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Policy resources by resource group
 *
 * @summary list Policy resources by resource group
 * x-ms-original-file: 2026-03-01-preview/List_Policies_ByResourceGroup.json
 */
async function listPoliciesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policies.listByResourceGroup("rgdeviceregistry", "mynamespace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPoliciesByResourceGroup();
}

main().catch(console.error);
