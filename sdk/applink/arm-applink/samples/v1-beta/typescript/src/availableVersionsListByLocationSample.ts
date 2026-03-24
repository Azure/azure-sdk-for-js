// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkClient } from "@azure/arm-applink";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AvailableVersion resources by location.
 *
 * @summary list AvailableVersion resources by location.
 * x-ms-original-file: 2025-08-01-preview/AvailableVersions_ListByLocation.json
 */
async function availableVersionsListByLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availableVersions.listByLocation("westus2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list AvailableVersion resources by location.
 *
 * @summary list AvailableVersion resources by location.
 * x-ms-original-file: 2025-08-01-preview/AvailableVersions_ListByLocationWithFilter.json
 */
async function availableVersionsListByLocationWithFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availableVersions.listByLocation("westus2", {
    kubernetesVersion: "1.28",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await availableVersionsListByLocation();
  await availableVersionsListByLocationWithFilter();
}

main().catch(console.error);
