// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing origin group within an endpoint.
 *
 * @summary updates an existing origin group within an endpoint.
 * x-ms-original-file: 2025-12-01/OriginGroups_Update.json
 */
async function originGroupsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.originGroups.update("RG", "profile1", "endpoint1", "originGroup1", {
    healthProbeSettings: {
      probeIntervalInSeconds: 120,
      probePath: "/health.aspx",
      probeProtocol: "Http",
      probeRequestType: "GET",
    },
    origins: [
      {
        id: "/subscriptions/subid/resourceGroups/RG/providers/Microsoft.Cdn/profiles/profile1/endpoints/endpoint1/origins/origin2",
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await originGroupsUpdate();
}

main().catch(console.error);
