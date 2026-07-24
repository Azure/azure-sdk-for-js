// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a dataController resource
 *
 * @summary deletes a dataController resource
 * x-ms-original-file: 2026-03-01-preview/DeleteDataController.json
 */
async function deleteADataController(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  await client.dataControllers.deleteDataController("testrg", "testdataController");
}

async function main(): Promise<void> {
  await deleteADataController();
}

main().catch(console.error);
