// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets whether or not Serial Console is disabled for a given subscription
 *
 * @summary Gets whether or not Serial Console is disabled for a given subscription
 * x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/SerialConsoleStatus.json
 */

import { MicrosoftSerialConsoleClient } from "@azure/arm-serialconsole";
import { DefaultAzureCredential } from "@azure/identity";

async function getTheSerialConsoleDisabledStatusForASubscription(): Promise<void> {
  const subscriptionId = "00000000-00000-0000-0000-000000000000";
  const defaultParam = "default";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSerialConsoleClient(credential, subscriptionId);
  const result = await client.getConsoleStatus(defaultParam);
  console.log(result);
}

getTheSerialConsoleDisabledStatusForASubscription().catch(console.error);
