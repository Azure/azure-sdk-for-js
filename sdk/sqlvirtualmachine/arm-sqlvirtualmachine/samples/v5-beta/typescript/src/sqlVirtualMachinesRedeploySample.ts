// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to uninstalls and reinstalls the SQL IaaS Extension.
 *
 * @summary uninstalls and reinstalls the SQL IaaS Extension.
 * x-ms-original-file: 2023-10-01/RedeploySqlVirtualMachine.json
 */
async function uninstallsAndReinstallsTheSQLIaaSExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  await client.sqlVirtualMachines.redeploy("testrg", "testvm");
}

async function main(): Promise<void> {
  await uninstallsAndReinstallsTheSQLIaaSExtension();
}

main().catch(console.error);
