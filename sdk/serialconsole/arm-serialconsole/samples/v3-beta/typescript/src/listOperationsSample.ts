// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSerialConsoleClient } from "@azure/arm-serialconsole";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of Serial Console API operations.
 *
 * @summary gets a list of Serial Console API operations.
 * x-ms-original-file: 2024-07-01/GetOperationsExample.json
 */
async function listAllSerialConsoleManagementOperationsSupportedBySerialConsoleRP(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSerialConsoleClient(credential);
  const result = await client.listOperations();
  console.log(result);
}

async function main(): Promise<void> {
  await listAllSerialConsoleManagementOperationsSupportedBySerialConsoleRP();
}

main().catch(console.error);
