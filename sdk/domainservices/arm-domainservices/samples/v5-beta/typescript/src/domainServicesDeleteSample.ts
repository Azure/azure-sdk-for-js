// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the Delete Domain Service operation deletes an existing Domain Service.
 *
 * @summary the Delete Domain Service operation deletes an existing Domain Service.
 * x-ms-original-file: 2025-10-01-preview/DeleteDomainService.json
 */
async function deleteDomainService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  await client.domainServices.delete("TestResourceGroup", "TestDomainService.com");
}

async function main(): Promise<void> {
  await deleteDomainService();
}

main().catch(console.error);
