// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 *
 * @summary Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabListWithInvoiceSectionName.json
 */

import type { LabsListOptionalParams } from "@azure/arm-education";
import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function labListWithInvoiceSectionName(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const invoiceSectionName = "{invoiceSectionName}";
  const includeBudget = true;
  const options: LabsListOptionalParams = { includeBudget };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.labs.list(
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 *
 * @summary Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabListWithInvoiceSectionNameIncludeBudget.json
 */
async function labListWithInvoiceSectionNameIncludeBudget(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const invoiceSectionName = "{invoiceSectionName}";
  const includeBudget = true;
  const options: LabsListOptionalParams = { includeBudget };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.labs.list(
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await labListWithInvoiceSectionName();
  await labListWithInvoiceSectionNameIncludeBudget();
}

main().catch(console.error);
