// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to delete a Domains resource.
 *
 * @summary operation to delete a Domains resource.
 * x-ms-original-file: 2026-03-18/domains/delete.json
 */
async function deleteDomainsResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  await client.domains.delete("MyResourceGroup", "MyEmailServiceResource", "mydomain.com");
}

async function main(): Promise<void> {
  await deleteDomainsResource();
}

main().catch(console.error);
