// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a CA certificate with the specified parameters.
 *
 * @summary Create or update a CA certificate with the specified parameters.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/CaCertificates_CreateOrUpdate.json
 */

import { CaCertificate, EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function caCertificatesCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const namespaceName = "exampleNamespaceName1";
  const caCertificateName = "exampleCACertificateName1";
  const caCertificateInfo: CaCertificate = {
    description: "This is a test certificate",
    encodedCertificate: "base64EncodePemFormattedCertificateString",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.caCertificates.beginCreateOrUpdateAndWait(
    resourceGroupName,
    namespaceName,
    caCertificateName,
    caCertificateInfo,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await caCertificatesCreateOrUpdate();
}

main().catch(console.error);
