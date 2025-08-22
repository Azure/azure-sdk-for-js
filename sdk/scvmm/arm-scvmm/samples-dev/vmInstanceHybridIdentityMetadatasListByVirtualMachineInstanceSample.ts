// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the list of HybridIdentityMetadata of the given VM.
 *
 * @summary Returns the list of HybridIdentityMetadata of the given VM.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VmInstanceHybridIdentityMetadatas_ListByVirtualMachineInstance_MaximumSet_Gen.json
 */

import { ScVmm } from "@azure/arm-scvmm";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function vmInstanceHybridIdentityMetadatasListByVirtualMachineInstanceMaximumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const resArray = new Array();
  for await (const item of client.vmInstanceHybridIdentityMetadatas.listByVirtualMachineInstance(
    resourceUri,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Returns the list of HybridIdentityMetadata of the given VM.
 *
 * @summary Returns the list of HybridIdentityMetadata of the given VM.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VmInstanceHybridIdentityMetadatas_ListByVirtualMachineInstance_MinimumSet_Gen.json
 */
async function vmInstanceHybridIdentityMetadatasListByVirtualMachineInstanceMinimumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const resArray = new Array();
  for await (const item of client.vmInstanceHybridIdentityMetadatas.listByVirtualMachineInstance(
    resourceUri,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await vmInstanceHybridIdentityMetadatasListByVirtualMachineInstanceMaximumSet();
  await vmInstanceHybridIdentityMetadatasListByVirtualMachineInstanceMinimumSet();
}

main().catch(console.error);
