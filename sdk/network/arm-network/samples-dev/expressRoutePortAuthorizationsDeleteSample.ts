// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified authorization from the specified express route port.
 *
 * @summary Deletes the specified authorization from the specified express route port.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/ExpressRoutePortAuthorizationDelete.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteExpressRoutePortAuthorization(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const expressRoutePortName = "expressRoutePortName";
  const authorizationName = "authorizationName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePortAuthorizations.beginDeleteAndWait(
    resourceGroupName,
    expressRoutePortName,
    authorizationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteExpressRoutePortAuthorization();
}

main().catch(console.error);
