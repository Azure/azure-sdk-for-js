// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IntegrationAccountCertificate } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an integration account certificate.
 *
 * @summary Creates or updates an integration account certificate.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationAccountCertificates_CreateOrUpdate.json
 */
async function createOrUpdateACertificate(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const integrationAccountName = "testIntegrationAccount";
  const certificateName = "testCertificate";
  const certificate: IntegrationAccountCertificate = {
    key: {
      keyName: "<keyName>",
      keyVault: {
        id: "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/testResourceGroup/providers/microsoft.keyvault/vaults/<keyVaultName>",
      },
      keyVersion: "87d9764197604449b9b8eb7bd8710868",
    },
    location: "brazilsouth",
    publicCertificate: "<publicCertificateValue>",
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationAccountCertificates.createOrUpdate(
    resourceGroupName,
    integrationAccountName,
    certificateName,
    certificate,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateACertificate();
}

main().catch(console.error);
