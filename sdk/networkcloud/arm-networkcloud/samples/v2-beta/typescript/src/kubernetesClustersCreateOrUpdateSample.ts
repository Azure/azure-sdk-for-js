// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new Kubernetes cluster or update the properties of the existing one.
 *
 * @summary create a new Kubernetes cluster or update the properties of the existing one.
 * x-ms-original-file: 2026-05-01-preview/KubernetesClusters_Create.json
 */
async function createOrUpdateKubernetesCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.kubernetesClusters.createOrUpdate(
    "resourceGroupName",
    "kubernetesClusterName",
    {
      extendedLocation: {
        name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterExtendedLocationName",
        type: "CustomLocation",
      },
      location: "location",
      aadConfiguration: { adminGroupObjectIds: ["ffffffff-ffff-ffff-ffff-ffffffffffff"] },
      administratorConfiguration: {
        adminUsername: "azure",
        sshPublicKeys: [
          {
            keyData:
              "ssh-rsa AAtsE3njSONzDYRIZv/WLjVuMfrUSByHp+jfaaOLHTIIB4fJvo6dQUZxE20w2iDHV3tEkmnTo84eba97VMueQD6OzJPEyWZMRpz8UYWOd0IXeRqiFu1lawNblZhwNT/ojNZfpB3af/YDzwQCZgTcTRyNNhL4o/blKUmug0daSsSXISTRnIDpcf5qytjs1Xo+yYyJMvzLL59mhAyb3p/cD+Y3/s3WhAx+l0XOKpzXnblrv9d3q4c2tWmm/SyFqthaqd0= admin@vm",
          },
        ],
      },
      controlPlaneNodeConfiguration: {
        administratorConfiguration: {
          adminUsername: "azure",
          sshPublicKeys: [
            {
              keyData:
                "ssh-rsa AAtsE3njSONzDYRIZv/WLjVuMfrUSByHp+jfaaOLHTIIB4fJvo6dQUZxE20w2iDHV3tEkmnTo84eba97VMueQD6OzJPEyWZMRpz8UYWOd0IXeRqiFu1lawNblZhwNT/ojNZfpB3af/YDzwQCZgTcTRyNNhL4o/blKUmug0daSsSXISTRnIDpcf5qytjs1Xo+yYyJMvzLL59mhAyb3p/cD+Y3/s3WhAx+l0XOKpzXnblrv9d3q4c2tWmm/SyFqthaqd0= admin@vm",
            },
          ],
        },
        availabilityZones: ["1", "2", "3"],
        count: 3,
        vmSkuName: "NC_G6_28_v1",
      },
      initialAgentPoolConfigurations: [
        {
          administratorConfiguration: {
            adminUsername: "azure",
            sshPublicKeys: [
              {
                keyData:
                  "ssh-rsa AAtsE3njSONzDYRIZv/WLjVuMfrUSByHp+jfaaOLHTIIB4fJvo6dQUZxE20w2iDHV3tEkmnTo84eba97VMueQD6OzJPEyWZMRpz8UYWOd0IXeRqiFu1lawNblZhwNT/ojNZfpB3af/YDzwQCZgTcTRyNNhL4o/blKUmug0daSsSXISTRnIDpcf5qytjs1Xo+yYyJMvzLL59mhAyb3p/cD+Y3/s3WhAx+l0XOKpzXnblrv9d3q4c2tWmm/SyFqthaqd0= admin@vm",
              },
            ],
          },
          agentOptions: { hugepagesCount: 96, hugepagesSize: "1G" },
          attachedNetworkConfiguration: {
            l2Networks: [
              {
                networkId:
                  "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/l2Networks/l2NetworkName",
                pluginType: "DPDK",
              },
            ],
            l3Networks: [
              {
                ipamEnabled: "False",
                networkId:
                  "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/l3Networks/l3NetworkName",
                pluginType: "SRIOV",
              },
            ],
            trunkedNetworks: [
              {
                networkId:
                  "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/trunkedNetworks/trunkedNetworkName",
                pluginType: "MACVLAN",
              },
            ],
          },
          availabilityZones: ["1", "2", "3"],
          count: 3,
          labels: [{ key: "kubernetes.label", value: "true" }],
          mode: "System",
          name: "SystemPool-1",
          taints: [{ key: "kubernetes.taint", value: "true:NoSchedule" }],
          upgradeSettings: { maxSurge: "1" },
          vmSkuName: "NC_P46_224_v1",
        },
      ],
      kubernetesVersion: "1.XX.Y",
      managedResourceGroupConfiguration: { location: "East US", name: "my-managed-rg" },
      networkConfiguration: {
        attachedNetworkConfiguration: {
          l2Networks: [
            {
              networkId:
                "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/l2Networks/l2NetworkName",
              pluginType: "DPDK",
            },
          ],
          l3Networks: [
            {
              ipamEnabled: "False",
              networkId:
                "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/l3Networks/l3NetworkName",
              pluginType: "SRIOV",
            },
          ],
          trunkedNetworks: [
            {
              networkId:
                "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/trunkedNetworks/trunkedNetworkName",
              pluginType: "MACVLAN",
            },
          ],
        },
        bgpServiceLoadBalancerConfiguration: {
          bgpAdvertisements: [
            {
              advertiseToFabric: "True",
              communities: ["64512:100"],
              ipAddressPools: ["pool1"],
              peers: ["peer1"],
            },
          ],
          bgpPeers: [
            {
              bfdEnabled: "False",
              bgpMultiHop: "False",
              holdTime: "P300s",
              keepAliveTime: "P300s",
              myAsn: 64512,
              name: "peer1",
              peerAddress: "203.0.113.254",
              peerAsn: 64497,
              peerPort: 179,
            },
          ],
          fabricPeeringEnabled: "True",
          ipAddressPools: [
            {
              addresses: ["198.51.102.0/24"],
              autoAssign: "True",
              name: "pool1",
              onlyUseHostIps: "True",
            },
          ],
        },
        cloudServicesNetworkId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/cloudServicesNetworks/cloudServicesNetworkName",
        cniNetworkId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/l3Networks/l3NetworkName",
        dnsServiceIp: "198.51.101.2",
        podCidrs: ["198.51.100.0/24"],
        serviceCidrs: ["198.51.101.0/24"],
      },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new Kubernetes cluster or update the properties of the existing one.
 *
 * @summary create a new Kubernetes cluster or update the properties of the existing one.
 * x-ms-original-file: 2026-05-01-preview/KubernetesClusters_L2LoadBalancer_Create.json
 */
async function createOrUpdateKubernetesClusterWithALayer2LoadBalancer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.kubernetesClusters.createOrUpdate(
    "resourceGroupName",
    "kubernetesClusterName",
    {
      extendedLocation: {
        name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterExtendedLocationName",
        type: "CustomLocation",
      },
      location: "location",
      aadConfiguration: { adminGroupObjectIds: ["ffffffff-ffff-ffff-ffff-ffffffffffff"] },
      administratorConfiguration: {
        adminUsername: "azure",
        sshPublicKeys: [
          {
            keyData:
              "ssh-rsa AAtsE3njSONzDYRIZv/WLjVuMfrUSByHp+jfaaOLHTIIB4fJvo6dQUZxE20w2iDHV3tEkmnTo84eba97VMueQD6OzJPEyWZMRpz8UYWOd0IXeRqiFu1lawNblZhwNT/ojNZfpB3af/YDzwQCZgTcTRyNNhL4o/blKUmug0daSsSXISTRnIDpcf5qytjs1Xo+yYyJMvzLL59mhAyb3p/cD+Y3/s3WhAx+l0XOKpzXnblrv9d3q4c2tWmm/SyFqthaqd0= admin@vm",
          },
        ],
      },
      controlPlaneNodeConfiguration: {
        administratorConfiguration: {
          adminUsername: "azure",
          sshPublicKeys: [
            {
              keyData:
                "ssh-rsa AAtsE3njSONzDYRIZv/WLjVuMfrUSByHp+jfaaOLHTIIB4fJvo6dQUZxE20w2iDHV3tEkmnTo84eba97VMueQD6OzJPEyWZMRpz8UYWOd0IXeRqiFu1lawNblZhwNT/ojNZfpB3af/YDzwQCZgTcTRyNNhL4o/blKUmug0daSsSXISTRnIDpcf5qytjs1Xo+yYyJMvzLL59mhAyb3p/cD+Y3/s3WhAx+l0XOKpzXnblrv9d3q4c2tWmm/SyFqthaqd0= admin@vm",
            },
          ],
        },
        availabilityZones: ["1", "2", "3"],
        count: 3,
        vmSkuName: "NC_G6_28_v1",
      },
      initialAgentPoolConfigurations: [
        {
          administratorConfiguration: {
            adminUsername: "azure",
            sshPublicKeys: [
              {
                keyData:
                  "ssh-rsa AAtsE3njSONzDYRIZv/WLjVuMfrUSByHp+jfaaOLHTIIB4fJvo6dQUZxE20w2iDHV3tEkmnTo84eba97VMueQD6OzJPEyWZMRpz8UYWOd0IXeRqiFu1lawNblZhwNT/ojNZfpB3af/YDzwQCZgTcTRyNNhL4o/blKUmug0daSsSXISTRnIDpcf5qytjs1Xo+yYyJMvzLL59mhAyb3p/cD+Y3/s3WhAx+l0XOKpzXnblrv9d3q4c2tWmm/SyFqthaqd0= admin@vm",
              },
            ],
          },
          agentOptions: { hugepagesCount: 96, hugepagesSize: "1G" },
          attachedNetworkConfiguration: {
            l2Networks: [
              {
                networkId:
                  "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/l2Networks/l2NetworkName",
                pluginType: "DPDK",
              },
            ],
            l3Networks: [
              {
                ipamEnabled: "False",
                networkId:
                  "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/l3Networks/l3NetworkName",
                pluginType: "SRIOV",
              },
            ],
            trunkedNetworks: [
              {
                networkId:
                  "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/trunkedNetworks/trunkedNetworkName",
                pluginType: "MACVLAN",
              },
            ],
          },
          availabilityZones: ["1", "2", "3"],
          count: 3,
          labels: [{ key: "kubernetes.label", value: "true" }],
          mode: "System",
          name: "SystemPool-1",
          taints: [{ key: "kubernetes.taint", value: "true:NoSchedule" }],
          upgradeSettings: { maxSurge: "1" },
          vmSkuName: "NC_P46_224_v1",
        },
      ],
      kubernetesVersion: "1.XX.Y",
      managedResourceGroupConfiguration: { location: "East US", name: "my-managed-rg" },
      networkConfiguration: {
        attachedNetworkConfiguration: {
          l2Networks: [
            {
              networkId:
                "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/l2Networks/l2NetworkName",
              pluginType: "DPDK",
            },
          ],
          l3Networks: [
            {
              ipamEnabled: "False",
              networkId:
                "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/l3Networks/l3NetworkName",
              pluginType: "SRIOV",
            },
          ],
          trunkedNetworks: [
            {
              networkId:
                "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/trunkedNetworks/trunkedNetworkName",
              pluginType: "MACVLAN",
            },
          ],
        },
        cloudServicesNetworkId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/cloudServicesNetworks/cloudServicesNetworkName",
        cniNetworkId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/l3Networks/l3NetworkName",
        dnsServiceIp: "198.51.101.2",
        l2ServiceLoadBalancerConfiguration: {
          ipAddressPools: [
            { addresses: ["198.51.102.2-198.51.102.254"], autoAssign: "True", name: "pool1" },
          ],
        },
        podCidrs: ["198.51.100.0/24"],
        serviceCidrs: ["198.51.101.0/24"],
      },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateKubernetesCluster();
  await createOrUpdateKubernetesClusterWithALayer2LoadBalancer();
}

main().catch(console.error);
