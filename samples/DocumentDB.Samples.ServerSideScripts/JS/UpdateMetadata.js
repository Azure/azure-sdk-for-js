// Copyright (c) Microsoft Corporation.  All rights reserved.

// Register DocDB JavaScript server API for intelisense: 
//   either add the file to Tools->Options->Text Editor->JavaScript->Intellisense->References and reference the group registered 
//   or provide path to the file explicitly.
/// <reference group="Generic" />
/// <reference path="C:\Program Files (x86)\Microsoft Visual Studio 12.0\JavaScript\References\DocDbWrapperScript.js" />

/**
* This script runs as a trigger:
* for each inserted document, look at document.size and update aggregate properties of metadata document: minSize, maxSize, totalSize.
*/
function updateMetadata() {
    // HTTP error codes sent to our callback funciton by DocDB server.
    var ErrorCode = {
        RETRY_WITH: 449,
    }

    var collection = getContext().getCollection();
    var collectionLink = collection.getSelfLink();

    // Get the document from request (the script runs as trigger, thus the input comes in request).
    var doc = getContext().getRequest().getBody();

    // Check the doc (ignore docs with invalid/zero size and metaDoc itself) and call updateMetadata.
    if (!doc.isMetadata && doc.size != undefined && doc.size > 0) {
        getAndUpdateMetadata();
    }

    function getAndUpdateMetadata() {
        // Get the meta document. We keep it in the same collection. it's the only doc that has .isMetadata = true.
        var isAccepted = collection.queryDocuments(collectionLink, 'SELECT * FROM root r WHERE r.isMetadata = true', function (err, feed, options) {
            if (err) throw err;
            if (!feed || !feed.length) throw new Error("Failed to find the metadata document.");

            // The metadata document.
            var metaDoc = feed[0];

            // Update metaDoc.minSize:
            // for 1st document use doc.Size, for all the rest see if it's less than last min.
            if (metaDoc.minSize == 0) metaDoc.minSize = doc.size;
            else metaDoc.minSize = Math.min(metaDoc.minSize, doc.size);
            
            // Update metaDoc.maxSize.
            metaDoc.maxSize = Math.max(metaDoc.maxSize, doc.size);

            // Update metaDoc.totalSize.
            metaDoc.totalSize += doc.size;
            
            // Update/replace the metadata document in the store.
            var isAccepted = collection.replaceDocument(metaDoc._self, metaDoc, function (err) {
                if (err) throw err;
                // Note: in case concurrent updates causes conflict with ErrorCode.RETRY_WITH, we can't read the meta again 
                //       and update again because due to Snapshot isolation we will read same exact version (we are in same transaction).
                //       We have to take care of that on the client side.
            });
            if (!isAccepted) throw new Error("The call replaceDocument(metaDoc) returned false.");
        });
        if (!isAccepted) throw new Error("The call queryDocuments for metaDoc returned false.");
    }
}
