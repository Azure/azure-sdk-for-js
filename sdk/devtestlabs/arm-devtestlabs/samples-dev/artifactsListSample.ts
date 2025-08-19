// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to List artifacts in a given artifact source.
 *
 * @summary List artifacts in a given artifact source.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Artifacts_List.json
 */
async function artifactsList(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const artifactSourceName = "{artifactSourceName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.artifacts.list(resourceGroupName, labName, artifactSourceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

artifactsList().catch(console.error);
