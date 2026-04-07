// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a TDE certificate for a given server.
 *
 * @summary creates a TDE certificate for a given server.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceTdeCertificate.json
 */
async function uploadATDECertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedInstanceTdeCertificates.create("testtdecert", "testtdecert", {
    privateBlob: "MIIXXXXXXXX",
  });
}

async function main(): Promise<void> {
  await uploadATDECertificate();
}

main().catch(console.error);
