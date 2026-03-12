// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Perform manual fail over of given hub
 *
 * @summary Perform manual fail over of given hub
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/preview/2019-07-01-preview/examples/IotHub_ManualFailover.json
 */

import type { FailoverInput } from "@azure/arm-iothub-profile-2020-09-01-hybrid";
import { IotHubClient } from "@azure/arm-iothub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function iotHubManualFailover(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const iotHubName = "testHub";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const failoverInput: FailoverInput = { failoverRegion: "testHub" };
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHub.beginManualFailoverAndWait(
    iotHubName,
    resourceGroupName,
    failoverInput,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubManualFailover();
}

main().catch(console.error);
