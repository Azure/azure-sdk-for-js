// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationInputs } from "@azure/arm-deviceprovisioningservices";
import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Check if a provisioning service name is available. This will validate if the name is syntactically valid and if the name is usable
 *
 * @summary Check if a provisioning service name is available. This will validate if the name is syntactically valid and if the name is usable
 * x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/preview/2023-03-01-preview/examples/DPSCheckNameAvailability.json
 */
async function dpsCheckName(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEPROVISIONINGSERVICES_SUBSCRIPTION_ID"] ||
    "91d12660-3dec-467a-be2a-213b5544ddc0";
  const argumentsParam: OperationInputs = { name: "test213123" };
  const credential = new DefaultAzureCredential();
  const client = new IotDpsClient(credential, subscriptionId);
  const result =
    await client.iotDpsResource.checkProvisioningServiceNameAvailability(argumentsParam);
  console.log(result);
}

async function main(): Promise<void> {
  await dpsCheckName();
}

main().catch(console.error);
