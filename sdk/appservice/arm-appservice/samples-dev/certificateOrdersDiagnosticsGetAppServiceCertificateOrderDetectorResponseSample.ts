// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Microsoft.CertificateRegistration call to get a detector response from App Lens.
 *
 * @summary Description for Microsoft.CertificateRegistration call to get a detector response from App Lens.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2024-11-01/examples/Diagnostics_GetAppServiceCertificateOrderDetectorResponse.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAppServiceCertificateOrderDetectorResponse(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "5700fc96-77b4-4f8d-afce-c353d8c443bd";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "Sample-WestUSResourceGroup";
  const certificateOrderName = "SampleCertificateOrderName";
  const detectorName = "AutoRenewStatus";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
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
