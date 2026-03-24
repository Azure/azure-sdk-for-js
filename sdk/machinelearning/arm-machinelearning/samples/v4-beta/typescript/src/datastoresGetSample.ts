// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get datastore.
 *
 * @summary get datastore.
 * x-ms-original-file: 2025-12-01/Datastore/get.json
 */
async function getDatastore(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.datastores.get("test-rg", "my-aml-workspace", "string");
  console.log(result);
}

async function main(): Promise<void> {
  await getDatastore();
}

main().catch(console.error);
