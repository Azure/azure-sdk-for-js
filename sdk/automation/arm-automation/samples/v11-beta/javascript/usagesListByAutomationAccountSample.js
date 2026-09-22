// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the usage for the account id.
 *
 * @summary retrieve the usage for the account id.
 * x-ms-original-file: 2024-10-23/getUsagesOfAutomationAccount.json
 */
async function getUsagesOfAnAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.listByAutomationAccount("rg", "myAutomationAccount11")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getUsagesOfAnAutomationAccount();
}

main().catch(console.error);
