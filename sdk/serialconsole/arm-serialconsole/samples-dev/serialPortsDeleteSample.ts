// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a serial port
 *
 * @summary Deletes a serial port
 * x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/DeleteSerialPort.json
 */

import { MicrosoftSerialConsoleClient } from "@azure/arm-serialconsole";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteASerialPortResource(): Promise<void> {
  const subscriptionId = "00000000-00000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const resourceProviderNamespace = "Microsoft.Compute";
  const parentResourceType = "virtualMachines";
  const parentResource = "myVM";
  const serialPort = "0";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSerialConsoleClient(credential, subscriptionId);
  const result = await client.serialPorts.delete(
    resourceGroupName,
    resourceProviderNamespace,
    parentResourceType,
    parentResource,
    serialPort,
  );
  console.log(result);
}

deleteASerialPortResource().catch(console.error);
