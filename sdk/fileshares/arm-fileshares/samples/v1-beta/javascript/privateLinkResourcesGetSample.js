// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FileSharesClient } = require("@azure/arm-fileshares");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a file share.
 *
 * @summary gets the private link resources that need to be created for a file share.
 * x-ms-original-file: 2026-06-01/PrivateLinkResources_Get.json
 */
async function getPrivateLinkResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get("res4303", "testfileshare01", "fileshare");
  console.log(result);
}

async function main() {
  await getPrivateLinkResource();
}

main().catch(console.error);
