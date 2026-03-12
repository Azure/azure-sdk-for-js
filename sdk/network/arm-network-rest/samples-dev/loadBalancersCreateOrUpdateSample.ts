// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a load balancer.
 *
 * @summary Creates or updates a load balancer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LoadBalancerCreate.json
 */

import type { LoadBalancersCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createLoadBalancer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const loadBalancerName = "lb";
  const options: LoadBalancersCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        backendAddressPools: [{ name: "be-lb", properties: {} }],
        frontendIPConfigurations: [
          {
            name: "fe-lb",
            properties: {
              subnet: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
              },
            },
          },
        ],
        inboundNatPools: [],
        inboundNatRules: [
          {
            name: "in-nat-rule",
            properties: {
              backendPort: 3389,
              enableFloatingIP: true,
              enableTcpReset: false,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 3389,
              idleTimeoutInMinutes: 15,
              protocol: "Tcp",
            },
          },
        ],
        loadBalancingRules: [
          {
            name: "rulelb",
            properties: {
              backendAddressPool: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
              },
              backendPort: 80,
              enableFloatingIP: true,
              enableTcpReset: false,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 80,
              idleTimeoutInMinutes: 15,
              loadDistribution: "Default",
              probe: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
              },
              protocol: "Tcp",
            },
          },
        ],
        probes: [
          {
            name: "probe-lb",
            properties: {
              intervalInSeconds: 15,
              numberOfProbes: 2,
              port: 80,
              probeThreshold: 1,
              requestPath: "healthcheck.aspx",
              protocol: "Http",
            },
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createLoadBalancer().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a load balancer.
 *
 * @summary Creates or updates a load balancer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LoadBalancerCreateWithZones.json
 */
async function createLoadBalancerWithFrontendIPInZone1(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const loadBalancerName = "lb";
  const options: LoadBalancersCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        backendAddressPools: [{ name: "be-lb", properties: {} }],
        frontendIPConfigurations: [
          {
            name: "fe-lb",
            properties: {
              subnet: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
              },
            },
            zones: ["1"],
          },
        ],
        inboundNatPools: [],
        inboundNatRules: [
          {
            name: "in-nat-rule",
            properties: {
              backendPort: 3389,
              enableFloatingIP: true,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 3389,
              idleTimeoutInMinutes: 15,
              protocol: "Tcp",
            },
          },
        ],
        loadBalancingRules: [
          {
            name: "rulelb",
            properties: {
              backendAddressPool: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
              },
              backendPort: 80,
              enableFloatingIP: true,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 80,
              idleTimeoutInMinutes: 15,
              loadDistribution: "Default",
              probe: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
              },
              protocol: "Tcp",
            },
          },
        ],
        outboundRules: [],
        probes: [
          {
            name: "probe-lb",
            properties: {
              intervalInSeconds: 15,
              numberOfProbes: 2,
              port: 80,
              probeThreshold: 1,
              requestPath: "healthcheck.aspx",
              protocol: "Http",
            },
          },
        ],
      },
      sku: { name: "Standard" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createLoadBalancerWithFrontendIPInZone1().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a load balancer.
 *
 * @summary Creates or updates a load balancer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LoadBalancerCreateGatewayLoadBalancerConsumer.json
 */
async function createLoadBalancerWithGatewayLoadBalancerConsumerConfigured(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const loadBalancerName = "lb";
  const options: LoadBalancersCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        backendAddressPools: [{ name: "be-lb", properties: {} }],
        frontendIPConfigurations: [
          {
            name: "fe-lb",
            properties: {
              gatewayLoadBalancer: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb-provider",
              },
              subnet: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
              },
            },
          },
        ],
        inboundNatPools: [],
        inboundNatRules: [
          {
            name: "in-nat-rule",
            properties: {
              backendPort: 3389,
              enableFloatingIP: true,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 3389,
              idleTimeoutInMinutes: 15,
              protocol: "Tcp",
            },
          },
        ],
        loadBalancingRules: [
          {
            name: "rulelb",
            properties: {
              backendAddressPool: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
              },
              backendPort: 80,
              enableFloatingIP: true,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 80,
              idleTimeoutInMinutes: 15,
              loadDistribution: "Default",
              probe: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
              },
              protocol: "Tcp",
            },
          },
        ],
        outboundRules: [],
        probes: [
          {
            name: "probe-lb",
            properties: {
              intervalInSeconds: 15,
              numberOfProbes: 2,
              port: 80,
              probeThreshold: 1,
              requestPath: "healthcheck.aspx",
              protocol: "Http",
            },
          },
        ],
      },
      sku: { name: "Standard" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createLoadBalancerWithGatewayLoadBalancerConsumerConfigured().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a load balancer.
 *
 * @summary Creates or updates a load balancer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LoadBalancerCreateGatewayLoadBalancerProviderWithOneBackendPool.json
 */
async function createLoadBalancerWithGatewayLoadBalancerProviderConfiguredWithOneBackendPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const loadBalancerName = "lb";
  const options: LoadBalancersCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        backendAddressPools: [
          {
            name: "be-lb",
            properties: {
              tunnelInterfaces: [
                {
                  type: "Internal",
                  identifier: 900,
                  port: 15000,
                  protocol: "VXLAN",
                },
                {
                  type: "Internal",
                  identifier: 901,
                  port: 15001,
                  protocol: "VXLAN",
                },
              ],
            },
          },
        ],
        frontendIPConfigurations: [
          {
            name: "fe-lb",
            properties: {
              subnet: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
              },
            },
          },
        ],
        inboundNatPools: [],
        loadBalancingRules: [
          {
            name: "rulelb",
            properties: {
              backendAddressPools: [
                {
                  id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
                },
              ],
              backendPort: 0,
              enableFloatingIP: true,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 0,
              idleTimeoutInMinutes: 15,
              loadDistribution: "Default",
              probe: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
              },
              protocol: "All",
            },
          },
        ],
        outboundRules: [],
        probes: [
          {
            name: "probe-lb",
            properties: {
              intervalInSeconds: 15,
              numberOfProbes: 2,
              port: 80,
              probeThreshold: 1,
              requestPath: "healthcheck.aspx",
              protocol: "Http",
            },
          },
        ],
      },
      sku: { name: "Standard" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createLoadBalancerWithGatewayLoadBalancerProviderConfiguredWithOneBackendPool().catch(
  console.error,
);
/**
 * This sample demonstrates how to Creates or updates a load balancer.
 *
 * @summary Creates or updates a load balancer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LoadBalancerCreateGatewayLoadBalancerProviderWithTwoBackendPool.json
 */
async function createLoadBalancerWithGatewayLoadBalancerProviderConfiguredWithTwoBackendPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const loadBalancerName = "lb";
  const options: LoadBalancersCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        backendAddressPools: [
          { name: "be-lb1", properties: {} },
          { name: "be-lb2", properties: {} },
        ],
        frontendIPConfigurations: [
          {
            name: "fe-lb",
            properties: {
              subnet: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
              },
            },
          },
        ],
        inboundNatPools: [],
        loadBalancingRules: [
          {
            name: "rulelb",
            properties: {
              backendAddressPool: {},
              backendAddressPools: [
                {
                  id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb1",
                },
                {
                  id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb2",
                },
              ],
              backendPort: 0,
              enableFloatingIP: true,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 0,
              idleTimeoutInMinutes: 15,
              loadDistribution: "Default",
              probe: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
              },
              protocol: "All",
            },
          },
        ],
        outboundRules: [],
        probes: [
          {
            name: "probe-lb",
            properties: {
              intervalInSeconds: 15,
              numberOfProbes: 2,
              port: 80,
              probeThreshold: 1,
              requestPath: "healthcheck.aspx",
              protocol: "Http",
            },
          },
        ],
      },
      sku: { name: "Standard" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createLoadBalancerWithGatewayLoadBalancerProviderConfiguredWithTwoBackendPool().catch(
  console.error,
);
/**
 * This sample demonstrates how to Creates or updates a load balancer.
 *
 * @summary Creates or updates a load balancer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LoadBalancerCreateGlobalTier.json
 */
async function createLoadBalancerWithGlobalTierAndOneRegionalLoadBalancerInItsBackendPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const loadBalancerName = "lb";
  const options: LoadBalancersCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        backendAddressPools: [
          {
            name: "be-lb",
            properties: {
              loadBalancerBackendAddresses: [
                {
                  name: "regional-lb1-address",
                  properties: {
                    loadBalancerFrontendIPConfiguration: {
                      id: "/subscriptions/subid/resourceGroups/regional-lb-rg1/providers/Microsoft.Network/loadBalancers/regional-lb/frontendIPConfigurations/fe-rlb",
                    },
                  },
                },
              ],
            },
          },
        ],
        frontendIPConfigurations: [
          {
            name: "fe-lb",
            properties: {
              subnet: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
              },
            },
          },
        ],
        loadBalancingRules: [
          {
            name: "rulelb",
            properties: {
              backendAddressPool: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
              },
              backendPort: 80,
              enableFloatingIP: false,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 80,
              idleTimeoutInMinutes: 15,
              loadDistribution: "Default",
              probe: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
              },
              protocol: "Tcp",
            },
          },
        ],
        probes: [
          {
            name: "probe-lb",
            properties: {
              intervalInSeconds: 15,
              numberOfProbes: 2,
              port: 80,
              probeThreshold: 1,
              requestPath: "healthcheck.aspx",
              protocol: "Http",
            },
          },
        ],
      },
      sku: { name: "Standard", tier: "Global" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createLoadBalancerWithGlobalTierAndOneRegionalLoadBalancerInItsBackendPool().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a load balancer.
 *
 * @summary Creates or updates a load balancer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LoadBalancerCreateStandardSku.json
 */
async function createLoadBalancerWithStandardSku(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const loadBalancerName = "lb";
  const options: LoadBalancersCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        backendAddressPools: [{ name: "be-lb", properties: {} }],
        frontendIPConfigurations: [
          {
            name: "fe-lb",
            properties: {
              subnet: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
              },
            },
          },
        ],
        inboundNatPools: [],
        inboundNatRules: [
          {
            name: "in-nat-rule",
            properties: {
              backendPort: 3389,
              enableFloatingIP: true,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 3389,
              idleTimeoutInMinutes: 15,
              protocol: "Tcp",
            },
          },
        ],
        loadBalancingRules: [
          {
            name: "rulelb",
            properties: {
              backendAddressPool: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
              },
              backendPort: 80,
              enableFloatingIP: true,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 80,
              idleTimeoutInMinutes: 15,
              loadDistribution: "Default",
              probe: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
              },
              protocol: "Tcp",
            },
          },
        ],
        outboundRules: [],
        probes: [
          {
            name: "probe-lb",
            properties: {
              intervalInSeconds: 15,
              numberOfProbes: 2,
              port: 80,
              probeThreshold: 1,
              requestPath: "healthcheck.aspx",
              protocol: "Http",
            },
          },
        ],
      },
      sku: { name: "Standard" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createLoadBalancerWithStandardSku().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a load balancer.
 *
 * @summary Creates or updates a load balancer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LoadBalancerCreateWithInboundNatPool.json
 */
async function createLoadBalancerWithInboundNatPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const loadBalancerName = "lb";
  const options: LoadBalancersCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        backendAddressPools: [],
        frontendIPConfigurations: [
          {
            name: "test",
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/test",
            properties: {
              privateIPAllocationMethod: "Dynamic",
              subnet: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/lbvnet/subnets/lbsubnet",
              },
            },
            zones: [],
          },
        ],
        inboundNatPools: [
          {
            name: "test",
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/inboundNatPools/test",
            properties: {
              backendPort: 8888,
              enableFloatingIP: true,
              enableTcpReset: true,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/test",
              },
              frontendPortRangeEnd: 8085,
              frontendPortRangeStart: 8080,
              idleTimeoutInMinutes: 10,
              protocol: "Tcp",
            },
          },
        ],
        inboundNatRules: [],
        loadBalancingRules: [],
        outboundRules: [],
        probes: [],
      },
      sku: { name: "Standard" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createLoadBalancerWithInboundNatPool().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a load balancer.
 *
 * @summary Creates or updates a load balancer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LoadBalancerCreateWithOutboundRules.json
 */
async function createLoadBalancerWithOutboundRules(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const loadBalancerName = "lb";
  const options: LoadBalancersCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        backendAddressPools: [{ name: "be-lb", properties: {} }],
        frontendIPConfigurations: [
          {
            name: "fe-lb",
            properties: {
              publicIPAddress: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/pip",
              },
            },
          },
        ],
        inboundNatPools: [],
        inboundNatRules: [
          {
            name: "in-nat-rule",
            properties: {
              backendPort: 3389,
              enableFloatingIP: true,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 3389,
              idleTimeoutInMinutes: 15,
              protocol: "Tcp",
            },
          },
        ],
        loadBalancingRules: [
          {
            name: "rulelb",
            properties: {
              backendAddressPool: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
              },
              backendPort: 80,
              disableOutboundSnat: true,
              enableFloatingIP: true,
              frontendIPConfiguration: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
              },
              frontendPort: 80,
              idleTimeoutInMinutes: 15,
              loadDistribution: "Default",
              probe: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/probes/probe-lb",
              },
              protocol: "Tcp",
            },
          },
        ],
        outboundRules: [
          {
            name: "rule1",
            properties: {
              backendAddressPool: {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/backendAddressPools/be-lb",
              },
              frontendIPConfigurations: [
                {
                  id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
                },
              ],
              protocol: "All",
            },
          },
        ],
        probes: [
          {
            name: "probe-lb",
            properties: {
              intervalInSeconds: 15,
              numberOfProbes: 2,
              port: 80,
              probeThreshold: 1,
              requestPath: "healthcheck.aspx",
              protocol: "Http",
            },
          },
        ],
      },
      sku: { name: "Standard" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createLoadBalancerWithOutboundRules().catch(console.error);
