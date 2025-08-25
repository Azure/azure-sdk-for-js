// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Asynchronously updates a namespace with the specified parameters.
 *
 * @summary Asynchronously updates a namespace with the specified parameters.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/Namespaces_Update.json
 */

import {
  NamespaceUpdateParameters,
  EventGridManagementClient,
} from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function namespacesUpdate(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const namespaceName = "exampleNamespaceName1";
  const namespaceUpdateParameters: NamespaceUpdateParameters = {
    tags: { tag1: "value1Updated" },
  };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaces.beginUpdateAndWait(
    resourceGroupName,
    namespaceName,
    namespaceUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespacesUpdate();
}

main().catch(console.error);
