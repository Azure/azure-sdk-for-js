// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the status of a long running operation, such as create, update or delete a provisioning service.
 *
 * @summary gets the status of a long running operation, such as create, update or delete a provisioning service.
 * x-ms-original-file: 2025-02-01-preview/DPSGetOperationResult.json
 */
async function dpsGetOperationResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.getOperationResult(
    "myResourceGroup",
    "myFirstProvisioningService",
    "MTY5OTNmZDctODI5Yy00N2E2LTkxNDQtMDU1NGIyYzY1ZjRl",
    "1508265712453",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dpsGetOperationResult();
}

main().catch(console.error);
