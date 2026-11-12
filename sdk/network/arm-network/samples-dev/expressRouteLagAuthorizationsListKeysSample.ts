// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the authorization key associated with the specified express route LAG authorization.
 *
 * @summary gets the authorization key associated with the specified express route LAG authorization.
 * x-ms-original-file: 2026-03-01/ExpressRouteLagAuthorizationListKeys.json
 */
async function listExpressRouteLagAuthorizationKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLagAuthorizations.listKeys(
    "rg1",
    "expressRouteLagName",
    "authorizationName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listExpressRouteLagAuthorizationKeys();
}

main().catch(console.error);
