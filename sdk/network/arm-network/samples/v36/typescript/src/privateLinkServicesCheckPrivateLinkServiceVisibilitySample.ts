// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CheckPrivateLinkServiceVisibilityRequest} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Checks whether the subscription is visible to private link service.
 *
 * @summary Checks whether the subscription is visible to private link service.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/CheckPrivateLinkServiceVisibility.json
 */
async function checkPrivateLinkServiceVisibility(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const location = "westus";
  const parameters: CheckPrivateLinkServiceVisibilityRequest = {
    privateLinkServiceAlias:
      "mypls.00000000-0000-0000-0000-000000000000.azure.privatelinkservice",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.privateLinkServices.beginCheckPrivateLinkServiceVisibilityAndWait(
      location,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await checkPrivateLinkServiceVisibility();
}

main().catch(console.error);
