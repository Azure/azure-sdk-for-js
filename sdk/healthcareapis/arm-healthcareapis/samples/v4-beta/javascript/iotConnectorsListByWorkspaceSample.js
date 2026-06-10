// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all IoT Connectors for the given workspace
 *
 * @summary lists all IoT Connectors for the given workspace
 * x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_List.json
 */
async function listIotconnectors() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotConnectors.listByWorkspace("testRG", "workspace1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listIotconnectors();
}

main().catch(console.error);
