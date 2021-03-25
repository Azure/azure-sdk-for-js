// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { logSampleHeader, logStep, finish, handleError } from "../Shared/handleError";
import { endpoint, key, database as databaseId, container as containerId } from "../Shared/config";
import { CosmosClient } from "../../dist";

logSampleHeader("Server Side Scripts");

// Establish a new instance of the DocumentDBClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

// Path to stored procedure definition
const sprocDefinition = require("./upsert"); // eslint-disable-line @typescript-eslint/no-require-imports

// Execute the stored procedure with the following parameters.
const sprocParams = [
  {
    id: "myDocument",
    foo: "bar"
  }
];

async function run(): Promise<void> {
  const { database } = await client.databases.create({ id: databaseId });
  const { container } = await database.containers.create({ id: containerId });

  logStep("Creating the sproc: '" + sprocDefinition.id + "'");

  // Query for the stored procedure.
  const { sproc } = await container.scripts.storedProcedures.create(sprocDefinition);

  logStep("Executing the sproc: '" + sproc.id + "'");
  console.log("Sproc parameters: " + JSON.stringify(sprocParams));

  const { resource: results, headers } = await sproc.execute(undefined, sprocParams);

  console.log("//////////////////////////////////");
  if (headers) {
    console.log("// responseHeaders");
    console.log(headers);
  }
  if (results) {
    console.log("// results");
    console.log(results);
  }
  console.log("//////////////////////////////////");

  await finish();
}

run().catch(handleError);
