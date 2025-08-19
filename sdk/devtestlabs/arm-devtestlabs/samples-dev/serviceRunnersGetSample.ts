// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get service runner.
 *
 * @summary Get service runner.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/ServiceRunners_Get.json
 */

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function serviceRunnersGet(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{devtestlabName}";
  const name = "{servicerunnerName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.serviceRunners.get(resourceGroupName, labName, name);
  console.log(result);
}

serviceRunnersGet().catch(console.error);
