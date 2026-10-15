// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch a quota rule
 *
 * @summary patch a quota rule
 * x-ms-original-file: 2026-07-01/VolumeQuotaRules_Update.json
 */
async function volumeQuotaRulesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumeQuotaRules.update(
    "myRG",
    "account-9957",
    "pool-5210",
    "volume-6387",
    "rule-0004",
    { properties: { quotaSizeInKiBs: 100009 } },
  );
  console.log(result);
}

async function main() {
  await volumeQuotaRulesUpdate();
}

main().catch(console.error);
