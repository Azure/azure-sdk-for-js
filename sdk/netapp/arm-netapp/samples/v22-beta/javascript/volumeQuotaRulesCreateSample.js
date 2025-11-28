// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create the specified quota rule within the given volume
 *
 * @summary create the specified quota rule within the given volume
 * x-ms-original-file: 2025-09-01-preview/VolumeQuotaRules_Create.json
 */
async function volumeQuotaRulesCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5275316f-a498-48d6-b324-2cbfdc4311b9";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumeQuotaRules.create(
    "myRG",
    "account-9957",
    "pool-5210",
    "volume-6387",
    "rule-0004",
    {
      location: "westus",
      properties: {
        quotaSizeInKiBs: 100005,
        quotaTarget: "1821",
        quotaType: "IndividualUserQuota",
      },
    },
  );
  console.log(result);
}

async function main() {
  await volumeQuotaRulesCreate();
}

main().catch(console.error);
