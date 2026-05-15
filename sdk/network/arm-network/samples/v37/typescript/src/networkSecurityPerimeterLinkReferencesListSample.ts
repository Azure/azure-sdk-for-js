// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the NSP LinkReference resources in the specified network security perimeter.
 *
 * @summary lists the NSP LinkReference resources in the specified network security perimeter.
 * x-ms-original-file: 2025-05-01/NspLinkReferenceList.json
 */
async function nspLinkReferenceList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterLinkReferences.list("rg1", "nsp2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await nspLinkReferenceList();
}

main().catch(console.error);
