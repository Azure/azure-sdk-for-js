// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for Microsoft.CertificateRegistration to get the list of detectors for this RP.
 *
 * @summary Description for Microsoft.CertificateRegistration to get the list of detectors for this RP.
 * x-ms-original-file: specification/certificateregistration/resource-manager/Microsoft.CertificateRegistration/CertificateRegistration/stable/2024-11-01/examples/Diagnostics_ListAppServiceCertificateOrderDetectorResponse.json
 */
async function listAppServiceCertificateDetectorResponse() {
  const subscriptionId =
    process.env["CERTIFICATEREGISTRATION_SUBSCRIPTION_ID"] ||
    "5700fc96-77b4-4f8d-afce-c353d8c443bd";
  const resourceGroupName =
    process.env["CERTIFICATEREGISTRATION_RESOURCE_GROUP"] || "Sample-WestUSResourceGroup";
  const certificateOrderName = "SampleCertificateOrderName";
  const credential = new DefaultAzureCredential();
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.certificateOrdersDiagnostics.listAppServiceCertificateOrderDetectorResponse(
    resourceGroupName,
    certificateOrderName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAppServiceCertificateDetectorResponse();
}

main().catch(console.error);
