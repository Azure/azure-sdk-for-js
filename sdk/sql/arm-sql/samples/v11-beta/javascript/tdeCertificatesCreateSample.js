// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a TDE certificate for a given server.
 *
 * @summary creates a TDE certificate for a given server.
 * x-ms-original-file: 2025-02-01-preview/SqlTdeCertificateCreate.json
 */
async function uploadATDECertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.tdeCertificates.create("testtdecert", "testtdecert", { privateBlob: "MIIXXXXXXXX" });
}

async function main() {
  await uploadATDECertificate();
}

main().catch(console.error);
