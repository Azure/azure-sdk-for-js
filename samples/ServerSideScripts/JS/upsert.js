'use strict';
/**
 * A DocumentDB stored procedure that upserts a given document (insert new or update if present) using its id property.<br/>
 * This implementation tries to create, and if the create fails then query for the document with the specified document's id, then replace it. 
 * Use this sproc if creates are more common than replaces, otherwise use "upsertOptimizedForReplace" 
 *
 * @function
 * @param {Object} document - A document that should be upserted into this collection.
 * @returns {Object.<string>} Returns an object with the property:<br/>
 *   op - created (or) replaced.
 */
var upsert = {
    id: "upsert",
    body: function (document) {
        var context = getContext();
        var collection = context.getCollection();
        var collectionLink = collection.getSelfLink();
        var response = context.getResponse();
        var errorCodes = { CONFLICT: 409 };

        // Not checking for existence of document.id for compatibility with createDocument.
        if (!document) throw new Error("The document is undefined or null.");

        tryCreate(document, callback);

        function tryCreate(doc, callback) {
            var isAccepted = collection.createDocument(collectionLink, doc, callback);
            if (!isAccepted) throw new Error("Unable to schedule create document");
            response.setBody({"op": "created"});
        }

        // To replace the document, first issue a query to find it and then call replace.
        function tryReplace(doc, callback) {
            retrieveDoc(doc, null, function(retrievedDocs){
                var isAccepted = collection.replaceDocument(retrievedDocs[0]._self, doc, callback);
                if (!isAccepted) throw new Error("Unable to schedule replace document");
                response.setBody({"op": "replaced"});
            });
        }

        function retrieveDoc(doc, continuation, callback) {
            var query = { query: "select * from root r where r.id = @id", parameters: [ {name: "@id", value: doc.id}]};
            var requestOptions = { continuation : continuation };
            var isAccepted = collection.queryDocuments(collectionLink, query, requestOptions, function(err, retrievedDocs, responseOptions) {
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
        function callback(err, doc, options) {
            if (err) {
                // Replace the document if status code is 409 and upsert is enabled
                if(err.number == errorCodes.CONFLICT) {
                    return tryReplace(document, callback);
                } else {
                    throw err;
                }
            }
        }
    }
}

module.exports = upsert;