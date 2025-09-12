// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a server communication link.
 *
 * @summary Creates a server communication link.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/stable/2014-04-01/examples/ServerCommunicationLinkCreateOrUpdate.json
 */
async function createAServerCommunicationLink() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const serverName = "sqlcrudtest-4645";
  const communicationLinkName = "link1";
  const parameters = {
    partnerServer: "sqldcrudtest-test",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverCommunicationLinks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    communicationLinkName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createAServerCommunicationLink();
}

main().catch(console.error);
