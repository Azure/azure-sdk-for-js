// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an authorization in the specified express route LAG.
 *
 * @summary creates or updates an authorization in the specified express route LAG.
 * x-ms-original-file: 2026-03-01/ExpressRouteLagAuthorizationCreate.json
 */
async function createExpressRouteLagAuthorization() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLagAuthorizations.createOrUpdate(
    "rg1",
    "expressRouteLagName",
    "authorizationName",
    { properties: {} },
  );
  console.log(result);
}

async function main() {
  await createExpressRouteLagAuthorization();
}

main().catch(console.error);
