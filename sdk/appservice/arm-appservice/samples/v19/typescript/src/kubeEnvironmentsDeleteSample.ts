// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Delete a Kubernetes Environment.
 *
 * @summary description for Delete a Kubernetes Environment.
 * x-ms-original-file: 2025-05-01/KubeEnvironments_Delete.json
 */
async function deleteKubeEnvironmentByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.kubeEnvironments.delete("examplerg", "examplekenv");
}

async function main(): Promise<void> {
  await deleteKubeEnvironmentByName();
}

main().catch(console.error);
