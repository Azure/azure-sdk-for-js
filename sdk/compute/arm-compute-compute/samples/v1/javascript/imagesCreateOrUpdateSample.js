// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an image.
 *
 * @summary create or update an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_CreateFromABlob.json
 */
async function createAVirtualMachineImageFromABlob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.images.createOrUpdate("myResourceGroup", "myImage", {
    location: "West US",
    properties: {
      storageProfile: {
        osDisk: {
          osType: "Linux",
          blobUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
          osState: "Generalized",
        },
        zoneResilient: true,
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update an image.
 *
 * @summary create or update an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_CreateFromABlobWithDiskEncryptionSet.json
 */
async function createAVirtualMachineImageFromABlobWithDiskEncryptionSetResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.images.createOrUpdate("myResourceGroup", "myImage", {
    location: "West US",
    properties: {
      storageProfile: {
        osDisk: {
          osType: "Linux",
          blobUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
          diskEncryptionSet: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}",
          },
          osState: "Generalized",
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update an image.
 *
 * @summary create or update an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_CreateFromAManagedDisk.json
 */
async function createAVirtualMachineImageFromAManagedDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.images.createOrUpdate("myResourceGroup", "myImage", {
    location: "West US",
    properties: {
      storageProfile: {
        osDisk: {
          osType: "Linux",
          managedDisk: {
            id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/myManagedDisk",
          },
          osState: "Generalized",
        },
        zoneResilient: true,
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update an image.
 *
 * @summary create or update an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_CreateFromAManagedDiskWithDiskEncryptionSet.json
 */
async function createAVirtualMachineImageFromAManagedDiskWithDiskEncryptionSetResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.images.createOrUpdate("myResourceGroup", "myImage", {
    location: "West US",
    properties: {
      storageProfile: {
        osDisk: {
          osType: "Linux",
          snapshot: {
            id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot",
          },
          diskEncryptionSet: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}",
          },
          osState: "Generalized",
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update an image.
 *
 * @summary create or update an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_CreateFromASnapshot.json
 */
async function createAVirtualMachineImageFromASnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.images.createOrUpdate("myResourceGroup", "myImage", {
    location: "West US",
    properties: {
      storageProfile: {
        osDisk: {
          osType: "Linux",
          snapshot: {
            id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot",
          },
          osState: "Generalized",
        },
        zoneResilient: false,
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update an image.
 *
 * @summary create or update an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_CreateFromASnapshotWithDiskEncryptionSet.json
 */
async function createAVirtualMachineImageFromASnapshotWithDiskEncryptionSetResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.images.createOrUpdate("myResourceGroup", "myImage", {
    location: "West US",
    properties: {
      storageProfile: {
        osDisk: {
          osType: "Linux",
          managedDisk: {
            id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/myManagedDisk",
          },
          diskEncryptionSet: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}",
          },
          osState: "Generalized",
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update an image.
 *
 * @summary create or update an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_CreateFromAVM.json
 */
async function createAVirtualMachineImageFromAnExistingVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.images.createOrUpdate("myResourceGroup", "myImage", {
    location: "West US",
    properties: {
      sourceVirtualMachine: {
        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update an image.
 *
 * @summary create or update an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_Create_DataDiskFromABlobIncluded.json
 */
async function createAVirtualMachineImageThatIncludesADataDiskFromABlob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.images.createOrUpdate("myResourceGroup", "myImage", {
    location: "West US",
    properties: {
      storageProfile: {
        osDisk: {
          osType: "Linux",
          blobUri: "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
          osState: "Generalized",
        },
        dataDisks: [
          {
            lun: 1,
            blobUri: "https://mystorageaccount.blob.core.windows.net/dataimages/dataimage.vhd",
          },
        ],
        zoneResilient: false,
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update an image.
 *
 * @summary create or update an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_Create_DataDiskFromAManagedDiskIncluded.json
 */
async function createAVirtualMachineImageThatIncludesADataDiskFromAManagedDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.images.createOrUpdate("myResourceGroup", "myImage", {
    location: "West US",
    properties: {
      storageProfile: {
        osDisk: {
          osType: "Linux",
          managedDisk: {
            id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/myManagedDisk",
          },
          osState: "Generalized",
        },
        dataDisks: [
          {
            lun: 1,
            managedDisk: {
              id: "subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/myManagedDisk2",
            },
          },
        ],
        zoneResilient: false,
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update an image.
 *
 * @summary create or update an image.
 * x-ms-original-file: 2025-04-01/imageExamples/Image_Create_DataDiskFromASnapshotIncluded.json
 */
async function createAVirtualMachineImageThatIncludesADataDiskFromASnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.images.createOrUpdate("myResourceGroup", "myImage", {
    location: "West US",
    properties: {
      storageProfile: {
        osDisk: {
          osType: "Linux",
          snapshot: {
            id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot",
          },
          osState: "Generalized",
        },
        dataDisks: [
          {
            lun: 1,
            snapshot: {
              id: "subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot2",
            },
          },
        ],
        zoneResilient: true,
      },
    },
  });
}

async function main() {
  await createAVirtualMachineImageFromABlob();
  await createAVirtualMachineImageFromABlobWithDiskEncryptionSetResource();
  await createAVirtualMachineImageFromAManagedDisk();
  await createAVirtualMachineImageFromAManagedDiskWithDiskEncryptionSetResource();
  await createAVirtualMachineImageFromASnapshot();
  await createAVirtualMachineImageFromASnapshotWithDiskEncryptionSetResource();
  await createAVirtualMachineImageFromAnExistingVirtualMachine();
  await createAVirtualMachineImageThatIncludesADataDiskFromABlob();
  await createAVirtualMachineImageThatIncludesADataDiskFromAManagedDisk();
  await createAVirtualMachineImageThatIncludesADataDiskFromASnapshot();
}

main().catch(console.error);
