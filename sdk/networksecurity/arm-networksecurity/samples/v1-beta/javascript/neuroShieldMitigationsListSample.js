// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkSecurityManagementClient } = require("@azure/arm-networksecurity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists mitigations under a protected resource.
 *
 * @summary lists mitigations under a protected resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_List.json
 */
async function listMitigations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.neuroShieldMitigations.list(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listMitigations();
}

main().catch(console.error);
