// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an existing CA certificate.
 *
 * @summary delete an existing CA certificate.
 * x-ms-original-file: 2025-07-15-preview/CaCertificates_Delete.json
 */
async function caCertificatesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.caCertificates.delete(
    "examplerg",
    "exampleNamespaceName1",
    "exampleCACertificateName1",
  );
}

async function main(): Promise<void> {
  await caCertificatesDelete();
}

main().catch(console.error);
