// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all private link resources in a private link.
 *
 * @summary list all private link resources in a private link.
 * x-ms-original-file: 2026-01-01/PrivateLinkResources/PrivateLinkResources_ListByPrivateLink.json
 */
async function listPrivateLinkResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.list("rg", "pls")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateLinkResources();
}

main().catch(console.error);
