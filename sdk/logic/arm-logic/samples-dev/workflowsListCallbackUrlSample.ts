// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the workflow callback Url.
 *
 * @summary Get the workflow callback Url.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/Workflows_ListCallbackUrl.json
 */

import type { GetCallbackUrlParameters } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCallbackUrl(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const workflowName = "testWorkflow";
  const listCallbackUrl: GetCallbackUrlParameters = {
    keyType: "Primary",
    notAfter: new Date("2018-04-19T16:00:00Z"),
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.workflows.listCallbackUrl(
    resourceGroupName,
    workflowName,
    listCallbackUrl,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCallbackUrl();
}

main().catch(console.error);
