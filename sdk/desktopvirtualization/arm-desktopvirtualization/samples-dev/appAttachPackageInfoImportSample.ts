// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ImportPackageInfoRequest } from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets information from a package given the path to the package.
 *
 * @summary Gets information from a package given the path to the package.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/AppAttachPackageInfo_Import_Post.json
 */
async function appAttachPackageInfoImport(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const hostPoolName = "hostpool1";
  const importPackageInfoRequest: ImportPackageInfoRequest = {
    path: "imagepath",
    packageArchitecture: "x64",
  };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appAttachPackageInfo.listImport(
    resourceGroupName,
    hostPoolName,
    importPackageInfoRequest,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await appAttachPackageInfoImport();
}

main().catch(console.error);
