// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates VpnSite tags.
 *
 * @summary updates VpnSite tags.
 * x-ms-original-file: 2025-05-01/VpnSiteUpdateTags.json
 */
async function vpnSiteUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnSites.updateTags("rg1", "vpnSite1", {
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main() {
  await vpnSiteUpdate();
}

main().catch(console.error);
