// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a Project
 *
 * @summary get a Project
 * x-ms-original-file: 2025-03-01/Projects_Get_MaximumSet_Gen.json
 */

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

async function projectsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.projects.get("rgneon", "test-org", "entity-name");
  console.log(result);
}

async function main(): Promise<void> {
  await projectsGetMaximumSet();
}

main().catch(console.error);
