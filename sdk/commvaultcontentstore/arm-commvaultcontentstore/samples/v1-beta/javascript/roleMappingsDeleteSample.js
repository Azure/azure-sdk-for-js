// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvaultcontentstore");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a RoleMapping
 *
 * @summary delete a RoleMapping
 * x-ms-original-file: 2026-07-03-preview/RoleMappings_Delete_MaximumSet_Gen.json
 */
async function roleMappingsDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1B4766AF-8D4B-4B44-9CF1-587E003DFF7F";
  const client = new ContentStoreClient(credential, subscriptionId);
  await client.roleMappings.delete("rgcommvault", "myCloudAccount");
}

async function main() {
  await roleMappingsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
