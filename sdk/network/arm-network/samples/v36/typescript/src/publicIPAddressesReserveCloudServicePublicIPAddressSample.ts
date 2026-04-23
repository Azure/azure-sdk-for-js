// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ReserveCloudServicePublicIpAddressRequest} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Reserves the specified Cloud Service Public IP by switching its allocation method to Static. If rollback is requested, reverts the allocation method to Dynamic.
 *
 * @summary Reserves the specified Cloud Service Public IP by switching its allocation method to Static. If rollback is requested, reverts the allocation method to Dynamic.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PublicIpAddressReserve.json
 */
async function reservePublicIPAddress(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const publicIpAddressName = "test-ip";
  const parameters: ReserveCloudServicePublicIpAddressRequest = {
    isRollback: "false",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.publicIPAddresses.beginReserveCloudServicePublicIpAddressAndWait(
      resourceGroupName,
      publicIpAddressName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await reservePublicIPAddress();
}

main().catch(console.error);
