// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridRunbookWorkerGroupCreateOrUpdateParameters } from "@azure/arm-automation";
import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a hybrid runbook worker group.
 *
 * @summary Create a hybrid runbook worker group.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/stable/2022-02-22/examples/putHybridRunbookWorkerGroup.json
 */
async function createAHybridWorkerGroup(): Promise<void> {
  const subscriptionId = process.env["AUTOMATION_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "rg";
  const automationAccountName = "testaccount";
  const hybridRunbookWorkerGroupName = "TestHybridGroup";
  const hybridRunbookWorkerGroupCreationParameters: HybridRunbookWorkerGroupCreateOrUpdateParameters =
    {
      credential: { name: "myRunAsCredentialName" },
    };
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.hybridRunbookWorkerGroupOperations.create(
    resourceGroupName,
    automationAccountName,
    hybridRunbookWorkerGroupName,
    hybridRunbookWorkerGroupCreationParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAHybridWorkerGroup();
}

main().catch(console.error);
