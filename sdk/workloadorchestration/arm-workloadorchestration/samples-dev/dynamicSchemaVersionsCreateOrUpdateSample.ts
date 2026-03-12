// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Dynamic Schema Version Resource
 *
 * @summary create or update a Dynamic Schema Version Resource
 * x-ms-original-file: 2025-06-01/DynamicSchemaVersions_CreateOrUpdate_MaximumSet_Gen.json
 */
async function dynamicSchemaVersionsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.dynamicSchemaVersions.createOrUpdate(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "1.0.0",
    { properties: { value: "uiaqdwsi" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dynamicSchemaVersionsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
