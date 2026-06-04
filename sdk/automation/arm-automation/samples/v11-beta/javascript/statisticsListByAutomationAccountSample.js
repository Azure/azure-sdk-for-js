// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the statistics for the account.
 *
 * @summary retrieve the statistics for the account.
 * x-ms-original-file: 2024-10-23/getStatisticsOfAutomationAccount.json
 */
async function getStatisticsOfAnAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.statistics.listByAutomationAccount(
    "rg",
    "myAutomationAccount11",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getStatisticsOfAnAutomationAccount();
}

main().catch(console.error);
