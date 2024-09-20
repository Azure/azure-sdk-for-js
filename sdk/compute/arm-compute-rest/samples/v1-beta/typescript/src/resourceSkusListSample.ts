// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  ResourceSkusListParameters,
  paginate
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets the list of Microsoft.Compute SKUs available for your Subscription.
 *
 * @summary Gets the list of Microsoft.Compute SKUs available for your Subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/Skus/stable/2021-07-01/examples/skus/ListAvailableResourceSkus.json
 */
async function listsAllAvailableResourceSkUs() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const options: ResourceSkusListParameters = {
    queryParameters: { "api-version": "2021-07-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/skus",
      subscriptionId
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listsAllAvailableResourceSkUs().catch(console.error);
/**
 * This sample demonstrates how to Gets the list of Microsoft.Compute SKUs available for your Subscription.
 *
 * @summary Gets the list of Microsoft.Compute SKUs available for your Subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/Skus/stable/2021-07-01/examples/skus/ListAvailableResourceSkusForARegion.json
 */
async function listsAllAvailableResourceSkUsForTheSpecifiedRegion() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const options: ResourceSkusListParameters = {
    queryParameters: {
      "api-version": "2021-07-01",
      $filter: "location eq 'westus'"
    }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/skus",
      subscriptionId
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listsAllAvailableResourceSkUsForTheSpecifiedRegion().catch(console.error);
/**
 * This sample demonstrates how to Gets the list of Microsoft.Compute SKUs available for your Subscription.
 *
 * @summary Gets the list of Microsoft.Compute SKUs available for your Subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/Skus/stable/2021-07-01/examples/skus/ListAvailableResourceSkusWithExtendedLocations.json
 */
async function listsAllAvailableResourceSkUsWithExtendedLocationInformation() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const options: ResourceSkusListParameters = {
    queryParameters: {
      "api-version": "2021-07-01",
      includeExtendedLocations: "true"
    }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/skus",
      subscriptionId
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listsAllAvailableResourceSkUsWithExtendedLocationInformation().catch(
  console.error
);
