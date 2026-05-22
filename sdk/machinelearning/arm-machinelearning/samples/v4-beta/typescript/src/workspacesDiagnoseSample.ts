// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to diagnose workspace setup issue.
 *
 * @summary diagnose workspace setup issue.
 * x-ms-original-file: 2025-12-01/Workspace/diagnose.json
 */
async function diagnoseWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.diagnose("workspace-1234", "testworkspace", {
    body: {
      value: {
        applicationInsights: {},
        containerRegistry: {},
        dnsResolution: {},
        keyVault: {},
        nsg: {},
        others: {},
        resourceLock: {},
        storageAccount: {},
        udr: {},
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await diagnoseWorkspace();
}

main().catch(console.error);
