// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkSecurityManagementClient } = require("@azure/arm-networksecurity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists mitigations across all protected resources under a NeuroShield resource.
 *
 * @summary lists mitigations across all protected resources under a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_ListByNeuroShield.json
 */
async function listMitigationsByNeuroShield() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.neuroShieldMitigations.listByNeuroShield(
    "myResourceGroup",
    "myNeuroShield",
    { top: 50 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listMitigationsByNeuroShield();
}

main().catch(console.error);
