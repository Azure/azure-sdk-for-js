// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the integration runtime monitoring data, which includes the monitor data for all the nodes under this integration runtime.
 *
 * @summary get the integration runtime monitoring data, which includes the monitor data for all the nodes under this integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_GetMonitoringData.json
 */
async function integrationRuntimesGetMonitoringData() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.getMonitoringData(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
  );
  console.log(result);
}

async function main() {
  await integrationRuntimesGetMonitoringData();
}

main().catch(console.error);
