// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to put specified Update
 *
 * @summary put specified Update
 * x-ms-original-file: 2025-12-01-preview/PutUpdates.json
 */
async function putASpecificUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.updates.put("testrg", "testcluster", "Microsoft4.2203.2.32", {
    description: "AzS Update 4.2203.2.32",
    additionalProperties: "additional properties",
    availabilityType: "Local",
    displayName: "AzS Update - 4.2203.2.32",
    installedDate: new Date("2022-04-06T14:08:18.254Z"),
    packagePath: "\\\\SU1FileServer\\SU1_Infrastructure_2\\Updates\\Packages\\Microsoft4.2203.2.32",
    packageSizeInMb: 18858,
    packageType: "Infrastructure",
    prerequisites: [
      {
        packageName: "update package name",
        updateType: "update type",
        version: "prerequisite version",
      },
    ],
    publisher: "Microsoft",
    releaseLink: "https://docs.microsoft.com/azure-stack/operator/release-notes?view=azs-2203",
    state: "Installed",
    updateStateProperties: {
      notifyMessage: "Brief message with instructions for updates of AvailabilityType Notify",
      progressPercentage: 0,
    },
    version: "4.2203.2.32",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putASpecificUpdate();
}

main().catch(console.error);
