// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a server trust certificate that was uploaded from SQL Server to SQL Managed Instance.
 *
 * @summary gets a server trust certificate that was uploaded from SQL Server to SQL Managed Instance.
 * x-ms-original-file: 2025-02-01-preview/ServerTrustCertificatesGet.json
 */
async function getsServerTrustCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "38e0dc56-907f-45ba-a97c-74233baad471";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverTrustCertificates.get(
    "testrg",
    "testcl",
    "customerCertificateName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsServerTrustCertificate();
}

main().catch(console.error);
