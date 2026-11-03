// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to unsuspend a suspended Domain Service resource.
 *
 * @summary unsuspend a suspended Domain Service resource.
 * x-ms-original-file: 2025-10-01-preview/UnsuspendDomainService.json
 */
async function unsuspendDomainService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const result = await client.domainServices.unsuspend("example-rg", "example-domainservice");
  console.log(result);
}

async function main(): Promise<void> {
  await unsuspendDomainService();
}

main().catch(console.error);
