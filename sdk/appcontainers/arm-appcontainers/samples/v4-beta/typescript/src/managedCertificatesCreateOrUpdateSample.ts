// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update a Managed Certificate.
 *
 * @summary create or Update a Managed Certificate.
 * x-ms-original-file: 2025-10-02-preview/ManagedCertificate_CreateOrUpdate.json
 */
async function createOrUpdateCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedCertificates.createOrUpdate(
    "examplerg",
    "testcontainerenv",
    "certificate-firendly-name",
    {
      managedCertificateEnvelope: {
        location: "East US",
        properties: {
          domainControlValidation: "CNAME",
          subjectName: "my-subject-name.company.country.net",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateCertificate();
}

main().catch(console.error);
