// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes.
 *
 * @summary Gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetWorkspaceApiExportInOpenApi2dot0.json
 */
async function apiManagementGetWorkspaceApiExportInOpenApi2Dot0(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const apiId = "echo-api";
  const format = "swagger-link";
  const exportParam = "true";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiExport.get(
    resourceGroupName,
    serviceName,
    workspaceId,
    apiId,
    format,
    exportParam,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes.
 *
 * @summary Gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetWorkspaceApiExportInOpenApi3dot0.json
 */
async function apiManagementGetWorkspaceApiExportInOpenApi3Dot0(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const apiId = "aid9676";
  const format = "openapi-link";
  const exportParam = "true";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiExport.get(
    resourceGroupName,
    serviceName,
    workspaceId,
    apiId,
    format,
    exportParam,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceApiExportInOpenApi2Dot0();
  await apiManagementGetWorkspaceApiExportInOpenApi3Dot0();
}

main().catch(console.error);
