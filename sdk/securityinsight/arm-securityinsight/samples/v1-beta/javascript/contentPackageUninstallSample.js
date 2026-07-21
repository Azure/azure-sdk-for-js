// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to uninstall a package from the workspace.
 *
 * @summary uninstall a package from the workspace.
 * x-ms-original-file: 2025-07-01-preview/contentPackages/UninstallPackage.json
 */
async function uninstallAPackageFromTheWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfeab2-9ae0-4464-9919-dccaee2e48f0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.contentPackage.uninstall("myRg", "myWorkspace", "str.azure-sentinel-solution-str");
}

async function main() {
  await uninstallAPackageFromTheWorkspace();
}

main().catch(console.error);
