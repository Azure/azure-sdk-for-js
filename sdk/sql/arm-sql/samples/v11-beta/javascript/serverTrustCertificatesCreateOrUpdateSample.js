// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Uploads a server trust certificate from box to Sql Managed Instance.
 *
 * @summary Uploads a server trust certificate from box to Sql Managed Instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-11-01-preview/examples/ServerTrustCertificatesCreate.json
 */
async function createServerTrustCertificate() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "0574222d-5c7f-489c-a172-b3013eafab53";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "testcl";
  const certificateName = "customerCertificateName";
  const parameters = {
    publicBlob: "308203AE30820296A0030201020210",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverTrustCertificates.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    certificateName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createServerTrustCertificate();
}

main().catch(console.error);
