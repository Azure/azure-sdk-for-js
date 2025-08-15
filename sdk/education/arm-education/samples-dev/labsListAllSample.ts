// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LabsListAllOptionalParams } from "@azure/arm-education";
import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a list of labs associated with the provided billing account name and billing profile name.
 *
 * @summary Get a list of labs associated with the provided billing account name and billing profile name.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabList.json
 */
async function labList(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const includeBudget = false;
  const options: LabsListAllOptionalParams = { includeBudget };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.labs.listAll(billingAccountName, billingProfileName, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Get a list of labs associated with the provided billing account name and billing profile name.
 *
 * @summary Get a list of labs associated with the provided billing account name and billing profile name.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabListIncludeBudget.json
 */
async function labListIncludeBudget(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const includeBudget = true;
  const options: LabsListAllOptionalParams = { includeBudget };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.labs.listAll(billingAccountName, billingProfileName, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await labList();
  await labListIncludeBudget();
}

main().catch(console.error);
