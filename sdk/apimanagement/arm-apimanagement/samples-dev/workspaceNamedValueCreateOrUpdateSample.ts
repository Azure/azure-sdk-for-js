// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  NamedValueCreateContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates named value.
 *
 * @summary Creates or updates named value.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspaceNamedValue.json
 */
async function apiManagementCreateWorkspaceNamedValue(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const namedValueId = "testprop2";
  const parameters: NamedValueCreateContract = {
    displayName: "prop3name",
    secret: false,
    tags: ["foo", "bar"],
    value: "propValue",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNamedValue.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    workspaceId,
    namedValueId,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates named value.
 *
 * @summary Creates or updates named value.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspaceNamedValueWithKeyVault.json
 */
async function apiManagementCreateWorkspaceNamedValueWithKeyVault(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const namedValueId = "testprop6";
  const parameters: NamedValueCreateContract = {
    displayName: "prop6namekv",
    keyVault: {
      identityClientId: "ceaa6b06-c00f-43ef-99ac-f53d1fe876a0",
      secretIdentifier: "https://contoso.vault.azure.net/secrets/aadSecret",
    },
    secret: true,
    tags: ["foo", "bar"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNamedValue.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    workspaceId,
    namedValueId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceNamedValue();
  await apiManagementCreateWorkspaceNamedValueWithKeyVault();
}

main().catch(console.error);
