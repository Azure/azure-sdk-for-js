// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates using stored procedures for server side run functions
 */

const path = require("path");
require("dotenv").config();

const { logSampleHeader, logStep, finish, handleError } = require("./Shared/handleError");
const { CosmosClient } = require("@azure/cosmos");
logSampleHeader("Server Side Scripts");
const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";

// Establish a new instance of the DocumentDBClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

// Execute the stored procedure with the following parameters.
const sprocParams = [
  {
    id: "myDocument",
    foo: "bar",
  },
];

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
let getContext;
const sprocDefinition = {
  id: "upsert",
  body: function (document) {
    const context = getContext();
    const collection = context.getCollection();
    const collectionLink = collection.getSelfLink();
    const response = context.getResponse();
    const errorCodes = { CONFLICT: 409 };

    // Not checking for existence of document.id for compatibility with createDocument.
    if (!document) throw new Error("The document is undefined or null.");

    tryCreate(document, callback);

    function tryCreate(doc, cback) {
      const isAccepted = collection.createDocument(collectionLink, doc, cback);
      if (!isAccepted) throw new Error("Unable to schedule create document");
      response.setBody({ op: "created" });
    }

    // To replace the document, first issue a query to find it and then call replace.
    function tryReplace(doc, cback) {
      retrieveDoc(doc, function (retrievedDocs) {
        const isAccepted = collection.replaceDocument(retrievedDocs[0]._self, doc, cback);
        if (!isAccepted) throw new Error("Unable to schedule replace document");
        response.setBody({ op: "replaced" });
      });
    }

    function retrieveDoc(doc, cback, continuation) {
      const query = {
        query: "select * from root r where r.id = @id",
        parameters: [{ name: "@id", value: doc.id }],
      };
      const requestOptions = { continuation: continuation };
      const isAccepted = collection.queryDocuments(
        collectionLink,
        query,
        requestOptions,
        function (err, retrievedDocs, responseOptions) {
          if (err) throw err;

          if (retrievedDocs.length > 0) {
            cback(retrievedDocs);
          } else if (responseOptions.continuation) {
            // Conservative check for continuation. Not expected to hit in practice for the "id query"
            retrieveDoc(doc, responseOptions.continuation, cback);
          } else {
            throw new Error("Error in retrieving document: " + doc.id);
          }
        }
      );
      if (!isAccepted) throw new Error("Unable to query documents");
    }

    // This is called when collection.createDocument is done in order to
    // process the result.
    function callback(err) {
      if (err) {
        // Replace the document if status code is 409 and upsert is enabled
        if (err.status === errorCodes.CONFLICT) {
          return tryReplace(document, callback);
        } else {
          throw err;
        }
      }
    }
  },
};

async function run() {
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
