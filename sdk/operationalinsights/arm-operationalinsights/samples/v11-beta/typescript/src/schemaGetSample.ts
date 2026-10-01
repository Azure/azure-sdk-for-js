// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the schema for a given workspace.
 *
 * @summary gets the schema for a given workspace.
 * x-ms-original-file: 2025-07-01/SavedSearchesGetSchema.json
 */
async function workspacesGetSchema(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.schema.get("mms-eus", "atlantisdemo");
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesGetSchema();
}

main().catch(console.error);
