// Copyright (c) Microsoft Corporation.  All rights reserved.

// Register DocDB JavaScript server API for intelisense: 
//   either add the file to Tools->Options->Text Editor->JavaScript->Intellisense->References and reference the group registered 
//   or provide path to the file explicitly.
/// <reference group="Generic" />
/// <reference path="C:\Program Files (x86)\Microsoft Visual Studio 12.0\JavaScript\References\DocDbWrapperScript.js" />

/**
* This is run as stored procedure and does the following:
* - get 1st document in the collection, convert to JSON, prepend string specified by the prefix parameter 
*   and set response to the result of that.
*
* @param {String} prefix - The string to prepend to the 1st document in collection.
*/
function simple(prefix) {
    var collection = getContext().getCollection();

    // Query documents and take 1st item.
    var isAccepted = collection.queryDocuments(
        collection.getSelfLink(),
        'SELECT * FROM root r',
        function (err, feed, options) {
            if (err) throw err;

            // Check the feed and if it's empty, set the body to 'no docs found',
            // Otherwise just take 1st element from the feed.
            if (!feed || !feed.length) getContext().getResponse().setBody("no docs found");
            else getContext().getResponse().setBody(prefix + JSON.stringify(feed[0]));
        });

    if (!isAccepted) throw new Error("The query wasn't accepted by the server. Try again/use continuation token between API and script.");
}
