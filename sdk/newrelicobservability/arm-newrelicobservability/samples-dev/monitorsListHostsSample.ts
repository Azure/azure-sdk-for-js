// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability
 *
 * @summary lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability
 * x-ms-original-file: 2025-05-01-preview/Monitors_ListHosts_MaximumSet_Gen.json
 */
async function monitorsListHostsMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listHosts("rgopenapi", "ipxmlcbonyxtolzejcjshkmlron", {
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
    vmIds: ["xzphvxvfmvjrnsgyns"],
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability
 *
 * @summary lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability
 * x-ms-original-file: 2025-05-01-preview/Monitors_ListHosts_MinimumSet_Gen.json
 */
async function monitorsListHostsMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listHosts("rgopenapi", "ipxmlcbonyxtolzejcjshkmlron", {
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
    vmIds: ["xzphvxvfmvjrnsgyns"],
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await monitorsListHostsMaximumSetGen();
  await monitorsListHostsMinimumSetGen();
}

main().catch(console.error);
