// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSerialConsoleClient } = require("@azure/arm-serialconsole");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of Serial Console API operations.
 *
 * @summary gets a list of Serial Console API operations.
 * x-ms-original-file: 2024-07-01/GetOperationsExample.json
 */
async function listAllSerialConsoleManagementOperationsSupportedBySerialConsoleRP() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSerialConsoleClient(credential);
  const result = await client.listOperations();
  console.log(result);
}

async function main() {
  await listAllSerialConsoleManagementOperationsSupportedBySerialConsoleRP();
}

main().catch(console.error);
