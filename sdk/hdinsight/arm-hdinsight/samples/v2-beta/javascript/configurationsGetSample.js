// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the configuration object for the specified cluster. This API is not recommended and might be removed in the future. Please consider using List configurations API instead.
 *
 * @summary the configuration object for the specified cluster. This API is not recommended and might be removed in the future. Please consider using List configurations API instead.
 * x-ms-original-file: 2025-01-15-preview/HDI_Configurations_Get.json
 */
async function getCoreSiteSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.configurations.get("rg1", "cluster1", "core-site");
  console.log(result);
}

async function main() {
  await getCoreSiteSettings();
}

main().catch(console.error);
