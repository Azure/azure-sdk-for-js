// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list certificates used on endpoints on the target instance.
 *
 * @summary list certificates used on endpoints on the target instance.
 * x-ms-original-file: 2025-02-01-preview/EndpointCertificatesListByInstance.json
 */
async function getAListOfEndpointCertificates() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "38e0dc56-907f-45ba-a97c-74233baad471";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpointCertificates.listByInstance("testrg", "testcl")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfEndpointCertificates();
}

main().catch(console.error);
