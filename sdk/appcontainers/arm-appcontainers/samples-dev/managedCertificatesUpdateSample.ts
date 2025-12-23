// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ManagedCertificatePatch} from "@azure/arm-appcontainers";
import {
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Patches a managed certificate. Oly patching of tags is supported
 *
 * @summary Patches a managed certificate. Oly patching of tags is supported
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/ContainerApps/stable/2025-07-01/examples/ManagedCertificates_Patch.json
 */
async function patchManagedCertificate(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "testcontainerenv";
  const managedCertificateName = "certificate-firendly-name";
  const managedCertificateEnvelope: ManagedCertificatePatch = {
    tags: { tag1: "value1", tag2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedCertificates.update(
    resourceGroupName,
    environmentName,
    managedCertificateName,
    managedCertificateEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchManagedCertificate();
}

main().catch(console.error);
