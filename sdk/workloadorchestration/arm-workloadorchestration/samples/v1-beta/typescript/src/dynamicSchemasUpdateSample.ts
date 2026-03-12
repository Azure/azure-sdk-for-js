// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a DynamicSchema Resource
 *
 * @summary update a DynamicSchema Resource
 * x-ms-original-file: 2025-06-01/DynamicSchemas_Update_MaximumSet_Gen.json
 */
async function dynamicSchemasUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.dynamicSchemas.update(
    "rgconfigurationmanager",
    "testname",
    "testname",
    {
      properties: {
        configurationType: "Shared",
        configurationModel: "Application",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dynamicSchemasUpdateMaximumSet();
}

main().catch(console.error);
