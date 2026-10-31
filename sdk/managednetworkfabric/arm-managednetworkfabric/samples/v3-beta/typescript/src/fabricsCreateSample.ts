// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Fabric.
 *
 * @summary creates or updates a Fabric.
 * x-ms-original-file: 2026-01-15-preview/Fabrics_Create.json
 */
async function fabricsCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.fabrics.create("example-rg", "example-fabric", {
    location: "eastus",
    properties: {
      managementMode: "unmanaged",
      edgeConnectorId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/edgeConnectors/example-edgeConnector",
      infrastructureNetworks: {
        management: {
          vlanId: 39,
          ipv4Subnet: "10.2.0.0/24",
          ipv4Gateway: "10.2.0.1",
          ipv4StartAddr: "10.2.0.20",
          ipv4EndAddr: "10.2.0.99",
          mtu: 9000,
        },
        pxe: {
          vlanId: 40,
          ipv4Subnet: "10.2.1.0/24",
          ipv4Gateway: "10.2.1.1",
          ipv4StartAddr: "10.2.1.20",
          ipv4EndAddr: "10.2.1.99",
          mtu: 9000,
        },
        bmc: {
          vlanId: 41,
          ipv4Subnet: "10.2.2.0/24",
          ipv4Gateway: "10.2.2.1",
          ipv4StartAddr: "10.2.2.11",
          ipv4EndAddr: "10.2.2.99",
          mtu: 1500,
        },
        storage: {
          vlanId: 42,
          ipv4Subnet: "10.2.3.0/24",
          ipv4Gateway: "10.2.3.1",
          ipv4StartAddr: "10.2.3.20",
          ipv4EndAddr: "10.2.3.179",
          mtu: 9000,
        },
        storageMgmt: { vlanId: 37, mtu: 9000 },
      },
      infrastructureServices: {
        platformProxy: {
          httpProxy: "http://10.2.0.60:3128",
          httpsProxy: "http://10.2.0.60:3128",
          noProxy: [
            "10.2.0.0/24",
            "10.2.1.0/24",
            "10.2.2.0/24",
            "10.2.3.0/24",
            "localhost",
            "169.254.169.254",
            ".svc",
          ],
        },
        ntpServers: ["10.2.0.100"],
        dnsServers: ["10.2.0.50"],
      },
      rackCount: 2,
      fabricSku: "2-rack-ha",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Fabric.
 *
 * @summary creates or updates a Fabric.
 * x-ms-original-file: 2026-01-15-preview/Fabrics_Create_Managed.json
 */
async function fabricsCreateManagedMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.fabrics.create("example-rg", "example-managed-fabric", {
    location: "eastus",
    tags: { environment: "production" },
    properties: {
      managementMode: "managed",
      controllerType: "ciscoAci",
      operationPolicy: "validateOnly",
      controllerEndpoint: "https://apic.factory.local",
      controllerCredentialRef:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.KeyVault/vaults/fabric-kv/secrets/apic-creds",
      edgeConnectorId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/edgeConnectors/example-edgeConnector",
      infrastructureNetworks: {
        management: {
          vlanId: 39,
          ipv4Subnet: "10.2.0.0/24",
          ipv4Gateway: "10.2.0.1",
          ipv4StartAddr: "10.2.0.20",
          ipv4EndAddr: "10.2.0.99",
          mtu: 9000,
        },
        pxe: {
          vlanId: 40,
          ipv4Subnet: "10.2.1.0/24",
          ipv4Gateway: "10.2.1.1",
          ipv4StartAddr: "10.2.1.20",
          ipv4EndAddr: "10.2.1.99",
          mtu: 9000,
        },
        bmc: {
          vlanId: 41,
          ipv4Subnet: "10.2.2.0/24",
          ipv4Gateway: "10.2.2.1",
          ipv4StartAddr: "10.2.2.11",
          ipv4EndAddr: "10.2.2.99",
          mtu: 1500,
        },
        storage: {
          vlanId: 42,
          ipv4Subnet: "10.2.3.0/24",
          ipv4Gateway: "10.2.3.1",
          ipv4StartAddr: "10.2.3.20",
          ipv4EndAddr: "10.2.3.179",
          mtu: 9000,
        },
        storageMgmt: { vlanId: 37, mtu: 9000 },
      },
      infrastructureServices: {
        platformProxy: {
          httpProxy: "http://10.2.0.60:3128",
          httpsProxy: "http://10.2.0.60:3128",
          noProxy: [
            "10.2.0.0/24",
            "10.2.1.0/24",
            "10.2.2.0/24",
            "10.2.3.0/24",
            "localhost",
            "169.254.169.254",
            ".svc",
          ],
        },
        ntpServers: ["10.2.0.100"],
        dnsServers: ["10.2.0.50"],
      },
      rackCount: 2,
      fabricSku: "2-rack-ha",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await fabricsCreateMaximumSetGen();
  await fabricsCreateManagedMaximumSetGen();
}

main().catch(console.error);
