// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a list of all verified partners.
 *
 * @summary Get a list of all verified partners.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/VerifiedPartners_List.json
 */

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

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
