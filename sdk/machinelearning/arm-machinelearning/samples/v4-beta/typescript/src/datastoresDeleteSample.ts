// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete datastore.
 *
 * @summary delete datastore.
 * x-ms-original-file: 2025-12-01/Datastore/delete.json
 */
async function deleteDatastore(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.datastores.delete("test-rg", "my-aml-workspace", "string");
}

async function main(): Promise<void> {
  await deleteDatastore();
}

main().catch(console.error);
