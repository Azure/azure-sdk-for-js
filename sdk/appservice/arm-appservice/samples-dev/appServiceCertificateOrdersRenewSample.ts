// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Renew an existing certificate order.
 *
 * @summary Description for Renew an existing certificate order.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2024-11-01/examples/RenewAppServiceCertificateOrder.json
 */

import {
  RenewCertificateOrderRequest,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function renewAppServiceCertificateOrder(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const certificateOrderName = "SampleCertificateOrderName";
  const renewCertificateOrderRequest: RenewCertificateOrderRequest = {
    csr: "CSR1223238Value",
    isPrivateKeyExternal: false,
    keySize: 2048,
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceCertificateOrders.renew(
    resourceGroupName,
    certificateOrderName,
    renewCertificateOrderRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await renewAppServiceCertificateOrder();
}

main().catch(console.error);
