// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available IoT Central Resource Provider operations.
 *
 * @summary Lists all of the available IoT Central Resource Provider operations.
 * x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Operations_List.json
 */

import { IotCentralClient } from "@azure/arm-iotcentral";
import { DefaultAzureCredential } from "@azure/identity";

async function operationsList(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new IotCentralClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

operationsList().catch(console.error);
