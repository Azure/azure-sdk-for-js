// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the connection identified by connection name.
 *
 * @summary retrieve the connection identified by connection name.
 * x-ms-original-file: 2024-10-23/getConnection.json
 */
async function getAConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.connection.get("rg", "myAutomationAccount28", "myConnection");
  console.log(result);
}

async function main() {
  await getAConnection();
}

main().catch(console.error);
