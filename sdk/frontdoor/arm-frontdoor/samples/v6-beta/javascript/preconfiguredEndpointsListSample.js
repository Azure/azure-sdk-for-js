// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of Preconfigured Endpoints
 *
 * @summary gets a list of Preconfigured Endpoints
 * x-ms-original-file: 2025-11-01/NetworkExperimentGetPreconfiguredEndpoints.json
 */
async function getsAListOfPreconfiguredEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.preconfiguredEndpoints.list("MyResourceGroup", "MyProfile")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAListOfPreconfiguredEndpoints();
}

main().catch(console.error);
