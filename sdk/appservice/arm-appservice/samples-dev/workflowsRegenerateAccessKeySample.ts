// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerates the callback URL access key for request triggers.
 *
 * @summary Regenerates the callback URL access key for request triggers.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/Workflows_RegenerateAccessKey.json
 */

import {
  RegenerateActionParameter,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function regenerateTheCallbackUrlAccessKeyForRequestTriggers(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testResourceGroup";
  const name = "test-name";
  const workflowName = "testWorkflowName";
  const keyType: RegenerateActionParameter = { keyType: "Primary" };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.workflows.regenerateAccessKey(
    resourceGroupName,
    name,
    workflowName,
    keyType,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await regenerateTheCallbackUrlAccessKeyForRequestTriggers();
}

main().catch(console.error);
