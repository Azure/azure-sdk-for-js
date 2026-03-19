// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a SuppressionListAddress.
 *
 * @summary get a SuppressionListAddress.
 * x-ms-original-file: 2026-03-18/suppressionLists/getAddress.json
 */
async function getASuppressionListAddressResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.suppressionListAddresses.get(
    "contosoResourceGroup",
    "contosoEmailService",
    "contoso.com",
    "aaaa1111-bbbb-2222-3333-aaaa11112222",
    "11112222-3333-4444-5555-aaaabbbbcccc",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASuppressionListAddressResource();
}

main().catch(console.error);
