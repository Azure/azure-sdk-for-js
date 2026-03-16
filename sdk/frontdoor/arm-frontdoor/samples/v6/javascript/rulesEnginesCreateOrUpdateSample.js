// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new Rules Engine Configuration with the specified name within the specified Front Door.
 *
 * @summary creates a new Rules Engine Configuration with the specified name within the specified Front Door.
 * x-ms-original-file: 2025-10-01/FrontdoorRulesEngineCreate.json
 */
async function createOrUpdateASpecificRulesEngineConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.rulesEngines.createOrUpdate("rg1", "frontDoor1", "rulesEngine1", {
    rules: [
      {
        name: "Rule1",
        action: {
          routeConfigurationOverride: {
            odataType: "#Microsoft.Azure.FrontDoor.Models.FrontdoorRedirectConfiguration",
            customFragment: "fragment",
            customHost: "www.bing.com",
            customPath: "/api",
            customQueryString: "a=b",
            redirectProtocol: "HttpsOnly",
            redirectType: "Moved",
          },
        },
        matchConditions: [
          {
            rulesEngineMatchValue: ["CH"],
            rulesEngineMatchVariable: "RemoteAddr",
            rulesEngineOperator: "GeoMatch",
          },
        ],
        matchProcessingBehavior: "Stop",
        priority: 1,
      },
      {
        name: "Rule2",
        action: {
          responseHeaderActions: [
            {
              headerActionType: "Overwrite",
              headerName: "Cache-Control",
              value: "public, max-age=31536000",
            },
          ],
        },
        matchConditions: [
          {
            rulesEngineMatchValue: ["jpg"],
            rulesEngineMatchVariable: "RequestFilenameExtension",
            rulesEngineOperator: "Equal",
            transforms: ["Lowercase"],
          },
        ],
        priority: 2,
      },
      {
        name: "Rule3",
        action: {
          routeConfigurationOverride: {
            odataType: "#Microsoft.Azure.FrontDoor.Models.FrontdoorForwardingConfiguration",
            backendPool: {
              id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/frontDoors/frontDoor1/backendPools/backendPool1",
            },
            cacheConfiguration: {
              cacheDuration: "P1DT12H20M30S",
              dynamicCompression: "Disabled",
              queryParameterStripDirective: "StripOnly",
              queryParameters: "a=b,p=q",
            },
            forwardingProtocol: "HttpsOnly",
          },
        },
        matchConditions: [
          {
            negateCondition: false,
            rulesEngineMatchValue: ["allowoverride"],
            rulesEngineMatchVariable: "RequestHeader",
            rulesEngineOperator: "Equal",
            selector: "Rules-Engine-Route-Forward",
            transforms: ["Lowercase"],
          },
        ],
        priority: 3,
      },
    ],
  });
  console.log(result);
}

async function main() {
  await createOrUpdateASpecificRulesEngineConfiguration();
}

main().catch(console.error);
