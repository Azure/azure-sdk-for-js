// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for Retrieve email history.
 *
 * @summary Description for Retrieve email history.
 * x-ms-original-file: specification/certificateregistration/resource-manager/Microsoft.CertificateRegistration/CertificateRegistration/stable/2024-11-01/examples/RetrieveCertificateEmailHistory.json
 */
async function retrieveCertificateEmailHistory() {
  const subscriptionId =
    process.env["CERTIFICATEREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["CERTIFICATEREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const name = "SampleCertOrder";
  const credential = new DefaultAzureCredential();
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  const result = await client.appServiceCertificateOrders.retrieveCertificateEmailHistory(
    resourceGroupName,
    name,
  );
  console.log(result);
}

async function main() {
  await retrieveCertificateEmailHistory();
}

main().catch(console.error);
