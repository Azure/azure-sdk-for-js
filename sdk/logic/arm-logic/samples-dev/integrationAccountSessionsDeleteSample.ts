// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an integration account session.
 *
 * @summary Deletes an integration account session.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationAccountSessions_Delete.json
 */

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAnIntegrationAccountSession(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testrg123";
  const integrationAccountName = "testia123";
  const sessionName = "testsession123-ICN";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationAccountSessions.delete(
    resourceGroupName,
    integrationAccountName,
    sessionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAnIntegrationAccountSession();
}

main().catch(console.error);
