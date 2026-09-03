// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if a provisioning service name is available. This will validate if the name is syntactically valid and if the name is usable
 *
 * @summary check if a provisioning service name is available. This will validate if the name is syntactically valid and if the name is usable
 * x-ms-original-file: 2025-02-01-preview/DPSCheckNameAvailability.json
 */
async function dpsCheckName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.checkProvisioningServiceNameAvailability({
    name: "test213123",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await dpsCheckName();
}

main().catch(console.error);
