// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a capability on a virtual network appliance.
 *
 * @summary creates or updates a capability on a virtual network appliance.
 * x-ms-original-file: 2026-03-01/VirtualNetworkApplianceCapabilities_CreateOrUpdate.json
 */
async function createVirtualNetworkAppliancePLGatewayFastpathCapability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkApplianceCapabilities.createOrUpdate(
    "rg1",
    "test-vna",
    "pl-fastpath",
    { kind: "PLGatewayFastpath", properties: { ipVersion: "DualStack" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a capability on a virtual network appliance.
 *
 * @summary creates or updates a capability on a virtual network appliance.
 * x-ms-original-file: 2026-03-01/VirtualNetworkApplianceCapabilities_CreateOrUpdate_NAT64.json
 */
async function createVirtualNetworkApplianceNAT64Capability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkApplianceCapabilities.createOrUpdate(
    "rg1",
    "test-vna",
    "nat64",
    { kind: "NAT64", properties: {} },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a capability on a virtual network appliance.
 *
 * @summary creates or updates a capability on a virtual network appliance.
 * x-ms-original-file: 2026-03-01/VirtualNetworkApplianceCapabilities_CreateOrUpdate_PLGateway.json
 */
async function createVirtualNetworkAppliancePLGatewayCapability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkApplianceCapabilities.createOrUpdate(
    "rg1",
    "test-vna",
    "pl-gateway",
    { kind: "PLGateway", properties: { ipVersion: "IPv6" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a capability on a virtual network appliance.
 *
 * @summary creates or updates a capability on a virtual network appliance.
 * x-ms-original-file: 2026-03-01/VirtualNetworkApplianceCapabilities_CreateOrUpdate_PLIPForwarders.json
 */
async function createVirtualNetworkAppliancePlipForwardersCapability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkApplianceCapabilities.createOrUpdate(
    "rg1",
    "test-vna",
    "pl-ipforwarders",
    { kind: "PLIPForwarders", properties: { ipVersion: "IPv6" } },
  );
  console.log(result);
}

async function main() {
  await createVirtualNetworkAppliancePLGatewayFastpathCapability();
  await createVirtualNetworkApplianceNAT64Capability();
  await createVirtualNetworkAppliancePLGatewayCapability();
  await createVirtualNetworkAppliancePlipForwardersCapability();
}

main().catch(console.error);
