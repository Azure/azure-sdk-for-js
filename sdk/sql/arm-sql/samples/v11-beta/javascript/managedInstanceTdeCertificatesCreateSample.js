// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a TDE certificate for a given server.
 *
 * @summary Creates a TDE certificate for a given server.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ManagedInstanceTdeCertificate.json
 */
async function uploadATdeCertificate() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000001";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testtdecert";
  const managedInstanceName = "testtdecert";
  const parameters = { privateBlob: "MIIXXXXXXXX" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceTdeCertificates.beginCreateAndWait(
    resourceGroupName,
    managedInstanceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await uploadATdeCertificate();
}

main().catch(console.error);
