// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all Extension Types for the location.
 *
 * @summary List all Extension Types for the location.
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/ListExtensionTypesByLocation.json
 */

import {
  ExtensionTypesLocationListOptionalParams,
  ExtensionTypesClient,
} from "@azure/arm-kubernetesconfiguration-extensiontypes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listExtensionTypes(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] || "subId1";
  const location = "westus2";
  const publisherId = "myPublisherId";
  const offerId = "myOfferId";
  const planId = "myPlanId";
  const releaseTrain = "stable";
  const clusterType = "connectedCluster";
  const options: ExtensionTypesLocationListOptionalParams = {
    publisherId,
    offerId,
    planId,
    releaseTrain,
    clusterType,
  };
  const credential = new DefaultAzureCredential();
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extensionTypes.listLocationList(
    location,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listExtensionTypes();
}

main().catch(console.error);
