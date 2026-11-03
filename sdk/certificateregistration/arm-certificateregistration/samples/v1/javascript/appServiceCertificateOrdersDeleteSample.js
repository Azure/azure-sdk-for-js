// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Delete an existing certificate order.
 *
 * @summary description for Delete an existing certificate order.
 * x-ms-original-file: 2024-11-01/DeleteAppServiceCertificateOrder.json
 */
async function deleteAppServiceCertificateOrder() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  await client.appServiceCertificateOrders.delete("testrg123", "SampleCertificateOrderName");
}

async function main() {
  await deleteAppServiceCertificateOrder();
}

main().catch(console.error);
