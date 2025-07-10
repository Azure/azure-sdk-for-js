// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts SQL best practices Assessment with Disk Config rules on SQL virtual machine
 *
 * @summary starts SQL best practices Assessment with Disk Config rules on SQL virtual machine
 * x-ms-original-file: 2023-10-01/StartDiskConfigAssessmentOnSqlVirtualMachine.json
 */
async function startsSQLBestPracticesAssessmentWithDiskConfigRulesOnSQLVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  await client.sqlVirtualMachines.fetchDCAssessment("testrg", "testvm", {
    runDiskConfigRules: false,
  });
}

async function main(): Promise<void> {
  await startsSQLBestPracticesAssessmentWithDiskConfigRulesOnSQLVirtualMachine();
}

main().catch(console.error);
