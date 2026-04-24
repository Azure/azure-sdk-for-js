// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all available server variables.
 *
 * @summary Lists all available server variables.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ApplicationGatewayAvailableServerVariablesGet.json
 */
async function getAvailableServerVariables(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "72f988bf-86f1-41af-91ab-2d7cd0dddd4";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.applicationGateways.listAvailableServerVariables();
  console.log(result);
}

async function main(): Promise<void> {
  await getAvailableServerVariables();
}

main().catch(console.error);
