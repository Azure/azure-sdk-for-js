// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LabsGetOptionalParams } from "@azure/arm-education";
import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 *
 * @summary Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Lab.json
 */
async function lab(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const invoiceSectionName = "{invoiceSectionName}";
  const includeBudget = false;
  const options: LabsGetOptionalParams = { includeBudget };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.labs.get(
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 *
 * @summary Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabIncludeBudget.json
 */
async function labIncludeBudget(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const invoiceSectionName = "{invoiceSectionName}";
  const includeBudget = true;
  const options: LabsGetOptionalParams = { includeBudget };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.labs.get(
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await lab();
  await labIncludeBudget();
}

main().catch(console.error);
