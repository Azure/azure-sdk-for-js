// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the additional details of the recovery points fetched by a prior getRPExtendedInfo operation. Returns
 * 202 Accepted while the operation is still running.
 *
 * @summary returns the additional details of the recovery points fetched by a prior getRPExtendedInfo operation. Returns
 * 202 Accepted while the operation is still running.
 * x-ms-original-file: 2026-10-01/AzureIaasVm/GetRPExtendedInfoOperationResult.json
 */
async function getRPExtendedInfoOperationResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.recoveryPoints.getRPExtendedInfoOperationResult(
    "testRG",
    "testVault",
    "Azure",
    "00000000-0000-0000-0000-000000000000",
  );
}

async function main(): Promise<void> {
  await getRPExtendedInfoOperationResult();
}

main().catch(console.error);
