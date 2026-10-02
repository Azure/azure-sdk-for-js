// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ResourceAnchor
 *
 * @summary create a ResourceAnchor
 * x-ms-original-file: 2026-06-01/ResourceAnchors_CreateOrUpdate_MaximumSet_Gen.json
 */
async function resourceAnchorsCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.resourceAnchors.createOrUpdate("rgopenapi", "resource1", {
    properties: {},
    tags: { key2309: "example" },
    location: "qbkti",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await resourceAnchorsCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
