// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateDnsManagementClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all record sets in a Private DNS zone.
 *
 * @summary lists all record sets in a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetALLList.json
 */
async function getPrivateDNSZoneALLRecordSets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.list("resourceGroup1", "privatezone1.com")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getPrivateDNSZoneALLRecordSets();
}

main().catch(console.error);
