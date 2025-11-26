// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created
 *
 * @summary Lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Accounts_List_MaximumSet_Gen.json
 */
async function accountsListMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const userEmail = "ruxvg@xqkmdhrnoo.hlmbpm";
  const location = "egh";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.list(userEmail, location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created
 *
 * @summary Lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Accounts_List_MinimumSet_Gen.json
 */
async function accountsListMinimumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const userEmail = "ruxvg@xqkmdhrnoo.hlmbpm";
  const location = "egh";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.list(userEmail, location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await accountsListMaximumSetGen();
  await accountsListMinimumSetGen();
}

main().catch(console.error);
