// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesForBillingPeriodByDepartment.json
 */

import type { ChargesListOptionalParams } from "@azure/arm-consumption";
import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function changesForBillingPeriodByDepartmentLegacy(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/BillingAccounts/1234/departments/42425";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesForBillingPeriodByEnrollmentAccount.json
 */
async function changesForBillingPeriodByEnrollmentAccountLegacy(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/BillingAccounts/1234/enrollmentAccounts/42425";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesListByModernBillingAccount.json
 */
async function chargesListByBillingAccountModern(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/billingAccounts/1234:56789";
  const startDate = "2019-09-01";
  const endDate = "2019-10-31";
  const options: ChargesListOptionalParams = { startDate, endDate };
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesListByModernBillingAccountGroupByBillingProfileId.json
 */
async function chargesListByBillingAccountGroupByBillingProfileIdModern(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/billingAccounts/1234:56789";
  const startDate = "2019-09-01";
  const endDate = "2019-09-30";
  const apply = "groupby((properties/billingProfileId))";
  const options: ChargesListOptionalParams = { startDate, endDate, apply };
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesListByModernBillingAccountGroupByCustomerId.json
 */
async function chargesListByBillingAccountGroupByCustomerIdModern(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/billingAccounts/1234:56789";
  const startDate = "2019-09-01";
  const endDate = "2019-09-30";
  const apply = "groupby((properties/customerId))";
  const options: ChargesListOptionalParams = { startDate, endDate, apply };
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesListByModernBillingAccountGroupByInvoiceSectionId.json
 */
async function chargesListByBillingAccountGroupByInvoiceSectionIdModern(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/billingAccounts/1234:56789/billingProfiles/42425";
  const startDate = "2019-09-01";
  const endDate = "2019-09-30";
  const apply = "groupby((properties/invoiceSectionId))";
  const options: ChargesListOptionalParams = { startDate, endDate, apply };
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesListByModernBillingProfile.json
 */
async function chargesListByBillingProfileModern(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/BillingAccounts/1234:56789/billingProfiles/2460";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesListByModernBillingProfileGroupByInvoiceSectionId.json
 */
async function chargesListByBillingProfileGroupByInvoiceSectionIdModern(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/billingAccounts/1234:56789/billingProfiles/42425";
  const startDate = "2019-09-01";
  const endDate = "2019-09-30";
  const apply = "groupby((properties/invoiceSectionId))";
  const options: ChargesListOptionalParams = { startDate, endDate, apply };
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesListByModernBillingProfileInvoiceSection.json
 */
async function chargesListByBillingProfileInvoiceSectionModern(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope =
    "providers/Microsoft.Billing/billingAccounts/1234:56789/billingProfiles/42425/invoiceSections/67890";
  const startDate = "2019-09-01";
  const endDate = "2019-10-31";
  const options: ChargesListOptionalParams = { startDate, endDate };
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesListByModernCustomer.json
 */
async function chargesListByCustomerModern(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/BillingAccounts/1234:56789/customers/67890";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesListForDepartmentFilterByStartEndDate.json
 */
async function chargesListByDepartmentLegacy(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/BillingAccounts/1234/departments/42425";
  const filter = "usageStart eq '2018-04-01' AND usageEnd eq '2018-05-30'";
  const options: ChargesListOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesListByModernInvoiceSectionId.json
 */
async function chargesListByInvoiceSectionIdModern(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/BillingAccounts/1234:56789/invoiceSections/97531";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope);
  console.log(result);
}

/**
 * This sample demonstrates how to Lists the charges based for the defined scope.
 *
 * @summary Lists the charges based for the defined scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/ChargesListForEnrollmentAccountFilterByStartEndDate.json
 */
async function chargesListForEnrollmentAccountLegacy(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "providers/Microsoft.Billing/BillingAccounts/1234/enrollmentAccounts/42425";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.charges.list(scope);
  console.log(result);
}

async function main(): Promise<void> {
  await changesForBillingPeriodByDepartmentLegacy();
  await changesForBillingPeriodByEnrollmentAccountLegacy();
  await chargesListByBillingAccountModern();
  await chargesListByBillingAccountGroupByBillingProfileIdModern();
  await chargesListByBillingAccountGroupByCustomerIdModern();
  await chargesListByBillingAccountGroupByInvoiceSectionIdModern();
  await chargesListByBillingProfileModern();
  await chargesListByBillingProfileGroupByInvoiceSectionIdModern();
  await chargesListByBillingProfileInvoiceSectionModern();
  await chargesListByCustomerModern();
  await chargesListByDepartmentLegacy();
  await chargesListByInvoiceSectionIdModern();
  await chargesListForEnrollmentAccountLegacy();
}

main().catch(console.error);
