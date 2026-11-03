// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the definition for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary list the definition for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleDefinitionListByEnrollmentAccount.json
 */
async function billingRoleDefinitionListByEnrollmentAccount() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.billingRoleDefinition.listByEnrollmentAccount(
    "123456",
    "4568789",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingRoleDefinitionListByEnrollmentAccount();
}

main().catch(console.error);
