// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeOperatorClient } = require("@azure/arm-edgeoperator");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Azure Local Disconnected Operations (ALDO) system readiness status.
 *
 * @summary gets the Azure Local Disconnected Operations (ALDO) system readiness status.
 * x-ms-original-file: 2026-06-01-preview/SystemReadinessOperations_Get.json
 */
async function systemReadinessOperationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new EdgeOperatorClient(credential, subscriptionId);
  const result = await client.systemReadinessOperations.get();
  console.log(result);
}

async function main() {
  await systemReadinessOperationsGet();
}

main().catch(console.error);
