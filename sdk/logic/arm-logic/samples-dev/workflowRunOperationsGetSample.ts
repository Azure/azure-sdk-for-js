// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an operation for a run.
 *
 * @summary Gets an operation for a run.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/WorkflowRunOperations_Get.json
 */

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getARunOperation(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const workflowName = "testFlow";
  const runName = "08586774142730039209110422528";
  const operationId = "ebdcbbde-c4db-43ec-987c-fd0f7726f43b";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.workflowRunOperations.get(
    resourceGroupName,
    workflowName,
    runName,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getARunOperation();
}

main().catch(console.error);
