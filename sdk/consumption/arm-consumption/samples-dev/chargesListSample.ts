// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesForBillingPeriodByDepartment.json
 */
async function changesForBillingPeriodByDepartmentLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/BillingAccounts/1234/departments/42425",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesForBillingPeriodByEnrollmentAccount.json
 */
async function changesForBillingPeriodByEnrollmentAccountLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/BillingAccounts/1234/enrollmentAccounts/42425",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesListByModernBillingAccount.json
 */
async function chargesListByBillingAccountModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/billingAccounts/1234:56789",
    { startDate: "2019-09-01", endDate: "2019-10-31" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesListByModernBillingAccountGroupByBillingProfileId.json
 */
async function chargesListByBillingAccountGroupByBillingProfileIdModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/billingAccounts/1234:56789",
    {
      startDate: "2019-09-01",
      endDate: "2019-09-30",
      apply: "groupby((properties/billingProfileId))",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesListByModernBillingAccountGroupByCustomerId.json
 */
async function chargesListByBillingAccountGroupByCustomerIdModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/billingAccounts/1234:56789",
    { startDate: "2019-09-01", endDate: "2019-09-30", apply: "groupby((properties/customerId))" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesListByModernBillingAccountGroupByInvoiceSectionId.json
 */
async function chargesListByBillingAccountGroupByInvoiceSectionIdModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/billingAccounts/1234:56789/billingProfiles/42425",
    {
      startDate: "2019-09-01",
      endDate: "2019-09-30",
      apply: "groupby((properties/invoiceSectionId))",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesListByModernBillingProfile.json
 */
async function chargesListByBillingProfileModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/BillingAccounts/1234:56789/billingProfiles/2460",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesListByModernBillingProfileGroupByInvoiceSectionId.json
 */
async function chargesListByBillingProfileGroupByInvoiceSectionIdModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/billingAccounts/1234:56789/billingProfiles/42425",
    {
      startDate: "2019-09-01",
      endDate: "2019-09-30",
      apply: "groupby((properties/invoiceSectionId))",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesListByModernBillingProfileInvoiceSection.json
 */
async function chargesListByBillingProfileInvoiceSectionModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/billingAccounts/1234:56789/billingProfiles/42425/invoiceSections/67890",
    { startDate: "2019-09-01", endDate: "2019-10-31" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesListByModernCustomer.json
 */
async function chargesListByCustomerModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/BillingAccounts/1234:56789/customers/67890",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesListByModernInvoiceSectionId.json
 */
async function chargesListByInvoiceSectionIdModern(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/BillingAccounts/1234:56789/invoiceSections/97531",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesListForDepartmentFilterByStartEndDate.json
 */
async function chargesListByDepartmentLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/BillingAccounts/1234/departments/42425",
    { filter: "usageStart eq '2018-04-01' AND usageEnd eq '2018-05-30'" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to lists the charges based for the defined scope.
 *
 * @summary lists the charges based for the defined scope.
 * x-ms-original-file: 2024-08-01/ChargesListForEnrollmentAccountFilterByStartEndDate.json
 */
async function chargesListForEnrollmentAccountLegacy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.charges.list(
    "providers/Microsoft.Billing/BillingAccounts/1234/enrollmentAccounts/42425",
  );
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
  await chargesListByInvoiceSectionIdModern();
  await chargesListByDepartmentLegacy();
  await chargesListForEnrollmentAccountLegacy();
}

main().catch(console.error);
