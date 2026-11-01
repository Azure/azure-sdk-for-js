// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list PublicCloudConnector resources by resource group
 *
 * @summary list PublicCloudConnector resources by resource group
 * x-ms-original-file: 2027-01-01/PublicCloudConnectors_ListByResourceGroup_MaximumSet_Gen.json
 */
async function publicCloudConnectorsListByResourceGroupGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.publicCloudConnectors.listByResourceGroup(
    "rghybridconnectivity",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list PublicCloudConnector resources by resource group
 *
 * @summary list PublicCloudConnector resources by resource group
 * x-ms-original-file: 2027-01-01/PublicCloudConnectors_ListByResourceGroup_MinimumSet_Gen.json
 */
async function publicCloudConnectorsListByResourceGroupGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.publicCloudConnectors.listByResourceGroup(
    "rghybridconnectivity",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await publicCloudConnectorsListByResourceGroupGeneratedByMaximumSetRule();
  await publicCloudConnectorsListByResourceGroupGeneratedByMinimumSetRule();
}

main().catch(console.error);
