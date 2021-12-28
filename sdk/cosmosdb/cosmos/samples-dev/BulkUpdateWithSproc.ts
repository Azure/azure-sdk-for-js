// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Bulk Updates documents with a Stored Procedure. Prefer `container.items().bulk()` to this behavior.
 */

import * as dotenv from "dotenv";
dotenv.config();

import { logSampleHeader, handleError, finish, logStep } from "./Shared/handleError";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CosmosClient } from "@azure/cosmos";
import { v4 } from "uuid";
const uuid = v4;

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

logSampleHeader("Bulk Update Using Stored Procedures");
// Only to make TypeScript happy
let getContext: any;

function body(continuation: string): void {
  const collection = getContext().getCollection();
  const response = getContext().getResponse();
  const responseBody: any = { updatedDocumentIds: [] }; // Setup Initial Response

  // Find all documents that need to be updated
  collection.queryDocuments(
    collection.getSelfLink(),
    "SELECT * FROM root r",
    { pageSize: 2, continuation }, // Setting this low to show how continuation tokens work
    function(err: any, feed: any, options: any) {
      if (err) throw err;
      // Set continuation token on response if we get one
      responseBody.continuation = options.continuation;
      // Update this batch of documents
      updateDocs(feed, responseBody);
    }
  );

  function updateDocs(documents: any, responseBodyParam: any): void {
    if (documents.length === 0) {
      // If no documents are left to update, we are done
      response.setBody(responseBodyParam);
    } else {
      // Grab the next document to update
      const document = documents.pop();
      document.state = "open";
      collection.replaceDocument(document._self, document, {}, function(err: any) {
        if (err) throw err;
        // If we have successfully updated the document, include it in the returned document ids
        responseBodyParam.updatedDocumentIds.push(document.id);
        // Call update with remaining documents
        updateDocs(documents, responseBodyParam);
      });
    }
  }
}

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run(): Promise<void> {
  // ensuring a database & container exists for us to work with
  logStep("Create database '" + databaseId + "' and container '" + containerId + "'");
  const { database } = await client.databases.createIfNotExists({ id: databaseId }, {});
  const { container } = await database.containers.createIfNotExists({ id: containerId });

  logStep("Insert 20 items");

  // Create 20 items with state set to "closed"
  for (let index = 0; index < 20; index++) {
    await container.items.create({ id: uuid(), state: "closed" });
  }

  logStep("Created stored procedure");
  const { storedProcedure } = await container.scripts.storedProcedures.create({
    id: "queryAndBulkUpdate",
    body
  });

  logStep("Execute stored procedure and follow continuation tokens");
  let continuation: string | undefined = undefined;
  let totalUpdatedDocuments = 0;
  for (;;) {
    const response = await storedProcedure.execute(undefined, [continuation]);
    const result: any = response.resource;
    totalUpdatedDocuments = totalUpdatedDocuments + result.updatedDocumentIds.length;
    console.log(`Updated Documents: ${result.updatedDocumentIds}`);
    continuation = result.continuation;
    if (!result.continuation) {
      console.log("No continuation token! Updates complete");
      console.log(`Total Updated Document Count:`, totalUpdatedDocuments);
      break;
    }
  }
  await finish();
}
run().catch(handleError);
