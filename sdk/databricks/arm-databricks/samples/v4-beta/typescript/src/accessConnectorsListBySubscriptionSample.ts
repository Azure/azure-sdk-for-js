// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all the Azure Databricks Access Connectors within a subscription.
 *
 * @summary gets all the Azure Databricks Access Connectors within a subscription.
 * x-ms-original-file: 2026-01-01/AccessConnectorsListBySubscriptionId.json
 */
async function listsAllTheAzureDatabricksAccessConnectorsWithinASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accessConnectors.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllTheAzureDatabricksAccessConnectorsWithinASubscription();
}

main().catch(console.error);
