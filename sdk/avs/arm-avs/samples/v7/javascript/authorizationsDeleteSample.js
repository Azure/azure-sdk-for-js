// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ExpressRouteAuthorization
 *
 * @summary delete a ExpressRouteAuthorization
 * x-ms-original-file: 2025-09-01/Authorizations_Delete.json
 */
async function authorizationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.authorizations.delete("group1", "cloud1", "authorization1");
}

async function main() {
  await authorizationsDelete();
}

main().catch(console.error);
