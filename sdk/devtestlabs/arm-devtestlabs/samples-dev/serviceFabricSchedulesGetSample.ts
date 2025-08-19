// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get schedule.
 *
 * @summary Get schedule.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/ServiceFabricSchedules_Get.json
 */

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function serviceFabricSchedulesGet(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const userName = "@me";
  const serviceFabricName = "{serviceFrabicName}";
  const name = "{scheduleName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.serviceFabricSchedules.get(
    resourceGroupName,
    labName,
    userName,
    serviceFabricName,
    name,
  );
  console.log(result);
}

serviceFabricSchedulesGet().catch(console.error);
