// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a sandbox custom image.
 *
 * @summary creates or updates a sandbox custom image.
 * x-ms-original-file: 2025-02-14/KustoSandboxCustomImagesCreateOrUpdate.json
 */
async function kustoSandboxCustomImagesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.sandboxCustomImages.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "customImage8",
    { languageVersion: "3.10.8", requirementsFileContent: "Requests", language: "Python" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a sandbox custom image.
 *
 * @summary creates or updates a sandbox custom image.
 * x-ms-original-file: 2025-02-14/KustoSandboxCustomImagesCreateOrUpdateWithCustomBaseImage.json
 */
async function kustoSandboxCustomImagesCreateOrUpdateWithCustomBaseImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.sandboxCustomImages.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "customImage2",
    { baseImageName: "customImage1", requirementsFileContent: "Requests", language: "Python" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a sandbox custom image.
 *
 * @summary creates or updates a sandbox custom image.
 * x-ms-original-file: 2025-02-14/KustoSandboxCustomImagesCreateOrUpdateWithManagedBaseImage.json
 */
async function kustoSandboxCustomImagesCreateOrUpdateWithManagedBaseImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.sandboxCustomImages.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "customImage2",
    { baseImageName: "Python3_10_8", requirementsFileContent: "Requests", language: "Python" },
  );
  console.log(result);
}

async function main() {
  await kustoSandboxCustomImagesCreateOrUpdate();
  await kustoSandboxCustomImagesCreateOrUpdateWithCustomBaseImage();
  await kustoSandboxCustomImagesCreateOrUpdateWithManagedBaseImage();
}

main().catch(console.error);
