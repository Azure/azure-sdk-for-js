// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the dimensions by the external cloud provider type.
 *
 * @summary Lists the dimensions by the external cloud provider type.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExternalBillingAccountsDimensions.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function externalBillingAccountDimensionList(): Promise<void> {
  const externalCloudProviderType = "externalBillingAccounts";
  const externalCloudProviderId = "100";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.listByExternalCloudProviderType(
    externalCloudProviderType,
    externalCloudProviderId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the dimensions by the external cloud provider type.
 *
 * @summary Lists the dimensions by the external cloud provider type.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ExternalSubscriptionsDimensions.json
 */
async function externalSubscriptionDimensionList(): Promise<void> {
  const externalCloudProviderType = "externalSubscriptions";
  const externalCloudProviderId = "100";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.listByExternalCloudProviderType(
    externalCloudProviderType,
    externalCloudProviderId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await externalBillingAccountDimensionList();
  await externalSubscriptionDimensionList();
}

main().catch(console.error);
