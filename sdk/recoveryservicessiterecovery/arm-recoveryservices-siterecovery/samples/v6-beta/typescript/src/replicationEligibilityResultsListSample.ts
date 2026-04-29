// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates whether a given VM can be protected or not in which case returns list of errors.
 *
 * @summary validates whether a given VM can be protected or not in which case returns list of errors.
 * x-ms-original-file: 2025-08-01/ReplicationEligibilityResults_List.json
 */
async function getsTheValidationErrorsInCaseTheVMIsUnsuitableForProtection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d90d145a-4cdd-45a3-b2c4-971d69775278";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationEligibilityResults.list("testRg1", "testVm2");
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheValidationErrorsInCaseTheVMIsUnsuitableForProtection();
}

main().catch(console.error);
