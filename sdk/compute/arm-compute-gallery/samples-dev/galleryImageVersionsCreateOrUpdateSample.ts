// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a gallery image version.
 *
 * @summary create or update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Create.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingManagedImageAsSource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImageVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 1,
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 0,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherWestUSDiskEncryptionSet",
                  },
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
            {
              name: "East US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 0,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherEastUSDiskEncryptionSet",
                  },
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
          ],
        },
        storageProfile: {
          source: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/images/{imageName}",
          },
        },
        safetyProfile: {
          allowDeletionOfReplicatedLocations: false,
          blockDeletionBeforeEndOfLife: false,
        },
      },
    },
  );
}

/**
 * This sample demonstrates how to create or update a gallery image version.
 *
 * @summary create or update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Create_WithAdditionalReplicaSets.json
 */
async function createOrUpdateASimpleGalleryImageVersionWithDirectDriveReplicas(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImageVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 1,
              additionalReplicaSets: [
                {
                  storageAccountType: "PreviumV2_LRS",
                  regionalReplicaCount: 1,
                },
              ],
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 0,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherWestUSDiskEncryptionSet",
                  },
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
            {
              name: "East US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 0,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherEastUSDiskEncryptionSet",
                  },
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
          ],
        },
        storageProfile: {
          source: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/images/{imageName}",
          },
        },
        safetyProfile: { allowDeletionOfReplicatedLocations: false },
      },
    },
  );
}

/**
 * This sample demonstrates how to create or update a gallery image version.
 *
 * @summary create or update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Create_WithCommunityImageVersionAsSource.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingCommunityGalleryImageAsSource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImageVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 1,
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 0,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherWestUSDiskEncryptionSet",
                  },
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
            {
              name: "East US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 0,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherEastUSDiskEncryptionSet",
                  },
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
          ],
        },
        storageProfile: {
          source: {
            communityGalleryImageId:
              "/communityGalleries/{communityGalleryName}/images/{communityGalleryImageName}",
          },
        },
        safetyProfile: {
          allowDeletionOfReplicatedLocations: false,
          blockDeletionBeforeEndOfLife: false,
        },
      },
    },
  );
}

/**
 * This sample demonstrates how to create or update a gallery image version.
 *
 * @summary create or update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Create_WithImageVersionAsSource.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingSharedImageAsSource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImageVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 1,
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 0,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherWestUSDiskEncryptionSet",
                  },
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
            {
              name: "East US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 0,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherEastUSDiskEncryptionSet",
                  },
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
          ],
        },
        storageProfile: {
          source: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/galleries/{galleryName}/images/{imageDefinitionName}/versions/{versionName}",
          },
        },
        safetyProfile: {
          allowDeletionOfReplicatedLocations: false,
          blockDeletionBeforeEndOfLife: false,
        },
      },
    },
  );
}

/**
 * This sample demonstrates how to create or update a gallery image version.
 *
 * @summary create or update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Create_WithShallowReplicationMode.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingShallowReplicationMode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImageVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 1,
              excludeFromLatest: false,
            },
          ],
          replicationMode: "Shallow",
        },
        storageProfile: {
          source: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/images/{imageName}",
          },
        },
        safetyProfile: {
          allowDeletionOfReplicatedLocations: false,
          blockDeletionBeforeEndOfLife: false,
        },
      },
    },
  );
}

/**
 * This sample demonstrates how to create or update a gallery image version.
 *
 * @summary create or update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Create_WithSnapshotsAsSource.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingSnapshotsAsASource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImageVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 1,
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
            {
              name: "East US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
          ],
        },
        storageProfile: {
          osDiskImage: {
            source: {
              id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/snapshots/{osSnapshotName}",
            },
            hostCaching: "ReadOnly",
          },
          dataDiskImages: [
            {
              source: {
                id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/disks/{dataDiskName}",
              },
              lun: 1,
              hostCaching: "None",
            },
          ],
        },
        safetyProfile: {
          allowDeletionOfReplicatedLocations: false,
          blockDeletionBeforeEndOfLife: false,
        },
      },
    },
  );
}

/**
 * This sample demonstrates how to create or update a gallery image version.
 *
 * @summary create or update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Create_WithTargetExtendedLocations.json
 */
async function createOrUpdateASimpleGalleryImageVersionWithTargetExtendedLocationsSpecified(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImageVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 1,
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 0,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherWestUSDiskEncryptionSet",
                  },
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
            {
              name: "East US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 0,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherEastUSDiskEncryptionSet",
                  },
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
          ],
        },
        storageProfile: {
          source: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/images/{imageName}",
          },
        },
        safetyProfile: {
          allowDeletionOfReplicatedLocations: false,
          blockDeletionBeforeEndOfLife: false,
        },
      },
    },
  );
}

