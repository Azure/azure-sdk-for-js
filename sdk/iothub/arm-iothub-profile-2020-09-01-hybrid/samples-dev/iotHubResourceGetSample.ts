// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the non-security related metadata of an IoT hub.
 *
 * @summary Get the non-security related metadata of an IoT hub.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/preview/2019-07-01-preview/examples/iothub_get.json
 */

import { IotHubClient } from "@azure/arm-iothub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function iotHubResourceGet(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "testHub";
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.get(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceGet();
}

main().catch(console.error);
