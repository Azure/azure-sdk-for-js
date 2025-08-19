// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to From KeyVault, Refresh the certificate being used for authentication with the backend.
 *
 * @summary From KeyVault, Refresh the certificate being used for authentication with the backend.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementRefreshCertificate.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementRefreshCertificate(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const certificateId = "templateCertkv";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.certificate.refreshSecret(
    resourceGroupName,
    serviceName,
    certificateId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementRefreshCertificate();
}

main().catch(console.error);
