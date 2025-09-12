// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of server trust certificates that were uploaded from box to the given Sql Managed Instance.
 *
 * @summary Gets a list of server trust certificates that were uploaded from box to the given Sql Managed Instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-11-01-preview/examples/ServerTrustCertificatesListByInstance.json
 */
async function getsAListOfServerTrustCertificatesOnAGivenServer() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "38e0dc56-907f-45ba-a97c-74233baad471";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "testcl";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverTrustCertificates.listByInstance(
    resourceGroupName,
    managedInstanceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getsAListOfServerTrustCertificatesOnAGivenServer();
}

main().catch(console.error);
