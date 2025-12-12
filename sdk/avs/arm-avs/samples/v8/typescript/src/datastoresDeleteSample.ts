// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Datastore
 *
 * @summary delete a Datastore
 * x-ms-original-file: 2025-09-01/Datastores_Delete.json
 */
async function datastoresDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.datastores.delete("group1", "cloud1", "cluster1", "datastore1");
}

async function main(): Promise<void> {
  await datastoresDelete();
}

main().catch(console.error);
