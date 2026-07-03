// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves detailed properties of the Availability Group.
 *
 * @summary retrieves detailed properties of the Availability Group.
 * x-ms-original-file: 2026-03-01-preview/ViewArcSqlServerAvailabilityGroup.json
 */
async function detailViewForAServerAvailabilityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerAvailabilityGroups.detailView(
    "testrg",
    "testSqlServer_INST1",
    "testAG",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await detailViewForAServerAvailabilityGroup();
}

main().catch(console.error);
