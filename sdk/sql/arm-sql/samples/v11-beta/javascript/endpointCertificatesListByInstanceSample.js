// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List certificates used on endpoints on the target instance.
 *
 * @summary List certificates used on endpoints on the target instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-11-01-preview/examples/EndpointCertificatesListByInstance.json
 */
async function getAListOfEndpointCertificates() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "38e0dc56-907f-45ba-a97c-74233baad471";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "testcl";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpointCertificates.listByInstance(
    resourceGroupName,
    managedInstanceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAListOfEndpointCertificates();
}

main().catch(console.error);
