// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the definition for a role on an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary gets the definition for a role on an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/billingRoleDefinitionGetByInvoiceSection.json
 */
async function billingRoleDefinitionGetByInvoiceSection() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRoleDefinition.getByInvoiceSection(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "yyyy-yyyy-yyy-yyy",
    "30000000-aaaa-bbbb-cccc-100000000000",
  );
  console.log(result);
}

async function main() {
  await billingRoleDefinitionGetByInvoiceSection();
}

main().catch(console.error);
