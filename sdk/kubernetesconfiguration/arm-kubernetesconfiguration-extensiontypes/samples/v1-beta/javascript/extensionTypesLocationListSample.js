// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ExtensionTypesClient } = require("@azure/arm-kubernetesconfiguration-extensiontypes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Extension Types for the location.
 *
 * @summary list all Extension Types for the location.
 * x-ms-original-file: 2024-11-01-preview/ListExtensionTypesByLocation.json
 */
async function listExtensionTypes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extensionTypes.locationList("westus2", {
    publisherId: "myPublisherId",
    offerId: "myOfferId",
    planId: "myPlanId",
    releaseTrain: "stable",
    clusterType: "connectedCluster",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listExtensionTypes();
}

main().catch(console.error);
