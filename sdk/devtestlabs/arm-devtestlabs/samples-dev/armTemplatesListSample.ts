// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to List azure resource manager templates in a given artifact source.
 *
 * @summary List azure resource manager templates in a given artifact source.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/ArmTemplates_List.json
 */
async function armTemplatesList(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const artifactSourceName = "{artifactSourceName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.armTemplates.list(
    resourceGroupName,
    labName,
    artifactSourceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

armTemplatesList().catch(console.error);
