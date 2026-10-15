// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete quota rule
 *
 * @summary delete quota rule
 * x-ms-original-file: 2026-07-01/VolumeQuotaRules_Delete.json
 */
async function volumeQuotaRulesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumeQuotaRules.delete(
    "myRG",
    "account-9957",
    "pool-5210",
    "volume-6387",
    "rule-0004",
  );
}

async function main() {
  await volumeQuotaRulesDelete();
}

main().catch(console.error);
