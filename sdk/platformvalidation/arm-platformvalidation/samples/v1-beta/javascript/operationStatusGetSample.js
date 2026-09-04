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
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.operationStatus.get("obkgllzbzclv", "mewjfcrlycxuylboqxenpnsxxgcncx");
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
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.operationStatus.get("obkgllzbzclv", "mewjfcrlycxuylboqxenpnsxxgcncx");
  console.log(result);
}

async function main() {
  await operationStatusGetMaximumSet();
  await operationStatusGetMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
