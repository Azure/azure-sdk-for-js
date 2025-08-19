// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get all available application templates.
 *
 * @summary Get all available application templates.
 * x-ms-original-file: specification/iotcentral/resource-manager/Microsoft.IoTCentral/preview/2021-11-01-preview/examples/Apps_Templates.json
 */

import { IotCentralClient } from "@azure/arm-iotcentral";
import { DefaultAzureCredential } from "@azure/identity";

async function appsListTemplates(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new IotCentralClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apps.listTemplates()) {
    resArray.push(item);
  }
  console.log(resArray);
}

appsListTemplates().catch(console.error);
