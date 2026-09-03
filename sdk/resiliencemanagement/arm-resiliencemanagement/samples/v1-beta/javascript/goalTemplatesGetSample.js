// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a GoalTemplate
 *
 * @summary get a GoalTemplate
 * x-ms-original-file: 2026-04-01-preview/GoalTemplates_Get_MaximumSet_Gen.json
 */
async function goalTemplatesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.goalTemplates.get("qsqjquhxpermcblvegajq", "gt1");
  console.log(result);
}

async function main() {
  await goalTemplatesGetMaximumSet();
}

main().catch(console.error);
