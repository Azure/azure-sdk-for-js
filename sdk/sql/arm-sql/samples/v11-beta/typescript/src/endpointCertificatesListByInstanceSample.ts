// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list certificates used on endpoints on the target instance.
 *
 * @summary list certificates used on endpoints on the target instance.
 * x-ms-original-file: 2025-02-01-preview/EndpointCertificatesListByInstance.json
 */
async function getAListOfEndpointCertificates(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "38e0dc56-907f-45ba-a97c-74233baad471";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpointCertificates.listByInstance("testrg", "testcl")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfEndpointCertificates();
}

main().catch(console.error);
