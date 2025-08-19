// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the status of a long running operation, such as create, update or delete a provisioning service.
 *
 * @summary Gets the status of a long running operation, such as create, update or delete a provisioning service.
 * x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/preview/2023-03-01-preview/examples/DPSGetOperationResult.json
 */
async function dpsGetOperationResult(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEPROVISIONINGSERVICES_SUBSCRIPTION_ID"] ||
    "91d12660-3dec-467a-be2a-213b5544ddc0";
  const operationId = "MTY5OTNmZDctODI5Yy00N2E2LTkxNDQtMDU1NGIyYzY1ZjRl";
  const resourceGroupName =
    process.env["DEVICEPROVISIONINGSERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const provisioningServiceName = "myFirstProvisioningService";
  const asyncinfo = "1508265712453";
  const credential = new DefaultAzureCredential();
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.getOperationResult(
    operationId,
    resourceGroupName,
    provisioningServiceName,
    asyncinfo,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dpsGetOperationResult();
}

main().catch(console.error);
