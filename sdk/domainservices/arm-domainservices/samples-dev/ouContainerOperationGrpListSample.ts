// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the List of OuContainers in DomainService instance.
 *
 * @summary the List of OuContainers in DomainService instance.
 * x-ms-original-file: 2025-10-01-preview/ListOuContainers.json
 */
async function listOfOuContainers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ouContainerOperationGrp.list(
    "OuContainerResourceGroup",
    "OuContainer.com",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listOfOuContainers();
}

main().catch(console.error);
