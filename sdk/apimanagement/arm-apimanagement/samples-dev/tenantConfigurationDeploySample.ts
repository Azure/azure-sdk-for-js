// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeployConfigurationParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to This operation applies changes from the specified Git branch to the configuration database. This is a long running operation and could take several minutes to complete.
 *
 * @summary This operation applies changes from the specified Git branch to the configuration database. This is a long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementTenantConfigurationDeploy.json
 */
async function apiManagementTenantConfigurationDeploy(): Promise<void> {
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
  const result = await client.tenantConfiguration.beginDeployAndWait(
    resourceGroupName,
    serviceName,
    configurationName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementTenantConfigurationDeploy();
}

main().catch(console.error);
