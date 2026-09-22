// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Reissue an existing certificate order.
 *
 * @summary description for Reissue an existing certificate order.
 * x-ms-original-file: 2024-11-01/ReissueAppServiceCertificateOrder.json
 */
async function reissueAppServiceCertificateOrder() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  await client.appServiceCertificateOrders.reissue("testrg123", "SampleCertificateOrderName", {
    csr: "CSR1223238Value",
    delayExistingRevokeInHours: 2,
    isPrivateKeyExternal: false,
    keySize: 2048,
  });
}

async function main() {
  await reissueAppServiceCertificateOrder();
}

main().catch(console.error);
