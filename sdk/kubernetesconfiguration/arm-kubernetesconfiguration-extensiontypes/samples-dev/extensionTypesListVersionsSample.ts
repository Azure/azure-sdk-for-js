// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List the versions for an extension type and location.
 *
 * @summary List the versions for an extension type and location.
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/ListExtensionTypeVersionsByLocation.json
 */

import {
  ExtensionTypesListVersionsOptionalParams,
  ExtensionTypesClient,
} from "@azure/arm-kubernetesconfiguration-extensiontypes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listExtensionTypeVersions(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] || "subId1";
  const location = "westus";
  const extensionTypeName = "extensionType1";
  const releaseTrain = "stable";
  const clusterType = "connectedCluster";
  const majorVersion = "2";
  const showLatest = true;
  const options: ExtensionTypesListVersionsOptionalParams = {
    releaseTrain,
    clusterType,
    majorVersion,
    showLatest,
  };
  const credential = new DefaultAzureCredential();
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extensionTypes.listVersions(
    location,
    extensionTypeName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listExtensionTypeVersions();
}

main().catch(console.error);
