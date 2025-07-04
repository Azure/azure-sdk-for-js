// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-privatedns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all record sets in a Private DNS zone.
 *
 * @summary lists all record sets in a Private DNS zone.
 * x-ms-original-file: 2024-06-01/RecordSetALLList.json
 */
async function getPrivateDNSZoneALLRecordSets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.list("resourceGroup1", "privatezone1.com")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getPrivateDNSZoneALLRecordSets();
}

main().catch(console.error);
