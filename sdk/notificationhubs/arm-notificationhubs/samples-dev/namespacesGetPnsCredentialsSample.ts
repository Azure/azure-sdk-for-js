// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the PNS credentials associated with a namespace.
 *
 * @summary lists the PNS credentials associated with a namespace.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/PnsCredentialsGet.json
 */
async function namespacesGetPnsCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.namespaces.getPnsCredentials("5ktrial", "nh-sdk-ns");
  console.log(result);
}

async function main(): Promise<void> {
  await namespacesGetPnsCredentials();
}

main().catch(console.error);