/**
 * This sample demonstrates how to create or update a gallery image version.
 *
 * @summary create or update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Create_WithVHD.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingVhdAsASource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImageVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 1,
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherDiskEncryptionSet",
                    lun: 1,
                  },
                ],
              },
              excludeFromLatest: false,
            },
            {
              name: "East US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
              excludeFromLatest: false,
            },
          ],
        },
        storageProfile: {
          osDiskImage: {
            source: {
              storageAccountId:
                "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/{storageAccount}",
              uri: "https://gallerysourcencus.blob.core.windows.net/myvhds/Windows-Server-2012-R2-20171216-en.us-128GB.vhd",
            },
            hostCaching: "ReadOnly",
          },
          dataDiskImages: [
            {
              source: {
                storageAccountId:
                  "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/{storageAccount}",
                uri: "https://gallerysourcencus.blob.core.windows.net/myvhds/Windows-Server-2012-R2-20171216-en.us-128GB.vhd",
              },
              lun: 1,
              hostCaching: "None",
            },
          ],
        },
        safetyProfile: {
          allowDeletionOfReplicatedLocations: false,
          blockDeletionBeforeEndOfLife: false,
        },
      },
    },
  );
}

/**
 * This sample demonstrates how to create or update a gallery image version.
 *
 * @summary create or update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Create_WithVHD_UefiSettings.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingVhdAsASourceWithCustomUefiKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImageVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 1,
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherDiskEncryptionSet",
                    lun: 1,
                  },
                ],
              },
              excludeFromLatest: false,
            },
            {
              name: "East US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
              excludeFromLatest: false,
            },
          ],
        },
        storageProfile: {
          osDiskImage: {
            source: {
              storageAccountId:
                "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/{storageAccount}",
              uri: "https://gallerysourcencus.blob.core.windows.net/myvhds/Windows-Server-2012-R2-20171216-en.us-128GB.vhd",
            },
            hostCaching: "ReadOnly",
          },
          dataDiskImages: [
            {
              source: {
                storageAccountId:
                  "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/{storageAccount}",
                uri: "https://gallerysourcencus.blob.core.windows.net/myvhds/Windows-Server-2012-R2-20171216-en.us-128GB.vhd",
              },
              lun: 1,
              hostCaching: "None",
            },
          ],
        },
        safetyProfile: {
          allowDeletionOfReplicatedLocations: false,
          blockDeletionBeforeEndOfLife: false,
        },
        securityProfile: {
          uefiSettings: {
            signatureTemplateNames: ["MicrosoftUefiCertificateAuthorityTemplate"],
            additionalSignatures: {
              kek: [{ type: "sha256", value: ["<sha256 value>"] }],
              db: [{ type: "x509", value: ["<x509 value>"] }],
              dbx: [{ type: "x509", value: ["<x509 value>"] }],
            },
          },
        },
      },
    },
  );
}

/**
 * This sample demonstrates how to create or update a gallery image version.
 *
 * @summary create or update a gallery image version.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryImageVersion_Create_WithVmAsSource.json
 */
async function createOrUpdateASimpleGalleryImageVersionUsingVMAsSource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryImageVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryImageName",
    "1.0.0",
    {
      location: "West US",
      properties: {
        publishingProfile: {
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 2,
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 0,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherWestUSDiskEncryptionSet",
                  },
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myWestUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
            {
              name: "East US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_ZRS",
              encryption: {
                osDiskImage: {
                  diskEncryptionSetId:
                    "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                },
                dataDiskImages: [
                  {
                    lun: 0,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myOtherEastUSDiskEncryptionSet",
                  },
                  {
                    lun: 1,
                    diskEncryptionSetId:
                      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSet/myEastUSDiskEncryptionSet",
                  },
                ],
              },
              excludeFromLatest: false,
            },
          ],
        },
        storageProfile: {
          source: {
            virtualMachineId:
              "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/virtualMachines/{vmName}",
          },
        },
        safetyProfile: {
          allowDeletionOfReplicatedLocations: false,
          blockDeletionBeforeEndOfLife: false,
        },
      },
    },
  );
}

async function main(): Promise<void> {
  await createOrUpdateASimpleGalleryImageVersionUsingManagedImageAsSource();
  await createOrUpdateASimpleGalleryImageVersionWithDirectDriveReplicas();
  await createOrUpdateASimpleGalleryImageVersionUsingCommunityGalleryImageAsSource();
  await createOrUpdateASimpleGalleryImageVersionUsingSharedImageAsSource();
  await createOrUpdateASimpleGalleryImageVersionUsingShallowReplicationMode();
  await createOrUpdateASimpleGalleryImageVersionUsingSnapshotsAsASource();
  await createOrUpdateASimpleGalleryImageVersionWithTargetExtendedLocationsSpecified();
  await createOrUpdateASimpleGalleryImageVersionUsingVhdAsASource();
  await createOrUpdateASimpleGalleryImageVersionUsingVhdAsASourceWithCustomUefiKeys();
  await createOrUpdateASimpleGalleryImageVersionUsingVMAsSource();
}

main().catch(console.error);
