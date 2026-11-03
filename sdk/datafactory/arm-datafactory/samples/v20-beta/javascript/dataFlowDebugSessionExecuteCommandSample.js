// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to execute a data flow debug command.
 *
 * @summary execute a data flow debug command.
 * x-ms-original-file: 2018-06-01/DataFlowDebugSession_ExecuteCommand.json
 */
async function dataFlowDebugSessionExecuteCommand() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.dataFlowDebugSession.executeCommand(
    "exampleResourceGroup",
    "exampleFactoryName",
    {
      command: "executePreviewQuery",
      commandPayload: { rowLimits: 100, streamName: "source1" },
      sessionId: "f06ed247-9d07-49b2-b05e-2cb4a2fc871e",
    },
  );
  console.log(result);
}

async function main() {
  await dataFlowDebugSessionExecuteCommand();
}

main().catch(console.error);
