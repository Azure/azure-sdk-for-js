// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an integration account certificate.
 *
 * @summary Gets an integration account certificate.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationAccountCertificates_Get.json
 */

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCertificateByName(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const integrationAccountName = "testIntegrationAccount";
  const certificateName = "testCertificate";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationAccountCertificates.get(
    resourceGroupName,
    integrationAccountName,
    certificateName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCertificateByName();
}

main().catch(console.error);
