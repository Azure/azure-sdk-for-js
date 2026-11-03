// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Domains resource and its properties.
 *
 * @summary get the Domains resource and its properties.
 * x-ms-original-file: 2026-03-18/domains/get.json
 */
async function getDomainsResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.domains.get(
    "MyResourceGroup",
    "MyEmailServiceResource",
    "mydomain.com",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDomainsResource();
}

main().catch(console.error);
