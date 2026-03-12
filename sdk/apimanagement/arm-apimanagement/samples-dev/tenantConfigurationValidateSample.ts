// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation validates the changes in the specified Git branch. This is a long running operation and could take several minutes to complete.
 *
 * @summary This operation validates the changes in the specified Git branch. This is a long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementTenantConfigurationValidate.json
 */

import {
  DeployConfigurationParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementTenantConfigurationValidate(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const configurationName = "configuration";
  const parameters: DeployConfigurationParameters = { branch: "master" };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantConfiguration.beginValidateAndWait(
    resourceGroupName,
    serviceName,
    configurationName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementTenantConfigurationValidate();
}

main().catch(console.error);
