// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AppServiceCertificateResource} from "@azure/arm-certificateregistration";
import {
  CertificateRegistrationManagementClient,
} from "@azure/arm-certificateregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Creates or updates a certificate and associates with key vault secret.
 *
 * @summary Description for Creates or updates a certificate and associates with key vault secret.
 * x-ms-original-file: specification/certificateregistration/resource-manager/Microsoft.CertificateRegistration/CertificateRegistration/stable/2024-11-01/examples/CreateAppServiceCertificate.json
 */
async function createCertificate(): Promise<void> {
  const subscriptionId =
    process.env["CERTIFICATEREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["CERTIFICATEREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const certificateOrderName = "SampleCertificateOrderName";
  const name = "SampleCertName1";
  const keyVaultCertificate: AppServiceCertificateResource = {
    keyVaultId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/testrg123/providers/microsoft.keyvault/vaults/SamplevaultName",
    keyVaultSecretName: "SampleSecretName1",
    location: "Global",
  };
  const credential = new DefaultAzureCredential();
  const client = new CertificateRegistrationManagementClient(
    credential,
    subscriptionId,
  );
  const result =
    await client.appServiceCertificateOrders.beginCreateOrUpdateCertificateAndWait(
      resourceGroupName,
      certificateOrderName,
      name,
      keyVaultCertificate,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createCertificate();
}

main().catch(console.error);
