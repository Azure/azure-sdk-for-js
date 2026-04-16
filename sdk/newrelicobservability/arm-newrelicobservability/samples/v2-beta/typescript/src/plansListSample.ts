// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PlansListOptionalParams} from "@azure/arm-newrelicobservability";
import {
  NewRelicObservability,
} from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists the plans data linked to your organization, providing an overview of the available plans
 *
 * @summary Lists the plans data linked to your organization, providing an overview of the available plans
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Plans_List_MaximumSet_Gen.json
 */
async function plansListMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const accountId = "pwuxgvrmkk";
  const organizationId = "hilawwjz";
  const options: PlansListOptionalParams = { accountId, organizationId };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.plans.list(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the plans data linked to your organization, providing an overview of the available plans
 *
 * @summary Lists the plans data linked to your organization, providing an overview of the available plans
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Plans_List_MinimumSet_Gen.json
 */
async function plansListMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const organizationId = "hilawwjz";
  const options: PlansListOptionalParams = { organizationId };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.plans.list(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await plansListMaximumSetGen();
  await plansListMinimumSetGen();
}

main().catch(console.error);
