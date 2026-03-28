// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes.
 *
 * @summary gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetApiExportInOpenApi2dot0.json
 */
async function apiManagementGetApiExportInOpenApi2Dot0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiExport.get(
    "rg1",
    "apimService1",
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
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetApiExportInOpenApi3dot0.json
 */
async function apiManagementGetApiExportInOpenApi3Dot0() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiExport.get(
    "rg1",
    "apimService1",
    "aid9676",
    "openapi-link",
    "true",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetApiExportInOpenApi2Dot0();
  await apiManagementGetApiExportInOpenApi3Dot0();
}

main().catch(console.error);
