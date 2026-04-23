// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks whether the Batch account name is available in the specified region.
 *
 * @summary checks whether the Batch account name is available in the specified region.
 * x-ms-original-file: 2025-06-01/LocationCheckNameAvailability_AlreadyExists.json
 */
async function locationCheckNameAvailabilityAlreadyExists(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.location.checkNameAvailability("japaneast", {
    name: "existingaccountname",
    type: "Microsoft.Batch/batchAccounts",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to checks whether the Batch account name is available in the specified region.
 *
 * @summary checks whether the Batch account name is available in the specified region.
 * x-ms-original-file: 2025-06-01/LocationCheckNameAvailability_Available.json
 */
async function locationCheckNameAvailabilityAvailable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.location.checkNameAvailability("japaneast", {
    name: "newaccountname",
    type: "Microsoft.Batch/batchAccounts",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await locationCheckNameAvailabilityAlreadyExists();
  await locationCheckNameAvailabilityAvailable();
}

main().catch(console.error);
