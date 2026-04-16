// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created
 *
 * @summary Lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Accounts_List_MaximumSet_Gen.json
 */
async function accountsListMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
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
async function accountsListMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
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

async function main(): Promise<void> {
  await accountsListMaximumSetGen();
  await accountsListMinimumSetGen();
}

main().catch(console.error);
