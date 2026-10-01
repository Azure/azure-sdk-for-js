// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSerialConsoleClient } from "@azure/arm-serialconsole";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to handles requests to list all SerialPort resources in a subscription.
 *
 * @summary handles requests to list all SerialPort resources in a subscription.
 * x-ms-original-file: 2024-07-01/ListSerialPortSubscription.json
 */
async function listSerialPortsForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftSerialConsoleClient(credential, subscriptionId);
  const result = await client.serialPorts.listBySubscriptions();
  console.log(result);
}

async function main(): Promise<void> {
  await listSerialPortsForSubscription();
}

main().catch(console.error);
