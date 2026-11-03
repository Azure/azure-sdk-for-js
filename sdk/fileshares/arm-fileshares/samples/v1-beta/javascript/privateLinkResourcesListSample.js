// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FileSharesClient } = require("@azure/arm-fileshares");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a file share.
 *
 * @summary gets the private link resources that need to be created for a file share.
 * x-ms-original-file: 2026-06-01/PrivateLinkResources_ListByFileShare.json
 */
async function listPrivateLinkResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new FileSharesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.list("res4303", "testfileshare01")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateLinkResources();
}

main().catch(console.error);
