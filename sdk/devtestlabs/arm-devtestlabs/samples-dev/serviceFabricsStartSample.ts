// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Start a service fabric. This operation can take a while to complete.
 *
 * @summary Start a service fabric. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/ServiceFabrics_Start.json
 */

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function serviceFabricsStart(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const userName = "{userName}";
  const name = "{serviceFabricName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.serviceFabrics.beginStartAndWait(
    resourceGroupName,
    labName,
    userName,
    name,
  );
  console.log(result);
}

serviceFabricsStart().catch(console.error);
