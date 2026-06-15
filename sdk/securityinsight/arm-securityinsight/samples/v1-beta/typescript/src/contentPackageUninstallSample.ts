// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to uninstall a package from the workspace.
 *
 * @summary uninstall a package from the workspace.
 * x-ms-original-file: 2025-07-01-preview/contentPackages/UninstallPackage.json
 */
async function uninstallAPackageFromTheWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfeab2-9ae0-4464-9919-dccaee2e48f0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.contentPackage.uninstall("myRg", "myWorkspace", "str.azure-sentinel-solution-str");
}

async function main(): Promise<void> {
  await uninstallAPackageFromTheWorkspace();
}

main().catch(console.error);
