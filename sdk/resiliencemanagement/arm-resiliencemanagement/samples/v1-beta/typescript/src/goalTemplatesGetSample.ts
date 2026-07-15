// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a GoalTemplate
 *
 * @summary get a GoalTemplate
 * x-ms-original-file: 2026-04-01-preview/GoalTemplates_Get_MaximumSet_Gen.json
 */
async function goalTemplatesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.goalTemplates.get("qsqjquhxpermcblvegajq", "gt1");
  console.log(result);
}

async function main(): Promise<void> {
  await goalTemplatesGetMaximumSet();
}

main().catch(console.error);
