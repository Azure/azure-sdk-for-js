// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to exports the API specification.
 *
 * @summary exports the API specification.
 * x-ms-original-file: 2024-06-01-preview/ApiDefinitions_ExportSpecification.json
 */
async function apiDefinitionsExportSpecification() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.apiDefinitions.exportSpecification(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "2023-01-01",
    "openapi",
  );
  console.log(result);
}

async function main() {
  await apiDefinitionsExportSpecification();
}

main().catch(console.error);
