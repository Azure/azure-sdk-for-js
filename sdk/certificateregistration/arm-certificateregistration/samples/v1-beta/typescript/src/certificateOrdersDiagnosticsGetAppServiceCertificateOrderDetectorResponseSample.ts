// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificateRegistrationManagementClient } from "@azure/arm-certificateregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Microsoft.CertificateRegistration call to get a detector response from App Lens.
 *
 * @summary Description for Microsoft.CertificateRegistration call to get a detector response from App Lens.
 * x-ms-original-file: specification/certificateregistration/resource-manager/Microsoft.CertificateRegistration/CertificateRegistration/stable/2024-11-01/examples/Diagnostics_GetAppServiceCertificateOrderDetectorResponse.json
 */
async function getAppServiceCertificateOrderDetectorResponse(): Promise<void> {
  const subscriptionId =
    process.env["CERTIFICATEREGISTRATION_SUBSCRIPTION_ID"] ||
    "5700fc96-77b4-4f8d-afce-c353d8c443bd";
  const resourceGroupName =
    process.env["CERTIFICATEREGISTRATION_RESOURCE_GROUP"] ||
    "Sample-WestUSResourceGroup";
  const certificateOrderName = "SampleCertificateOrderName";
  const detectorName = "AutoRenewStatus";
  const credential = new DefaultAzureCredential();
  const client = new CertificateRegistrationManagementClient(
    credential,
    subscriptionId,
  );
  const result =
    await client.certificateOrdersDiagnostics.getAppServiceCertificateOrderDetectorResponse(
      resourceGroupName,
      certificateOrderName,
      detectorName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getAppServiceCertificateOrderDetectorResponse();
}

main().catch(console.error);
