// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a CA certificate with the specified parameters.
 *
 * @summary create or update a CA certificate with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/CaCertificates_CreateOrUpdate.json
 */
async function caCertificatesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.caCertificates.createOrUpdate(
    "examplerg",
    "exampleNamespaceName1",
    "exampleCACertificateName1",
    {
      description: "This is a test certificate",
      encodedCertificate: "base64EncodePemFormattedCertificateString",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await caCertificatesCreateOrUpdate();
}

main().catch(console.error);
