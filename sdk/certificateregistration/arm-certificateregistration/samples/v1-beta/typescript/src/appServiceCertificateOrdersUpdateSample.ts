// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AppServiceCertificateOrderPatchResource} from "@azure/arm-certificateregistration";
import {
  CertificateRegistrationManagementClient,
} from "@azure/arm-certificateregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Create or update a certificate purchase order.
 *
 * @summary Description for Create or update a certificate purchase order.
 * x-ms-original-file: specification/certificateregistration/resource-manager/Microsoft.CertificateRegistration/CertificateRegistration/stable/2024-11-01/examples/UpdateAppServiceCertificateOrder.json
 */
async function updateCertificateOrder(): Promise<void> {
  const subscriptionId =
    process.env["CERTIFICATEREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["CERTIFICATEREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const certificateOrderName = "SampleCertificateOrderName";
  const certificateDistinguishedName: AppServiceCertificateOrderPatchResource =
    {
      autoRenew: true,
      certificates: {
        sampleCertName1: {
          keyVaultId:
            "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/testrg123/providers/microsoft.keyvault/vaults/SamplevaultName",
          keyVaultSecretName: "SampleSecretName1",
        },
        sampleCertName2: {
          keyVaultId:
            "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/testrg123/providers/microsoft.keyvault/vaults/SamplevaultName",
          keyVaultSecretName: "SampleSecretName2",
        },
      },
      distinguishedName: "CN=SampleCustomDomain.com",
      keySize: 2048,
      productType: "StandardDomainValidatedSsl",
      validityInYears: 2,
    };
  const credential = new DefaultAzureCredential();
  const client = new CertificateRegistrationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.appServiceCertificateOrders.update(
    resourceGroupName,
    certificateOrderName,
    certificateDistinguishedName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateCertificateOrder();
}

main().catch(console.error);
