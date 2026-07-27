// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers playbook on a specific incident
 *
 * @summary triggers playbook on a specific incident
 * x-ms-original-file: 2025-07-01-preview/manualTrigger/Incidents_RunPlaybook.json
 */
async function incidentsRunPlaybook(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.incidents.runPlaybook(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ar4",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await incidentsRunPlaybook();
}

main().catch(console.error);
