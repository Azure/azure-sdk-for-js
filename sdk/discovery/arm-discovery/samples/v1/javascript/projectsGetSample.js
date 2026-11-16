// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Project
 *
 * @summary get a Project
 * x-ms-original-file: 2026-06-01/Projects_Get_MaximumSet_Gen.json
 */
async function projectsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.projects.get(
    "rgdiscovery",
    "80895d77522bf22889",
    "b8f0217d144f00d223",
  );
  console.log(result);
}

async function main() {
  await projectsGetMaximumSet();
}

main().catch(console.error);
