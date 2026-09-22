// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets properties of the specified application.
 *
 * @summary gets properties of the specified application.
 * x-ms-original-file: 2025-01-15-preview/GetApplicationCreated.json
 */
async function getApplicationOnHDInsightClusterSuccessfullyCreated(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.applications.get("rg1", "cluster1", "app");
  console.log(result);
}

/**
 * This sample demonstrates how to gets properties of the specified application.
 *
 * @summary gets properties of the specified application.
 * x-ms-original-file: 2025-01-15-preview/GetApplicationInProgress.json
 */
async function getApplicationOnHDInsightClusterCreationInProgress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.applications.get("rg1", "cluster1", "app");
  console.log(result);
}

async function main(): Promise<void> {
  await getApplicationOnHDInsightClusterSuccessfullyCreated();
  await getApplicationOnHDInsightClusterCreationInProgress();
}

main().catch(console.error);
