// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvaultcontentstore";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a RoleMapping
 *
 * @summary get a RoleMapping
 * x-ms-original-file: 2026-07-03-preview/RoleMappings_Get_MaximumSet_Gen.json
 */
async function roleMappingsGetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1B4766AF-8D4B-4B44-9CF1-587E003DFF7F";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.roleMappings.get("rgcommvault", "myCloudAccount");
  console.log(result);
}

/**
 * This sample demonstrates how to get a RoleMapping
 *
 * @summary get a RoleMapping
 * x-ms-original-file: 2026-07-03-preview/RoleMappings_Get_MinimumSet_Gen.json
 */
async function roleMappingsGetMinimumSetGetRoleMappingsWithSingleRole(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1B4766AF-8D4B-4B44-9CF1-587E003DFF7F";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.roleMappings.get("rgcommvault", "myCloudAccount");
  console.log(result);
}

async function main(): Promise<void> {
  await roleMappingsGetMaximumSetGeneratedByMaximumSetRule();
  await roleMappingsGetMinimumSetGetRoleMappingsWithSingleRole();
}

main().catch(console.error);
