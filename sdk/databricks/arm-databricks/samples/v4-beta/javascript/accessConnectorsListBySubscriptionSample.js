// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDatabricksManagementClient } = require("@azure/arm-databricks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the Azure Databricks Access Connectors within a subscription.
 *
 * @summary gets all the Azure Databricks Access Connectors within a subscription.
 * x-ms-original-file: 2026-01-01/AccessConnectorsListBySubscriptionId.json
 */
async function listsAllTheAzureDatabricksAccessConnectorsWithinASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accessConnectors.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllTheAzureDatabricksAccessConnectorsWithinASubscription();
}

main().catch(console.error);
