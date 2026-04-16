// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Links a new SaaS to the newrelic organization of the underlying monitor.
 *
 * @summary Links a new SaaS to the newrelic organization of the underlying monitor.
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_LinkSaaS.json
 */
async function monitorsLinkSaaS() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const body = {
    saaSResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgNewRelic/providers/Microsoft.SaaS/resources/abcd",
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.beginLinkSaaSAndWait(resourceGroupName, monitorName, body);
  console.log(result);
}

async function main() {
  await monitorsLinkSaaS();
}

main().catch(console.error);
