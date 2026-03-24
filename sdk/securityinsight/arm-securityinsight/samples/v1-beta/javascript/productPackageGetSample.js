// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a package by its identifier from the catalog.
 *
 * @summary gets a package by its identifier from the catalog.
 * x-ms-original-file: 2025-07-01-preview/contentPackages/GetProductPackageById.json
 */
async function getAPackage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfeab2-9ae0-4464-9919-dccaee2e48f0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.productPackage.get(
    "myRg",
    "myWorkspace",
    "str.azure-sentinel-solution-str",
  );
  console.log(result);
}

async function main() {
  await getAPackage();
}

main().catch(console.error);
