// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing origin within an endpoint.
 *
 * @summary updates an existing origin within an endpoint.
 * x-ms-original-file: 2025-12-01/Origins_Update.json
 */
async function originsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.origins.update("RG", "profile1", "endpoint1", "www-someDomain-net", {
    enabled: true,
    httpPort: 42,
    httpsPort: 43,
    originHostHeader: "www.someDomain2.net",
    priority: 1,
    privateLinkAlias:
      "APPSERVER.d84e61f0-0870-4d24-9746-7438fa0019d1.westus2.azure.privatelinkservice",
    weight: 50,
  });
  console.log(result);
}

async function main() {
  await originsUpdate();
}

main().catch(console.error);
