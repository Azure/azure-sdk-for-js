// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a list of all users for a lab.
 *
 * @summary Returns a list of all users for a lab.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/Users/listUser.json
 */

import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listUser(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LABSERVICES_RESOURCE_GROUP"] || "testrg123";
  const labName = "testlab";
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.users.listByLab(resourceGroupName, labName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listUser();
}

main().catch(console.error);
