// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists available Ssl options for configuring Ssl policy.
 *
 * @summary Lists available Ssl options for configuring Ssl policy.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ApplicationGatewayAvailableSslOptionsGet.json
 */
async function getAvailableSslOptions(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.listAvailableSslOptions();
  console.log(result);
}

async function main(): Promise<void> {
  await getAvailableSslOptions();
}

main().catch(console.error);
