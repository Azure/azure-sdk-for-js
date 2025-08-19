// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Contains Safeguards version along with its support info and whether it is a default version.
 *
 * @summary Contains Safeguards version along with its support info and whether it is a default version.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-05-02-preview/examples/GetSafeguardsVersions.json
 */

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSafeguardsAvailableVersions(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const location = "location1";
  const version = "v1.0.0";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.getSafeguardsVersions(
    location,
    version,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSafeguardsAvailableVersions();
}

main().catch(console.error);
