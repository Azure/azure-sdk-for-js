// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceLinkerManagementClient } = require("@azure/arm-servicelinker");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a dryrun job to do necessary check before actual creation
 *
 * @summary create a dryrun job to do necessary check before actual creation
 * x-ms-original-file: 2024-07-01-preview/ConnectorDryrunCreate.json
 */
async function connectorDryrunCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const result = await client.connector.createDryrun("test-rg", "westus", "dryrunName", {
    properties: {
      parameters: {
        actionName: "createOrUpdate",
        authInfo: {
          name: "name",
          authType: "secret",
          secretInfo: { secretType: "rawValue", value: "secret" },
        },
        targetService: {
          type: "AzureResource",
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.DocumentDb/databaseAccounts/test-acc/mongodbDatabases/test-db",
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await connectorDryrunCreate();
}

main().catch(console.error);
