// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The List of OuContainers in DomainService instance.
 *
 * @summary The List of OuContainers in DomainService instance.
 * x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/ListOuContainers.json
 */

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

async function listOfOuContainers(): Promise<void> {
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const resourceGroupName = "OuContainerResourceGroup";
  const domainServiceName = "OuContainer.com";
  const credential = new DefaultAzureCredential();
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ouContainerOperationGrp.list(
    resourceGroupName,
    domainServiceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

listOfOuContainers().catch(console.error);
