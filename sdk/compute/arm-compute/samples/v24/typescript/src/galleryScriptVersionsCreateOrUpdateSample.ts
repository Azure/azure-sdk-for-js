// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a gallery Script Version.
 *
 * @summary create or update a gallery Script Version.
 * x-ms-original-file: 2025-03-03/galleryScriptExamples/GalleryScriptVersion_Create.json
 */
async function createOrUpdateASimpleGalleryScriptVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryScriptVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryScriptName",
    "1.0.0",
    {
      location: "West US",
      properties: {
        publishingProfile: {
          source: {
            scriptLink:
              "https://mystorageaccount.blob.core.windows.net/mycontainer/myScript.ps1?{sasKey}",
            parameters: [
              { name: "location", required: true, defaultValue: "westus", type: "String" },
              {
                name: "myGalleryScriptParameter1",
                required: true,
                type: "String",
                defaultValue: "default value of parameter",
                description: "description of the parameter",
              },
              {
                name: "myGalleryScriptParameter2",
                required: false,
                type: "String",
                defaultValue: "default value of parameter",
                description: "description of the parameter",
              },
              {
                name: "numberOfUnits",
                required: true,
                type: "Int",
                defaultValue: "3",
                description: "description of the parameter",
                minValue: "1",
                maxValue: "5",
              },
              {
                name: "weightOfUnit",
                required: true,
                type: "Double",
                defaultValue: "0.6",
                description: "description of the parameter",
                minValue: "0.1",
                maxValue: "2",
              },
              {
                name: "typeOfProduct",
                required: false,
                type: "Enum",
                defaultValue: "Fruit",
                description: "description of the parameter",
                enumValues: ["Fruit", "Vegetable", "Greens", "Nuts"],
              },
            ],
          },
          targetRegions: [
            {
              name: "West US",
              regionalReplicaCount: 2,
              storageAccountType: "Standard_LRS",
              excludeFromLatest: false,
            },
          ],
          replicaCount: 2,
          endOfLifeDate: new Date("2027-07-01T07:00:00Z"),
          storageAccountType: "Standard_LRS",
        },
        safetyProfile: { allowDeletionOfReplicatedLocations: false },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASimpleGalleryScriptVersion();
}

main().catch(console.error);
