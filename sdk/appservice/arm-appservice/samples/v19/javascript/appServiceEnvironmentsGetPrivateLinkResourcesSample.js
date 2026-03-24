// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets the private link resources
 *
 * @summary description for Gets the private link resources
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_GetPrivateLinkResources.json
 */
async function getsThePrivateLinkResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.getPrivateLinkResources("test-rg", "test-ase");
  console.log(result);
}

async function main() {
  await getsThePrivateLinkResources();
}

main().catch(console.error);
