// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new origin within the specified endpoint.
 *
 * @summary creates a new origin within the specified endpoint.
 * x-ms-original-file: 2025-12-01/Origins_Create.json
 */
async function originsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.origins.create("RG", "profile1", "endpoint1", "www-someDomain-net", {
    enabled: true,
    hostName: "www.someDomain.net",
    httpPort: 80,
    httpsPort: 443,
    originHostHeader: "www.someDomain.net",
    priority: 1,
    privateLinkApprovalMessage: "Please approve the connection request for this Private Link",
    privateLinkLocation: "eastus",
    privateLinkResourceId:
      "/subscriptions/subid/resourcegroups/rg1/providers/Microsoft.Network/privateLinkServices/pls1",
    weight: 50,
  });
  console.log(result);
}

async function main() {
  await originsCreate();
}

main().catch(console.error);
