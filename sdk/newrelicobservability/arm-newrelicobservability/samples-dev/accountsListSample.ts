// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created
 *
 * @summary lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created
 * x-ms-original-file: 2025-05-01-preview/Accounts_List_MaximumSet_Gen.json
 */
async function accountsListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.list("ruxvg@xqkmdhrnoo.hlmbpm", "egh")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created
 *
 * @summary lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created
 * x-ms-original-file: 2025-05-01-preview/Accounts_List_MinimumSet_Gen.json
 */
async function accountsListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.list("ruxvg@xqkmdhrnoo.hlmbpm", "egh")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await accountsListMaximumSetGen();
  await accountsListMinimumSetGen();
}

main().catch(console.error);
