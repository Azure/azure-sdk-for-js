// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get operation.
 *
 * @summary Get operation.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Operations_Get.json
 */

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function operationsGet(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const locationName = "{locationName}";
  const name = "{operationName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.operations.get(locationName, name);
  console.log(result);
}

operationsGet().catch(console.error);
