// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a SuppressionListAddress.
 *
 * @summary create or update a SuppressionListAddress.
 * x-ms-original-file: 2026-03-18/suppressionLists/createOrUpdateAddress.json
 */
async function createOrUpdateSuppressionListAddressResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.suppressionListAddresses.createOrUpdate(
    "contosoResourceGroup",
    "contosoEmailService",
    "contoso.com",
    "aaaa1111-bbbb-2222-3333-aaaa11112222",
    "11112222-3333-4444-5555-aaaabbbbcccc",
    { email: "newuser1@fabrikam.com", firstName: "updatedFirstName" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateSuppressionListAddressResource();
}

main().catch(console.error);
