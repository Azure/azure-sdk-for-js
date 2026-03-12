// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of private link resources.
 *
 * @summary gets the list of private link resources.
 * x-ms-original-file: 2024-09-01/PrivateLinkResource_List.json
 */
async function privateLinkResourceListGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.list("rgswagger_2024-09-01", "4")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateLinkResourceListGeneratedByMaximumSetRule();
}

main().catch(console.error);
