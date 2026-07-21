// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the Get Domain Service operation retrieves a json representation of the Domain Service.
 *
 * @summary the Get Domain Service operation retrieves a json representation of the Domain Service.
 * x-ms-original-file: 2025-10-01-preview/GetDomainService.json
 */
async function getDomainService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const result = await client.domainServices.get("TestResourceGroup", "TestDomainService.com");
  console.log(result);
}

async function main(): Promise<void> {
  await getDomainService();
}

main().catch(console.error);
