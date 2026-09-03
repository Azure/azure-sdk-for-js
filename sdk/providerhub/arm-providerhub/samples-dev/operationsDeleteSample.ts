// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an operation.
 *
 * @summary deletes an operation.
 * x-ms-original-file: 2024-09-01/Operations_Delete.json
 */
async function operationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.operations.delete("Microsoft.Contoso");
}

async function main(): Promise<void> {
  await operationsDelete();
}

main().catch(console.error);
