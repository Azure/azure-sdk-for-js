// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of network security perimeter configurations for a search service.
 *
 * @summary gets a list of network security perimeter configurations for a search service.
 * x-ms-original-file: 2026-03-01-preview/NetworkSecurityPerimeterConfigurationsListByService.json
 */
async function listNSPConfigsBySearchService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterConfigurations.listByService(
    "rg1",
    "mysearchservice",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listNSPConfigsBySearchService();
}

main().catch(console.error);
