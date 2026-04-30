// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DisassociateCloudServicePublicIpRequest} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Disassociates the Cloud Service reserved Public IP and associates the specified Standalone Public IP to the same Cloud Service frontend.
 *
 * @summary Disassociates the Cloud Service reserved Public IP and associates the specified Standalone Public IP to the same Cloud Service frontend.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PublicIpAddressDisassociateCloudServiceReservedPublicIp.json
 */
async function disassociatePublicIPAddress(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const publicIpAddressName = "pip1";
  const parameters: DisassociateCloudServicePublicIpRequest = {
    publicIpArmId:
      "/subscriptions/subid/resourcegroups/rg1/providers/Microsoft.Network/publicIpAddresses/pip2",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.publicIPAddresses.beginDisassociateCloudServiceReservedPublicIpAndWait(
      resourceGroupName,
      publicIpAddressName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await disassociatePublicIPAddress();
}

main().catch(console.error);
