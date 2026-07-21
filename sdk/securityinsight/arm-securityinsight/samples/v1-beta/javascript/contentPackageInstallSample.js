// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to install a package to the workspace.
 *
 * @summary install a package to the workspace.
 * x-ms-original-file: 2025-07-01-preview/contentPackages/InstallPackage.json
 */
async function installAPackageToTheWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfeab2-9ae0-4464-9919-dccaee2e48f0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.contentPackage.install(
    "myRg",
    "myWorkspace",
    "str.azure-sentinel-solution-str",
    {
      contentId: "str.azure-sentinel-solution-str",
      contentKind: "Solution",
      contentProductId: "str.azure-sentinel-solution-str-sl-igl6jawr4gwmu",
      displayName: "str",
      version: "2.0.0",
    },
  );
  console.log(result);
}

async function main() {
  await installAPackageToTheWorkspace();
}

main().catch(console.error);
