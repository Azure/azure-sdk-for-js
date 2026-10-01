// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified private link resource associated with the private link.
 *
 * @summary get the specified private link resource associated with the private link.
 * x-ms-original-file: 2026-01-01/PrivateLinkResources/PrivateLinkResources_Get.json
 */
async function getPrivateLinkResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.privateLinkResources.get("rg", "pls", "containers");
  console.log(result);
}

async function main() {
  await getPrivateLinkResource();
}

main().catch(console.error);
