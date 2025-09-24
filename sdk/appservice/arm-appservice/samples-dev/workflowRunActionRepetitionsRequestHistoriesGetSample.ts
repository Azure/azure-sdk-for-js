// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a workflow run repetition request history.
 *
 * @summary Gets a workflow run repetition request history.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/WorkflowRunActionRepetitionsRequestHistories_Get.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getARepetitionRequestHistory(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "test-resource-group";
  const name = "test-name";
  const workflowName = "test-workflow";
  const runName = "08586776228332053161046300351";
  const actionName = "HTTP_Webhook";
  const repetitionName = "000001";
  const requestHistoryName = "08586611142732800686";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.workflowRunActionRepetitionsRequestHistories.get(
    resourceGroupName,
    name,
    workflowName,
    runName,
    actionName,
    repetitionName,
    requestHistoryName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getARepetitionRequestHistory();
}

main().catch(console.error);
