// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerate a shared access key for a namespace.
 *
 * @summary Regenerate a shared access key for a namespace.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/Namespaces_RegenerateKey.json
 */

import {
  NamespaceRegenerateKeyRequest,
  EventGridManagementClient,
} from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function namespacesRegenerateKey(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const namespaceName = "exampleNamespaceName1";
  const regenerateKeyRequest: NamespaceRegenerateKeyRequest = {
    keyName: "key1",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaces.beginRegenerateKeyAndWait(
    resourceGroupName,
    namespaceName,
    regenerateKeyRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespacesRegenerateKey();
}

main().catch(console.error);
