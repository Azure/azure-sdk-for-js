// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/BillingAccountDimensionsList.json
 */
async function billingAccountDimensionsListLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/100",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/BillingAccountDimensionsListExpandAndTop.json
 */
async function billingAccountDimensionsListExpandAndTopLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/100",
    { expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/BillingAccountDimensionsListWithFilter.json
 */
async function billingAccountDimensionsListWithFilterLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/100",
    { filter: "properties/category eq 'resourceId'", expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/DepartmentDimensionsList.json
 */
async function departmentDimensionsListLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/100/departments/123",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/DepartmentDimensionsListExpandAndTop.json
 */
async function departmentDimensionsListExpandAndTopLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/100/departments/123",
    { expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/DepartmentDimensionsListWithFilter.json
 */
async function departmentDimensionsListWithFilterLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/100/departments/123",
    { filter: "properties/category eq 'resourceId'", expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/EnrollmentAccountDimensionsList.json
 */
async function enrollmentAccountDimensionsListLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/EnrollmentAccountDimensionsListExpandAndTop.json
 */
async function enrollmentAccountDimensionsListExpandAndTopLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456",
    { expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/EnrollmentAccountDimensionsListWithFilter.json
 */
async function enrollmentAccountDimensionsListWithFilterLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/100/enrollmentAccounts/456",
    { filter: "properties/category eq 'resourceId'", expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/MCABillingAccountDimensionsList.json
 */
async function billingAccountDimensionsListMCA() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/MCABillingAccountDimensionsListExpandAndTop.json
 */
async function billingAccountDimensionsListExpandAndTopMCA() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789",
    { expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/MCABillingAccountDimensionsListWithFilter.json
 */
async function billingAccountDimensionsListWithFilterMCA() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789",
    { filter: "properties/category eq 'resourceId'", expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/MCABillingProfileDimensionsList.json
 */
async function billingProfileDimensionsListMCA() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/MCABillingProfileDimensionsListExpandAndTop.json
 */
async function billingProfileDimensionsListExpandAndTopMCA() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579",
    { expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/MCABillingProfileDimensionsListWithFilter.json
 */
async function billingProfileDimensionsListWithFilterMCA() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579",
    { filter: "properties/category eq 'resourceId'", expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/MCACustomerDimensionsList.json
 */
async function customerDimensionsListMCA() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/customers/5678",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/MCACustomerDimensionsListExpandAndTop.json
 */
async function customerDimensionsListExpandAndTopMCA() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/customers/5678",
    { expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/MCACustomerDimensionsListWithFilter.json
 */
async function customerDimensionsListWithFilterMCA() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/customers/5678",
    { filter: "properties/category eq 'resourceId'", expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/MCAInvoiceSectionDimensionsList.json
 */
async function invoiceSectionDimensionsListMCA() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579/invoiceSections/9876",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/MCAInvoiceSectionDimensionsListExpandAndTop.json
 */
async function invoiceSectionDimensionsListExpandAndTopMCA() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579/invoiceSections/9876",
    { expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/MCAInvoiceSectionDimensionsListWithFilter.json
 */
async function invoiceSectionDimensionsListWithFilterMCA() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579/invoiceSections/9876",
    { filter: "properties/category eq 'resourceId'", expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/ManagementGroupDimensionsList.json
 */
async function managementGroupDimensionsListLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Management/managementGroups/MyMgId",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/ManagementGroupDimensionsListExpandAndTop.json
 */
async function managementGroupDimensionsListExpandAndTopLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Management/managementGroups/MyMgId",
    { expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/ManagementGroupDimensionsListWithFilter.json
 */
async function managementGroupDimensionsListWithFilterLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "providers/Microsoft.Management/managementGroups/MyMgId",
    { filter: "properties/category eq 'resourceId'", expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/ResourceGroupDimensionsList.json
 */
async function resourceGroupDimensionsListLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/system.orlando",
    { expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the dimensions by the defined scope.
 *
 * @summary lists the dimensions by the defined scope.
 * x-ms-original-file: 2025-03-01/SubscriptionDimensionsList.json
 */
async function subscriptionDimensionsListLegacy() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.dimensions.list(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    { expand: "properties/data", top: 5 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await billingAccountDimensionsListLegacy();
  await billingAccountDimensionsListExpandAndTopLegacy();
  await billingAccountDimensionsListWithFilterLegacy();
  await departmentDimensionsListLegacy();
  await departmentDimensionsListExpandAndTopLegacy();
  await departmentDimensionsListWithFilterLegacy();
  await enrollmentAccountDimensionsListLegacy();
  await enrollmentAccountDimensionsListExpandAndTopLegacy();
  await enrollmentAccountDimensionsListWithFilterLegacy();
  await billingAccountDimensionsListMCA();
  await billingAccountDimensionsListExpandAndTopMCA();
  await billingAccountDimensionsListWithFilterMCA();
  await billingProfileDimensionsListMCA();
  await billingProfileDimensionsListExpandAndTopMCA();
  await billingProfileDimensionsListWithFilterMCA();
  await customerDimensionsListMCA();
  await customerDimensionsListExpandAndTopMCA();
  await customerDimensionsListWithFilterMCA();
  await invoiceSectionDimensionsListMCA();
  await invoiceSectionDimensionsListExpandAndTopMCA();
  await invoiceSectionDimensionsListWithFilterMCA();
  await managementGroupDimensionsListLegacy();
  await managementGroupDimensionsListExpandAndTopLegacy();
  await managementGroupDimensionsListWithFilterLegacy();
  await resourceGroupDimensionsListLegacy();
  await subscriptionDimensionsListLegacy();
}

main().catch(console.error);
