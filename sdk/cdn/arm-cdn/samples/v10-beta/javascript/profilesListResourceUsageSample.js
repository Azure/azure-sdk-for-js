// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks the quota and actual usage of endpoints under the given Azure Front Door Standard or Azure Front Door Premium or CDN profile.
 *
 * @summary checks the quota and actual usage of endpoints under the given Azure Front Door Standard or Azure Front Door Premium or CDN profile.
 * x-ms-original-file: 2025-12-01/Profiles_ListResourceUsage.json
 */
async function profilesListResourceUsage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.profiles.listResourceUsage("RG", "profile1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await profilesListResourceUsage();
}

main().catch(console.error);
