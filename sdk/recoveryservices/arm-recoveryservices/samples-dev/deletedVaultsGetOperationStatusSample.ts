// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesClient } from "@azure/arm-recoveryservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the operation status of a deleted vault.
 *
 * @summary get the operation status of a deleted vault.
 * x-ms-original-file: 2025-08-01/DeletedVaults_GetOperationStatus.json
 */
async function getsOperationStatusOnDeletedVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.deletedVaults.getOperationStatus(
    "westus",
    "swaggerExample",
    "YWUzNDFkMzQtZmM5OS00MmUyLWEzNDMtZGJkMDIxZjlmZjgzOzdmYzBiMzhmLTc2NmItNDM5NS05OWQ1LTVmOGEzNzg4MWQzNA==",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsOperationStatusOnDeletedVault();
}

main().catch(console.error);
