// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to rerun single trigger instance by runId.
 *
 * @summary rerun single trigger instance by runId.
 * x-ms-original-file: 2018-06-01/TriggerRuns_Rerun.json
 */
async function triggersRerun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.triggerRuns.rerun(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleTrigger",
    "2f7fdb90-5df1-4b8e-ac2f-064cfa58202b",
  );
}

async function main(): Promise<void> {
  await triggersRerun();
}

main().catch(console.error);
