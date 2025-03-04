// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DatabaseWatcherClient } = require("@azure/arm-databasewatcher");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a HealthValidation
 *
 * @summary get a HealthValidation
 * x-ms-original-file: 2025-01-02/HealthValidations_Get_MaximumSet_Gen.json
 */
async function healthValidationsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A76F9850-996B-40B3-94D4-C98110A0EEC9";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  const result = await client.healthValidations.get(
    "rgWatcher",
    "testWatcher",
    "testHealthValidation",
  );
  console.log(result);
}

async function main() {
  await healthValidationsGetMaximumSet();
}

main().catch(console.error);
