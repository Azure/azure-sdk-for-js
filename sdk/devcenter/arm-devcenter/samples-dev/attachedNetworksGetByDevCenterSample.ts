// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an attached NetworkConnection.
 *
 * @summary Gets an attached NetworkConnection.
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/AttachedNetworks_GetByDevCenter.json
 */

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function attachedNetworksGetByDevCenter(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] || "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const devCenterName = "Contoso";
  const attachedNetworkConnectionName = "network-uswest3";
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.attachedNetworks.getByDevCenter(
    resourceGroupName,
    devCenterName,
    attachedNetworkConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await attachedNetworksGetByDevCenter();
}

main().catch(console.error);
