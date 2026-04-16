// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificateRegistrationManagementClient } from "@azure/arm-certificateregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Retrieve the list of certificate actions.
 *
 * @summary Description for Retrieve the list of certificate actions.
 * x-ms-original-file: specification/certificateregistration/resource-manager/Microsoft.CertificateRegistration/CertificateRegistration/stable/2024-11-01/examples/RetrieveCertificateOrderActions.json
 */
async function retrieveCertificateOrderActions(): Promise<void> {
  const subscriptionId =
    process.env["CERTIFICATEREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["CERTIFICATEREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const name = "SampleCertOrder";
  const credential = new DefaultAzureCredential();
  const client = new CertificateRegistrationManagementClient(
    credential,
    subscriptionId,
  );
  const result =
    await client.appServiceCertificateOrders.retrieveCertificateActions(
      resourceGroupName,
      name,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveCertificateOrderActions();
}

main().catch(console.error);
