// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all the New Relic organizations linked to your email address, helping you understand the existing organizations that have been created
 *
 * @summary Lists all the New Relic organizations linked to your email address, helping you understand the existing organizations that have been created
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Organizations_List_MaximumSet_Gen.json
 */
async function organizationsListMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const userEmail = "ruxvg@xqkmdhrnoo.hlmbpm";
  const location = "egh";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.list(userEmail, location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists all the New Relic organizations linked to your email address, helping you understand the existing organizations that have been created
 *
 * @summary Lists all the New Relic organizations linked to your email address, helping you understand the existing organizations that have been created
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Organizations_List_MinimumSet_Gen.json
 */
async function organizationsListMinimumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const userEmail = "ruxvg@xqkmdhrnoo.hlmbpm";
  const location = "egh";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.list(userEmail, location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await organizationsListMaximumSetGen();
  await organizationsListMinimumSetGen();
}

main().catch(console.error);
