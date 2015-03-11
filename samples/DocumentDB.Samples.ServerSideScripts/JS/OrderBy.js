// Copyright (c) Microsoft Corporation.  All rights reserved.

// Register DocDB JavaScript server API for intelisense: 
//   either add the file to Tools->Options->Text Editor->JavaScript->Intellisense->References and reference the group registered 
//   or provide path to the file explicitly.
/// <reference group="Generic" />
/// <reference path="C:\Program Files (x86)\Microsoft Visual Studio 12.0\JavaScript\References\DocDbWrapperScript.js" />

/**
* This is run as stored procedure and does the following:
* - create ordered result set (result) which is an array sorted by orderByFieldName parameter.
* - call collection.queryDocuments.
* - in the callback for each document, insert into an array (result)
* - in the end, sort the resulting array and return it to the client
*
* Important notes:
* - The resulting record set could be too large to fit into one response
*   - To walk around that, we setBody by one element and catch the REQUEST_ENTITY_TOO_LARGE exception.
*     When we get the exception, return resulting set to the client with continuation token
*     to continue from item index specified by this token.
*   - Note that when continuation is called, it will be different transaction
*
* @param {String} filterQuery - Optional filter for query.
* @param {String} orderByFieldName - The name of the field to order by resulting set.
*/
function orderBy(filterQuery, orderByFieldName, continuationToken) {
    // HTTP error codes sent to our callback funciton by DocDB server.
    var ErrorCode = {
        REQUEST_ENTITY_TOO_LARGE: 413,
    }

    var collection = getContext().getCollection();
    var collectionLink = collection.getSelfLink();
    var result = new Array();

    tryQuery({});

    function tryQuery(options) {
        var isAccepted = (filterQuery && filterQuery.length) ?
            collection.queryDocuments(collectionLink, filterQuery, options, callback) :
            collection.readDocuments(collectionLink, options, callback)

        if (!isAccepted) throw new Error("Source dataset is too large to complete the operation.");
    }

    /**
    * queryDocuments callback.
    * @param {Error} err - Error object in case of error/exception.
    * @param {Array} queryFeed - array containing results of the query.
    * @param {ResponseOptions} responseOptions.
    */
    function callback(err, queryFeed, responseOptions) {
        if (err) {
            throw err;
        }

        // Iterate over document feed and store documents into the result array.
        queryFeed.forEach(function (element, index, array) {
            result[result.length] = element;
        });

        if (responseOptions.continuation) {
            // If there is continuation, call query again providing continuation token.
            tryQuery({ continuation: responseOptions.continuation });
        } else {
            // We are done with querying/got all results. Sort the results and return from the script.
            result.sort(compare);

            fillResponse();
        }
    }

    // Compare two objects(documents) using field specified by the orderByFieldName parameter.
    // Return 0 if equal, -1 if less, 1 if greater.
    function compare(x, y) {
        if (x[orderByFieldName] == y[orderByFieldName]) return 0;
        else if (x[orderByFieldName] < y[orderByFieldName]) return -1;
        return 1;
    }

    // This is called in the very end on an already sorted array.
    // Sort the results and set the response body.
    function fillResponse() {
        // Main script is called with continuationToken which is the index of 1st item to start result batch from.
        // Slice the result array and discard the beginning. From now on use the 'continuationResult' var.
        var continuationResult = result;
        if (continuationToken) continuationResult = result.slice(continuationToken);
        else continuationToken = 0;

        // Get/initialize the response.
        var response = getContext().getResponse();
        response.setBody(null);

        // Take care of response body getting too large:
        // Set Response iterating by one element. When we fail due to MAX response size, return to the client requesting continuation.
        var i = 0;
        for (; i < continuationResult.length; ++i) {
            try {
                // Note: setBody is very expensive vs appendBody, use appendBody with simple approximation JSON.stringify(element).
                response.appendBody(JSON.stringify(continuationResult[i]));
            } catch (ex) {
                if (!ex.number == ErrorCode.REQUEST_ENTITY_TOO_LARGE) throw ex;
                break;
            }
        }
        
        // Now next batch to return to client has i elements.
        // Slice the continuationResult if needed and discard the end.
        var partialResult = continuationResult;
        var newContinuation = null;
        if (i < continuationResult.length) {
            partialResult = continuationResult.slice(0, i);
        }

        // Finally, set response body.
        response.setBody({ result: result, continuation: newContinuation });
    }
}
