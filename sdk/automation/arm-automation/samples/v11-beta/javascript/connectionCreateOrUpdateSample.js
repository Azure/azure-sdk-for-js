// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a connection.
 *
 * @summary create or update a connection.
 * x-ms-original-file: 2024-10-23/createOrUpdateConnection.json
 */
async function createOrUpdateConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.connection.createOrUpdate(
    "rg",
    "myAutomationAccount28",
    "mysConnection",
    {
      name: "mysConnection",
      description: "my description goes here",
      connectionType: { name: "Azure" },
      fieldDefinitionValues: {
        AutomationCertificateName: "mysCertificateName",
        SubscriptionID: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateConnection();
}

main().catch(console.error);
