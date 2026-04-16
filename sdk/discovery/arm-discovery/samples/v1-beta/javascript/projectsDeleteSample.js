// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Project
 *
 * @summary delete a Project
 * x-ms-original-file: 2026-02-01-preview/Projects_Delete_MaximumSet_Gen.json
 */
async function projectsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.projects.delete("rgdiscovery", "5020af62f469b308c0", "9ae1e783de71d4e949");
}

async function main() {
  await projectsDeleteMaximumSet();
}

main().catch(console.error);
