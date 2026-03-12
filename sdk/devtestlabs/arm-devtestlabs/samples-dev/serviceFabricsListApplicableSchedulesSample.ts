// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the applicable start/stop schedules, if any.
 *
 * @summary Lists the applicable start/stop schedules, if any.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/ServiceFabrics_ListApplicableSchedules.json
 */

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function serviceFabricsListApplicableSchedules(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const userName = "{userName}";
  const name = "{serviceFabricName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.serviceFabrics.listApplicableSchedules(
    resourceGroupName,
    labName,
    userName,
    name,
  );
  console.log(result);
}

serviceFabricsListApplicableSchedules().catch(console.error);
