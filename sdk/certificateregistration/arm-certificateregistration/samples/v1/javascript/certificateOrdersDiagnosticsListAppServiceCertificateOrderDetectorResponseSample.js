// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Microsoft.CertificateRegistration to get the list of detectors for this RP.
 *
 * @summary description for Microsoft.CertificateRegistration to get the list of detectors for this RP.
 * x-ms-original-file: 2024-11-01/Diagnostics_ListAppServiceCertificateOrderDetectorResponse.json
 */
async function listAppServiceCertificateDetectorResponse() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5700fc96-77b4-4f8d-afce-c353d8c443bd";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.certificateOrdersDiagnostics.listAppServiceCertificateOrderDetectorResponse(
    "Sample-WestUSResourceGroup",
    "SampleCertificateOrderName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAppServiceCertificateDetectorResponse();
}

main().catch(console.error);
