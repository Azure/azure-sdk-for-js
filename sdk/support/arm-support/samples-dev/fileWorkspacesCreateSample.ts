// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new file workspace for the specified subscription.
 *
 * @summary Creates a new file workspace for the specified subscription.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateFileWorkspaceForSubscription.json
 */

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createAFileWorkspaceForASubscription(): Promise<void> {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] || "132d901f-189d-4381-9214-fe68e27e05a1";
  const fileWorkspaceName = "testworkspace";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.fileWorkspaces.create(fileWorkspaceName);
  console.log(result);
}

async function main(): Promise<void> {
  await createAFileWorkspaceForASubscription();
}

main().catch(console.error);
