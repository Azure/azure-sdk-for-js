// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates whether a given VM can be protected or not in which case returns list of errors.
 *
 * @summary validates whether a given VM can be protected or not in which case returns list of errors.
 * x-ms-original-file: 2025-08-01/ReplicationEligibilityResults_Get.json
 */
async function getsTheValidationErrorsInCaseTheVMIsUnsuitableForProtection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d90d145a-4cdd-45a3-b2c4-971d69775278";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationEligibilityResults.get("testRg1", "testVm1");
  console.log(result);
}

async function main() {
  await getsTheValidationErrorsInCaseTheVMIsUnsuitableForProtection();
}

main().catch(console.error);
