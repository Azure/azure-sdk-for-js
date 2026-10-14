// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists deployments for catalog.
 *
 * @summary lists deployments for catalog.
 * x-ms-original-file: 2024-04-01/PostListDeploymentsByCatalog.json
 */
async function catalogsListDeployments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.catalogs.listDeployments("MyResourceGroup1", "MyCatalog1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await catalogsListDeployments();
}

main().catch(console.error);
