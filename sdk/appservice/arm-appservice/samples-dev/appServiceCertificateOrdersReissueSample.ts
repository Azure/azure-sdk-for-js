// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Reissue an existing certificate order.
 *
 * @summary Description for Reissue an existing certificate order.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2024-11-01/examples/ReissueAppServiceCertificateOrder.json
 */

import {
  ReissueCertificateOrderRequest,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reissueAppServiceCertificateOrder(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const certificateOrderName = "SampleCertificateOrderName";
  const reissueCertificateOrderRequest: ReissueCertificateOrderRequest = {
    csr: "CSR1223238Value",
    delayExistingRevokeInHours: 2,
    isPrivateKeyExternal: false,
    keySize: 2048,
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceCertificateOrders.reissue(
    resourceGroupName,
    certificateOrderName,
    reissueCertificateOrderRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reissueAppServiceCertificateOrder();
}

main().catch(console.error);
