// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified authorization from the specified express route port.
 *
 * @summary gets the specified authorization from the specified express route port.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortAuthorizationGet.json
 */
async function getExpressRoutePortAuthorization(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePortAuthorizations.get(
    "rg1",
    "expressRoutePortName",
    "authorizationName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getExpressRoutePortAuthorization();
}

main().catch(console.error);
