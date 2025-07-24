// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the connectors in a cluster
 *
 * @summary lists all the connectors in a cluster
 * x-ms-original-file: 2024-07-01/Organization_ConnectorList.json
 */
async function connectorList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connector.list(
    "myResourceGroup",
    "myOrganization",
    "env-12132",
    "cluster-1",
    { pageSize: 10 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await connectorList();
}

main().catch(console.error);
