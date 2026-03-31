// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified NSP linkReference resource.
 *
 * @summary gets the specified NSP linkReference resource.
 * x-ms-original-file: 2025-05-01/NspLinkReferenceGet.json
 */
async function nspLinkReferencesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterLinkReferences.get(
    "rg1",
    "nsp2",
    "link1-guid",
  );
  console.log(result);
}

async function main() {
  await nspLinkReferencesGet();
}

main().catch(console.error);
