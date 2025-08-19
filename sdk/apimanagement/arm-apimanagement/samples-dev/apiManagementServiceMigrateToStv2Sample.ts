// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Upgrades an API Management service to the Stv2 platform. For details refer to https://aka.ms/apim-migrate-stv2. This change is not reversible. This is long running operation and could take several minutes to complete.
 *
 * @summary Upgrades an API Management service to the Stv2 platform. For details refer to https://aka.ms/apim-migrate-stv2. This change is not reversible. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementServiceMigrateToStv2.json
 */

import {
  MigrateToStv2Contract,
  ApiManagementServiceMigrateToStv2OptionalParams,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementMigrateService(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: MigrateToStv2Contract = { mode: "PreserveIp" };
  const options: ApiManagementServiceMigrateToStv2OptionalParams = {
    parameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginMigrateToStv2AndWait(
    resourceGroupName,
    serviceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementMigrateService();
}

main().catch(console.error);
