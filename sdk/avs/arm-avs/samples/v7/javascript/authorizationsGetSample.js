// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ExpressRouteAuthorization
 *
 * @summary get a ExpressRouteAuthorization
 * x-ms-original-file: 2025-09-01/Authorizations_Get.json
 */
async function authorizationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.authorizations.get("group1", "cloud1", "authorization1");
  console.log(result);
}

async function main() {
  await authorizationsGet();
}

main().catch(console.error);
