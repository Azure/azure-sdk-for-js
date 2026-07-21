// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a given incident.
 *
 * @summary gets a given incident.
 * x-ms-original-file: 2025-07-01-preview/incidents/Incidents_Get.json
 */
async function incidentsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.incidents.get(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await incidentsGet();
}

main().catch(console.error);
