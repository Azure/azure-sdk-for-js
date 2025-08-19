// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The List Domain Services in Subscription operation lists all the domain services available under the given subscription (and across all resource groups within that subscription).
 *
 * @summary The List Domain Services in Subscription operation lists all the domain services available under the given subscription (and across all resource groups within that subscription).
 * x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/ListDomainServicesBySubscription.json
 */

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

async function listDomainService(): Promise<void> {
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const credential = new DefaultAzureCredential();
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.domainServices.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listDomainService().catch(console.error);
