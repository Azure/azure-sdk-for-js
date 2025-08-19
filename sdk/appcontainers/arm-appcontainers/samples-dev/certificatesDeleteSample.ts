// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified Certificate.
 *
 * @summary Deletes the specified Certificate.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/Certificate_Delete.json
 */

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteCertificate(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "testcontainerenv";
  const certificateName = "certificate-firendly-name";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.certificates.delete(
    resourceGroupName,
    environmentName,
    certificateName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteCertificate();
}

main().catch(console.error);
