// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patches a certificate. Currently only patching of tags is supported
 *
 * @summary patches a certificate. Currently only patching of tags is supported
 * x-ms-original-file: 2025-10-02-preview/Certificates_Patch.json
 */
async function patchCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.certificates.update(
    "examplerg",
    "testcontainerenv",
    "certificate-firendly-name",
    { tags: { tag1: "value1", tag2: "value2" } },
  );
  console.log(result);
}

async function main() {
  await patchCertificate();
}

main().catch(console.error);
