// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2026-02-01/NodeTypePutOperationAutoScale_example.json
 */
async function putANodeTypeWithAutoScaleParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE", {
    capacities: { ClientConnections: "65536" },
    dataDiskSizeGB: 200,
    dataDiskType: "Premium_LRS",
    isPrimary: false,
    isStateless: true,
    multiplePlacementGroups: true,
    placementProperties: { HasSSD: "true", NodeColor: "green", SomeProperty: "5" },
    vmExtensions: [
      {
        name: "Microsoft.Azure.Geneva.GenevaMonitoring",
        type: "GenevaMonitoring",
        autoUpgradeMinorVersion: true,
        publisher: "Microsoft.Azure.Geneva",
        settings: {},
        typeHandlerVersion: "2.0",
      },
    ],
    vmImageOffer: "WindowsServer",
    vmImagePublisher: "MicrosoftWindowsServer",
    vmImageSku: "2016-Datacenter-Server-Core",
    vmImageVersion: "latest",
    vmInstanceCount: -1,
    vmManagedIdentity: {
      userAssignedIdentities: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity",
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity2",
      ],
    },
    vmSecrets: [
      {
        sourceVault: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.KeyVault/vaults/myVault",
        },
        vaultCertificates: [
          {
            certificateStore: "My",
            certificateUrl:
              "https://myVault.vault.azure.net:443/secrets/myCert/ef1a31d39e1f46bca33def54b6cda54c",
          },
        ],
      },
    ],
    vmSize: "Standard_DS3",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2026-02-01/NodeTypePutOperationCustomImage_example.json
 */
async function putNodeTypeWithCustomVmImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE", {
    dataDiskSizeGB: 200,
    isPrimary: false,
    vmImageResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-custom-image/providers/Microsoft.Compute/galleries/myCustomImages/images/Win2019DC",
    vmInstanceCount: 10,
    vmSize: "Standard_D3",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2026-02-01/NodeTypePutOperationCustomSharedGalleriesImage_example.json
 */
async function putNodeTypeWithSharedGalleriesCustomVmImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE", {
    dataDiskSizeGB: 200,
    isPrimary: false,
    vmInstanceCount: 10,
    vmSharedGalleryImageId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-custom-image/providers/Microsoft.Compute/sharedGalleries/35349201-a0b3-405e-8a23-9f1450984307-SFSHAREDGALLERY/images/TestNoProdContainerDImage/versions/latest",
    vmSize: "Standard_D3",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2026-02-01/NodeTypePutOperationDedicatedHost_example.json
 */
