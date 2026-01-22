// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update a gallery Script Version.
 *
 * @summary Create or update a gallery Script Version.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2025-03-03/examples/galleryScriptExamples/GalleryScriptVersion_Create.json
 */
async function createOrUpdateASimpleGalleryScriptVersion() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryScriptName = "myGalleryScriptName";
  const galleryScriptVersionName = "1.0.0";
  const galleryScriptVersion = {
    location: "West US",
    properties: {
      publishingProfile: {
        endOfLifeDate: new Date("2027-07-01T07:00:00Z"),
        replicaCount: 2,
        source: {
          parameters: [
            {
              name: "location",
              type: "String",
              defaultValue: "westus",
              required: true,
            },
            {
              name: "myGalleryScriptParameter1",
              type: "String",
              description: "description of the parameter",
              defaultValue: "default value of parameter",
              required: true,
            },
            {
              name: "myGalleryScriptParameter2",
              type: "String",
              description: "description of the parameter",
              defaultValue: "default value of parameter",
              required: false,
            },
            {
              name: "numberOfUnits",
              type: "Int",
              description: "description of the parameter",
              defaultValue: "3",
              maxValue: "5",
              minValue: "1",
              required: true,
            },
            {
              name: "weightOfUnit",
              type: "Double",
              description: "description of the parameter",
              defaultValue: "0.6",
              maxValue: "2",
              minValue: "0.1",
              required: true,
            },
            {
              name: "typeOfProduct",
              type: "Enum",
              description: "description of the parameter",
              defaultValue: "Fruit",
              enumValues: ["Fruit", "Vegetable", "Greens", "Nuts"],
              required: false,
            },
          ],
          scriptLink:
            "https://mystorageaccount.blob.core.windows.net/mycontainer/myScript.ps1?{sasKey}",
        },
        storageAccountType: "Standard_LRS",
        targetRegions: [
          {
            name: "West US",
            excludeFromLatest: false,
            regionalReplicaCount: 2,
            storageAccountType: "Standard_LRS",
          },
        ],
      },
      safetyProfile: { allowDeletionOfReplicatedLocations: false },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryScriptVersions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    galleryName,
    galleryScriptName,
    galleryScriptVersionName,
    galleryScriptVersion,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateASimpleGalleryScriptVersion();
}

main().catch(console.error);
