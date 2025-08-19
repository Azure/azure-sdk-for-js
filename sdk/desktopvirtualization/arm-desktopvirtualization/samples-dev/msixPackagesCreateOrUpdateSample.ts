// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a MSIX package.
 *
 * @summary Create or update a MSIX package.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/MsixPackage_Create.json
 */

import type { MsixPackage } from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function msixPackageCreate(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const hostPoolName = "hostpool1";
  const msixPackageFullName = "msixpackagefullname";
  const msixPackage: MsixPackage = {
    displayName: "displayname",
    imagePath: "imagepath",
    isActive: false,
    isRegularRegistration: false,
    lastUpdated: new Date("2008-09-22T14:01:54.9571247Z"),
    packageApplications: [
      {
        description: "application-desc",
        appId: "ApplicationId",
        appUserModelID: "AppUserModelId",
        friendlyName: "friendlyname",
        iconImageName: "Apptile",
        rawIcon: Buffer.from("VGhpcyBpcyBhIHN0cmluZyB0byBoYXNo"),
        rawPng: Buffer.from("VGhpcyBpcyBhIHN0cmluZyB0byBoYXNo"),
      },
    ],
    packageDependencies: [
      {
        dependencyName: "MsixTest_Dependency_Name",
        minVersion: "version",
        publisher: "PublishedName",
      },
    ],
    packageFamilyName: "MsixPackage_FamilyName",
    packageName: "MsixPackage_name",
    packageRelativePath: "packagerelativepath",
    version: "version",
  };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const result = await client.msixPackages.createOrUpdate(
    resourceGroupName,
    hostPoolName,
    msixPackageFullName,
    msixPackage,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await msixPackageCreate();
}

main().catch(console.error);
