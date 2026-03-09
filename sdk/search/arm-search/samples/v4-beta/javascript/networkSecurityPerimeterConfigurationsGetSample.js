// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a network security perimeter configuration.
 *
 * @summary gets a network security perimeter configuration.
 * x-ms-original-file: 2025-05-01/NetworkSecurityPerimeterConfigurationsGet.json
 */
async function getAnNSPConfigByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.get(
    "rg1",
    "mysearchservice",
    "00000001-2222-3333-4444-111144444444.assoc1",
  );
  console.log(result);
}

async function main() {
  await getAnNSPConfigByName();
}

main().catch(console.error);
