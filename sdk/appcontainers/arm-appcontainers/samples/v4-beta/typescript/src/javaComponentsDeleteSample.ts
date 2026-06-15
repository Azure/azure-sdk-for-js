// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Java Component.
 *
 * @summary delete a Java Component.
 * x-ms-original-file: 2025-10-02-preview/JavaComponents_Delete.json
 */
async function deleteJavaComponent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.javaComponents.delete("examplerg", "myenvironment", "myjavacomponent");
}

async function main(): Promise<void> {
  await deleteJavaComponent();
}

main().catch(console.error);
