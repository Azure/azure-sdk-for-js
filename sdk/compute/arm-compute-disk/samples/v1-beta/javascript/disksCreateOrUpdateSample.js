// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_CreateOrUpdate_AvailabilityPolicy.json
 */
async function createAManagedDiskWithAvailabilityPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      creationData: { createOption: "Empty" },
      diskSizeGB: 1024,
      availabilityPolicy: { actionOnDiskDelay: "AutomaticReattach" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_ByCopyingASnapshot.json
 */
async function createAManagedDiskByCopyingASnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      creationData: {
        createOption: "Copy",
        sourceResourceId:
          "subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_ByImportingBlobFromADifferentSubscription.json
 */
async function createAManagedDiskByImportingAnUnmanagedBlobFromADifferentSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      creationData: {
        createOption: "Import",
        storageAccountId:
          "subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/myStorageAccount",
        sourceUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_ByImportingBlobFromTheSameSubscription.json
 */
async function createAManagedDiskByImportingAnUnmanagedBlobFromTheSameSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      creationData: {
        createOption: "Import",
        sourceUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_ConfidentialVMSupportedDiskEncryptedWithCMK.json
 */
async function createAConfidentialVMSupportedDiskEncryptedWithCustomerManagedKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      osType: "Windows",
      securityProfile: {
        securityType: "ConfidentialVM_DiskEncryptedWithCustomerKey",
        secureVMDiskEncryptionSetId:
          "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
      },
      creationData: {
        createOption: "FromImage",
        imageReference: {
          id: "/Subscriptions/{subscriptionId}/Providers/Microsoft.Compute/Locations/westus/Publishers/{publisher}/ArtifactTypes/VMImage/Offers/{offer}/Skus/{sku}/Versions/1.0.0",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_Empty.json
 */
async function createAnEmptyManagedDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: { creationData: { createOption: "Empty" }, diskSizeGB: 200 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_FromAPlatformImage.json
 */
async function createAManagedDiskFromAPlatformImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      osType: "Windows",
      creationData: {
        createOption: "FromImage",
        imageReference: {
          id: "/Subscriptions/{subscriptionId}/Providers/Microsoft.Compute/Locations/westus/Publishers/{publisher}/ArtifactTypes/VMImage/Offers/{offer}/Skus/{sku}/Versions/1.0.0",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_FromAnAzureComputeGalleryCommunityImage.json
 */
async function createAManagedDiskFromAnAzureComputeGalleryCommunityImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      osType: "Windows",
      creationData: {
        createOption: "FromImage",
        galleryImageReference: {
          communityGalleryImageId:
            "/CommunityGalleries/{communityGalleryPublicGalleryName}/Images/{imageName}/Versions/1.0.0",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_FromAnAzureComputeGalleryDirectSharedImage.json
 */
async function createAManagedDiskFromAnAzureComputeGalleryDirectSharedImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      osType: "Windows",
      creationData: {
        createOption: "FromImage",
        galleryImageReference: {
          sharedGalleryImageId:
            "/SharedGalleries/{sharedGalleryUniqueName}/Images/{imageName}/Versions/1.0.0",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_FromAnAzureComputeGalleryImage.json
 */
async function createAManagedDiskFromAnAzureComputeGalleryImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      osType: "Windows",
      creationData: {
        createOption: "FromImage",
        galleryImageReference: {
          id: "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/Providers/Microsoft.Compute/Galleries/{galleryName}/Images/{imageName}/Versions/1.0.0",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_FromAnElasticSanVolumeSnapshot.json
 */
async function createAManagedDiskFromElasticSanVolumeSnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      creationData: {
        createOption: "CopyFromSanSnapshot",
        elasticSanResourceId:
          "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.ElasticSan/elasticSans/myElasticSan/volumegroups/myElasticSanVolumeGroup/snapshots/myElasticSanVolumeSnapshot",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_FromAnExistingManagedDisk.json
 */
async function createAManagedDiskFromAnExistingManagedDiskInTheSameOrDifferentSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk2", {
    location: "West US",
    properties: {
      creationData: {
        createOption: "Copy",
        sourceResourceId:
          "subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/myDisk1",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_FromImportSecure.json
 */
async function createAManagedDiskFromImportSecureCreateOption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      osType: "Windows",
      securityProfile: {
        securityType: "ConfidentialVM_VMGuestStateOnlyEncryptedWithPlatformKey",
      },
      creationData: {
        createOption: "ImportSecure",
        storageAccountId:
          "subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/myStorageAccount",
        sourceUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
        securityDataUri: "https://mystorageaccount.blob.core.windows.net/osimages/vmgs.vhd",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_FromImportSecure_WithVMMetadata.json
 */
async function createAManagedDiskFromImportSecureCreateOptionWithMetadataURIForConfidentialVM() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      osType: "Windows",
      securityProfile: {
        securityType: "ConfidentialVM_VMGuestStateOnlyEncryptedWithPlatformKey",
      },
      creationData: {
        createOption: "ImportSecure",
        storageAccountId:
          "subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/myStorageAccount",
        sourceUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
        securityDataUri: "https://mystorageaccount.blob.core.windows.net/osimages/vmgs.vhd",
        securityMetadataUri: "https://mystorageaccount.blob.core.windows.net/osimages/vmmd.vhd",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_FromUploadPreparedSecure.json
 */
async function createAManagedDiskFromUploadPreparedSecureCreateOption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      osType: "Windows",
      securityProfile: { securityType: "TrustedLaunch" },
      creationData: {
        createOption: "UploadPreparedSecure",
        uploadSizeBytes: 10737418752,
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_InExtendedLocation.json
 */
async function createAnEmptyManagedDiskInExtendedLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    extendedLocation: { type: "EdgeZone", name: "{edge-zone-id}" },
    properties: { creationData: { createOption: "Empty" }, diskSizeGB: 200 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_PerformancePlus.json
 */
async function createAManagedDiskWithPerformancePlus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      creationData: { createOption: "Upload", performancePlus: true },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_UploadDisk.json
 */
async function createAManagedUploadDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      creationData: { createOption: "Upload", uploadSizeBytes: 10737418752 },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_WithDataAccessAuthMode.json
 */
async function createAManagedDiskWithDataAccessAuthMode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      creationData: { createOption: "Empty" },
      diskSizeGB: 200,
      dataAccessAuthMode: "AzureActiveDirectory",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_WithDiskAccess.json
 */
async function createAManagedDiskAndAssociateWithDiskAccessResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      creationData: { createOption: "Empty" },
      diskSizeGB: 200,
      networkAccessPolicy: "AllowPrivate",
      diskAccessId:
        "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskAccesses/{existing-diskAccess-name}",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_WithDiskEncryptionSet.json
 */
async function createAManagedDiskAndAssociateWithDiskEncryptionSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      creationData: { createOption: "Empty" },
      diskSizeGB: 200,
      encryption: {
        diskEncryptionSetId:
          "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_WithLogicalSectorSize.json
 */
async function createAnUltraManagedDiskWithLogicalSectorSize512E() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    sku: { name: "UltraSSD_LRS" },
    properties: {
      creationData: { createOption: "Empty", logicalSectorSize: 512 },
      diskSizeGB: 200,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_WithOptimizedForFrequentAttach.json
 */
async function createAManagedDiskWithOptimizedForFrequentAttach() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    properties: {
      creationData: { createOption: "Empty" },
      diskSizeGB: 200,
      optimizedForFrequentAttach: true,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_WithPremiumV2_LRSAccountType.json
 */
async function createAManagedDiskWithPremiumV2AccountType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myPremiumV2Disk", {
    location: "West US",
    sku: { name: "PremiumV2_LRS" },
    properties: {
      creationData: { createOption: "Empty" },
      diskSizeGB: 200,
      diskIopsReadWrite: 125,
      diskMBpsReadWrite: 3000,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_WithSSDZRSAccountType.json
 */
async function createAManagedDiskWithSsdZrsAccountType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "West US",
    sku: { name: "Premium_ZRS" },
    properties: { creationData: { createOption: "Empty" }, diskSizeGB: 200 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_WithSecurityProfile.json
 */
async function createAManagedDiskWithSecurityProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myDisk", {
    location: "North Central US",
    properties: {
      osType: "Windows",
      securityProfile: { securityType: "TrustedLaunch" },
      creationData: {
        createOption: "FromImage",
        imageReference: {
          id: "/Subscriptions/{subscriptionId}/Providers/Microsoft.Compute/Locations/uswest/Publishers/Microsoft/ArtifactTypes/VMImage/Offers/{offer}",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a disk.
 *
 * @summary creates or updates a disk.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_Create_WithUltraSSD_ReadOnly.json
 */
async function createAManagedDiskWithUltraAccountTypeWithReadOnlyPropertySet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.disks.createOrUpdate("myResourceGroup", "myUltraReadOnlyDisk", {
    location: "West US",
    sku: { name: "UltraSSD_LRS" },
    properties: {
      creationData: { createOption: "Empty", logicalSectorSize: 4096 },
      diskSizeGB: 200,
      diskIopsReadWrite: 125,
      diskMBpsReadWrite: 3000,
      encryption: { type: "EncryptionAtRestWithPlatformKey" },
    },
  });
  console.log(result);
}

async function main() {
  await createAManagedDiskWithAvailabilityPolicy();
  await createAManagedDiskByCopyingASnapshot();
  await createAManagedDiskByImportingAnUnmanagedBlobFromADifferentSubscription();
  await createAManagedDiskByImportingAnUnmanagedBlobFromTheSameSubscription();
  await createAConfidentialVMSupportedDiskEncryptedWithCustomerManagedKey();
  await createAnEmptyManagedDisk();
  await createAManagedDiskFromAPlatformImage();
  await createAManagedDiskFromAnAzureComputeGalleryCommunityImage();
  await createAManagedDiskFromAnAzureComputeGalleryDirectSharedImage();
  await createAManagedDiskFromAnAzureComputeGalleryImage();
  await createAManagedDiskFromElasticSanVolumeSnapshot();
  await createAManagedDiskFromAnExistingManagedDiskInTheSameOrDifferentSubscription();
  await createAManagedDiskFromImportSecureCreateOption();
  await createAManagedDiskFromImportSecureCreateOptionWithMetadataURIForConfidentialVM();
  await createAManagedDiskFromUploadPreparedSecureCreateOption();
  await createAnEmptyManagedDiskInExtendedLocation();
  await createAManagedDiskWithPerformancePlus();
  await createAManagedUploadDisk();
  await createAManagedDiskWithDataAccessAuthMode();
  await createAManagedDiskAndAssociateWithDiskAccessResource();
  await createAManagedDiskAndAssociateWithDiskEncryptionSet();
  await createAnUltraManagedDiskWithLogicalSectorSize512E();
  await createAManagedDiskWithOptimizedForFrequentAttach();
  await createAManagedDiskWithPremiumV2AccountType();
  await createAManagedDiskWithSsdZrsAccountType();
  await createAManagedDiskWithSecurityProfile();
  await createAManagedDiskWithUltraAccountTypeWithReadOnlyPropertySet();
}

main().catch(console.error);
