// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerPlatformClient } = require("@azure/arm-powerplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that need to be created for enterprisePolicy.
 *
 * @summary gets the private link resources that need to be created for enterprisePolicy.
 * x-ms-original-file: 2020-10-30-preview/PrivateLinkResourceListGet.json
 */
async function getsPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listByEnterprisePolicy("rg1", "ddb1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
