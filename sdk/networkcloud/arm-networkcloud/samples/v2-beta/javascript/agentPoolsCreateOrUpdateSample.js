// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new Kubernetes cluster agent pool or update the properties of the existing one.
 *
 * @summary create a new Kubernetes cluster agent pool or update the properties of the existing one.
 * x-ms-original-file: 2026-05-01-preview/AgentPools_Create.json
 */
async function createOrUpdateKubernetesClusterAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate(
    "resourceGroupName",
    "kubernetesClusterName",
    "agentPoolName",
    {
      extendedLocation: {
        name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterExtendedLocationName",
        type: "CustomLocation",
      },
      location: "location",
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
      taints: [{ key: "kubernetes.taint", value: "true:NoSchedule" }],
      upgradeSettings: { maxSurge: "1" },
      vmSkuName: "NC_P46_224_v1",
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateKubernetesClusterAgentPool();
}

main().catch(console.error);
