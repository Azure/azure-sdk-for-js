// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all quota rules associated with the volume
 *
 * @summary list all quota rules associated with the volume
 * x-ms-original-file: 2025-07-01-preview/VolumeQuotaRules_List.json
 */
async function volumeQuotaRulesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5275316f-a498-48d6-b324-2cbfdc4311b9";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeQuotaRules.listByVolume(
    "myRG",
    "account-9957",
    "pool-5210",
    "volume-6387",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await volumeQuotaRulesList();
}

main().catch(console.error);
