// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check if an IoT Central application name is available.
 *
 * @summary Check if an IoT Central application name is available.
 * x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Apps_CheckNameAvailability.json
 */

import type { OperationInputs } from "@azure/arm-iotcentral";
import { IotCentralClient } from "@azure/arm-iotcentral";
import { DefaultAzureCredential } from "@azure/identity";

async function appsCheckNameAvailability(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const operationInputs: OperationInputs = {
    name: "myiotcentralapp",
    type: "IoTApps",
  };
  const credential = new DefaultAzureCredential();
  const client = new IotCentralClient(credential, subscriptionId);
  const result = await client.apps.checkNameAvailability(operationInputs);
  console.log(result);
}

appsCheckNameAvailability().catch(console.error);
