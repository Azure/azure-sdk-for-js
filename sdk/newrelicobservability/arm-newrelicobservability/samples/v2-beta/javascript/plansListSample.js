// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists the plans data linked to your organization, providing an overview of the available plans
 *
 * @summary Lists the plans data linked to your organization, providing an overview of the available plans
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Plans_List_MaximumSet_Gen.json
 */
async function plansListMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const accountId = "pwuxgvrmkk";
  const organizationId = "hilawwjz";
  const options = { accountId, organizationId };
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
async function plansListMinimumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const organizationId = "hilawwjz";
  const options = { organizationId };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.plans.list(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await plansListMaximumSetGen();
  await plansListMinimumSetGen();
}

main().catch(console.error);
