// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Operation status
 *
 * @summary get Operation status
 * x-ms-original-file: 2022-09-01/LocationOperationStatus_Get.json
 */
async function locationOperationStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.locationOperationStatus(
    "westus",
    "eyJwYXJ0aXRpb25JZCI6ImE1ZDNiMDU4LTYwN2MtNDI0Ny05Y2FmLWJlZmU4NGQ0ZDU0NyIsIndvcmtmbG93SWQiOiJjYzg1MTY2YS0xMjI2LTQ4MGYtYWM5ZC1jMmRhNTVmY2M2ODYiLCJ3b3JrZmxvd09wZXJhdGlvbklkIjoiOTdmODU5ZTAtOGY1MC00ZTg4LWJkZDEtNWZlYzgwYTVlYzM0tui=",
  );
  console.log(result);
}

async function main() {
  await locationOperationStatus();
}

main().catch(console.error);
