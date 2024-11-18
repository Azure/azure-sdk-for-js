// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  ImagesCreateOrUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create or update an image.
 *
 * @summary Create or update an image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/imageExamples/Image_CreateFromABlobWithDiskEncryptionSet.json
 */
async function createAVirtualMachineImageFromABlobWithDiskEncryptionSetResource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const imageName = "myImage";
  const options: ImagesCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        storageProfile: {
          osDisk: {
            blobUri:
              "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
            diskEncryptionSet: {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}"
            },
            osState: "Generalized",
            osType: "Linux"
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      imageName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVirtualMachineImageFromABlobWithDiskEncryptionSetResource().catch(
  console.error
);
/**
 * This sample demonstrates how to Create or update an image.
 *
 * @summary Create or update an image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/imageExamples/Image_CreateFromABlob.json
 */
async function createAVirtualMachineImageFromABlob() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const imageName = "myImage";
  const options: ImagesCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        storageProfile: {
          osDisk: {
            blobUri:
              "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
            osState: "Generalized",
            osType: "Linux"
          },
          zoneResilient: true
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      imageName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVirtualMachineImageFromABlob().catch(console.error);
/**
 * This sample demonstrates how to Create or update an image.
 *
 * @summary Create or update an image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/imageExamples/Image_CreateFromAManagedDiskWithDiskEncryptionSet.json
 */
async function createAVirtualMachineImageFromAManagedDiskWithDiskEncryptionSetResource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const imageName = "myImage";
  const options: ImagesCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        storageProfile: {
          osDisk: {
            diskEncryptionSet: {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}"
            },
            osState: "Generalized",
            osType: "Linux",
            snapshot: {
              id:
                "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot"
            }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      imageName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVirtualMachineImageFromAManagedDiskWithDiskEncryptionSetResource().catch(
  console.error
);
/**
 * This sample demonstrates how to Create or update an image.
 *
 * @summary Create or update an image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/imageExamples/Image_CreateFromAManagedDisk.json
 */
async function createAVirtualMachineImageFromAManagedDisk() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const imageName = "myImage";
  const options: ImagesCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        storageProfile: {
          osDisk: {
            managedDisk: {
              id:
                "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/myManagedDisk"
            },
            osState: "Generalized",
            osType: "Linux"
          },
          zoneResilient: true
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      imageName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVirtualMachineImageFromAManagedDisk().catch(console.error);
/**
 * This sample demonstrates how to Create or update an image.
 *
 * @summary Create or update an image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/imageExamples/Image_CreateFromASnapshotWithDiskEncryptionSet.json
 */
async function createAVirtualMachineImageFromASnapshotWithDiskEncryptionSetResource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const imageName = "myImage";
  const options: ImagesCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        storageProfile: {
          osDisk: {
            diskEncryptionSet: {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}"
            },
            managedDisk: {
              id:
                "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/myManagedDisk"
            },
            osState: "Generalized",
            osType: "Linux"
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      imageName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVirtualMachineImageFromASnapshotWithDiskEncryptionSetResource().catch(
  console.error
);
/**
 * This sample demonstrates how to Create or update an image.
 *
 * @summary Create or update an image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/imageExamples/Image_CreateFromASnapshot.json
 */
async function createAVirtualMachineImageFromASnapshot() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const imageName = "myImage";
  const options: ImagesCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        storageProfile: {
          osDisk: {
            osState: "Generalized",
            osType: "Linux",
            snapshot: {
              id:
                "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot"
            }
          },
          zoneResilient: false
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      imageName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVirtualMachineImageFromASnapshot().catch(console.error);
/**
 * This sample demonstrates how to Create or update an image.
 *
 * @summary Create or update an image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/imageExamples/Image_CreateFromAVM.json
 */
async function createAVirtualMachineImageFromAnExistingVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const imageName = "myImage";
  const options: ImagesCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        sourceVirtualMachine: {
          id:
            "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM"
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      imageName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVirtualMachineImageFromAnExistingVirtualMachine().catch(console.error);
/**
 * This sample demonstrates how to Create or update an image.
 *
 * @summary Create or update an image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/imageExamples/Image_Create_DataDiskFromABlobIncluded.json
 */
async function createAVirtualMachineImageThatIncludesADataDiskFromABlob() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const imageName = "myImage";
  const options: ImagesCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        storageProfile: {
          dataDisks: [
            {
              blobUri:
                "https://mystorageaccount.blob.core.windows.net/dataimages/dataimage.vhd",
              lun: 1
            }
          ],
          osDisk: {
            blobUri:
              "https://mystorageaccount.blob.core.windows.net/osimages/osimage.vhd",
            osState: "Generalized",
            osType: "Linux"
          },
          zoneResilient: false
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      imageName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVirtualMachineImageThatIncludesADataDiskFromABlob().catch(console.error);
/**
 * This sample demonstrates how to Create or update an image.
 *
 * @summary Create or update an image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/imageExamples/Image_Create_DataDiskFromAManagedDiskIncluded.json
 */
async function createAVirtualMachineImageThatIncludesADataDiskFromAManagedDisk() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const imageName = "myImage";
  const options: ImagesCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        storageProfile: {
          dataDisks: [
            {
              lun: 1,
              managedDisk: {
                id:
                  "subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/myManagedDisk2"
              }
            }
          ],
          osDisk: {
            managedDisk: {
              id:
                "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/myManagedDisk"
            },
            osState: "Generalized",
            osType: "Linux"
          },
          zoneResilient: false
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      imageName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVirtualMachineImageThatIncludesADataDiskFromAManagedDisk().catch(
  console.error
);
/**
 * This sample demonstrates how to Create or update an image.
 *
 * @summary Create or update an image.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/imageExamples/Image_Create_DataDiskFromASnapshotIncluded.json
 */
async function createAVirtualMachineImageThatIncludesADataDiskFromASnapshot() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const imageName = "myImage";
  const options: ImagesCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        storageProfile: {
          dataDisks: [
            {
              lun: 1,
              snapshot: {
                id:
                  "subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot2"
              }
            }
          ],
          osDisk: {
            osState: "Generalized",
            osType: "Linux",
            snapshot: {
              id:
                "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot"
            }
          },
          zoneResilient: true
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      imageName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVirtualMachineImageThatIncludesADataDiskFromASnapshot().catch(
  console.error
);
