// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the details of the Api VersionSet specified by its identifier.
 *
 * @summary Updates the details of the Api VersionSet specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateApiVersionSet.json
 */

import {
  ApiVersionSetUpdateParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementUpdateApiVersionSet(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const versionSetId = "vs1";
  const ifMatch = "*";
  const parameters: ApiVersionSetUpdateParameters = {
    description: "Version configuration",
    displayName: "api set 1",
    versioningScheme: "Segment",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiVersionSet.update(
    resourceGroupName,
    serviceName,
    versionSetId,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateApiVersionSet();
}

main().catch(console.error);
