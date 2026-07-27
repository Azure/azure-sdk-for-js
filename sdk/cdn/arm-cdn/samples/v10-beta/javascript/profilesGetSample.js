// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group.
 *
 * @summary gets an Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group.
 * x-ms-original-file: 2025-12-01/Profiles_Get.json
 */
async function profilesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.profiles.get("RG", "profile1");
  console.log(result);
}

async function main() {
  await profilesGet();
}

main().catch(console.error);
