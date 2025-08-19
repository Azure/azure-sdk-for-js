// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the all the children and its current health status for a parent resource. Use the nextLink property in the response to get the next page of children current health
 *
 * @summary Lists the all the children and its current health status for a parent resource. Use the nextLink property in the response to get the next page of children current health
 * x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/ChildResources_List.json
 */

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCurrentChildHealthByResource(): Promise<void> {
  const resourceUri = "resourceUri";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const resArray = new Array();
  for await (const item of client.childResources.list(resourceUri)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getCurrentChildHealthByResource();
}

main().catch(console.error);
