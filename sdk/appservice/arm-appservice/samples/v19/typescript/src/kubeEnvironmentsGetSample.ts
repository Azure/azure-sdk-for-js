// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get the properties of a Kubernetes Environment.
 *
 * @summary description for Get the properties of a Kubernetes Environment.
 * x-ms-original-file: 2025-05-01/KubeEnvironments_Get.json
 */
async function getKubeEnvironmentsByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.kubeEnvironments.get("examplerg", "jlaw-demo1");
  console.log(result);
}

async function main(): Promise<void> {
  await getKubeEnvironmentsByName();
}

main().catch(console.error);
