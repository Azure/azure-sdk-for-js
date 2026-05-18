// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to use this method to update existing IoT Security solution tags or user defined resources. To update other fields use the CreateOrUpdate method.
 *
 * @summary use this method to update existing IoT Security solution tags or user defined resources. To update other fields use the CreateOrUpdate method.
 * x-ms-original-file: 2019-08-01/IoTSecuritySolutions/UpdateIoTSecuritySolution.json
 */
async function useThisMethodToUpdateExistingIoTSecuritySolution(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.iotSecuritySolution.update("myRg", "default", {
    recommendationsConfiguration: [
      { recommendationType: "IoT_OpenPorts", status: "Disabled" },
      { recommendationType: "IoT_SharedCredentials", status: "Disabled" },
    ],
    userDefinedResources: {
      query: 'where type != "microsoft.devices/iothubs" | where name contains "v2"',
      querySubscriptions: ["075423e9-7d33-4166-8bdf-3920b04e3735"],
    },
    tags: { foo: "bar" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await useThisMethodToUpdateExistingIoTSecuritySolution();
}

main().catch(console.error);
