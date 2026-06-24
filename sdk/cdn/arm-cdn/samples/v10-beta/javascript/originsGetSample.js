// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an existing origin within an endpoint.
 *
 * @summary gets an existing origin within an endpoint.
 * x-ms-original-file: 2025-12-01/Origins_Get.json
 */
async function originsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.origins.get("RG", "profile1", "endpoint1", "www-someDomain-net");
  console.log(result);
}

async function main() {
  await originsGet();
}

main().catch(console.error);
