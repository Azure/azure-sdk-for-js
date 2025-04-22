// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseClient } from "@azure/arm-iotfirmwaredefense";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the firmware analysis workspaces in the specified subscription.
 *
 * @summary lists all of the firmware analysis workspaces in the specified subscription.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_ListBySubscription_MaximumSet_Gen.json
 */
async function workspacesListBySubscriptionMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of the firmware analysis workspaces in the specified subscription.
 *
 * @summary lists all of the firmware analysis workspaces in the specified subscription.
 * x-ms-original-file: 2025-04-01-preview/Workspaces_ListBySubscription_MinimumSet_Gen.json
 */
async function workspacesListBySubscriptionMaximumSetGenGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5C707B5F-6130-4F71-819E-953A28942E88";
  const client = new IoTFirmwareDefenseClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workspacesListBySubscriptionMaximumSetGenGeneratedByMaximumSetRule();
  await workspacesListBySubscriptionMaximumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
