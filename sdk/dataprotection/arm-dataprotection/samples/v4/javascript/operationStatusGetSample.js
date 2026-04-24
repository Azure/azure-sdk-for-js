// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the operation status for a resource.
 *
 * @summary gets the operation status for a resource.
 * x-ms-original-file: 2025-07-01/GetOperationStatus.json
 */
async function getOperationStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.operationStatus.get(
    "WestUS",
    "MjkxOTMyODMtYTE3My00YzJjLTg5NjctN2E4MDIxNDA3NjA2OzdjNGE2ZWRjLWJjMmItNDRkYi1hYzMzLWY1YzEwNzk5Y2EyOA==",
  );
  console.log(result);
}

async function main() {
  await getOperationStatus();
}

main().catch(console.error);
