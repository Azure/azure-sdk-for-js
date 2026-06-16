// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificateRegistrationManagementClient } from "@azure/arm-certificateregistration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Creates or updates a certificate and associates with key vault secret.
 *
 * @summary description for Creates or updates a certificate and associates with key vault secret.
 * x-ms-original-file: 2024-11-01/CreateAppServiceCertificate.json
 */
async function createCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  const result = await client.appServiceCertificateOrders.createOrUpdateCertificate(
    "testrg123",
    "SampleCertificateOrderName",
    "SampleCertName1",
    {
      location: "Global",
      keyVaultId:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/testrg123/providers/microsoft.keyvault/vaults/SamplevaultName",
      keyVaultSecretName: "SampleSecretName1",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createCertificate();
}

main().catch(console.error);
