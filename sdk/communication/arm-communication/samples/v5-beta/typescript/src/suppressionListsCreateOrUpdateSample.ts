// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add a new SuppressionList resource under the parent Domains resource or update an existing SuppressionList resource.
 *
 * @summary add a new SuppressionList resource under the parent Domains resource or update an existing SuppressionList resource.
 * x-ms-original-file: 2026-03-18/suppressionLists/createOrUpdateSuppressionList.json
 */
async function createOrUpdateSuppressionListsResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.suppressionLists.createOrUpdate(
    "contosoResourceGroup",
    "contosoEmailService",
    "contoso.com",
    "aaaa1111-bbbb-2222-3333-aaaa11112222",
    { listName: "contosoNewsAlerts" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateSuppressionListsResource();
}

main().catch(console.error);
