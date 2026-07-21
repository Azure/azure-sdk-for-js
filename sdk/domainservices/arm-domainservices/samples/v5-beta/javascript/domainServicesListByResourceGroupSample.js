// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainServicesResourceProvider } = require("@azure/arm-domainservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the List Domain Services in Resource Group operation lists all the domain services available under the given resource group.
 *
 * @summary the List Domain Services in Resource Group operation lists all the domain services available under the given resource group.
 * x-ms-original-file: 2025-10-01-preview/ListDomainServicesByResourceGroup.json
 */
async function listDomainService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.domainServices.listByResourceGroup("TestResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDomainService();
}

main().catch(console.error);
