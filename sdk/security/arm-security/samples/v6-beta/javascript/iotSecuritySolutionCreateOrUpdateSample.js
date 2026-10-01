// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to use this method to create or update yours IoT Security solution
 *
 * @summary use this method to create or update yours IoT Security solution
 * x-ms-original-file: 2019-08-01/IoTSecuritySolutions/CreateIoTSecuritySolution.json
 */
async function createOrUpdateAIoTSecuritySolution() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.iotSecuritySolution.createOrUpdate("MyGroup", "default", {
    location: "East Us",
    disabledDataSources: [],
    displayName: "Solution Default",
    export: [],
    iotHubs: [
      "/subscriptions/075423e9-7d33-4166-8bdf-3920b04e3735/resourceGroups/myRg/providers/Microsoft.Devices/IotHubs/FirstIotHub",
    ],
    recommendationsConfiguration: [
      { recommendationType: "IoT_OpenPorts", status: "Disabled" },
      { recommendationType: "IoT_SharedCredentials", status: "Disabled" },
    ],
    status: "Enabled",
    unmaskedIpLoggingStatus: "Enabled",
    userDefinedResources: {
      query: 'where type != "microsoft.devices/iothubs" | where name contains "iot"',
      querySubscriptions: ["075423e9-7d33-4166-8bdf-3920b04e3735"],
    },
    workspace:
      "/subscriptions/c4930e90-cd72-4aa5-93e9-2d081d129569/resourceGroups/myRg/providers/Microsoft.OperationalInsights/workspaces/myWorkspace1",
    tags: {},
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAIoTSecuritySolution();
}

main().catch(console.error);
