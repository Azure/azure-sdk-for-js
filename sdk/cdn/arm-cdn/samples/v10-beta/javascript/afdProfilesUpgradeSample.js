// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to upgrade a profile from Standard_AzureFrontDoor to Premium_AzureFrontDoor.
 *
 * @summary upgrade a profile from Standard_AzureFrontDoor to Premium_AzureFrontDoor.
 * x-ms-original-file: 2025-12-01/AFDProfiles_Upgrade.json
 */
async function afdProfilesUpgrade() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdProfiles.upgrade("RG", "profile1", {
    wafMappingList: [
      {
        changeToWafPolicy: {
          id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.Network/frontdoorwebapplicationfirewallpolicies/waf2",
        },
        securityPolicyName: "securityPolicy1",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await afdProfilesUpgrade();
}

main().catch(console.error);