async function putNodeTypeWithDedicatedHosts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE", {
    capacities: {},
    dataDiskSizeGB: 200,
    dataDiskType: "StandardSSD_LRS",
    hostGroupId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testhostgroupRG/providers/Microsoft.Compute/hostGroups/testHostGroup",
    isPrimary: false,
    placementProperties: {},
    vmImageOffer: "WindowsServer",
    vmImagePublisher: "MicrosoftWindowsServer",
    vmImageSku: "2019-Datacenter",
    vmImageVersion: "latest",
    vmInstanceCount: 10,
    vmSize: "Standard_D8s_v3",
    zones: ["1"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2026-02-01/NodeTypePutOperationStateless_example.json
 */
async function putAnStatelessNodeTypeWithTemporaryDiskForServiceFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE", {
    enableEncryptionAtHost: true,
    isPrimary: false,
    isStateless: true,
    multiplePlacementGroups: true,
    useTempDataDisk: true,
    vmExtensions: [
      {
        name: "Microsoft.Azure.Geneva.GenevaMonitoring",
        type: "GenevaMonitoring",
        autoUpgradeMinorVersion: true,
        publisher: "Microsoft.Azure.Geneva",
        settings: {},
        typeHandlerVersion: "2.0",
      },
    ],
    vmImageOffer: "WindowsServer",
    vmImagePublisher: "MicrosoftWindowsServer",
    vmImageSku: "2016-Datacenter-Server-Core",
    vmImageVersion: "latest",
    vmInstanceCount: 10,
    vmSize: "Standard_DS3",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2026-02-01/NodeTypePutOperationVmImagePlan_example.json
 */
async function putNodeTypeWithVmImagePlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE", {
    dataDiskSizeGB: 200,
    isPrimary: false,
    vmImageOffer: "windows_2022_test",
    vmImagePlan: {
      name: "win_2022_test_20_10_gen2",
      product: "windows_2022_test",
      publisher: "testpublisher",
    },
    vmImagePublisher: "testpublisher",
    vmImageSku: "win_2022_test_20_10_gen2",
    vmImageVersion: "latest",
    vmInstanceCount: 10,
    vmSize: "Standard_D3",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2026-02-01/NodeTypePutOperation_example_max.json
 */
async function putANodeTypeWithMaximumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate(
    "resRg",
    "myCluster",
    "BE-testResourceGroup-testRegion-test",
    {
      additionalDataDisks: [
        { diskLetter: "F", diskSizeGB: 256, diskType: "StandardSSD_LRS", lun: 1 },
        { diskLetter: "G", diskSizeGB: 150, diskType: "Premium_LRS", lun: 2 },
      ],
      additionalNetworkInterfaceConfigurations: [
        {
          name: "nic-1",
          dscpConfiguration: {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Network/dscpConfigurations/myDscpConfig",
          },
          enableAcceleratedNetworking: true,
          ipConfigurations: [
            {
              name: "ipconfig-1",
              applicationGatewayBackendAddressPools: [
                {
                  id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Network/applicationGateways/appgw-test/backendAddressPools/appgwBepoolTest",
                },
              ],
              loadBalancerBackendAddressPools: [
                {
                  id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Network/loadBalancers/test-LB/backendAddressPools/LoadBalancerBEAddressPool",
                },
              ],
              loadBalancerInboundNatPools: [
                {
                  id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Network/loadBalancers/test-LB/inboundNatPools/LoadBalancerNATPool",
                },
              ],
              privateIPAddressVersion: "IPv4",
              publicIPAddressConfiguration: {
                name: "publicip-1",
                ipTags: [{ ipTagType: "RoutingPreference", tag: "Internet" }],
                publicIPAddressVersion: "IPv4",
              },
              subnet: {
                id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
              },
            },
          ],
        },
      ],
      capacities: { ClientConnections: "65536" },
      computerNamePrefix: "BE",
      dataDiskLetter: "S",
      dataDiskSizeGB: 200,
      dataDiskType: "Premium_LRS",
      dscpConfigurationId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Network/dscpConfigurations/myDscpConfig",
      enableAcceleratedNetworking: true,
      enableEncryptionAtHost: true,
      enableNodePublicIP: true,
      enableNodePublicIPv6: true,
      enableOverProvisioning: false,
      evictionPolicy: "Deallocate",
      frontendConfigurations: [
        {
          applicationGatewayBackendAddressPoolId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Network/applicationGateways/appgw-test/backendAddressPools/appgwBepoolTest",
          loadBalancerBackendAddressPoolId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Network/loadBalancers/test-LB/backendAddressPools/LoadBalancerBEAddressPool",
          loadBalancerInboundNatPoolId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Network/loadBalancers/test-LB/inboundNatPools/LoadBalancerNATPool",
        },
      ],
      isPrimary: false,
      isSpotVM: true,
      isStateless: true,
      multiplePlacementGroups: true,
      natGatewayId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Network/natGateways/myNatGateway",
      placementProperties: { HasSSD: "true", NodeColor: "green", SomeProperty: "5" },
      secureBootEnabled: true,
      securityType: "ConfidentialVM",
      securityEncryptionType: "DiskWithVMGuestState",
      serviceArtifactReferenceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Compute/galleries/myGallery/serviceArtifacts/myServiceArtifact/vmArtifactsProfiles/myVmArtifactProfile",
      spotRestoreTimeout: "PT30M",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      useDefaultPublicLoadBalancer: true,
      useEphemeralOSDisk: true,
      vmApplications: [
        {
          configurationReference:
            "https://mystorageaccount.blob.core.windows.net/containername/blobname",
          enableAutomaticUpgrade: true,
          order: 1,
          packageReferenceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.Compute/galleries/myGallery/applications/myApplication/versions/1.0.0",
          treatFailureAsDeploymentFailure: false,
          vmGalleryTags: '{"Tag1":"Value1","Tag2":"Value2"}',
        },
      ],
      vmExtensions: [
        {
          name: "Microsoft.Azure.Geneva.GenevaMonitoring",
          type: "GenevaMonitoring",
          autoUpgradeMinorVersion: true,
          enableAutomaticUpgrade: true,
          forceUpdateTag: "v.1.0",
          publisher: "Microsoft.Azure.Geneva",
          settings: {},
          setupOrder: ["BeforeSFRuntime"],
          typeHandlerVersion: "2.0",
        },
      ],
      vmImageOffer: "WindowsServer",
      vmImagePublisher: "MicrosoftWindowsServer",
      vmImageSku: "2016-Datacenter-Server-Core",
      vmImageVersion: "latest",
      vmInstanceCount: 10,
      vmManagedIdentity: {
        userAssignedIdentities: [
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity",
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity2",
        ],
      },
      vmSecrets: [
        {
          sourceVault: {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resRg/providers/Microsoft.KeyVault/vaults/myVault",
          },
          vaultCertificates: [
            {
              certificateStore: "My",
              certificateUrl:
                "https://myVault.vault.azure.net:443/secrets/myCert/ef1a31d39e1f46bca33def54b6cda54c",
            },
          ],
        },
      ],
      vmSetupActions: ["EnableContainers", "EnableHyperV"],
      vmSize: "Standard_DS3",
      isOutboundOnly: true,
      enableResilientEphemeralOsDisk: true,
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric node type of a given managed cluster.
 *
 * @summary create or update a Service Fabric node type of a given managed cluster.
 * x-ms-original-file: 2026-02-01/NodeTypePutOperation_example_min.json
 */
async function putANodeTypeWithMinimumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.createOrUpdate("resRg", "myCluster", "BE", {
    dataDiskSizeGB: 200,
    isPrimary: false,
    vmImageOffer: "WindowsServer",
    vmImagePublisher: "MicrosoftWindowsServer",
    vmImageSku: "2016-Datacenter-Server-Core",
    vmImageVersion: "latest",
    vmInstanceCount: 10,
    vmSize: "Standard_D3",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putANodeTypeWithAutoScaleParameters();
  await putNodeTypeWithCustomVmImage();
  await putNodeTypeWithSharedGalleriesCustomVmImage();
  await putNodeTypeWithDedicatedHosts();
  await putAnStatelessNodeTypeWithTemporaryDiskForServiceFabric();
  await putNodeTypeWithVmImagePlan();
  await putANodeTypeWithMaximumParameters();
  await putANodeTypeWithMinimumParameters();
}

main().catch(console.error);
