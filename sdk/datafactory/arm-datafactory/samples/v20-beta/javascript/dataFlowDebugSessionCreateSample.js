// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a data flow debug session.
 *
 * @summary creates a data flow debug session.
 * x-ms-original-file: 2018-06-01/DataFlowDebugSession_Create.json
 */
async function dataFlowDebugSessionCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.dataFlowDebugSession.create(
    "exampleResourceGroup",
    "exampleFactoryName",
    {
      integrationRuntime: {
        name: "ir1",
        properties: {
          type: "Managed",
          computeProperties: {
            dataFlowProperties: { computeType: "General", coreCount: 48, timeToLive: 10 },
            location: "AutoResolve",
          },
        },
      },
      timeToLive: 60,
    },
  );
  console.log(result);
}

async function main() {
  await dataFlowDebugSessionCreate();
}

main().catch(console.error);
