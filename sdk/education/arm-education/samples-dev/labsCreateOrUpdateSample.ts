// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a new lab or update a previously created lab.
 *
 * @summary Create a new lab or update a previously created lab.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/CreateLab.json
 */

import type { LabDetails } from "@azure/arm-education";
import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createLab(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const invoiceSectionName = "{invoiceSectionName}";
  const parameters: LabDetails = {
    description: "example lab description",
    budgetPerStudent: { currency: "USD", value: 100 },
    displayName: "example lab",
    expirationDate: new Date("2021-12-09T22:11:29.422Z"),
  };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.labs.createOrUpdate(
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createLab();
}

main().catch(console.error);
