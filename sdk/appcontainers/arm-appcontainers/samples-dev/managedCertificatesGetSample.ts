// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the specified Managed Certificate.
 *
 * @summary Get the specified Managed Certificate.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/ManagedCertificate_Get.json
 */

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCertificate(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "testcontainerenv";
  const managedCertificateName = "certificate-firendly-name";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedCertificates.get(
    resourceGroupName,
    environmentName,
    managedCertificateName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCertificate();
}

main().catch(console.error);
