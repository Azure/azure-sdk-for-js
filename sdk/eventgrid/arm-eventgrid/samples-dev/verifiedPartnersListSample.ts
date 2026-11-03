// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of all verified partners.
 *
 * @summary get a list of all verified partners.
 * x-ms-original-file: 2025-07-15-preview/VerifiedPartners_List.json
 */
async function verifiedPartnersList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.verifiedPartners.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await verifiedPartnersList();
}

main().catch(console.error);
