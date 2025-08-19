// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets all the azure databricks accessConnectors within a subscription.
 *
 * @summary Gets all the azure databricks accessConnectors within a subscription.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-05-01/examples/AccessConnectorsListBySubscriptionId.json
 */
async function listsAllTheAzureDatabricksAccessConnectorsWithinASubscription(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
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
