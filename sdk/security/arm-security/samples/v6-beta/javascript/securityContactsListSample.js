// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all security contact configurations for the subscription
 *
 * @summary list all security contact configurations for the subscription
 * x-ms-original-file: 2023-12-01-preview/SecurityContacts/GetSecurityContactsSubscription_example.json
 */
async function listSecurityContactData() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityContacts.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSecurityContactData();
}

main().catch(console.error);
