// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { TrafficManagerManagementClient } = require("@azure/arm-trafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the default Geographic Hierarchy used by the Geographic traffic routing method.
 *
 * @summary gets the default Geographic Hierarchy used by the Geographic traffic routing method.
 * x-ms-original-file: 2024-04-01-preview/GeographicHierarchy-GET-default.json
 */
async function geographicHierarchyGETDefault() {
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential);
  const result = await client.geographicHierarchies.getDefault();
  console.log(result);
}

async function main() {
  await geographicHierarchyGETDefault();
}

main().catch(console.error);
