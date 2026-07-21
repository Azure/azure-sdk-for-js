// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainServicesResourceProvider } = require("@azure/arm-domainservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the Get Domain Service operation retrieves a json representation of the Domain Service.
 *
 * @summary the Get Domain Service operation retrieves a json representation of the Domain Service.
 * x-ms-original-file: 2025-10-01-preview/GetDomainService.json
 */
async function getDomainService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const result = await client.domainServices.get("TestResourceGroup", "TestDomainService.com");
  console.log(result);
}

async function main() {
  await getDomainService();
}

main().catch(console.error);
