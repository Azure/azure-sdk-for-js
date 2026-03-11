// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get confluent connector by Name
 *
 * @summary get confluent connector by Name
 * x-ms-original-file: 2025-08-18-preview/Connector_Get_MaximumSet_Gen.json
 */
async function connectorGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.connector.get(
    "rgconfluent",
    "pgwuoi",
    "rxbrvvdnplvbedrzwbgtwhbdm",
    "eknmpvbhtvwxdxddkos",
    "zakwjragxeiur",
  );
  console.log(result);
}

async function main() {
  await connectorGetMaximumSet();
}

main().catch(console.error);
