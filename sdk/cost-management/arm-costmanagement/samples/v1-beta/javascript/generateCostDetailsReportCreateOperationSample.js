// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: 2025-03-01/GenerateCostDetailsReportByBillingAccountEnterpriseAgreementCustomerAndBillingPeriod.json
 */
async function generateCostDetailsReportByBillingAccountEnterpriseAgreementCustomerAndBillingPeriod() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.createOperation(
    "providers/Microsoft.Billing/billingAccounts/12345",
    { billingPeriod: "202205", metric: "ActualCost" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: 2025-03-01/GenerateCostDetailsReportByBillingProfileAndInvoiceId.json
 */
async function generateCostDetailsReportByBillingProfileAndInvoiceId() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.createOperation(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579",
    { invoiceId: "M1234567", metric: "ActualCost" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: 2025-03-01/GenerateCostDetailsReportByBillingProfileAndInvoiceIdAndCustomerId.json
 */
async function generateCostDetailsReportByBillingProfileAndInvoiceIdAndCustomerId() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.createOperation(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/customers/13579",
    { invoiceId: "M1234567", metric: "ActualCost" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: 2025-03-01/GenerateCostDetailsReportByCustomerAndTimePeriod.json
 */
async function generateCostDetailsReportByCustomerAndTimePeriod() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.createOperation(
    "providers/Microsoft.Billing/billingAccounts/12345:6789/customers/13579",
    { metric: "ActualCost", timePeriod: { end: "2020-03-15", start: "2020-03-01" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: 2025-03-01/GenerateCostDetailsReportByDepartmentsAndTimePeriod.json
 */
async function generateCostDetailsReportByDepartmentsAndTimePeriod() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.createOperation(
    "providers/Microsoft.Billing/departments/12345",
    { metric: "ActualCost", timePeriod: { end: "2020-03-15", start: "2020-03-01" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: 2025-03-01/GenerateCostDetailsReportByEnrollmentAccountsAndTimePeriod.json
 */
async function generateCostDetailsReportByEnrollmentAccountsAndTimePeriod() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.createOperation(
    "providers/Microsoft.Billing/enrollmentAccounts/1234",
    { metric: "ActualCost", timePeriod: { end: "2020-03-15", start: "2020-03-01" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary this API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: 2025-03-01/GenerateCostDetailsReportBySubscriptionAndTimePeriod.json
 */
async function generateCostDetailsReportBySubscriptionAndTimePeriod() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.createOperation(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    { metric: "ActualCost", timePeriod: { end: "2020-03-15", start: "2020-03-01" } },
  );
  console.log(result);
}

async function main() {
  await generateCostDetailsReportByBillingAccountEnterpriseAgreementCustomerAndBillingPeriod();
  await generateCostDetailsReportByBillingProfileAndInvoiceId();
  await generateCostDetailsReportByBillingProfileAndInvoiceIdAndCustomerId();
  await generateCostDetailsReportByCustomerAndTimePeriod();
  await generateCostDetailsReportByDepartmentsAndTimePeriod();
  await generateCostDetailsReportByEnrollmentAccountsAndTimePeriod();
  await generateCostDetailsReportBySubscriptionAndTimePeriod();
}

main().catch(console.error);
