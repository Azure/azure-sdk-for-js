// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a loadBalancer. Please note some properties can be set only during LoadBalancer creation.
 *
 * @summary the operation to create or update a loadBalancer. Please note some properties can be set only during LoadBalancer creation.
 * x-ms-original-file: 2026-04-01-preview/LoadBalancers_CreateOrUpdate.json
 */
async function putLoadBalancer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate("test-rg", "test-lb", {
    extendedLocation: {
      name: "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
      type: "CustomLocation",
    },
    properties: {
      frontendIPConfigurations: [
        {
          name: "web-frontend",
          properties: {
            publicIPAddress: {
              resourceId:
                "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/azure-local-rg/providers/Microsoft.AzureStackHCI/publicIPs/webPublicIP",
            },
          },
        },
      ],
      backendAddressPools: [
        {
          name: "web-backend",
          properties: {
            virtualNetwork: {
              resourceId:
                "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/azure-local-rg/providers/Microsoft.AzureStackHCI/virtualNetworks/webVNet",
            },
            loadBalancerBackendAddresses: [
              {
                name: "web-server-1",
                properties: {
                  networkInterfaceIPConfiguration: {
                    resourceId:
                      "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/azure-local-rg/providers/Microsoft.AzureStackHCI/networkInterfaces/web-server-1-nic/ipConfigurations/primary",
                  },
                  adminState: "Up",
                },
              },
              {
                name: "web-server-2",
                properties: {
                  networkInterfaceIPConfiguration: {
                    resourceId:
                      "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/azure-local-rg/providers/Microsoft.AzureStackHCI/networkInterfaces/web-server-2-nic/ipConfigurations/primary",
                  },
                  adminState: "Up",
                },
              },
            ],
          },
        },
      ],
      probes: [
        {
          name: "http-probe",
          properties: {
            protocol: "Http",
            port: 80,
            requestPath: "/health",
            intervalInSeconds: 15,
            numberOfProbes: 2,
          },
        },
      ],
      loadBalancingRules: [
        {
          name: "http-rule",
          properties: {
            frontendIPConfiguration: { name: "web-frontend" },
            backendAddressPool: { name: "web-backend" },
            probe: { name: "http-probe" },
            protocol: "Tcp",
            frontendPort: 80,
            backendPort: 80,
            loadDistribution: "Default",
            idleTimeoutInMinutes: 4,
          },
        },
        {
          name: "https-rule",
          properties: {
            frontendIPConfiguration: { name: "web-frontend" },
            backendAddressPool: { name: "web-backend" },
            protocol: "Tcp",
            frontendPort: 443,
            backendPort: 443,
            loadDistribution: "Default",
            idleTimeoutInMinutes: 4,
          },
        },
      ],
    },
    location: "West US2",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putLoadBalancer();
}

main().catch(console.error);
