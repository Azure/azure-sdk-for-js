// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all policy descriptions.
 *
 * @summary lists all policy descriptions.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListPolicyDescriptions.json
 */
async function apiManagementListPolicyDescriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyDescription.listByService("rg1", "apimService1", {
    scope: "Api",
  });
  console.log(result);
}

async function main() {
  await apiManagementListPolicyDescriptions();
}

main().catch(console.error);
