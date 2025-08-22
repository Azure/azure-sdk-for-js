// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the details of the release of the API specified by its identifier.
 *
 * @summary Updates the details of the release of the API specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateApiRelease.json
 */

import {
  ApiReleaseContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementUpdateApiRelease(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "a1";
  const releaseId = "testrev";
  const ifMatch = "*";
  const parameters: ApiReleaseContract = {
    apiId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/apis/a1",
    notes: "yahooagain",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiRelease.update(
    resourceGroupName,
    serviceName,
    apiId,
    releaseId,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateApiRelease();
}

main().catch(console.error);
