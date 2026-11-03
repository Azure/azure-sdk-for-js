// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the two keys used to publish to a partner namespace.
 *
 * @summary list the two keys used to publish to a partner namespace.
 * x-ms-original-file: 2025-07-15-preview/PartnerNamespaces_ListSharedAccessKeys.json
 */
async function partnerNamespacesListSharedAccessKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerNamespaces.listSharedAccessKeys(
    "examplerg",
    "examplePartnerNamespaceName1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await partnerNamespacesListSharedAccessKeys();
}

main().catch(console.error);
