// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Relationship
 *
 * @summary get a Relationship
 * x-ms-original-file: 2026-05-01-preview/Relationships_Get.json
 */
async function relationshipsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.relationships.get(
    "online-store-rg",
    "online-store",
    "web-frontend-to-orders-api",
  );
  console.log(result);
}

async function main() {
  await relationshipsGet();
}

main().catch(console.error);
