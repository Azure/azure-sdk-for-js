// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a connection type.
 *
 * @summary create a connection type.
 * x-ms-original-file: 2024-10-23/createOrUpdateConnectionType.json
 */
async function createOrUpdateConnectionType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.connectionType.createOrUpdate("rg", "myAutomationAccount22", "myCT", {
    name: "myCT",
    fieldDefinitions: {
      myBoolField: { type: "bool", isEncrypted: false, isOptional: false },
      myStringField: { type: "string", isEncrypted: false, isOptional: false },
      myStringFieldEncrypted: { type: "string", isEncrypted: true, isOptional: false },
    },
    isGlobal: false,
  });
  console.log(result);
}

async function main() {
  await createOrUpdateConnectionType();
}

main().catch(console.error);
