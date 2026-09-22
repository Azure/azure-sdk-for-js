// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformValidationClient } = require("@azure/arm-platformvalidation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the current status of an async operation.
 *
 * @summary returns the current status of an async operation.
 * x-ms-original-file: 2026-08-01-preview/OperationStatus_Get_MaximumSet_Gen.json
 */
async function operationStatusGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.operationStatus.get(
    "southcentralus",
    "11111111-1111-4111-8111-111111111111",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to returns the current status of an async operation.
 *
 * @summary returns the current status of an async operation.
 * x-ms-original-file: 2026-08-01-preview/OperationStatus_Get_MinimumSet_Gen.json
 */
async function operationStatusGetMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.operationStatus.get(
    "southcentralus",
    "11111111-1111-4111-8111-111111111111",
  );
  console.log(result);
}

async function main() {
  await operationStatusGetMaximumSet();
  await operationStatusGetMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
