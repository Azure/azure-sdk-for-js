// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VectorDbClient } from "@azure/arm-pineconevectordb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list OrganizationResource resources by resource group
 *
 * @summary list OrganizationResource resources by resource group
 * x-ms-original-file: 2024-10-22-preview/Organizations_ListByResourceGroup_MaximumSet_Gen.json
 */
async function organizationsListByResourceGroupMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "76a38ef6-c8c1-4f0d-bfe0-00ec782c8077";
  const client = new VectorDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.organizations.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await organizationsListByResourceGroupMaximumSet();
}

main().catch(console.error);
