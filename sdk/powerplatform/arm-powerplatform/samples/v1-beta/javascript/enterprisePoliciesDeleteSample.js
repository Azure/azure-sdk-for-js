// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerPlatformClient } = require("@azure/arm-powerplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an EnterprisePolicy
 *
 * @summary delete an EnterprisePolicy
 * x-ms-original-file: 2020-10-30-preview/deleteEnterprisePolicy.json
 */
async function deleteAnEnterprisePolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  await client.enterprisePolicies.delete("resourceGroup", "enterprisePolicy");
}

async function main() {
  await deleteAnEnterprisePolicy();
}

main().catch(console.error);
