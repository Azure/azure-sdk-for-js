// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a workflow version.
 *
 * @summary gets a workflow version.
 * x-ms-original-file: 2025-05-01/WorkflowVersions_Get.json
 */
async function getAWorkflowVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.workflowVersions.get(
    "test-resource-group",
    "test-name",
    "test-workflow",
    "08586676824806722526",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkflowVersion();
}

main().catch(console.error);
