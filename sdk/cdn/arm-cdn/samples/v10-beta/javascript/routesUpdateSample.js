// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint.
 *
 * @summary updates an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint.
 * x-ms-original-file: 2025-12-01/Routes_Update.json
 */
async function routesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.routes.update("RG", "profile1", "endpoint1", "route1", {
    cacheConfiguration: {
      compressionSettings: {
        contentTypesToCompress: ["text/html", "application/octet-stream"],
        isCompressionEnabled: true,
      },
      queryStringCachingBehavior: "IgnoreQueryString",
    },
    customDomains: [
      {
        id: "/subscriptions/subid/resourceGroups/RG/providers/Microsoft.Cdn/profiles/profile1/customDomains/domain1",
      },
    ],
    enabledState: "Enabled",
    forwardingProtocol: "MatchRequest",
    httpsRedirect: "Enabled",
    linkToDefaultDomain: "Enabled",
    originGroup: {
      id: "/subscriptions/subid/resourceGroups/RG/providers/Microsoft.Cdn/profiles/profile1/originGroups/originGroup1",
    },
    patternsToMatch: ["/*"],
    ruleSets: [
      {
        id: "/subscriptions/subid/resourceGroups/RG/providers/Microsoft.Cdn/profiles/profile1/ruleSets/ruleSet1",
      },
    ],
    supportedProtocols: ["Https", "Http"],
  });
  console.log(result);
}

async function main() {
  await routesUpdate();
}

main().catch(console.error);
