// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all authorizations in an express route port.
 *
 * @summary gets all authorizations in an express route port.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortAuthorizationList.json
 */
async function listExpressRoutePortAuthorization(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRoutePortAuthorizations.list(
    "rg1",
    "expressRoutePortName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listExpressRoutePortAuthorization();
}

main().catch(console.error);
