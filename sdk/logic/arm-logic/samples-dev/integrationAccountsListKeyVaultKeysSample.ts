// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListKeyVaultKeysDefinition } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the integration account's Key Vault keys.
 *
 * @summary Gets the integration account's Key Vault keys.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationAccounts_ListKeyVaultKeys.json
 */
async function getIntegrationAccountCallbackUrl(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const integrationAccountName = "testIntegrationAccount";
  const listKeyVaultKeys: ListKeyVaultKeysDefinition = {
    keyVault: {
      id: "subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testResourceGroup/providers/Microsoft.KeyVault/vaults/testKeyVault",
    },
    skipToken: "testSkipToken",
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.integrationAccounts.listKeyVaultKeys(
    resourceGroupName,
    integrationAccountName,
    listKeyVaultKeys,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getIntegrationAccountCallbackUrl();
}

main().catch(console.error);
