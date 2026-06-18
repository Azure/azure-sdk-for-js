// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new Front Door with a Front Door name under the specified subscription and resource group.
 *
 * @summary creates a new Front Door with a Front Door name under the specified subscription and resource group.
 * x-ms-original-file: 2025-11-01/FrontdoorCreate.json
 */
async function createOrUpdateSpecificFrontDoor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.frontDoors.createOrUpdate("rg1", "frontDoor1", {
    location: "westus",
    backendPools: [
      {
        name: "backendPool1",
        backends: [
          { address: "w3.contoso.com", httpPort: 80, httpsPort: 443, priority: 2, weight: 1 },
          {
            address: "contoso.com.website-us-west-2.othercloud.net",
            httpPort: 80,
            httpsPort: 443,
            priority: 1,
            privateLinkApprovalMessage:
              "Please approve the connection request for this Private Link",
            privateLinkLocation: "eastus",
            privateLinkResourceId:
              "/subscriptions/subid/resourcegroups/rg1/providers/Microsoft.Network/privateLinkServices/pls1",
            weight: 2,
          },
          {
            address: "10.0.1.5",
            httpPort: 80,
            httpsPort: 443,
            priority: 1,
            privateLinkAlias:
              "APPSERVER.d84e61f0-0870-4d24-9746-7438fa0019d1.westus2.azure.privatelinkservice",
            privateLinkApprovalMessage:
              "Please approve this request to connect to the Private Link",
            weight: 1,
          },
        ],
        healthProbeSettings: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/frontDoors/frontDoor1/healthProbeSettings/healthProbeSettings1",
        },
        loadBalancingSettings: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/frontDoors/frontDoor1/loadBalancingSettings/loadBalancingSettings1",
        },
      },
    ],
    backendPoolsSettings: { enforceCertificateNameCheck: "Enabled", sendRecvTimeoutSeconds: 60 },
    enabledState: "Enabled",
    frontendEndpoints: [
      {
        hostName: "www.contoso.com",
        sessionAffinityEnabledState: "Enabled",
        sessionAffinityTtlSeconds: 60,
        webApplicationFirewallPolicyLink: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/frontDoorWebApplicationFirewallPolicies/policy1",
        },
      },
      { hostName: "frontDoor1.azurefd.net" },
    ],
    healthProbeSettings: [
      {
        name: "healthProbeSettings1",
        path: "/",
        enabledState: "Enabled",
        healthProbeMethod: "HEAD",
        intervalInSeconds: 120,
        protocol: "Http",
      },
    ],
    loadBalancingSettings: [
      { name: "loadBalancingSettings1", sampleSize: 4, successfulSamplesRequired: 2 },
    ],
    routingRules: [
      {
        name: "routingRule1",
        acceptedProtocols: ["Http"],
        enabledState: "Enabled",
        frontendEndpoints: [
          {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/frontDoors/frontDoor1/frontendEndpoints/frontendEndpoint1",
          },
          {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/frontDoors/frontDoor1/frontendEndpoints/default",
          },
        ],
        patternsToMatch: ["/*"],
        routeConfiguration: {
          odataType: "#Microsoft.Azure.FrontDoor.Models.FrontdoorForwardingConfiguration",
          backendPool: {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/frontDoors/frontDoor1/backendPools/backendPool1",
          },
        },
        rulesEngine: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/frontDoors/frontDoor1/rulesEngines/rulesEngine1",
        },
        webApplicationFirewallPolicyLink: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/frontDoorWebApplicationFirewallPolicies/policy1",
        },
      },
    ],
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateSpecificFrontDoor();
}

main().catch(console.error);
