// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a sandbox custom image.
 *
 * @summary Creates or updates a sandbox custom image.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoSandboxCustomImagesCreateOrUpdate.json
 */

import type { SandboxCustomImage } from "@azure/arm-kusto";
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoSandboxCustomImagesCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const sandboxCustomImageName = "customImage8";
  const parameters: SandboxCustomImage = {
    languageVersion: "3.10.8",
    requirementsFileContent: "Requests",
    language: "Python",
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.sandboxCustomImages.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterName,
    sandboxCustomImageName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a sandbox custom image.
 *
 * @summary Creates or updates a sandbox custom image.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoSandboxCustomImagesCreateOrUpdateWithCustomBaseImage.json
 */
async function kustoSandboxCustomImagesCreateOrUpdateWithCustomBaseImage(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const sandboxCustomImageName = "customImage2";
  const parameters: SandboxCustomImage = {
    baseImageName: "customImage1",
    requirementsFileContent: "Requests",
    language: "Python",
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.sandboxCustomImages.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterName,
    sandboxCustomImageName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a sandbox custom image.
 *
 * @summary Creates or updates a sandbox custom image.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoSandboxCustomImagesCreateOrUpdateWithManagedBaseImage.json
 */
async function kustoSandboxCustomImagesCreateOrUpdateWithManagedBaseImage(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const sandboxCustomImageName = "customImage2";
  const parameters: SandboxCustomImage = {
    baseImageName: "Python3_10_8",
    requirementsFileContent: "Requests",
    language: "Python",
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.sandboxCustomImages.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterName,
    sandboxCustomImageName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoSandboxCustomImagesCreateOrUpdate();
  await kustoSandboxCustomImagesCreateOrUpdateWithCustomBaseImage();
  await kustoSandboxCustomImagesCreateOrUpdateWithManagedBaseImage();
}

main().catch(console.error);
