// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to uploads a server trust certificate from SQL Server to SQL Managed Instance.
 *
 * @summary uploads a server trust certificate from SQL Server to SQL Managed Instance.
 * x-ms-original-file: 2025-02-01-preview/ServerTrustCertificatesCreate.json
 */
async function createServerTrustCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0574222d-5c7f-489c-a172-b3013eafab53";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverTrustCertificates.createOrUpdate(
    "testrg",
    "testcl",
    "customerCertificateName",
    { publicBlob: "308203AE30820296A0030201020210" },
  );
  console.log(result);
}

async function main() {
  await createServerTrustCertificate();
}

main().catch(console.error);
