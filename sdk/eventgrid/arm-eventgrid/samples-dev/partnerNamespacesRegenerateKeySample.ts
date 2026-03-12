// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerate a shared access key for a partner namespace.
 *
 * @summary Regenerate a shared access key for a partner namespace.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/PartnerNamespaces_RegenerateKey.json
 */

import {
  PartnerNamespaceRegenerateKeyRequest,
  EventGridManagementClient,
} from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function partnerNamespacesRegenerateKey(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const partnerNamespaceName = "examplePartnerNamespaceName1";
  const regenerateKeyRequest: PartnerNamespaceRegenerateKeyRequest = {
    keyName: "key1",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerNamespaces.regenerateKey(
    resourceGroupName,
    partnerNamespaceName,
    regenerateKeyRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await partnerNamespacesRegenerateKey();
}

main().catch(console.error);
