// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerPlatformClient } = require("@azure/arm-powerplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an EnterprisePolicy
 *
 * @summary creates an EnterprisePolicy
 * x-ms-original-file: 2020-10-30-preview/createOrUpdateEnterprisePolicy.json
 */
async function createOrUpdateEnterprisePolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const result = await client.enterprisePolicies.createOrUpdate(
    "enterprisePolicy",
    "resourceGroup",
    {
      identity: { type: "SystemAssigned" },
      kind: "Lockbox",
      location: "East US",
      tags: { Organization: "Administration" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateEnterprisePolicy();
}

main().catch(console.error);
