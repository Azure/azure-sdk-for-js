// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Schema Resource
 *
 * @summary get a Schema Resource
 * x-ms-original-file: 2025-06-01/Schemas_Get_MaximumSet_Gen.json
 */
async function schemasGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.schemas.get("rgconfigurationmanager", "testname");
  console.log(result);
}

async function main(): Promise<void> {
  await schemasGetMaximumSet();
}

main().catch(console.error);
