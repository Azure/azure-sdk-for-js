// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the plans data linked to your organization, providing an overview of the available plans
 *
 * @summary lists the plans data linked to your organization, providing an overview of the available plans
 * x-ms-original-file: 2025-05-01-preview/Plans_List_MaximumSet_Gen.json
 */
async function plansListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.plans.list({
    accountId: "pwuxgvrmkk",
    organizationId: "hilawwjz",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the plans data linked to your organization, providing an overview of the available plans
 *
 * @summary lists the plans data linked to your organization, providing an overview of the available plans
 * x-ms-original-file: 2025-05-01-preview/Plans_List_MinimumSet_Gen.json
 */
async function plansListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.plans.list({ organizationId: "hilawwjz" })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await plansListMaximumSetGen();
  await plansListMinimumSetGen();
}

main().catch(console.error);
