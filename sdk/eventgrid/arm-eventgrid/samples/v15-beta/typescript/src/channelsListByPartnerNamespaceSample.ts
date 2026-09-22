// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the channels in a partner namespace.
 *
 * @summary list all the channels in a partner namespace.
 * x-ms-original-file: 2025-07-15-preview/Channels_ListByPartnerNamespace.json
 */
async function channelsListByPartnerNamespace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.channels.listByPartnerNamespace(
    "examplerg",
    "examplePartnerNamespaceName1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await channelsListByPartnerNamespace();
}

main().catch(console.error);
