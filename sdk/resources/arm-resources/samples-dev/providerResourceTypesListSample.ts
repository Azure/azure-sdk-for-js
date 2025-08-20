// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List the resource types for a specified resource provider.
 *
 * @summary List the resource types for a specified resource provider.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/GetProviderResourceTypes.json
 */

import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getProviderResourceTypes(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceProviderNamespace = "Microsoft.TestRP";
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.providerResourceTypes.list(
    resourceProviderNamespace,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getProviderResourceTypes();
}

main().catch(console.error);
