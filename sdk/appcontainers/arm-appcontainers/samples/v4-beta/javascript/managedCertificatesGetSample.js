// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified Managed Certificate.
 *
 * @summary get the specified Managed Certificate.
 * x-ms-original-file: 2025-10-02-preview/ManagedCertificate_Get.json
 */
async function getCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedCertificates.get(
    "examplerg",
    "testcontainerenv",
    "certificate-firendly-name",
  );
  console.log(result);
}

async function main() {
  await getCertificate();
}

main().catch(console.error);
