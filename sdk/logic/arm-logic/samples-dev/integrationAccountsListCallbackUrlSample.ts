// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GetCallbackUrlParameters } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the integration account callback URL.
 *
 * @summary Gets the integration account callback URL.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationAccounts_ListCallbackUrl.json
 */
async function listIntegrationAccountCallbackUrl(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const integrationAccountName = "testIntegrationAccount";
  const parameters: GetCallbackUrlParameters = {
    keyType: "Primary",
    notAfter: new Date("2017-03-05T08:00:00Z"),
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationAccounts.listCallbackUrl(
    resourceGroupName,
    integrationAccountName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listIntegrationAccountCallbackUrl();
}

main().catch(console.error);
