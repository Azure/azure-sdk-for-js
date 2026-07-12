// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements Access Control List PUT method.
 *
 * @summary implements Access Control List PUT method.
 * x-ms-original-file: 2025-07-15/AccessControlLists_Create.json
 */
async function accessControlListsCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.accessControlLists.create("example-rg", "example-acl", {
    annotation: "annotation",
    configurationType: "File",
    aclsUrl: "https://ACL-Storage-URL",
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
            protocolNeighbors: ["example-neighbor"],
            portCondition: {
              portType: "SourcePort",
              layer4Protocol: "TCP",
              ports: ["1-20"],
              portGroupNames: ["example-portGroup"],
              flags: ["established"],
            },
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
          { name: "example-ipGroup", ipAddressType: "IPv4", ipPrefixes: ["10.20.3.1/20"] },
        ],
        vlanGroups: [{ name: "example-vlanGroup", vlans: ["20-30"] }],
        portGroups: [{ name: "example-portGroup", ports: ["100-200"] }],
      },
    ],
    aclType: "ControlPlaneTrafficPolicy",
    deviceRole: "CE",
    globalAccessControlListActions: { enableCount: "True" },
    tags: { keyID: "keyValue" },
    location: "eastUs",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to implements Access Control List PUT method.
 *
 * @summary implements Access Control List PUT method.
 * x-ms-original-file: 2025-07-15/AccessControlLists_Create_ControlPlaneAcl.json
 */
async function accessControlListsCreateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.accessControlLists.create("example-resource-group", "example-acl", {
    annotation: "annotation",
    configurationType: "Inline",
    aclsUrl: "https://microsoft.com/a",
    defaultAction: "Permit",
    aclType: "ControlPlaneTrafficPolicy",
    deviceRole: "CE",
    controlPlaneAclConfiguration: [
      {
        ipAddressType: "IPv4",
        matchConfigurations: [
          {
            matchConfigurationName: "example-match-config",
            sequenceNumber: 3779271459,
            matchCondition: {
              protocolTypes: "tcp",
              ipCondition: { sourceIpPrefix: "10.0.0.0/24", destinationIpPrefix: "10.0.0.0/24" },
              ttlMatchCondition: { ttlValue: "1", ttlMatchType: "eq" },
              portCondition: {
                sourcePorts: { ports: ["100"], portMatchType: "eq" },
                destinationPorts: { ports: ["200"], portMatchType: "eq" },
              },
              flags: ["established"],
              icmpConfiguration: { icmpTypes: ["icmp"] },
            },
            action: { type: "Drop", remarkComment: "remark" },
          },
        ],
      },
    ],
    tags: { key5032: "example-tag-value" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await accessControlListsCreateMaximumSetGen();
  await accessControlListsCreateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
