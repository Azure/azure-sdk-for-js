// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Branch
 *
 * @summary delete a Branch
 * x-ms-original-file: 2025-03-01/Branches_Delete_MaximumSet_Gen.json
 */
async function branchesDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  await client.branches.delete(
    "rgneon",
    "contoso-org",
    "sample-resource",
    "sample-resource",
  );
}

async function main(): Promise<void> {
  await branchesDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
