// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EducationManagementClient } = require("@azure/arm-education");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of details about students that are associated with the specified lab.
 *
 * @summary get a list of details about students that are associated with the specified lab.
 * x-ms-original-file: 2021-12-01-preview/StudentList.json
 */
async function studentList() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.students.list(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await studentList();
}

main().catch(console.error);
