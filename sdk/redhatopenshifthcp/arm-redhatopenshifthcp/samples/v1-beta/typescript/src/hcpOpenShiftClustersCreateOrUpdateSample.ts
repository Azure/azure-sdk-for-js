// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedHatOpenShiftClient } from "@azure/arm-redhatopenshifthcp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a HcpOpenShiftCluster
 *
 * @summary create a HcpOpenShiftCluster
 * x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_CreateOrUpdate_MaximumSet_Gen.json
 */
async function hcpOpenShiftClustersCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.hcpOpenShiftClusters.createOrUpdate("rgopenapi", "hcpCluster-name", {
    properties: {
      version: { channelGroup: "stable", id: "4.12" },
      dns: { baseDomainPrefix: "jcldjrtyebhrlxs" },
      network: {
        networkType: "OVNKubernetes",
        podCidr: "10.128.0.0/14",
        serviceCidr: "172.30.0.0/16",
        machineCidr: "10.0.0.0/16",
        hostPrefix: 21,
      },
      api: { visibility: "Public", authorizedCIDRs: ["192.168.1.0/24", "10.0.0.0/16"] },
      ingress: { type: "Public" },
      platform: {
        managedResourceGroup: "nhyhywrxupo",
        subnetId:
          "/subscriptions/FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D/resourceGroups/resourceGroupName/providers/Microsoft.Network/virtualNetworks/hcp-network-example/subnets/example-subnet",
        vnetIntegrationSubnetId:
          "/subscriptions/FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D/resourceGroups/resourceGroupName/providers/Microsoft.Network/virtualNetworks/hcp-network-example/subnets/vnet-integration-subnet",
        outboundType: "LoadBalancer",
        networkSecurityGroupId:
          "/subscriptions/FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D/resourceGroups/resourceGroupName/providers/Microsoft.Network/networkSecurityGroups/nsg-example",
        operatorsAuthentication: {
          userAssignedIdentities: {
            controlPlaneOperators: {},
            dataPlaneOperators: {},
            serviceManagedIdentity:
              "/subscriptions/FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D/resourceGroups/rgopenapi/providers/Microsoft.ManagedIdentity/userAssignedIdentities/serviceMI",
          },
        },
      },
      autoscaling: {
        maxNodesTotal: 0,
        maxPodGracePeriodSeconds: 0,
        maxNodeProvisionTimeSeconds: 0,
        podPriorityThreshold: 1,
      },
      etcd: {
        dataEncryption: {
          keyManagementMode: "CustomerManaged",
          customerManaged: {
            encryptionType: "KMS",
            kms: {
              vaultName: "my-cool-vault",
              visibility: "Public",
              activeKey: { name: "my-cool-key", version: "8e73e7d1fd7d4a87b730f676fc77d3a6" },
            },
          },
        },
      },
      imageDigestMirrors: [
        {
          source: "registry.example.com/image1",
          mirrors: ["mirror1.example.com/image1", "mirror2.example.com/image1"],
        },
        { source: "registry.example.com/image2", mirrors: ["mirror1.example.com/image2"] },
      ],
      nodeDrainTimeoutMinutes: 20,
      clusterImageRegistry: { state: "Enabled" },
      cryptoRestrictions: "None",
    },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D/resourceGroups/rgopenapi/providers/Microsoft.ManagedIdentity/userAssignedIdentities/serviceMI":
          {},
      },
    },
    tags: { key4181: "leaswtidajsjtgmqawhdl" },
    location: "ayecbdqonsqfowbq",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await hcpOpenShiftClustersCreateOrUpdate();
}

main().catch(console.error);
