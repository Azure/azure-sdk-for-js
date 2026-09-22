// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 *
 * @summary get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 * x-ms-original-file: 2021-12-01-preview/LabListWithInvoiceSectionName.json
 */
async function labListWithInvoiceSectionName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.labs.list(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    { includeBudget: true },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 *
 * @summary get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 * x-ms-original-file: 2021-12-01-preview/LabListWithInvoiceSectionNameIncludeBudget.json
 */
async function labListWithInvoiceSectionNameIncludeBudget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.labs.list(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    { includeBudget: true },
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
