// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ExpressRouteCrossConnection} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the specified ExpressRouteCrossConnection.
 *
 * @summary Update the specified ExpressRouteCrossConnection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteCrossConnectionUpdate.json
 */
async function updateExpressRouteCrossConnection(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "CrossConnection-SiliconValley";
  const crossConnectionName = "<circuitServiceKey>";
  const parameters: ExpressRouteCrossConnection = {
    serviceProviderProvisioningState: "NotProvisioned",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.expressRouteCrossConnections.beginCreateOrUpdateAndWait(
      resourceGroupName,
      crossConnectionName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await updateExpressRouteCrossConnection();
}

main().catch(console.error);
