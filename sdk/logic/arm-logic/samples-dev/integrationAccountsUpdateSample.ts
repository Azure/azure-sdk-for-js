// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates an integration account.
 *
 * @summary Updates an integration account.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationAccounts_Update.json
 */

import type { IntegrationAccount } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function patchAnIntegrationAccount(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const integrationAccountName = "testIntegrationAccount";
  const integrationAccount: IntegrationAccount = {
    location: "westus",
    sku: { name: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationAccounts.update(
    resourceGroupName,
    integrationAccountName,
    integrationAccount,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchAnIntegrationAccount();
}

main().catch(console.error);
