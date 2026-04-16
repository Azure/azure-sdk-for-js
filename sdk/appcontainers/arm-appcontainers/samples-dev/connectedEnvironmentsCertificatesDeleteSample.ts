// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified Certificate.
 *
 * @summary Deletes the specified Certificate.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/ContainerApps/stable/2025-07-01/examples/ConnectedEnvironmentsCertificate_Delete.json
 */
async function deleteCertificate(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const connectedEnvironmentName = "testcontainerenv";
  const certificateName = "certificate-firendly-name";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result =
    await client.connectedEnvironmentsCertificates.beginDeleteAndWait(
      resourceGroupName,
      connectedEnvironmentName,
      certificateName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteCertificate();
}

main().catch(console.error);
