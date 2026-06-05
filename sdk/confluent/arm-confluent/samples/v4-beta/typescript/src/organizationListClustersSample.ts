// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists of all the clusters in a environment
 *
 * @summary lists of all the clusters in a environment
 * x-ms-original-file: 2025-08-18-preview/Organization_ListClusters_MaximumSet_Gen.json
 */
async function organizationListClustersMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organization.listClusters(
    "rgconfluent",
    "hpinjsodpkprhbvpzh",
    "qjeouprbl",
    { pageSize: 24, pageToken: "esiyyipdkqikzcedkyrjnqvsbf" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await organizationListClustersMaximumSet();
}

main().catch(console.error);
