// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a server trust certificate that was uploaded from SQL Server to SQL Managed Instance.
 *
 * @summary deletes a server trust certificate that was uploaded from SQL Server to SQL Managed Instance.
 * x-ms-original-file: 2025-02-01-preview/ServerTrustCertificatesDelete.json
 */
async function deleteServerTrustCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "38e0dc56-907f-45ba-a97c-74233baad471";
  const client = new SqlClient(credential, subscriptionId);
  await client.serverTrustCertificates.delete("testrg", "testcl", "customerCertificateName");
}

async function main() {
  await deleteServerTrustCertificate();
}

main().catch(console.error);
