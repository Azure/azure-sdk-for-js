// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns a sandbox custom image
 *
 * @summary Returns a sandbox custom image
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoSandboxCustomImagesGet.json
 */
async function kustoSandboxCustomImagesGet(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const sandboxCustomImageName = "customImage8";
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.sandboxCustomImages.get(
    resourceGroupName,
    clusterName,
    sandboxCustomImageName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoSandboxCustomImagesGet();
}

main().catch(console.error);
