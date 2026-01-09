// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete quota rule
 *
 * @summary delete quota rule
 * x-ms-original-file: 2025-09-01-preview/VolumeQuotaRules_Delete.json
 */
async function volumeQuotaRulesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5275316f-a498-48d6-b324-2cbfdc4311b9";
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
