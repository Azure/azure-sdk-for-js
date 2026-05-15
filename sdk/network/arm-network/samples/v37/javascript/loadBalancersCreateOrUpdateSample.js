// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a load balancer.
 *
 * @summary creates or updates a load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerCreate.json
 */
async function createLoadBalancer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate("rg1", "lb", {
    location: "eastus",
    backendAddressPools: [{}],
    frontendIPConfigurations: [
      {
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
        },
      },
    ],
    inboundNatPools: [],
    inboundNatRules: [
      {
        backendPort: 3389,
        enableFloatingIP: true,
        enableTcpReset: false,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 3389,
        idleTimeoutInMinutes: 15,
        protocol: "Tcp",
      },
    ],
    loadBalancingRules: [
      {
        backendAddressPool: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
        },
        backendPort: 80,
        enableFloatingIP: true,
        enableTcpReset: false,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 80,
        idleTimeoutInMinutes: 15,
        loadDistribution: "Default",
        probe: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
        },
        protocol: "Tcp",
      },
    ],
    probes: [
      {
        intervalInSeconds: 15,
        numberOfProbes: 2,
        port: 80,
        probeThreshold: 1,
        requestPath: "healthcheck.aspx",
        protocol: "Http",
      },
    ],
    scope: "Public",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a load balancer.
 *
 * @summary creates or updates a load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerCreateGatewayLoadBalancerConsumer.json
 */
