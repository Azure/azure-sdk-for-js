// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AFDOriginGroup } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new origin group within the specified profile.
 *
 * @summary Creates a new origin group within the specified profile.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/AFDOriginGroups_Create.json
 */
async function afdOriginGroupsCreate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const originGroupName = "origingroup1";
  const originGroup: AFDOriginGroup = {
    healthProbeSettings: {
      probeIntervalInSeconds: 10,
      probePath: "/path2",
      probeProtocol: "NotSet",
      probeRequestType: "NotSet",
    },
    loadBalancingSettings: {
      additionalLatencyInMilliseconds: 1000,
      sampleSize: 3,
      successfulSamplesRequired: 3,
    },
    trafficRestorationTimeToHealedOrNewEndpointsInMinutes: 5,
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOriginGroups.beginCreateAndWait(
    resourceGroupName,
    profileName,
    originGroupName,
    originGroup,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await afdOriginGroupsCreate();
}

main().catch(console.error);
