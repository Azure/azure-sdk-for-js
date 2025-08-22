// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to (INTERNAL - DO NOT USE) Deletes the specified private endpoint connection proxy associated with the device update account.
 *
 * @summary (INTERNAL - DO NOT USE) Deletes the specified private endpoint connection proxy associated with the device update account.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/PrivateEndpointConnectionProxies/PrivateEndpointConnectionProxy_Delete.json
 */

import { DeviceUpdate } from "@azure/arm-deviceupdate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateEndpointConnectionProxyDelete(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEVICEUPDATE_RESOURCE_GROUP"] || "test-rg";
  const accountName = "contoso";
  const privateEndpointConnectionProxyId = "peexample01";
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const result = await client.privateEndpointConnectionProxies.beginDeleteAndWait(
    resourceGroupName,
    accountName,
    privateEndpointConnectionProxyId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionProxyDelete();
}

main().catch(console.error);
