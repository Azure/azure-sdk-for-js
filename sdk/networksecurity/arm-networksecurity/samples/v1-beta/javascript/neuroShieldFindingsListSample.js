// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkSecurityManagementClient } = require("@azure/arm-networksecurity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists findings under a protected resource.
 *
 * @summary lists findings under a protected resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_List.json
 */
async function listFindings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.neuroShieldFindings.list(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listFindings();
}

main().catch(console.error);
