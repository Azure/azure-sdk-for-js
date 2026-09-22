// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new peering or updates an existing peering with the specified name under the given subscription and resource group.
 *
 * @summary creates a new peering or updates an existing peering with the specified name under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/CreateDirectPeering.json
 */
async function createADirectPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peerings.createOrUpdate("rgName", "peeringName", {
    kind: "Direct",
    location: "eastus",
    connectivityProbes: [{ azureRegion: "eastus", endpoint: "192.168.0.1", protocol: "ICMP" }],
    direct: {
      connections: [
        {
          bandwidthInMbps: 10000,
          bgpSession: {
            maxPrefixesAdvertisedV4: 1000,
            maxPrefixesAdvertisedV6: 100,
            md5AuthenticationKey: "test-md5-auth-key",
            sessionPrefixV4: "192.168.0.0/31",
            sessionPrefixV6: "fd00::0/127",
          },
          connectionIdentifier: "5F4CB5C7-6B43-4444-9338-9ABC72606C16",
          peeringDBFacilityId: 99999,
          sessionAddressProvider: "Peer",
          useForPeeringService: false,
        },
        {
          bandwidthInMbps: 10000,
          connectionIdentifier: "8AB00818-D533-4504-A25A-03A17F61201C",
          peeringDBFacilityId: 99999,
          sessionAddressProvider: "Microsoft",
          useForPeeringService: true,
        },
      ],
      directPeeringType: "Edge",
      peerAsn: { id: "/subscriptions/subId/providers/Microsoft.Peering/peerAsns/myAsn1" },
    },
    peeringLocation: "peeringLocation0",
    sku: { name: "Basic_Direct_Free" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new peering or updates an existing peering with the specified name under the given subscription and resource group.
 *
 * @summary creates a new peering or updates an existing peering with the specified name under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/CreateExchangePeering.json
 */
async function createAnExchangePeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peerings.createOrUpdate("rgName", "peeringName", {
    kind: "Exchange",
    location: "eastus",
    connectivityProbes: [{ azureRegion: "eastus", endpoint: "192.168.0.1", protocol: "ICMP" }],
    exchange: {
      connections: [
        {
          bgpSession: {
            maxPrefixesAdvertisedV4: 1000,
            maxPrefixesAdvertisedV6: 100,
            md5AuthenticationKey: "test-md5-auth-key",
            peerSessionIPv4Address: "192.168.2.1",
            peerSessionIPv6Address: "fd00::1",
          },
          connectionIdentifier: "CE495334-0E94-4E51-8164-8116D6CD284D",
          peeringDBFacilityId: 99999,
        },
        {
          bgpSession: {
            maxPrefixesAdvertisedV4: 1000,
            maxPrefixesAdvertisedV6: 100,
            md5AuthenticationKey: "test-md5-auth-key",
            peerSessionIPv4Address: "192.168.2.2",
            peerSessionIPv6Address: "fd00::2",
          },
          connectionIdentifier: "CDD8E673-CB07-47E6-84DE-3739F778762B",
          peeringDBFacilityId: 99999,
        },
      ],
      peerAsn: { id: "/subscriptions/subId/providers/Microsoft.Peering/peerAsns/myAsn1" },
    },
    peeringLocation: "peeringLocation0",
    sku: { name: "Basic_Exchange_Free" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new peering or updates an existing peering with the specified name under the given subscription and resource group.
 *
 * @summary creates a new peering or updates an existing peering with the specified name under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/CreatePeeringWithExchangeRouteServer.json
 */
async function createAPeeringWithExchangeRouteServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peerings.createOrUpdate("rgName", "peeringName", {
    kind: "Direct",
    location: "eastus",
    connectivityProbes: [{ azureRegion: "eastus", endpoint: "192.168.0.1", protocol: "TCP" }],
    direct: {
      connections: [
        {
          bandwidthInMbps: 10000,
          bgpSession: {
            maxPrefixesAdvertisedV4: 1000,
            maxPrefixesAdvertisedV6: 100,
            microsoftSessionIPv4Address: "192.168.0.123",
            peerSessionIPv4Address: "192.168.0.234",
            sessionPrefixV4: "192.168.0.0/24",
          },
          connectionIdentifier: "5F4CB5C7-6B43-4444-9338-9ABC72606C16",
          peeringDBFacilityId: 99999,
          sessionAddressProvider: "Peer",
          useForPeeringService: true,
        },
      ],
      directPeeringType: "IxRs",
      peerAsn: { id: "/subscriptions/subId/providers/Microsoft.Peering/peerAsns/myAsn1" },
    },
    peeringLocation: "peeringLocation0",
    sku: { name: "Premium_Direct_Free" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createADirectPeering();
  await createAnExchangePeering();
  await createAPeeringWithExchangeRouteServer();
}

main().catch(console.error);
