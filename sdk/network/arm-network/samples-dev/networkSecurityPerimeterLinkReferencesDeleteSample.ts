// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes an NSP LinkReference resource.
 *
 * @summary Deletes an NSP LinkReference resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspLinkReferenceDelete.json
 */
async function nspLinkReferenceDelete(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp2";
  const linkReferenceName = "link1-guid";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.networkSecurityPerimeterLinkReferences.beginDeleteAndWait(
      resourceGroupName,
      networkSecurityPerimeterName,
      linkReferenceName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await nspLinkReferenceDelete();
}

main().catch(console.error);
