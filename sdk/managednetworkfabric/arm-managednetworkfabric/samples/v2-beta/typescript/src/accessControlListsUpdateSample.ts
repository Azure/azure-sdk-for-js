// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to update certain properties of the Access Control List resource.
 *
 * @summary aPI to update certain properties of the Access Control List resource.
 * x-ms-original-file: 2024-06-15-preview/AccessControlLists_Update.json
 */
async function accessControlListsUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.accessControlLists.update("example-rg", "example-acl", {
    tags: { KeyId: "KeyValue" },
    properties: {
      configurationType: "File",
      aclsUrl: "https://microsoft.com/a",
      defaultAction: "Permit",
      matchConfigurations: [
        {
          matchConfigurationName: "example-match",
          sequenceNumber: 123,
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
              etherTypes: ["0x1"],
              fragments: ["0xff00-0xffff"],
              ipLengths: ["4094-9214"],
              ttlValues: ["23"],
              dscpMarkings: ["32"],
              portCondition: {
                portType: "SourcePort",
                layer4Protocol: "TCP",
                ports: ["1-20"],
                portGroupNames: ["example-portGroup"],
                flags: ["established"],
              },
              protocolNeighbors: ["example-neighbor"],
              icmpConfiguration: { icmpTypes: ["echo"] },
            },
          ],
          actions: [
            {
              type: "Count",
              counterName: "example-counter",
              remarkComment: "example-remark",
              policeRateConfiguration: {
                bitRate: { rate: 15, unit: "bps" },
                burstSize: { size: 2, unit: "Bytes" },
              },
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
      aclType: "ControlPlaneTrafficPolicy",
      deviceRole: "CE",
      globalAccessControlListActions: { enableCount: "True" },
      annotation: "annotation",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await accessControlListsUpdateMaximumSetGen();
}

main().catch(console.error);
