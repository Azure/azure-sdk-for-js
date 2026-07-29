// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSerialConsoleClient } = require("@azure/arm-serialconsole");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a serial port
 *
 * @summary creates or updates a serial port
 * x-ms-original-file: 2024-07-01/CreateSerialPort.json
 */
async function createANewSerialPortResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftSerialConsoleClient(credential, subscriptionId);
  const result = await client.serialPorts.create(
    "myResourceGroup",
    "Microsoft.Compute",
    "virtualMachines",
    "myVM",
    "0",
    { state: "enabled" },
  );
  console.log(result);
}

async function main() {
  await createANewSerialPortResource();
}

main().catch(console.error);
