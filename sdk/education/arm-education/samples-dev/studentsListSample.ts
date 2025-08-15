// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a list of details about students that are associated with the specified lab.
 *
 * @summary Get a list of details about students that are associated with the specified lab.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentList.json
 */
async function studentList(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const invoiceSectionName = "{invoiceSectionName}";
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.students.list(
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await studentList();
}

main().catch(console.error);
