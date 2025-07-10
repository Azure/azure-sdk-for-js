// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlVirtualMachineClient } = require("@azure/arm-sqlvirtualmachine");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts SQL best practices Assessment on SQL virtual machine.
 *
 * @summary starts SQL best practices Assessment on SQL virtual machine.
 * x-ms-original-file: 2023-10-01/StartAssessmentOnSqlVirtualMachine.json
 */
async function startsSQLBestPracticesAssessmentOnSQLVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  await client.sqlVirtualMachines.startAssessment("testrg", "testvm");
}

async function main() {
  await startsSQLBestPracticesAssessmentOnSQLVirtualMachine();
}

main().catch(console.error);
