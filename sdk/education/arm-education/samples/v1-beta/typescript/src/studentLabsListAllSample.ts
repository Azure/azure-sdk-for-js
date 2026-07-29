// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of all labs associated with the caller of the API.
 *
 * @summary get a list of all labs associated with the caller of the API.
 * x-ms-original-file: 2021-12-01-preview/StudentLabList.json
 */
async function studentLabList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.studentLabs.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await studentLabList();
}

main().catch(console.error);
