// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the current status of an async operation.
 *
 * @summary returns the current status of an async operation.
 * x-ms-original-file: 2024-11-01/Get_OperationStatus.json
 */
async function getOperationStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.operationStatus.get(
    "testLocation",
    "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  );
  console.log(result);
}

async function main() {
  await getOperationStatus();
}

main().catch(console.error);
