// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EducationManagementClient } = require("@azure/arm-education");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the details for a specified lab associated with the student lab.
 *
 * @summary get the details for a specified lab associated with the student lab.
 * x-ms-original-file: 2021-12-01-preview/StudentLab.json
 */
async function studentLab() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.studentLabs.get("{studentLabName}");
  console.log(result);
}

async function main() {
  await studentLab();
}

main().catch(console.error);
