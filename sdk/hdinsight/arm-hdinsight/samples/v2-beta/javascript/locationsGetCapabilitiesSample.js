// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the capabilities for the specified location.
 *
 * @summary gets the capabilities for the specified location.
 * x-ms-original-file: 2025-01-15-preview/GetHDInsightCapabilities.json
 */
async function getTheSubscriptionCapabilitiesForSpecificLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.locations.getCapabilities("West US");
  console.log(result);
}

async function main() {
  await getTheSubscriptionCapabilitiesForSpecificLocation();
}

main().catch(console.error);
