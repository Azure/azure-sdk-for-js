// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the schemas associated with a specific connection in the Pipeline. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource.
 *
 * @summary lists the schemas associated with a specific connection in the Pipeline. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource.
 * x-ms-original-file: 2026-02-06-preview/listSchemas.json
 */
async function listsSchemasForAPipeline(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.pipelines.listSchemasList("testRG", "testPipeline", {
    name: "test.xsd",
    id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.AzureDataTransfer/connections/testConnection",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await listsSchemasForAPipeline();
}

main().catch(console.error);
