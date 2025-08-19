// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the specific named value.
 *
 * @summary Updates the specific named value.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateWorkspaceNamedValue.json
 */

import {
  NamedValueUpdateParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementUpdateWorkspaceNamedValue(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const namedValueId = "testprop2";
  const ifMatch = "*";
  const parameters: NamedValueUpdateParameters = {
    displayName: "prop3name",
    secret: false,
    tags: ["foo", "bar2"],
    value: "propValue",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNamedValue.beginUpdateAndWait(
    resourceGroupName,
    serviceName,
    workspaceId,
    namedValueId,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateWorkspaceNamedValue();
}

main().catch(console.error);
