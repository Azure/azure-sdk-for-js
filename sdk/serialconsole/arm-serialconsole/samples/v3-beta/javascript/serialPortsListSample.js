// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSerialConsoleClient } = require("@azure/arm-serialconsole");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the configured serial ports for a parent resource
 *
 * @summary lists all of the configured serial ports for a parent resource
 * x-ms-original-file: 2024-07-01/ListSerialPort.json
 */
async function listSerialPortsForParentResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftSerialConsoleClient(credential, subscriptionId);
  const result = await client.serialPorts.list(
    "myResourceGroup",
    "Microsoft.Compute",
    "virtualMachines",
    "myVM",
  );
  console.log(result);
}

async function main() {
  await listSerialPortsForParentResources();
}

main().catch(console.error);
