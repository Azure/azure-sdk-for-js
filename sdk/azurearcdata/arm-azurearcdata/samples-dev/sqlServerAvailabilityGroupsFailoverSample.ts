// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to request manual failover of the availability group to this server.
 *
 * @summary request manual failover of the availability group to this server.
 * x-ms-original-file: 2026-03-01-preview/FailoverArcSqlServerAvailabilityGroup.json
 */
async function availabilityGroupManualFailoverToThisServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerAvailabilityGroups.failover(
    "testrg",
    "testSqlServer_INST1",
    "testAG",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await availabilityGroupManualFailoverToThisServer();
}

main().catch(console.error);
