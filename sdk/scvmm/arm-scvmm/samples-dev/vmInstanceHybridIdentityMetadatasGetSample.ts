// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Implements HybridIdentityMetadata GET method.
 *
 * @summary Implements HybridIdentityMetadata GET method.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VmInstanceHybridIdentityMetadatas_Get_MaximumSet_Gen.json
 */

import { ScVmm } from "@azure/arm-scvmm";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function vmInstanceHybridIdentityMetadatasGetMaximumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.vmInstanceHybridIdentityMetadatas.get(resourceUri);
  console.log(result);
}

/**
 * This sample demonstrates how to Implements HybridIdentityMetadata GET method.
 *
 * @summary Implements HybridIdentityMetadata GET method.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VmInstanceHybridIdentityMetadatas_Get_MinimumSet_Gen.json
 */
async function vmInstanceHybridIdentityMetadatasGetMinimumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.vmInstanceHybridIdentityMetadatas.get(resourceUri);
  console.log(result);
}

async function main(): Promise<void> {
  await vmInstanceHybridIdentityMetadatasGetMaximumSet();
  await vmInstanceHybridIdentityMetadatasGetMinimumSet();
}

main().catch(console.error);
