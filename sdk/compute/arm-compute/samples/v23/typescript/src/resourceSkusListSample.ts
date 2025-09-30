// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ResourceSkusListOptionalParams,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the list of Microsoft.Compute SKUs available for your Subscription.
 *
 * @summary Gets the list of Microsoft.Compute SKUs available for your Subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/Skus/stable/2021-07-01/examples/skus/ListAvailableResourceSkus.json
 */
async function listsAllAvailableResourceSkUs(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceSkus.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets the list of Microsoft.Compute SKUs available for your Subscription.
 *
 * @summary Gets the list of Microsoft.Compute SKUs available for your Subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/Skus/stable/2021-07-01/examples/skus/ListAvailableResourceSkusForARegion.json
 */
async function listsAllAvailableResourceSkUsForTheSpecifiedRegion(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const filter = "location eq 'westus'";
  const options: ResourceSkusListOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceSkus.list(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets the list of Microsoft.Compute SKUs available for your Subscription.
 *
 * @summary Gets the list of Microsoft.Compute SKUs available for your Subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/Skus/stable/2021-07-01/examples/skus/ListAvailableResourceSkusWithExtendedLocations.json
 */
async function listsAllAvailableResourceSkUsWithExtendedLocationInformation(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const includeExtendedLocations = "true";
  const options: ResourceSkusListOptionalParams = { includeExtendedLocations };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceSkus.list(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllAvailableResourceSkUs();
  await listsAllAvailableResourceSkUsForTheSpecifiedRegion();
  await listsAllAvailableResourceSkUsWithExtendedLocationInformation();
}

main().catch(console.error);
