// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a RoleMapping
 *
 * @summary delete a RoleMapping
 * x-ms-original-file: 2026-07-03-preview/RoleMappings_Delete_MaximumSet_Gen.json
 */
async function roleMappingsDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1B4766AF-8D4B-4B44-9CF1-587E003DFF7F";
  const client = new ContentStoreClient(credential, subscriptionId);
  await client.roleMappings.delete("rgcommvault", "myCloudAccount");
}

async function main(): Promise<void> {
  await roleMappingsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
