// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to exports the effective metadata schema.
 *
 * @summary exports the effective metadata schema.
 * x-ms-original-file: 2024-06-01-preview/Services_ExportMetadataSchema.json
 */
async function servicesExportMetadataSchema() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.services.exportMetadataSchema("contoso-resources", "contoso", {
    assignedTo: "api",
  });
  console.log(result);
}

async function main() {
  await servicesExportMetadataSchema();
}

main().catch(console.error);
