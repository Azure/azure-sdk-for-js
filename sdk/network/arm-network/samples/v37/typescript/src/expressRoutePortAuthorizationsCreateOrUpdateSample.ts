// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an authorization in the specified express route port.
 *
 * @summary creates or updates an authorization in the specified express route port.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortAuthorizationCreate.json
 */
async function createExpressRoutePortAuthorization(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePortAuthorizations.createOrUpdate(
    "rg1",
    "expressRoutePortName",
    "authorizatinName",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createExpressRoutePortAuthorization();
}

main().catch(console.error);
