// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerPlatformClient } = require("@azure/arm-powerplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of EnterprisePolicies within a given resource group
 *
 * @summary retrieve a list of EnterprisePolicies within a given resource group
 * x-ms-original-file: 2020-10-30-preview/listEnterprisePoliciesByResourceGroup.json
 */
async function listEnterprisePoliciesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.enterprisePolicies.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listEnterprisePoliciesByResourceGroup();
}

main().catch(console.error);
