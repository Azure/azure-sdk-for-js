// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Branch
 *
 * @summary get a Branch
 * x-ms-original-file: 2025-03-01/Branches_Get_MaximumSet_Gen.json
 */
async function branchesGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.branches.get(
    "rgneon",
    "contoso-org",
    "sample-resource",
    "sample-resource",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await branchesGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
