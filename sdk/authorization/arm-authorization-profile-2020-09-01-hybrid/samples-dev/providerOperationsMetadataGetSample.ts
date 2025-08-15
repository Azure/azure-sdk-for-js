// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets provider operations metadata for the specified resource provider.
 *
 * @summary Gets provider operations metadata for the specified resource provider.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetProviderOperationsRP.json
 */
async function getProviderOperationsMetadataForResourceProvider(): Promise<void> {
  const subscriptionId =
    process.env["AUTHORIZATION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceProviderNamespace = "resourceProviderNamespace";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const result = await client.providerOperationsMetadataOperations.get(resourceProviderNamespace);
  console.log(result);
}

async function main(): Promise<void> {
  await getProviderOperationsMetadataForResourceProvider();
}

main().catch(console.error);
