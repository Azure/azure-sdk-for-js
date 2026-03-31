// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all available server variables.
 *
 * @summary lists all available server variables.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayAvailableServerVariablesGet.json
 */
async function getAvailableServerVariables(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "72f988bf-86f1-41af-91ab-2d7cd011db47";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.listAvailableServerVariables();
  console.log(result);
}

async function main(): Promise<void> {
  await getAvailableServerVariables();
}

main().catch(console.error);
