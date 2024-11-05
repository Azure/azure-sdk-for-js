// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default,
  { getLongRunningPoller } = require("@azure-rest/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Create or update a gallery image version.
 *
 * @summary Create or update a gallery image version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryImageVersion_Create_WithVmAsSource.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingVMAsSource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryImageName = "myGalleryImageName";
  const galleryImageVersionName = "1.0.0";
  const options = {
    body: {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherWestUSDiskEncryptionSet",
                    lun: 0,
                  },
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 2,
            },
            {
              name: "East US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherEastUSDiskEncryptionSet",
                    lun: 0,
                  },
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
            },
          ],
        },
        storageProfile: {
          source: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/virtualMachines/{vmName}",
          },
        },
      },
    },
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateASimpleGalleryImageVersionUsingVMAsSource().catch(console.error);
/**
 * This sample demonstrates how to Create or update a gallery image version.
 *
 * @summary Create or update a gallery image version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryImageVersion_Create.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingManagedImageAsSource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryImageName = "myGalleryImageName";
  const galleryImageVersionName = "1.0.0";
  const options = {
    body: {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherWestUSDiskEncryptionSet",
                    lun: 0,
                  },
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 1,
            },
            {
              name: "East US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherEastUSDiskEncryptionSet",
                    lun: 0,
                  },
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
            },
          ],
        },
        storageProfile: {
          source: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/images/{imageName}",
          },
        },
      },
    },
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateASimpleGalleryImageVersionUsingManagedImageAsSource().catch(console.error);
/**
 * This sample demonstrates how to Create or update a gallery image version.
 *
 * @summary Create or update a gallery image version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryImageVersion_Create_WithSnapshotsAsSource.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingMixOfDisksAndSnapshotsAsASource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryImageName = "myGalleryImageName";
  const galleryImageVersionName = "1.0.0";
  const options = {
    body: {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 1,
            },
            {
              name: "East US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
            },
          ],
        },
        storageProfile: {
          dataDiskImages: [
            {
              hostCaching: "None",
              lun: 1,
              source: {
                id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/disks/{dataDiskName}",
              },
            },
          ],
          osDiskImage: {
            hostCaching: "ReadOnly",
            source: {
              id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/snapshots/{osSnapshotName}",
            },
          },
        },
      },
    },
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateASimpleGalleryImageVersionUsingMixOfDisksAndSnapshotsAsASource().catch(console.error);
/**
 * This sample demonstrates how to Create or update a gallery image version.
 *
 * @summary Create or update a gallery image version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryImageVersion_Create_WithShallowReplicationMode.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingShallowReplicationMode() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryImageName = "myGalleryImageName";
  const galleryImageVersionName = "1.0.0";
  const options = {
    body: {
      location: "West US",
      properties: {
        publishingProfile: {
          replicationMode: "Shallow",
          targetRegions: [{ name: "West US", regionalReplicaCount: 1 }],
        },
        storageProfile: {
          source: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/images/{imageName}",
          },
        },
      },
    },
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateASimpleGalleryImageVersionUsingShallowReplicationMode().catch(console.error);
/**
 * This sample demonstrates how to Create or update a gallery image version.
 *
 * @summary Create or update a gallery image version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryImageVersion_Create_WithImageVersionAsSource.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingSharedImageAsSource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryImageName = "myGalleryImageName";
  const galleryImageVersionName = "1.0.0";
  const options = {
    body: {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherWestUSDiskEncryptionSet",
                    lun: 0,
                  },
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 1,
            },
            {
              name: "East US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherEastUSDiskEncryptionSet",
                    lun: 0,
                  },
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
            },
          ],
        },
        storageProfile: {
          source: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/galleries/{galleryName}/images/{imageDefinitionName}/versions/{versionName}",
          },
        },
      },
    },
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateASimpleGalleryImageVersionUsingSharedImageAsSource().catch(console.error);
/**
 * This sample demonstrates how to Create or update a gallery image version.
 *
 * @summary Create or update a gallery image version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryImageVersion_Create_WithSnapshotsAsSource.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingSnapshotsAsASource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryImageName = "myGalleryImageName";
  const galleryImageVersionName = "1.0.0";
  const options = {
    body: {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 1,
            },
            {
              name: "East US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
            },
          ],
        },
        storageProfile: {
          dataDiskImages: [
            {
              hostCaching: "None",
              lun: 1,
              source: {
                id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/disks/{dataDiskName}",
              },
            },
          ],
          osDiskImage: {
            hostCaching: "ReadOnly",
            source: {
              id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/snapshots/{osSnapshotName}",
            },
          },
        },
      },
    },
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateASimpleGalleryImageVersionUsingSnapshotsAsASource().catch(console.error);
/**
 * This sample demonstrates how to Create or update a gallery image version.
 *
 * @summary Create or update a gallery image version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryImageVersion_Create_WithVHD.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingVhdAsASource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryImageName = "myGalleryImageName";
  const galleryImageVersionName = "1.0.0";
  const options = {
    body: {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 1,
            },
            {
              name: "East US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
            },
          ],
        },
        storageProfile: {
          dataDiskImages: [
            {
              hostCaching: "None",
              lun: 1,
              source: {
                id: "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/{storageAccount}",
                uri: "https://gallerysourcencus.blob.core.windows.net/myvhds/Windows-Server-2012-R2-20171216-en.us-128GB.vhd",
              },
            },
          ],
          osDiskImage: {
            hostCaching: "ReadOnly",
            source: {
              id: "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/{storageAccount}",
              uri: "https://gallerysourcencus.blob.core.windows.net/myvhds/Windows-Server-2012-R2-20171216-en.us-128GB.vhd",
            },
          },
        },
      },
    },
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateASimpleGalleryImageVersionUsingVhdAsASource().catch(console.error);
/**
 * This sample demonstrates how to Create or update a gallery image version.
 *
 * @summary Create or update a gallery image version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryImageVersion_Create_WithTargetExtendedLocations.json
 */
async function createOrUpdateASimpleGalleryImageVersionWithTargetExtendedLocationsSpecified() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryImageName = "myGalleryImageName";
  const galleryImageVersionName = "1.0.0";
  const options = {
    body: {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherWestUSDiskEncryptionSet",
                    lun: 0,
                  },
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 1,
            },
            {
              name: "East US",
              encryption: {
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherEastUSDiskEncryptionSet",
                    lun: 0,
                  },
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                    lun: 1,
                  },
                ],
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
              },
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
            },
          ],
        },
        storageProfile: {
          source: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/images/{imageName}",
          },
        },
      },
    },
    queryParameters: { "api-version": "2022-01-03" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImageVersionName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateASimpleGalleryImageVersionWithTargetExtendedLocationsSpecified().catch(console.error);
