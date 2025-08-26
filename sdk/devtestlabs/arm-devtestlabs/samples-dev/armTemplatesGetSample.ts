// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get azure resource manager template.
 *
 * @summary Get azure resource manager template.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/ArmTemplates_Get.json
 */

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function armTemplatesGet(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const artifactSourceName = "{artifactSourceName}";
  const name = "{armTemplateName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.armTemplates.get(
    resourceGroupName,
    labName,
    artifactSourceName,
    name,
  );
  console.log(result);
}

armTemplatesGet().catch(console.error);
