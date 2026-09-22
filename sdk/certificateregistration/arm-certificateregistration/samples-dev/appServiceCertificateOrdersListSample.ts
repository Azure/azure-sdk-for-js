// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificateRegistrationManagementClient } from "@azure/arm-certificateregistration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for List all certificate orders in a subscription.
 *
 * @summary description for List all certificate orders in a subscription.
 * x-ms-original-file: 2024-11-01/ListAppServiceCertificateOrdersBySubscription.json
 */
async function listAppServiceCertificateOrdersBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceCertificateOrders.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAppServiceCertificateOrdersBySubscription();
}

main().catch(console.error);
