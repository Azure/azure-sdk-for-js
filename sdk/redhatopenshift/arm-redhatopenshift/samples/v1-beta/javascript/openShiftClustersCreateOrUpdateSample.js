// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureRedHatOpenShiftClient } = require("@azure/arm-redhatopenshift");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation returns properties of a OpenShift cluster.
 *
 * @summary the operation returns properties of a OpenShift cluster.
 * x-ms-original-file: 2025-07-25/OpenShiftClusters_CreateOrUpdate.json
 */
async function createsOrUpdatesAOpenShiftClusterWithTheSpecifiedSubscriptionResourceGroupAndResourceName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.openShiftClusters.createOrUpdate("resourceGroup", "resourceName", {
    identity: { type: "UserAssigned", userAssignedIdentities: { "": {} } },
    location: "location",
    apiserverProfile: { visibility: "Public" },
    clusterProfile: {
      domain: "cluster.location.aroapp.io",
      fipsValidatedModules: "Enabled",
      pullSecret:
        '{"auths":{"registry.connect.redhat.com":{"auth":""},"registry.redhat.io":{"auth":""}}}',
      resourceGroupId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/clusterResourceGroup",
    },
    consoleProfile: {},
    ingressProfiles: [{ name: "default", visibility: "Public" }],
    masterProfile: {
      encryptionAtHost: "Enabled",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/vnetResourceGroup/providers/Microsoft.Network/virtualNetworks/vnet/subnets/master",
      vmSize: "Standard_D8s_v3",
    },
    networkProfile: {
      loadBalancerProfile: { managedOutboundIps: { count: 1 } },
      podCidr: "10.128.0.0/14",
      preconfiguredNSG: "Disabled",
      serviceCidr: "172.30.0.0/16",
    },
    platformWorkloadIdentityProfile: { platformWorkloadIdentities: { "": {} } },
    servicePrincipalProfile: { clientId: "clientId", clientSecret: "clientSecret" },
    workerProfiles: [
      {
        name: "worker",
        count: 3,
        diskSizeGB: 128,
        subnetId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/vnetResourceGroup/providers/Microsoft.Network/virtualNetworks/vnet/subnets/worker",
        vmSize: "Standard_D2s_v3",
      },
    ],
    tags: { key: "value" },
  });
  console.log(result);
}

async function main() {
  await createsOrUpdatesAOpenShiftClusterWithTheSpecifiedSubscriptionResourceGroupAndResourceName();
}

main().catch(console.error);
