// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available Azure attestation operations.
 *
 * @summary Lists all of the available Azure attestation operations.
 * x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Operations_List.json
 */

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

async function operationsList(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.operations.list();
  console.log(result);
}

operationsList().catch(console.error);
