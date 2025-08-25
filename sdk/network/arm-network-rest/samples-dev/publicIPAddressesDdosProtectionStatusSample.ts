// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the Ddos Protection Status of a Public IP Address
 *
 * @summary Gets the Ddos Protection Status of a Public IP Address
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PublicIpAddressGetDdosProtectionStatus.json
 */

import type { PublicIPAddressesDdosProtectionStatusParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDdosProtectionStatusOfAPublicIPAddress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const publicIpAddressName = "test-pip";
  const options: PublicIPAddressesDdosProtectionStatusParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}/ddosProtectionStatus",
      subscriptionId,
      resourceGroupName,
      publicIpAddressName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

getDdosProtectionStatusOfAPublicIPAddress().catch(console.error);
