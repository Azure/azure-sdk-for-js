// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a service.
 *
 * @summary gets the private link resources that need to be created for a service.
 * x-ms-original-file: 2025-04-01-preview/legacy/PrivateLinkResourcesListByService.json
 */
async function privateLinkResourcesListGroupIds() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.listByService("rgname", "service1");
  console.log(result);
}

async function main() {
  await privateLinkResourcesListGroupIds();
}

main().catch(console.error);
