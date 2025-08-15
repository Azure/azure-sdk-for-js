// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TagUpdate } from "@azure/arm-deviceupdate";
import { DeviceUpdate } from "@azure/arm-deviceupdate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates instance's tags.
 *
 * @summary Updates instance's tags.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/Instances/Instances_Update.json
 */
async function updatesInstance(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEVICEUPDATE_RESOURCE_GROUP"] || "test-rg";
  const accountName = "contoso";
  const instanceName = "blue";
  const tagUpdatePayload: TagUpdate = { tags: { tagKey: "tagValue" } };
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const result = await client.instances.update(
    resourceGroupName,
    accountName,
    instanceName,
    tagUpdatePayload,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesInstance();
}

main().catch(console.error);
