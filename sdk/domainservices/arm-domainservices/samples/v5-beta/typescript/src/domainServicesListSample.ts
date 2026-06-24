// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the List Domain Services in Subscription operation lists all the domain services available under the given subscription (and across all resource groups within that subscription).
 *
 * @summary the List Domain Services in Subscription operation lists all the domain services available under the given subscription (and across all resource groups within that subscription).
 * x-ms-original-file: 2025-10-01-preview/ListDomainServicesBySubscription.json
 */
async function listDomainService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.domainServices.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDomainService();
}

main().catch(console.error);
