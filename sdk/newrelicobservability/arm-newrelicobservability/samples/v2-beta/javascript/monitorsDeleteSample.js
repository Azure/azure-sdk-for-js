// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes an existing New Relic monitor resource from your Azure subscription, removing the integration and stopping the observability of your Azure resources through New Relic
 *
 * @summary Deletes an existing New Relic monitor resource from your Azure subscription, removing the integration and stopping the observability of your Azure resources through New Relic
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_Delete_MaximumSet_Gen.json
 */
async function monitorsDeleteMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const userEmail = "ruxvg@xqkmdhrnoo.hlmbpm";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.beginDeleteAndWait(
    resourceGroupName,
    monitorName,
    userEmail,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Deletes an existing New Relic monitor resource from your Azure subscription, removing the integration and stopping the observability of your Azure resources through New Relic
 *
 * @summary Deletes an existing New Relic monitor resource from your Azure subscription, removing the integration and stopping the observability of your Azure resources through New Relic
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_Delete_MinimumSet_Gen.json
 */
async function monitorsDeleteMinimumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const userEmail = "ruxvg@xqkmdhrnoo.hlmbpm";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.beginDeleteAndWait(
    resourceGroupName,
    monitorName,
    userEmail,
  );
  console.log(result);
}

async function main() {
  await monitorsDeleteMaximumSetGen();
  await monitorsDeleteMinimumSetGen();
}

main().catch(console.error);
