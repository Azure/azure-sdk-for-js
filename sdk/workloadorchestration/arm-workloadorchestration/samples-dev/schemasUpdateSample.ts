// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Schema Resource
 *
 * @summary update a Schema Resource
 * x-ms-original-file: 2025-06-01/Schemas_Update_MaximumSet_Gen.json
 */
async function schemasUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.schemas.update("rgconfigurationmanager", "testname", {
    properties: {},
    tags: { key6760: "lknwkzihsmzbzkezkartwgsv" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await schemasUpdateMaximumSet();
}

main().catch(console.error);
