// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified NSP link resource.
 *
 * @summary gets the specified NSP link resource.
 * x-ms-original-file: 2025-05-01/NspLinkGet.json
 */
async function nspLinksGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterLinks.get("rg1", "nsp1", "link1");
  console.log(result);
}

async function main() {
  await nspLinksGet();
}

main().catch(console.error);
