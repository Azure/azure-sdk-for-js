// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an Arc Sql Server availability group resource.
 *
 * @summary deletes an Arc Sql Server availability group resource.
 * x-ms-original-file: 2026-03-01-preview/DeleteArcSqlServerAvailabilityGroup.json
 */
async function deletesAAvailabilityGroupResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  await client.sqlServerAvailabilityGroups.delete(
    "testrg",
    "testsqlInstanceAvailabilityGroup",
    "testAG",
  );
}

async function main(): Promise<void> {
  await deletesAAvailabilityGroupResource();
}

main().catch(console.error);
