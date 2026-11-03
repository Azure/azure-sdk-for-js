// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2021-06-01/Operations_List.json
 */
async function operationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AttestationManagementClient(credential);
  const result = await client.operations.list();
  console.log(result);
}

async function main(): Promise<void> {
  await operationsList();
}

main().catch(console.error);
