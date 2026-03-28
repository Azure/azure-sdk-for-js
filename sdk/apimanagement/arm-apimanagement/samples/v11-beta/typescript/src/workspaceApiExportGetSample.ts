// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes.
 *
 * @summary gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceApiExportInOpenApi2dot0.json
 */
async function apiManagementGetWorkspaceApiExportInOpenApi2Dot0(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiExport.get(
    "rg1",
    "apimService1",
    "wks1",
    "echo-api",
    "swagger-link",
    "true",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes.
 *
 * @summary gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceApiExportInOpenApi3dot0.json
 */
async function apiManagementGetWorkspaceApiExportInOpenApi3Dot0(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiExport.get(
    "rg1",
    "apimService1",
    "wks1",
    "aid9676",
    "openapi-link",
    "true",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceApiExportInOpenApi2Dot0();
  await apiManagementGetWorkspaceApiExportInOpenApi3Dot0();
}

main().catch(console.error);
