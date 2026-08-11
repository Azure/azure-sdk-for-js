// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainServicesResourceProvider } = require("@azure/arm-domainservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the Delete Domain Service operation deletes an existing Domain Service.
 *
 * @summary the Delete Domain Service operation deletes an existing Domain Service.
 * x-ms-original-file: 2025-10-01-preview/DeleteDomainService.json
 */
async function deleteDomainService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  await client.domainServices.delete("TestResourceGroup", "TestDomainService.com");
}

async function main() {
  await deleteDomainService();
}

main().catch(console.error);
