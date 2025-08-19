// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint.
 *
 * @summary Creates a new route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Routes_Create.json
 */

import type { Route } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function routesCreate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const endpointName = "endpoint1";
  const routeName = "route1";
  const route: Route = {
    cacheConfiguration: {
      compressionSettings: {
        contentTypesToCompress: ["text/html", "application/octet-stream"],
        isCompressionEnabled: true,
      },
      queryParameters: "querystring=test",
      queryStringCachingBehavior: "IgnoreSpecifiedQueryStrings",
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
    originPath: undefined,
    patternsToMatch: ["/*"],
    ruleSets: [
      {
        id: "/subscriptions/subid/resourceGroups/RG/providers/Microsoft.Cdn/profiles/profile1/ruleSets/ruleSet1",
      },
    ],
    supportedProtocols: ["Https", "Http"],
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.routes.beginCreateAndWait(
    resourceGroupName,
    profileName,
    endpointName,
    routeName,
    route,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await routesCreate();
}

main().catch(console.error);
