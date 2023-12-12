// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates usage of CosmosDiagnostic Object.
 */

import * as dotenv from "dotenv";
dotenv.config();

import { handleError, logSampleHeader, finish } from "./Shared/handleError";
import {
  CosmosClient,
  BulkOperationType,
  OperationInput,
  Container,
  PatchOperationType,
} from "@azure/cosmos";

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";
logSampleHeader("Demonstrating Usage of CosmosDB Diagnostics.");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run(): Promise<void> {
  const itemId = "itemId";
  const { database } = await accessingDiagnosticForDatabaseOperations(databaseId);
  const { container } = await accessingDiagnosticForContainerOperations(database);
  await accessingDiagnosticForItemOperations(itemId, container);
  await accessingDiagnosticForBatchOperations(container);
  await accessingDiagnosticForQueryOperations(container);
  await finish();
}

async function accessingDiagnosticForDatabaseOperations(databaseId: string) {
  const { database, diagnostics: databaseCreateDiagnostic } =
    await client.databases.createIfNotExists({ id: databaseId });
  console.log("    ## Database with id " + database.id + " created.");
  displayCosmosDiagnosticsObject(databaseCreateDiagnostic, "database create");
  return {
    database,
  };
}
async function accessingDiagnosticForContainerOperations(
  database: any
): Promise<{ container: any }> {
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

async function accessingDiagnosticForItemOperations(itemId: string, container: Container) {
  const { item, diagnostics } = await container.items.create({
    id: itemId,
    key1: "A",
    key2: "B",
    class: "2010",
  });
  displayCosmosDiagnosticsObject(diagnostics, "Item create");
}

async function accessingDiagnosticForQueryOperations(container: Container) {
  const queryIterator = container.items.query("select * from c");
  const { resources, diagnostics } = await queryIterator.fetchAll();
  displayCosmosDiagnosticsObject(diagnostics, "query, fetch all");
}

async function accessingDiagnosticForBatchOperations(container: Container) {
  const createItemId = "batchItemCreate";
  const upsertItemId = "upsertItemId";
  const patchItemId = "patchItemId";
  const operations: OperationInput[] = [
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

function displayCosmosDiagnosticsObject(diagnostics: any, target: string) {
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
