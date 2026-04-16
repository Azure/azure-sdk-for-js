// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  HostsGetRequest} from "@azure/arm-newrelicobservability";
import {
  NewRelicObservability,
} from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability
 *
 * @summary Lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_ListHosts_MaximumSet_Gen.json
 */
async function monitorsListHostsMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const request: HostsGetRequest = {
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
    vmIds: ["xzphvxvfmvjrnsgyns"],
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listHosts(
    resourceGroupName,
    monitorName,
    request,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability
 *
 * @summary Lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_ListHosts_MinimumSet_Gen.json
 */
async function monitorsListHostsMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const request: HostsGetRequest = {
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
    vmIds: ["xzphvxvfmvjrnsgyns"],
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listHosts(
    resourceGroupName,
    monitorName,
    request,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await monitorsListHostsMaximumSetGen();
  await monitorsListHostsMinimumSetGen();
}

main().catch(console.error);
