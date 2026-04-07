// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of security events.
 *
 * @summary gets a list of security events.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseSecurityEventsGetMax.json
 */
async function getTheManagedDatabaseSecurityEventsWithMaximalParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseSecurityEvents.listByDatabase(
    "testrg",
    "testcl",
    "database1",
    {
      filter: "ShowServerRecords eq true",
      skip: 0,
      top: 1,
      skiptoken:
        "eyJCbG9iTmFtZURhdGVUaW1lIjoiXC9EYXRlKDE1MTIyODg4MTIwMTArMDIwMClcLyIsIkJsb2JOYW1lUm9sbG92ZXJJbmRleCI6IjAiLCJFbmREYXRlIjoiXC9EYXRlKDE1MTI0NjYyMDA1MjkpXC8iLCJJc1NraXBUb2tlblNldCI6ZmFsc2UsIklzVjJCbG9iVGltZUZvcm1hdCI6dHJ1ZSwiU2hvd1NlcnZlclJlY29yZHMiOmZhbHNlLCJTa2lwVmFsdWUiOjAsIlRha2VWYWx1ZSI6MTB9",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of security events.
 *
 * @summary gets a list of security events.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseSecurityEventsGetMin.json
 */
async function getTheManagedDatabaseSecurityEventsWithMinimalParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseSecurityEvents.listByDatabase(
    "testrg",
    "testcl",
    "database1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getTheManagedDatabaseSecurityEventsWithMaximalParameters();
  await getTheManagedDatabaseSecurityEventsWithMinimalParameters();
}

main().catch(console.error);