async function createLoadBalancerWithGatewayLoadBalancerConsumerConfigured() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate("rg1", "lb", {
    location: "eastus",
    backendAddressPools: [{}],
    frontendIPConfigurations: [
      {
        gatewayLoadBalancer: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb-provider",
        },
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
        },
      },
    ],
    inboundNatPools: [],
    inboundNatRules: [
      {
        backendPort: 3389,
        enableFloatingIP: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 3389,
        idleTimeoutInMinutes: 15,
        protocol: "Tcp",
      },
    ],
    loadBalancingRules: [
      {
        backendAddressPool: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
        },
        backendPort: 80,
        enableFloatingIP: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 80,
        idleTimeoutInMinutes: 15,
        loadDistribution: "Default",
        probe: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
        },
        protocol: "Tcp",
      },
    ],
    outboundRules: [],
    probes: [
      {
        intervalInSeconds: 15,
        numberOfProbes: 2,
        port: 80,
        probeThreshold: 1,
        requestPath: "healthcheck.aspx",
        protocol: "Http",
      },
    ],
    sku: { name: "Standard" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a load balancer.
 *
 * @summary creates or updates a load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerCreateGatewayLoadBalancerProviderWithOneBackendPool.json
 */
async function createLoadBalancerWithGatewayLoadBalancerProviderConfiguredWithOneBackendPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate("rg1", "lb", {
    location: "eastus",
    backendAddressPools: [
      {
        tunnelInterfaces: [
          { type: "Internal", identifier: 900, port: 15000, protocol: "VXLAN" },
          { type: "Internal", identifier: 901, port: 15001, protocol: "VXLAN" },
        ],
      },
    ],
    frontendIPConfigurations: [
      {
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
        },
      },
    ],
    inboundNatPools: [],
    loadBalancingRules: [
      {
        backendAddressPools: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
          },
        ],
        backendPort: 0,
        enableFloatingIP: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 0,
        idleTimeoutInMinutes: 15,
        loadDistribution: "Default",
        probe: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
        },
        protocol: "All",
      },
    ],
    outboundRules: [],
    probes: [
      {
        intervalInSeconds: 15,
        numberOfProbes: 2,
        port: 80,
        probeThreshold: 1,
        requestPath: "healthcheck.aspx",
        protocol: "Http",
      },
    ],
    sku: { name: "Gateway" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a load balancer.
 *
 * @summary creates or updates a load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerCreateGatewayLoadBalancerProviderWithTwoBackendPool.json
 */
async function createLoadBalancerWithGatewayLoadBalancerProviderConfiguredWithTwoBackendPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate("rg1", "lb", {
    location: "eastus",
    backendAddressPools: [{}, {}],
    frontendIPConfigurations: [
      {
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
        },
      },
    ],
    inboundNatPools: [],
    loadBalancingRules: [
      {
        backendAddressPool: {},
        backendAddressPools: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb1",
          },
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb2",
          },
        ],
        backendPort: 0,
        enableFloatingIP: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 0,
        idleTimeoutInMinutes: 15,
        loadDistribution: "Default",
        probe: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
        },
        protocol: "All",
      },
    ],
    outboundRules: [],
    probes: [
      {
        intervalInSeconds: 15,
        numberOfProbes: 2,
        port: 80,
        probeThreshold: 1,
        requestPath: "healthcheck.aspx",
        protocol: "Http",
      },
    ],
    sku: { name: "Gateway" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a load balancer.
 *
 * @summary creates or updates a load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerCreateGlobalTier.json
 */
async function createLoadBalancerWithGlobalTierAndOneRegionalLoadBalancerInItsBackendPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate("rg1", "lb", {
    location: "eastus",
    backendAddressPools: [
      {
        loadBalancerBackendAddresses: [
          {
            name: "regional-lb1-address",
            loadBalancerFrontendIPConfiguration: {
              id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/regional-lb-rg1/providers/Microsoft.Network/loadBalancers/regional-lb/frontendIPConfigurations/fe-rlb",
            },
          },
        ],
      },
    ],
    frontendIPConfigurations: [
      {
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
        },
      },
    ],
    loadBalancingRules: [
      {
        backendAddressPool: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
        },
        backendPort: 80,
        enableFloatingIP: false,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 80,
        idleTimeoutInMinutes: 15,
        loadDistribution: "Default",
        probe: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
        },
        protocol: "Tcp",
      },
    ],
    probes: [
      {
        intervalInSeconds: 15,
        numberOfProbes: 2,
        port: 80,
        probeThreshold: 1,
        requestPath: "healthcheck.aspx",
        protocol: "Http",
      },
    ],
    sku: { name: "Standard", tier: "Global" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a load balancer.
 *
 * @summary creates or updates a load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerCreateStandardSku.json
 */
async function createLoadBalancerWithStandardSKU() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate("rg1", "lb", {
    location: "eastus",
    backendAddressPools: [{}],
    frontendIPConfigurations: [
      {
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
        },
      },
    ],
    inboundNatPools: [],
    inboundNatRules: [
      {
        backendPort: 3389,
        enableFloatingIP: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 3389,
        idleTimeoutInMinutes: 15,
        protocol: "Tcp",
      },
    ],
    loadBalancingRules: [
      {
        backendAddressPool: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
        },
        backendPort: 80,
        enableFloatingIP: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 80,
        idleTimeoutInMinutes: 15,
        loadDistribution: "Default",
        probe: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
        },
        protocol: "Tcp",
      },
    ],
    outboundRules: [],
    probes: [
      {
        intervalInSeconds: 15,
        numberOfProbes: 2,
        port: 80,
        probeThreshold: 1,
        requestPath: "healthcheck.aspx",
        protocol: "Http",
      },
    ],
    sku: { name: "Standard" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a load balancer.
 *
 * @summary creates or updates a load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerCreateWithInboundNatPool.json
 */
async function createLoadBalancerWithInboundNatPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate("rg1", "lb", {
    location: "eastus",
    backendAddressPools: [],
    frontendIPConfigurations: [
      {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/test",
        privateIPAllocationMethod: "Dynamic",
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/lbvnet/subnets/lbsubnet",
        },
        zones: [],
      },
    ],
    inboundNatPools: [
      {
        name: "test",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/inboundNatPools/test",
        backendPort: 8888,
        enableFloatingIP: true,
        enableTcpReset: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/test",
        },
        frontendPortRangeEnd: 8085,
        frontendPortRangeStart: 8080,
        idleTimeoutInMinutes: 10,
        protocol: "Tcp",
      },
    ],
    inboundNatRules: [],
    loadBalancingRules: [],
    outboundRules: [],
    probes: [],
    sku: { name: "Standard" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a load balancer.
 *
 * @summary creates or updates a load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerCreateWithOutboundRules.json
 */
async function createLoadBalancerWithOutboundRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate("rg1", "lb", {
    location: "eastus",
    backendAddressPools: [{}],
    frontendIPConfigurations: [
      {
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pip",
        },
      },
    ],
    inboundNatPools: [],
    inboundNatRules: [
      {
        backendPort: 3389,
        enableFloatingIP: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 3389,
        idleTimeoutInMinutes: 15,
        protocol: "Tcp",
      },
    ],
    loadBalancingRules: [
      {
        backendAddressPool: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
        },
        backendPort: 80,
        disableOutboundSnat: true,
        enableFloatingIP: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 80,
        idleTimeoutInMinutes: 15,
        loadDistribution: "Default",
        probe: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
        },
        protocol: "Tcp",
      },
    ],
    outboundRules: [
      {
        backendAddressPool: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
        },
        frontendIPConfigurations: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
          },
        ],
        protocol: "All",
      },
    ],
    probes: [
      {
        intervalInSeconds: 15,
        numberOfProbes: 2,
        port: 80,
        probeThreshold: 1,
        requestPath: "healthcheck.aspx",
        protocol: "Http",
      },
    ],
    sku: { name: "Standard" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a load balancer.
 *
 * @summary creates or updates a load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerCreateWithSyncModePropertyOnPool.json
 */
async function createLoadBalancerWithSyncModePropertyOnPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate("rg1", "lb", {
    location: "eastus",
    backendAddressPools: [
      {
        syncMode: "Automatic",
        virtualNetwork: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb",
        },
      },
    ],
    frontendIPConfigurations: [
      {
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
        },
      },
    ],
    inboundNatPools: [],
    inboundNatRules: [
      {
        backendPort: 3389,
        enableFloatingIP: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 3389,
        idleTimeoutInMinutes: 15,
        protocol: "Tcp",
      },
    ],
    loadBalancingRules: [
      {
        backendAddressPool: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
        },
        backendPort: 80,
        enableFloatingIP: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 80,
        idleTimeoutInMinutes: 15,
        loadDistribution: "Default",
        probe: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
        },
        protocol: "Tcp",
      },
    ],
    outboundRules: [],
    probes: [
      {
        intervalInSeconds: 15,
        numberOfProbes: 2,
        port: 80,
        probeThreshold: 1,
        requestPath: "healthcheck.aspx",
        protocol: "Http",
      },
    ],
    sku: { name: "Standard" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a load balancer.
 *
 * @summary creates or updates a load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerCreateWithZones.json
 */
async function createLoadBalancerWithFrontendIPInZone1() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate("rg1", "lb", {
    location: "eastus",
    backendAddressPools: [{}],
    frontendIPConfigurations: [
      {
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
        },
        zones: ["1"],
      },
    ],
    inboundNatPools: [],
    inboundNatRules: [
      {
        backendPort: 3389,
        enableFloatingIP: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 3389,
        idleTimeoutInMinutes: 15,
        protocol: "Tcp",
      },
    ],
    loadBalancingRules: [
      {
        backendAddressPool: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
        },
        backendPort: 80,
        enableFloatingIP: true,
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
        },
        frontendPort: 80,
        idleTimeoutInMinutes: 15,
        loadDistribution: "Default",
        probe: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
        },
        protocol: "Tcp",
      },
    ],
    outboundRules: [],
    probes: [
      {
        intervalInSeconds: 15,
        numberOfProbes: 2,
        port: 80,
        probeThreshold: 1,
        requestPath: "healthcheck.aspx",
        protocol: "Http",
      },
    ],
    sku: { name: "Standard" },
  });
  console.log(result);
}

async function main() {
  await createLoadBalancer();
  await createLoadBalancerWithGatewayLoadBalancerConsumerConfigured();
  await createLoadBalancerWithGatewayLoadBalancerProviderConfiguredWithOneBackendPool();
  await createLoadBalancerWithGatewayLoadBalancerProviderConfiguredWithTwoBackendPool();
  await createLoadBalancerWithGlobalTierAndOneRegionalLoadBalancerInItsBackendPool();
  await createLoadBalancerWithStandardSKU();
  await createLoadBalancerWithInboundNatPool();
  await createLoadBalancerWithOutboundRules();
  await createLoadBalancerWithSyncModePropertyOnPool();
  await createLoadBalancerWithFrontendIPInZone1();
}

main().catch(console.error);
