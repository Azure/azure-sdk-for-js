// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or Update a Certificate.
 *
 * @summary create or Update a Certificate.
 * x-ms-original-file: 2025-10-02-preview/ConnectedEnvironmentsCertificate_CreateOrUpdate.json
 */
async function createOrUpdateCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironmentsCertificates.createOrUpdate(
    "examplerg",
    "testcontainerenv",
    "certificate-firendly-name",
    {
      certificateEnvelope: {
        location: "East US",
        properties: { password: "private key password", value: Buffer.from("Y2VydA==", "base64") },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateCertificate();
}

main().catch(console.error);
