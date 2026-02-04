// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to contains list of Safeguards version along with its support info and whether it is a default version.
 *
 * @summary contains list of Safeguards version along with its support info and whether it is a default version.
 * x-ms-original-file: 2025-10-02-preview/ListSafeguardsVersions.json
 */
async function listSafeguardsVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedClusters.listSafeguardsVersions("location1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSafeguardsVersions();
}

main().catch(console.error);
