// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Creates or updates a Kubernetes Environment.
 *
 * @summary description for Creates or updates a Kubernetes Environment.
 * x-ms-original-file: 2025-05-01/KubeEnvironments_CreateOrUpdate.json
 */
async function createKubeEnvironments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.kubeEnvironments.createOrUpdate("examplerg", "testkubeenv", {
    location: "East US",
    staticIp: "1.2.3.4",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createKubeEnvironments();
}

main().catch(console.error);
