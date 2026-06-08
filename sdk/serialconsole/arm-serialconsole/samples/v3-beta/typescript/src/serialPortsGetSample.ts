// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSerialConsoleClient } from "@azure/arm-serialconsole";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the configured settings for a serial port
 *
 * @summary gets the configured settings for a serial port
 * x-ms-original-file: 2024-07-01/GetSerialPort.json
 */
async function getTheSerialPortForAParentResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftSerialConsoleClient(credential, subscriptionId);
  const result = await client.serialPorts.get(
    "myResourceGroup",
    "Microsoft.Compute",
    "virtualMachines",
    "myVM",
    "0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheSerialPortForAParentResource();
}

main().catch(console.error);
