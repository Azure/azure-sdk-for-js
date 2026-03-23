// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Project
 *
 * @summary get a Project
 * x-ms-original-file: 2026-02-01-preview/Projects_Get_MaximumSet_Gen.json
 */
async function projectsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.projects.get(
    "rgdiscovery",
    "aa8419d5add7095abd",
    "4884cf65356e9c3489",
  );
  console.log(result);
}

async function main() {
  await projectsGetMaximumSet();
}

main().catch(console.error);
