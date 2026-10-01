// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing QueryPack's tags. To update other fields use the CreateOrUpdate method.
 *
 * @summary updates an existing QueryPack's tags. To update other fields use the CreateOrUpdate method.
 * x-ms-original-file: 2025-07-01/QueryPacksUpdateTagsOnly.json
 */
async function queryPackUpdateTagsOnly(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.queryPacks.updateTags("my-resource-group", "my-querypack", {
    tags: { Tag1: "Value1", Tag2: "Value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await queryPackUpdateTagsOnly();
}

main().catch(console.error);
