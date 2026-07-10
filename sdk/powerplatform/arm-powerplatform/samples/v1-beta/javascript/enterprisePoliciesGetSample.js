// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerPlatformClient } = require("@azure/arm-powerplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get information about an EnterprisePolicy
 *
 * @summary get information about an EnterprisePolicy
 * x-ms-original-file: 2020-10-30-preview/getEnterprisePolicy.json
 */
async function getAnEnterprisePolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const result = await client.enterprisePolicies.get("enterprisePolicy", "rg");
  console.log(result);
}

async function main() {
  await getAnEnterprisePolicy();
}

main().catch(console.error);
