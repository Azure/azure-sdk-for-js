// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing origin group within a profile.
 *
 * @summary updates an existing origin group within a profile.
 * x-ms-original-file: 2025-12-01/AFDOriginGroups_Update.json
 */
async function afdOriginGroupsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOriginGroups.update("RG", "profile1", "origingroup1", {
    authentication: {
      type: "UserAssignedIdentity",
      scope: "https://www.contoso.com/.default",
      userAssignedIdentity: {
        id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.ManagedIdentity/userAssignedIdentities/user-assigned-id-1",
      },
    },
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
  });
  console.log(result);
}

async function main() {
  await afdOriginGroupsUpdate();
}

main().catch(console.error);
