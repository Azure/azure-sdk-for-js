// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a named rule set for a Confluent monitor.
 *
 * @summary gets a named rule set for a Confluent monitor.
 * x-ms-original-file: 2026-10-21-preview/MonitorTagRules_Get_MaximumSet_Gen.json
 */
async function monitorTagRulesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.monitorTagRules.get(
    "rgconfluent",
    "myOrganization",
    "productionLogs",
    "logRules",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorTagRulesGetMaximumSet();
}

main().catch(console.error);
