// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a SuppressionList.
 *
 * @summary delete a SuppressionList.
 * x-ms-original-file: 2026-03-18/suppressionLists/deleteSuppressionList.json
 */
async function deleteASuppressionListsResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  await client.suppressionLists.delete(
    "MyResourceGroup",
    "MyEmailServiceResource",
    "mydomain.com",
    "aaaa1111-bbbb-2222-3333-aaaa11112222",
  );
}

async function main(): Promise<void> {
  await deleteASuppressionListsResource();
}

main().catch(console.error);
