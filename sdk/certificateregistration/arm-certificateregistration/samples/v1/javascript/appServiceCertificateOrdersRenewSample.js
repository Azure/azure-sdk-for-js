// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Renew an existing certificate order.
 *
 * @summary description for Renew an existing certificate order.
 * x-ms-original-file: 2024-11-01/RenewAppServiceCertificateOrder.json
 */
async function renewAppServiceCertificateOrder() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  await client.appServiceCertificateOrders.renew("testrg123", "SampleCertificateOrderName", {
    csr: "CSR1223238Value",
    isPrivateKeyExternal: false,
    keySize: 2048,
  });
}

async function main() {
  await renewAppServiceCertificateOrder();
}

main().catch(console.error);
