// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the integration runtime monitoring data, which includes the monitor data for all the nodes under this integration runtime.
 *
 * @summary get the integration runtime monitoring data, which includes the monitor data for all the nodes under this integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_GetMonitoringData.json
 */
async function integrationRuntimesGetMonitoringData(): Promise<void> {
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

async function main(): Promise<void> {
  await integrationRuntimesGetMonitoringData();
}

main().catch(console.error);
