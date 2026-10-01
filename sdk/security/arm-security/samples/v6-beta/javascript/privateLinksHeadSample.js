// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks whether private link exists.
 *
 * @summary checks whether private link exists.
 * x-ms-original-file: 2026-01-01/PrivateLinks/PrivateLinks_Head.json
 */
async function checksWhetherPrivateLinkExists() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.privateLinks.head("rg", "spl");
}

async function main() {
  await checksWhetherPrivateLinkExists();
}

main().catch(console.error);
