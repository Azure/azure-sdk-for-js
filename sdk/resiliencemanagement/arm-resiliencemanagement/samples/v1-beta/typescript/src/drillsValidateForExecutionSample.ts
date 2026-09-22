// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this returns eligible resource to be faulted or failed over.
 *
 * @summary this returns eligible resource to be faulted or failed over.
 * x-ms-original-file: 2026-04-01-preview/Drills_ValidateForExecution_MaximumSet_Gen.json
 */
async function drillsValidateForExecutionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drills.validateForExecution("sampleServiceGroupName", "qmn", "drill1", {
    validateForExecutionProperties: { sourceLocations: ["eastus2-az1"] },
  });
}

async function main(): Promise<void> {
  await drillsValidateForExecutionMaximumSet();
}

main().catch(console.error);
