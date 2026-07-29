// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the app service resources currently being monitored by the New Relic resource, helping you understand which app services are under monitoring
 *
 * @summary lists the app service resources currently being monitored by the New Relic resource, helping you understand which app services are under monitoring
 * x-ms-original-file: 2025-05-01-preview/Monitors_ListAppServices_MaximumSet_Gen.json
 */
async function monitorsListAppServicesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listAppServices(
    "rgNewRelic",
    "fhcjxnxumkdlgpwanewtkdnyuz",
    {
      azureResourceIds: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgNewRelic/providers/NewRelic.Observability/monitors/fhcjxnxumkdlgpwanewtkdnyuz",
      ],
      userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the app service resources currently being monitored by the New Relic resource, helping you understand which app services are under monitoring
 *
 * @summary lists the app service resources currently being monitored by the New Relic resource, helping you understand which app services are under monitoring
 * x-ms-original-file: 2025-05-01-preview/Monitors_ListAppServices_MinimumSet_Gen.json
 */
async function monitorsListAppServicesMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listAppServices(
    "rgNewRelic",
    "fhcjxnxumkdlgpwanewtkdnyuz",
    {
      azureResourceIds: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgNewRelic/providers/NewRelic.Observability/monitors/fhcjxnxumkdlgpwanewtkdnyuz",
      ],
      userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await monitorsListAppServicesMaximumSetGen();
  await monitorsListAppServicesMinimumSetGen();
}

main().catch(console.error);
