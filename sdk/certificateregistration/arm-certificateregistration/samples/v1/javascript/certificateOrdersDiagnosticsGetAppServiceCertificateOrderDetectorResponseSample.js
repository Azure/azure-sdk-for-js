// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Microsoft.CertificateRegistration call to get a detector response from App Lens.
 *
 * @summary description for Microsoft.CertificateRegistration call to get a detector response from App Lens.
 * x-ms-original-file: 2024-11-01/Diagnostics_GetAppServiceCertificateOrderDetectorResponse.json
 */
async function getAppServiceCertificateOrderDetectorResponse() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5700fc96-77b4-4f8d-afce-c353d8c443bd";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  const result =
    await client.certificateOrdersDiagnostics.getAppServiceCertificateOrderDetectorResponse(
      "Sample-WestUSResourceGroup",
      "SampleCertificateOrderName",
      "AutoRenewStatus",
    );
  console.log(result);
}

async function main() {
  await getAppServiceCertificateOrderDetectorResponse();
}

main().catch(console.error);
