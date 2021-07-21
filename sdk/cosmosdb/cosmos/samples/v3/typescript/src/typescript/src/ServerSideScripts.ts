// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates using stored procedures for server side run functions
 */

import { logSampleHeader, logStep, finish, handleError } from "./Shared/handleError";
import { CosmosClient, ErrorResponse } from "../../../dist-esm";
import { FeedOptions, Item, Resource } from "../../../dist-esm";

logSampleHeader("Server Side Scripts");
const {
    COSMOS_DATABASE: databaseId,
    COSMOS_CONTAINER: containerId,
    COSMOS_ENDPOINT: endpoint,
    COSMOS_KEY: key
  } = process.env;

// Establish a new instance of the DocumentDBClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

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

/**
 * An Azure Cosmos DB stored procedure that upserts a given document (insert new or update if present) using its id property.<br/>
 * This implementation tries to create, and if the create fails then query for the document with the specified document's id, then replace it. 
 * Use this sproc if creates are more common than replaces, otherwise use "upsertOptimizedForReplace" 
 *
 * @function
 * @param {Object} document - A document that should be upserted into this collection.
 * @returns {Object.<string>} Returns an object with the property:<br/>
 *   op - created (or) replaced.
 */
 let getContext: any;
 const sprocDefinition = {
  id: "upsert",
  body: function (document: Item) {
      var context = getContext();
      var collection = context.getCollection();
      var collectionLink = collection.getSelfLink();
      var response = context.getResponse();
      var errorCodes = { CONFLICT: 409 };

      // Not checking for existence of document.id for compatibility with createDocument.
      if (!document) throw new Error("The document is undefined or null.");

      tryCreate(document, callback);

      function tryCreate(doc: Item, callback: any) {
          var isAccepted = collection.createDocument(collectionLink, doc, callback);
          if (!isAccepted) throw new Error("Unable to schedule create document");
          response.setBody({"op": "created"});
      }

      // To replace the document, first issue a query to find it and then call replace.
      function tryReplace(doc: Item, callback: any) {
          retrieveDoc(doc, null, function(retrievedDocs: Resource[]){
              var isAccepted = collection.replaceDocument(retrievedDocs[0]._self, doc, callback);
              if (!isAccepted) throw new Error("Unable to schedule replace document");
              response.setBody({"op": "replaced"});
          });
      }

      function retrieveDoc(doc: Item, continuation: string, callback: any) {
          var query = { query: "select * from root r where r.id = @id", parameters: [ {name: "@id", value: doc.id}]};
          var requestOptions = { continuation : continuation };
          var isAccepted = collection.queryDocuments(collectionLink, query, requestOptions, function(err: Error, retrievedDocs: Resource[], responseOptions: FeedOptions) {
              if (err) throw err;

              if (retrievedDocs.length > 0) {
                  callback(retrievedDocs);
              } else if (responseOptions.continuation) {
                  // Conservative check for continuation. Not expected to hit in practice for the "id query"
                  retrieveDoc(doc, responseOptions.continuation, callback);
              } else {
                  throw new Error("Error in retrieving document: " + doc.id);
              }
              });
          if (!isAccepted) throw new Error("Unable to query documents");
      }

      // This is called when collection.createDocument is done in order to
      // process the result.
      function callback(err: ErrorResponse) {
          if (err) {
              // Replace the document if status code is 409 and upsert is enabled
              if(err.status == errorCodes.CONFLICT) {
                  return tryReplace(document, callback);
              } else {
                  throw err;
              }
          }
      }
  }
}