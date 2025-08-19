// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the entity state (Etag) version of the Diagnostic specified by its identifier.
 *
 * @summary Gets the entity state (Etag) version of the Diagnostic specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementHeadDiagnostic.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementHeadDiagnostic(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const diagnosticId = "applicationinsights";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.diagnostic.getEntityTag(
    resourceGroupName,
    serviceName,
    diagnosticId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementHeadDiagnostic();
}

main().catch(console.error);
