// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or Updates a Api Version Set.
 *
 * @summary Creates or Updates a Api Version Set.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateApiVersionSet.json
 */

import {
  ApiVersionSetContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateApiVersionSet(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const versionSetId = "api1";
  const parameters: ApiVersionSetContract = {
    description: "Version configuration",
    displayName: "api set 1",
    versioningScheme: "Segment",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiVersionSet.createOrUpdate(
    resourceGroupName,
    serviceName,
    versionSetId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiVersionSet();
}

main().catch(console.error);
