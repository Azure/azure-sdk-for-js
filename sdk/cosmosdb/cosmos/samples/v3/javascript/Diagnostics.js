// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates usage of CosmosDiagnostic Object.
 */

require("dotenv").config();

const { handleError, logSampleHeader, finish } = require("./Shared/handleError");
const { CosmosClient, BulkOperationType, PatchOperationType } = require("@azure/cosmos");

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";
logSampleHeader("Demonstrating Usage of CosmosDB Diagnostics.");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run() {
  const itemId = "itemId";
  const { database } = await accessingDiagnosticForDatabaseOperations(databaseId);
  const { container } = await accessingDiagnosticForContainerOperations(database);
  await accessingDiagnosticForItemOperations(itemId, container);
  await accessingDiagnosticForBatchOperations(container);
  await accessingDiagnosticForQueryOperations(container);
  await finish();
}

async function accessingDiagnosticForDatabaseOperations(databaseId) {
  const { database, diagnostics: databaseCreateDiagnostic } =
    await client.databases.createIfNotExists({ id: databaseId });
  console.log("    ## Database with id " + database.id + " created.");
  displayCosmosDiagnosticsObject(databaseCreateDiagnostic, "database create");
  return {
    database,
  };
}
async function accessingDiagnosticForContainerOperations(database) {
  const { container, diagnostics: containerCreateDiagnostic } =
    await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: {
        paths: ["/key1"],
      },
    });
  displayCosmosDiagnosticsObject(containerCreateDiagnostic, "container create");
  return {
    container,
  };
}

async function accessingDiagnosticForItemOperations(itemId, container) {
  const { item, diagnostics } = await container.items.create({
    id: itemId,
    key1: "A",
    key2: "B",
    class: "2010",
  });
  displayCosmosDiagnosticsObject(diagnostics, "Item create");
}

async function accessingDiagnosticForQueryOperations(container) {
  const queryIterator = container.items.query("select * from c");
  const { resources, diagnostics } = await queryIterator.fetchAll();
  displayCosmosDiagnosticsObject(diagnostics, "query, fetch all");
}

async function accessingDiagnosticForBatchOperations(container) {
  const createItemId = "batchItemCreate";
  const upsertItemId = "upsertItemId";
  const patchItemId = "patchItemId";
  const operations = [
    {
      operationType: BulkOperationType.Create,
      resourceBody: { id: createItemId, key: "A", school: "high" },
    },
    {
      operationType: BulkOperationType.Upsert,
      resourceBody: { id: upsertItemId, key: "A", school: "elementary" },
    },
    {
      operationType: BulkOperationType.Patch,
      id: patchItemId,
      resourceBody: {
        operations: [{ op: PatchOperationType.add, path: "/good", value: "greatValue" }],
        condition: "from c where NOT IS_DEFINED(c.newImproved)",
      },
    },
  ];

  const response = await container.items.batch(operations, "A");
  displayCosmosDiagnosticsObject(response.diagnostics, "batch");
}

function displayCosmosDiagnosticsObject(diagnostics, target) {
  console.log(
    `######################## Printing diagnostic for ${target} ##############################`
  );
  console.log(
    `    ## Operation start time stamp: ${diagnostics.clientSideRequestStatistics.requestStartTimeUTCInMs}`
  );
  console.log(
    `    ## Total time taken in operation: ${diagnostics.clientSideRequestStatistics.requestDurationInMs}`
  );
  console.log(
    `    ## Total request payload length operation: ${diagnostics.clientSideRequestStatistics.totalRequestPayloadLengthInBytes}`
  );
  console.log(
    `    ## Total response payload length operation: ${diagnostics.clientSideRequestStatistics.totalResponsePayloadLengthInBytes}`
  );
  console.log(`    ## Location endpoints contacted during operation - `);

  diagnostics.clientSideRequestStatistics.locationEndpointsContacted.forEach((url, index) => {
    console.log(`    #### ${index}: ${url}`);
  });
  const failedAttempts = diagnostics.clientSideRequestStatistics.retryDiagnostics.failedAttempts;
  console.log(`    ## Attempts failied during during operation - ${failedAttempts.length}`);

  const metadataLookups =
    diagnostics.clientSideRequestStatistics.metadataDiagnostics.metadataLookups;
  console.log(`    ## Metadata lookups during during operation - ${metadataLookups.length}`);

  metadataLookups.forEach((lookup, index) => {
    console.log(`    #### lookup ${index} : ${JSON.stringify(lookup)}`);
  });

  const gatewayStatistics = diagnostics.clientSideRequestStatistics.gatewayStatistics;
  console.log(`    ## gatewayStatistics during during operation - ${gatewayStatistics.length}`);
  metadataLookups.forEach((gatewayStatistics, index) => {
    console.log(`    #### gatewayStatistics ${index} : ${JSON.stringify(gatewayStatistics)}`);
  });
  console.log("######################################################################");
}

run().catch(handleError);
