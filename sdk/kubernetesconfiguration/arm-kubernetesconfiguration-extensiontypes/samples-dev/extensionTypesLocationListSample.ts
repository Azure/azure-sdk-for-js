// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExtensionTypesClient } from "@azure/arm-kubernetesconfiguration-extensiontypes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all Extension Types for the location.
 *
 * @summary list all Extension Types for the location.
 * x-ms-original-file: 2024-11-01-preview/ListExtensionTypesByLocation.json
 */
async function listExtensionTypes(): Promise<void> {
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

async function main(): Promise<void> {
  await listExtensionTypes();
}

main().catch(console.error);
