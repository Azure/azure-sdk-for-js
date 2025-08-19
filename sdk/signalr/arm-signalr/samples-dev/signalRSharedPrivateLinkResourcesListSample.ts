// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List shared private link resources
 *
 * @summary List shared private link resources
 * x-ms-original-file: specification/signalr/resource-manager/Microsoft.SignalRService/preview/2023-08-01-preview/examples/SignalRSharedPrivateLinkResources_List.json
 */

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function signalRSharedPrivateLinkResourcesList(): Promise<void> {
  const subscriptionId =
    process.env["SIGNALR_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SIGNALR_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "mySignalRService";
  const credential = new DefaultAzureCredential();
  const client = new SignalRManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.signalRSharedPrivateLinkResources.list(
    resourceGroupName,
    resourceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await signalRSharedPrivateLinkResourcesList();
}

main().catch(console.error);
