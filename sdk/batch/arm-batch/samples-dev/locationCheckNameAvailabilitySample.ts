// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks whether the Batch account name is available in the specified region.
 *
 * @summary Checks whether the Batch account name is available in the specified region.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2024-07-01/examples/LocationCheckNameAvailability_AlreadyExists.json
 */

import type { CheckNameAvailabilityParameters } from "@azure/arm-batch";
import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function locationCheckNameAvailabilityAlreadyExists(): Promise<void> {
  const subscriptionId = process.env["BATCH_SUBSCRIPTION_ID"] || "subid";
  const locationName = "japaneast";
  const parameters: CheckNameAvailabilityParameters = {
    name: "existingaccountname",
    type: "Microsoft.Batch/batchAccounts",
  };
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.location.checkNameAvailability(locationName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Checks whether the Batch account name is available in the specified region.
 *
 * @summary Checks whether the Batch account name is available in the specified region.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2024-07-01/examples/LocationCheckNameAvailability_Available.json
 */
async function locationCheckNameAvailabilityAvailable(): Promise<void> {
  const subscriptionId = process.env["BATCH_SUBSCRIPTION_ID"] || "subid";
  const locationName = "japaneast";
  const parameters: CheckNameAvailabilityParameters = {
    name: "newaccountname",
    type: "Microsoft.Batch/batchAccounts",
  };
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.location.checkNameAvailability(locationName, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await locationCheckNameAvailabilityAlreadyExists();
  await locationCheckNameAvailabilityAvailable();
}

main().catch(console.error);
