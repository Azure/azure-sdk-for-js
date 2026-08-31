// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 *
 * @summary creates a new CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 * x-ms-original-file: 2025-12-01/Endpoints_Create.json
 */
async function endpointsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.endpoints.create("RG", "profile1", "endpoint1", {
    location: "WestUs",
    contentTypesToCompress: ["text/html", "application/octet-stream"],
    defaultOriginGroup: {
      id: "/subscriptions/subid/resourceGroups/RG/providers/Microsoft.Cdn/profiles/profile1/endpoints/endpoint1/originGroups/originGroup1",
    },
    deliveryPolicy: {
      description: "Test description for a policy.",
      rules: [
        {
          name: "rule1",
          actions: [
            {
              name: "CacheExpiration",
              parameters: {
                cacheBehavior: "Override",
                cacheDuration: "10:10:09",
                cacheType: "All",
                typeName: "DeliveryRuleCacheExpirationActionParameters",
              },
            },
            {
              name: "ModifyResponseHeader",
              parameters: {
                headerAction: "Overwrite",
                headerName: "Access-Control-Allow-Origin",
                typeName: "DeliveryRuleHeaderActionParameters",
                value: "*",
              },
            },
            {
              name: "ModifyRequestHeader",
              parameters: {
                headerAction: "Overwrite",
                headerName: "Accept-Encoding",
                typeName: "DeliveryRuleHeaderActionParameters",
                value: "gzip",
              },
            },
          ],
          conditions: [
            {
              name: "RemoteAddress",
              parameters: {
                matchValues: ["192.168.1.0/24", "10.0.0.0/24"],
                negateCondition: true,
                operator: "IPMatch",
                typeName: "DeliveryRuleRemoteAddressConditionParameters",
              },
            },
          ],
          order: 1,
        },
      ],
    },
    isCompressionEnabled: true,
    isHttpAllowed: true,
    isHttpsAllowed: true,
    originGroups: [
      {
        name: "originGroup1",
        healthProbeSettings: {
          probeIntervalInSeconds: 120,
          probePath: "/health.aspx",
          probeProtocol: "Http",
          probeRequestType: "GET",
        },
        origins: [
          {
            id: "/subscriptions/subid/resourceGroups/RG/providers/Microsoft.Cdn/profiles/profile1/endpoints/endpoint1/origins/origin1",
          },
          {
            id: "/subscriptions/subid/resourceGroups/RG/providers/Microsoft.Cdn/profiles/profile1/endpoints/endpoint1/origins/origin2",
          },
        ],
        responseBasedOriginErrorDetectionSettings: {
          responseBasedDetectedErrorTypes: "TcpErrorsOnly",
          responseBasedFailoverThresholdPercentage: 10,
        },
      },
    ],
    originHostHeader: "www.bing.com",
    originPath: "/photos",
    origins: [
      {
        name: "origin1",
        enabled: true,
        hostName: "www.someDomain1.net",
        httpPort: 80,
        httpsPort: 443,
        originHostHeader: "www.someDomain1.net",
        priority: 1,
        weight: 50,
      },
      {
        name: "origin2",
        enabled: true,
        hostName: "www.someDomain2.net",
        httpPort: 80,
        httpsPort: 443,
        originHostHeader: "www.someDomain2.net",
        priority: 2,
        weight: 50,
      },
    ],
    queryStringCachingBehavior: "BypassCaching",
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await endpointsCreate();
}

main().catch(console.error);
