// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes.
 *
 * @summary Gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetApiExportInOpenApi2dot0.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGetApiExportInOpenApi2Dot0(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "echo-api";
  const format = "swagger-link";
  const exportParam = "true";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiExport.get(
    resourceGroupName,
    serviceName,
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
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetApiExportInOpenApi3dot0.json
 */
async function apiManagementGetApiExportInOpenApi3Dot0(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "aid9676";
  const format = "openapi-link";
  const exportParam = "true";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiExport.get(
    resourceGroupName,
    serviceName,
    apiId,
    format,
    exportParam,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetApiExportInOpenApi2Dot0();
  await apiManagementGetApiExportInOpenApi3Dot0();
}

main().catch(console.error);
