// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CertificateCreateOrUpdateParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates the certificate being used for authentication with the backend.
 *
 * @summary Creates or updates the certificate being used for authentication with the backend.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateCertificate.json
 */
async function apiManagementCreateCertificate(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const certificateId = "tempcert";
  const parameters: CertificateCreateOrUpdateParameters = {
    data: "****************Base 64 Encoded Certificate *******************************",
    password: "****Certificate Password******",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.certificate.createOrUpdate(
    resourceGroupName,
    serviceName,
    certificateId,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates the certificate being used for authentication with the backend.
 *
 * @summary Creates or updates the certificate being used for authentication with the backend.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateCertificateWithKeyVault.json
 */
async function apiManagementCreateCertificateWithKeyVault(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const certificateId = "templateCertkv";
  const parameters: CertificateCreateOrUpdateParameters = {
    keyVault: {
      identityClientId: "ceaa6b06-c00f-43ef-99ac-f53d1fe876a0",
      secretIdentifier:
        "https://rpbvtkeyvaultintegration.vault-int.azure-int.net/secrets/msitestingCert",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.certificate.createOrUpdate(
    resourceGroupName,
    serviceName,
    certificateId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateCertificate();
  await apiManagementCreateCertificateWithKeyVault();
}

main().catch(console.error);
