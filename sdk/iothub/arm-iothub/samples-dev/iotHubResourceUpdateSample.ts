// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TagsResource } from "@azure/arm-iothub";
import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update an existing IoT Hub tags. to update other fields use the CreateOrUpdate method
 *
 * @summary Update an existing IoT Hub tags. to update other fields use the CreateOrUpdate method
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/stable/2023-06-30/examples/iothub_patch.json
 */
async function iotHubResourceUpdate(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myHub";
  const iotHubTags: TagsResource = { tags: { foo: "bar" } };
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.beginUpdateAndWait(
    resourceGroupName,
    resourceName,
    iotHubTags,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceUpdate();
}

main().catch(console.error);
