// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of labs associated with the provided billing account name and billing profile name.
 *
 * @summary get a list of labs associated with the provided billing account name and billing profile name.
 * x-ms-original-file: 2021-12-01-preview/LabList.json
 */
async function labList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.labs.listAll("{billingAccountName}", "{billingProfileName}", {
    includeBudget: false,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get a list of labs associated with the provided billing account name and billing profile name.
 *
 * @summary get a list of labs associated with the provided billing account name and billing profile name.
 * x-ms-original-file: 2021-12-01-preview/LabListIncludeBudget.json
 */
async function labListIncludeBudget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.labs.listAll("{billingAccountName}", "{billingProfileName}", {
    includeBudget: true,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await labList();
  await labListIncludeBudget();
}

main().catch(console.error);
