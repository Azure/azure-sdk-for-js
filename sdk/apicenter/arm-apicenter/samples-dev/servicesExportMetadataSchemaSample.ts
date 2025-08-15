// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MetadataSchemaExportRequest } from "@azure/arm-apicenter";
import { AzureAPICenter } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Exports the effective metadata schema.
 *
 * @summary Exports the effective metadata schema.
 * x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/stable/2024-03-01/examples/Services_ExportMetadataSchema.json
 */
async function servicesExportMetadataSchema(): Promise<void> {
  const subscriptionId =
    process.env["APICENTER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APICENTER_RESOURCE_GROUP"] || "contoso-resources";
  const serviceName = "contoso";
  const payload: MetadataSchemaExportRequest = { assignedTo: "api" };
  const credential = new DefaultAzureCredential();
  const client = new AzureAPICenter(credential, subscriptionId);
  const result = await client.services.beginExportMetadataSchemaAndWait(
    resourceGroupName,
    serviceName,
    payload,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await servicesExportMetadataSchema();
}

main().catch(console.error);
