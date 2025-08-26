// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get workflow information by its ID for web site, or a deployment slot.
 *
 * @summary Get workflow information by its ID for web site, or a deployment slot.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/GetWorkflow.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAWorkflow(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "testsite2";
  const workflowName = "stateful1";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getWorkflow(
    resourceGroupName,
    name,
    workflowName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkflow();
}

main().catch(console.error);
