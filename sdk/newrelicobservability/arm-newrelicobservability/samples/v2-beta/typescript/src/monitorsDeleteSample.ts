// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing New Relic monitor resource from your Azure subscription, removing the integration and stopping the observability of your Azure resources through New Relic
 *
 * @summary deletes an existing New Relic monitor resource from your Azure subscription, removing the integration and stopping the observability of your Azure resources through New Relic
 * x-ms-original-file: 2025-05-01-preview/Monitors_Delete_MaximumSet_Gen.json
 */
async function monitorsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  await client.monitors.delete(
    "rgopenapi",
    "ipxmlcbonyxtolzejcjshkmlron",
    "ruxvg@xqkmdhrnoo.hlmbpm",
  );
}

/**
 * This sample demonstrates how to deletes an existing New Relic monitor resource from your Azure subscription, removing the integration and stopping the observability of your Azure resources through New Relic
 *
 * @summary deletes an existing New Relic monitor resource from your Azure subscription, removing the integration and stopping the observability of your Azure resources through New Relic
 * x-ms-original-file: 2025-05-01-preview/Monitors_Delete_MinimumSet_Gen.json
 */
async function monitorsDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  await client.monitors.delete(
    "rgopenapi",
    "ipxmlcbonyxtolzejcjshkmlron",
    "ruxvg@xqkmdhrnoo.hlmbpm",
  );
}

async function main(): Promise<void> {
  await monitorsDeleteMaximumSetGen();
  await monitorsDeleteMinimumSetGen();
}

main().catch(console.error);
