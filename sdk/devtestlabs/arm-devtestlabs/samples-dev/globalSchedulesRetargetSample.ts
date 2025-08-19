// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a schedule's target resource Id. This operation can take a while to complete.
 *
 * @summary Updates a schedule's target resource Id. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/GlobalSchedules_Retarget.json
 */

import type { RetargetScheduleProperties } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function globalSchedulesRetarget(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const name = "{scheduleName}";
  const retargetScheduleProperties: RetargetScheduleProperties = {
    currentResourceId:
      "/subscriptions/{subscriptionId}/resourcegroups/resourceGroupName/providers/microsoft.devtestlab/labs/{targetLab}",
    targetResourceId:
      "/subscriptions/{subscriptionId}/resourcegroups/resourceGroupName/providers/microsoft.devtestlab/labs/{currentLab}",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.globalSchedules.beginRetargetAndWait(
    resourceGroupName,
    name,
    retargetScheduleProperties,
  );
  console.log(result);
}

globalSchedulesRetarget().catch(console.error);
