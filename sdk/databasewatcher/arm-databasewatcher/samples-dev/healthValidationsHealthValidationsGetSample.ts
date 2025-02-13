// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherClient } from "@azure/arm-databasewatcher";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a HealthValidation
 *
 * @summary get a HealthValidation
 * x-ms-original-file: 2025-01-02/HealthValidations_Get_MaximumSet_Gen.json
 */
async function healthValidationsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A76F9850-996B-40B3-94D4-C98110A0EEC9";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  const result = await client.healthValidations.HealthValidations_get(
    "rgWatcher",
    "testWatcher",
    "testHealthValidation",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await healthValidationsGetMaximumSet();
}

main().catch(console.error);
