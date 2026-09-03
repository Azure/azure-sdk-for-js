// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all suppression lists for a domains resource.
 *
 * @summary list all suppression lists for a domains resource.
 * x-ms-original-file: 2026-03-18/suppressionLists/getSuppressionLists.json
 */
async function getAllSuppressionListsResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.suppressionLists.listByDomain(
    "contosoResourceGroup",
    "contosoEmailService",
    "contoso.com",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllSuppressionListsResources();
}

main().catch(console.error);
