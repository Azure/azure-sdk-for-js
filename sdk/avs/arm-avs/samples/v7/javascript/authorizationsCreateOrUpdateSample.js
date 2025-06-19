// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a ExpressRouteAuthorization
 *
 * @summary create a ExpressRouteAuthorization
 * x-ms-original-file: 2024-09-01/Authorizations_CreateOrUpdate.json
 */
async function authorizationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.authorizations.createOrUpdate(
    "group1",
    "cloud1",
    "authorization1",
    {},
  );
  console.log(result);
}

async function main() {
  await authorizationsCreateOrUpdate();
}

main().catch(console.error);
