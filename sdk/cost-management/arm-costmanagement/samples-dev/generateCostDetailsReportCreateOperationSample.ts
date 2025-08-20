// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateCostDetailsReportByBillingAccountEnterpriseAgreementCustomerAndBillingPeriod.json
 */

import type { GenerateCostDetailsReportRequestDefinition } from "@azure/arm-costmanagement";
import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function generateCostDetailsReportByBillingAccountEnterpriseAgreementCustomerAndBillingPeriod(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12345";
  const parameters: GenerateCostDetailsReportRequestDefinition = {
    billingPeriod: "202205",
    metric: "ActualCost",
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.beginCreateOperationAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateCostDetailsReportByBillingProfileAndInvoiceId.json
 */
async function generateCostDetailsReportByBillingProfileAndInvoiceId(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12345:6789/billingProfiles/13579";
  const parameters: GenerateCostDetailsReportRequestDefinition = {
    invoiceId: "M1234567",
    metric: "ActualCost",
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.beginCreateOperationAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateCostDetailsReportByBillingProfileAndInvoiceIdAndCustomerId.json
 */
async function generateCostDetailsReportByBillingProfileAndInvoiceIdAndCustomerId(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12345:6789/customers/13579";
  const parameters: GenerateCostDetailsReportRequestDefinition = {
    invoiceId: "M1234567",
    metric: "ActualCost",
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.beginCreateOperationAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateCostDetailsReportByCustomerAndTimePeriod.json
 */
async function generateCostDetailsReportByCustomerAndTimePeriod(): Promise<void> {
  const scope = "providers/Microsoft.Billing/billingAccounts/12345:6789/customers/13579";
  const parameters: GenerateCostDetailsReportRequestDefinition = {
    metric: "ActualCost",
    timePeriod: { end: "2020-03-15", start: "2020-03-01" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.beginCreateOperationAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateCostDetailsReportByDepartmentsAndTimePeriod.json
 */
async function generateCostDetailsReportByDepartmentsAndTimePeriod(): Promise<void> {
  const scope = "providers/Microsoft.Billing/departments/12345";
  const parameters: GenerateCostDetailsReportRequestDefinition = {
    metric: "ActualCost",
    timePeriod: { end: "2020-03-15", start: "2020-03-01" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.beginCreateOperationAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateCostDetailsReportByEnrollmentAccountsAndTimePeriod.json
 */
async function generateCostDetailsReportByEnrollmentAccountsAndTimePeriod(): Promise<void> {
  const scope = "providers/Microsoft.Billing/enrollmentAccounts/1234";
  const parameters: GenerateCostDetailsReportRequestDefinition = {
    metric: "ActualCost",
    timePeriod: { end: "2020-03-15", start: "2020-03-01" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.beginCreateOperationAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @summary This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/azure/cost-management-billing/automate/understand-usage-details-fields
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/GenerateCostDetailsReportBySubscriptionAndTimePeriod.json
 */
async function generateCostDetailsReportBySubscriptionAndTimePeriod(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000";
  const parameters: GenerateCostDetailsReportRequestDefinition = {
    metric: "ActualCost",
    timePeriod: { end: "2020-03-15", start: "2020-03-01" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.beginCreateOperationAndWait(
    scope,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await generateCostDetailsReportByBillingAccountEnterpriseAgreementCustomerAndBillingPeriod();
  await generateCostDetailsReportByBillingProfileAndInvoiceId();
  await generateCostDetailsReportByBillingProfileAndInvoiceIdAndCustomerId();
  await generateCostDetailsReportByCustomerAndTimePeriod();
  await generateCostDetailsReportByDepartmentsAndTimePeriod();
  await generateCostDetailsReportByEnrollmentAccountsAndTimePeriod();
  await generateCostDetailsReportBySubscriptionAndTimePeriod();
}

main().catch(console.error);
