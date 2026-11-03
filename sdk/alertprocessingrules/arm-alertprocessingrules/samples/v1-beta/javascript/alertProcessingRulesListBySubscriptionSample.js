// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertProcessingRulesManagementClient } = require("@azure/arm-alertprocessingrules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all alert processing rules in a subscription.
 *
 * @summary list all alert processing rules in a subscription.
 * x-ms-original-file: 2021-08-08/AlertProcessingRules_List_Subscription.json
 */
async function getAlertProcessingRulesSubscriptionWide() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1e3ff1c0-771a-4119-a03b-be82a51e232d";
  const client = new AlertProcessingRulesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alertProcessingRules.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAlertProcessingRulesSubscriptionWide();
}

main().catch(console.error);
