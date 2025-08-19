// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or Update a Managed Certificate.
 *
 * @summary Create or Update a Managed Certificate.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/ManagedCertificate_CreateOrUpdate.json
 */

import {
  ManagedCertificate,
  ManagedCertificatesCreateOrUpdateOptionalParams,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateCertificate(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "testcontainerenv";
  const managedCertificateName = "certificate-firendly-name";
  const managedCertificateEnvelope: ManagedCertificate = {
    location: "East US",
    properties: {
      domainControlValidation: "CNAME",
      subjectName: "my-subject-name.company.country.net",
    },
  };
  const options: ManagedCertificatesCreateOrUpdateOptionalParams = {
    managedCertificateEnvelope,
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedCertificates.beginCreateOrUpdateAndWait(
    resourceGroupName,
    environmentName,
    managedCertificateName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateCertificate();
}

main().catch(console.error);
