// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSerialConsoleClient } from "@azure/arm-serialconsole";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Handles requests to list all SerialPort resources in a subscription.
 *
 * @summary Handles requests to list all SerialPort resources in a subscription.
 * x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/ListSerialPortSubscription.json
 */
async function listSerialPortsForSubscription(): Promise<void> {
  const subscriptionId = "00000000-00000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSerialConsoleClient(credential, subscriptionId);
  const result = await client.serialPorts.listBySubscriptions();
  console.log(result);
}

listSerialPortsForSubscription().catch(console.error);
