// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ExtensionTypesClient } = require("@azure/arm-kubernetesconfiguration-extensiontypes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list installable Extension Types for the cluster based region and type for the cluster.
 *
 * @summary list installable Extension Types for the cluster based region and type for the cluster.
 * x-ms-original-file: 2024-11-01-preview/ListExtensionTypes.json
 */
async function getExtensionTypes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extensionTypes.list(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "my-cluster",
    {
      publisherId: "myPublisherId",
      offerId: "myOfferId",
      planId: "myPlanId",
      releaseTrain: "stable",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getExtensionTypes();
}

main().catch(console.error);
