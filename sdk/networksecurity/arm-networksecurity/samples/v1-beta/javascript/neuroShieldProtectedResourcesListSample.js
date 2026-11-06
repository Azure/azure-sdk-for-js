// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkSecurityManagementClient } = require("@azure/arm-networksecurity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all protected resources under a NeuroShield resource.
 *
 * @summary lists all protected resources under a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldProtectedResources_List.json
 */
async function listProtectedResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.neuroShieldProtectedResources.list(
    "myResourceGroup",
    "myNeuroShield",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listProtectedResources();
}

main().catch(console.error);
