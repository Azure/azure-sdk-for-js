// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update certain properties of the Network Tap Rule resource.
 *
 * @summary update certain properties of the Network Tap Rule resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkTapRules_Update.json
 */
async function networkTapRulesUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkTapRules.update("example-rg", "example-tapRule", {
    tags: { keyId: "keyValue" },
    properties: {
      annotation: "annotation",
      configurationType: "File",
      tapRulesUrl: "https://microsoft.com/amdsdx",
      globalNetworkTapRuleActions: {
        enableCount: "True",
        truncate: "truncate-name",
      },
      matchConfigurations: [
        {
          matchConfigurationName: "config1",
          sequenceNumber: 10,
          ipAddressType: "IPv4",
          matchConditions: [
            {
              protocolTypes: ["TCP"],
              vlanMatchCondition: {
                vlans: ["20-30"],
                innerVlans: ["30"],
                vlanGroupNames: ["example-vlanGroup"],
              },
              ipCondition: {
                type: "SourceIP",
                prefixType: "Prefix",
                ipPrefixValues: ["10.20.20.20/12"],
                ipGroupNames: ["example-ipGroup"],
              },
              encapsulationType: "None",
              portCondition: {
                portType: "SourcePort",
                layer4Protocol: "TCP",
                ports: ["100"],
                portGroupNames: ["example-portGroup1"],
              },
            },
          ],
          actions: [
            {
              type: "Drop",
              truncate: "100",
              isTimestampEnabled: "True",
              destinationId:
                "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/neighborGroups/example-neighborGroup",
              matchConfigurationName: "match1",
            },
          ],
        },
      ],
      dynamicMatchConfigurations: [
        {
          ipGroups: [
            {
              name: "example-ipGroup",
              ipAddressType: "IPv4",
              ipPrefixes: ["10.20.3.1/20"],
            },
          ],
          vlanGroups: [{ name: "example-vlanGroup", vlans: ["20-30"] }],
          portGroups: [{ name: "example-portGroup", ports: ["100-200"] }],
        },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await networkTapRulesUpdateMaximumSetGen();
}

main().catch(console.error);
