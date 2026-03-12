// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a server trust certificate that was uploaded from box to Sql Managed Instance.
 *
 * @summary Gets a server trust certificate that was uploaded from box to Sql Managed Instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-11-01-preview/examples/ServerTrustCertificatesGet.json
 */
async function getsServerTrustCertificate() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "38e0dc56-907f-45ba-a97c-74233baad471";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "testcl";
  const certificateName = "customerCertificateName";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverTrustCertificates.get(
    resourceGroupName,
    managedInstanceName,
    certificateName,
  );
  console.log(result);
}

async function main() {
  await getsServerTrustCertificate();
}

main().catch(console.error);
