// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The List Domain Services in Resource Group operation lists all the domain services available under the given resource group.
 *
 * @summary The List Domain Services in Resource Group operation lists all the domain services available under the given resource group.
 * x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/ListDomainServicesByResourceGroup.json
 */

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

async function listDomainService(): Promise<void> {
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const resourceGroupName = "TestResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.domainServices.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

listDomainService().catch(console.error);
