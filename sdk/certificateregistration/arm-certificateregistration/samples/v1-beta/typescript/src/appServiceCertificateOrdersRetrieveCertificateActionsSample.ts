// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificateRegistrationManagementClient } from "@azure/arm-certificateregistration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Retrieve the list of certificate actions.
 *
 * @summary description for Retrieve the list of certificate actions.
 * x-ms-original-file: 2024-11-01/RetrieveCertificateOrderActions.json
 */
async function retrieveCertificateOrderActions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  const result = await client.appServiceCertificateOrders.retrieveCertificateActions(
    "testrg123",
    "SampleCertOrder",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveCertificateOrderActions();
}

main().catch(console.error);
