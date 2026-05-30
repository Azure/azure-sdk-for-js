// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgramEnrollmentClient } from "@azure/arm-programenrollment";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list EduEnrollment resources by resource group
 *
 * @summary list EduEnrollment resources by resource group
 * x-ms-original-file: 2026-03-01-preview/EduEnrollments_ListByResourceGroup.json
 */
async function listEduEnrollmentsByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ProgramEnrollmentClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.eduEnrollments.listByResourceGroup("testrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listEduEnrollmentsByResourceGroup();
}

main().catch(console.error);
