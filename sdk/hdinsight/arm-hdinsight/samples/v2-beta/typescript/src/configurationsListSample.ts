// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all configuration information for an HDI cluster.
 *
 * @summary gets all configuration information for an HDI cluster.
 * x-ms-original-file: 2025-01-15-preview/HDI_Configurations_List.json
 */
async function getAllConfigurationInformation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.configurations.list("rg1", "cluster1");
  console.log(result);
}

async function main(): Promise<void> {
  await getAllConfigurationInformation();
}

main().catch(console.error);
