// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of the server trust certificates used to secure communication between SQL Server and the specified SQL Managed Instance
 *
 * @summary gets a list of the server trust certificates used to secure communication between SQL Server and the specified SQL Managed Instance
 * x-ms-original-file: 2025-02-01-preview/ServerTrustCertificatesListByInstance.json
 */
async function getsAListOfServerTrustCertificatesOnAGivenServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "38e0dc56-907f-45ba-a97c-74233baad471";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverTrustCertificates.listByInstance("testrg", "testcl")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsAListOfServerTrustCertificatesOnAGivenServer();
}

main().catch(console.error);
