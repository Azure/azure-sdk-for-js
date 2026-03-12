// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Resets a lab virtual machine password.
 *
 * @summary Resets a lab virtual machine password.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/VirtualMachines/resetPasswordVirtualMachine.json
 */

import type { ResetPasswordBody } from "@azure/arm-labservices";
import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function resetPasswordVirtualMachine(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LABSERVICES_RESOURCE_GROUP"] || "testrg123";
  const labName = "testlab";
  const virtualMachineName = "template";
  const body: ResetPasswordBody = {
    password: "example-password",
    username: "example-username",
  };
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginResetPasswordAndWait(
    resourceGroupName,
    labName,
    virtualMachineName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await resetPasswordVirtualMachine();
}

main().catch(console.error);
