// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an existing AzureFrontDoor domain with the specified domain name under the specified subscription, resource group and profile.
 *
 * @summary gets an existing AzureFrontDoor domain with the specified domain name under the specified subscription, resource group and profile.
 * x-ms-original-file: 2025-12-01/AFDCustomDomains_Get.json
 */
async function afdCustomDomainsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdCustomDomains.get("RG", "profile1", "domain1");
  console.log(result);
}

async function main() {
  await afdCustomDomainsGet();
}

main().catch(console.error);
