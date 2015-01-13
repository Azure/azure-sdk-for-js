//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

'use strict';

var crypto = require("crypto");

var AuthHandler = {
    getAuthorizationHeader: function(documentClient, verb, path, resourceId, resourceType, headers) {
        if (documentClient.masterKey) {
            return this.getAuthorizationTokenUsingMasterKey(verb, resourceId, resourceType, headers, documentClient.masterKey);
        } else if(documentClient.resourceTokens) {
            return this.getAuthorizationTokenUsingResourceTokens(documentClient.resourceTokens, path, resourceId);
        }
    },

    getAuthorizationTokenUsingMasterKey: function(verb, resourceId, resourceType, headers, masterKey){
        var key = new Buffer(masterKey, "base64");

        var text = (verb || "") + "\n" +
                   (resourceType || "") + "\n" +
                   (resourceId || "") + "\n" +
                   (headers["x-ms-date"] || "") + "\n" +
                   (headers["date"] || "") + "\n";

        var body = new Buffer(text.toLowerCase(), "utf8");

        var signature = crypto.createHmac("sha256", key).update(body).digest("base64");

        var MasterToken = "master";
        
        var TokenVersion = "1.0";
        
        return "type=" + MasterToken +"&ver=" + TokenVersion + "&sig=" + signature;
    },

    getAuthorizationTokenUsingResourceTokens: function(resourceTokens, path, resourceId){
        if (resourceTokens[resourceId]) {
            return resourceTokens[resourceId];
        } else {
            var pathParts = path.split("/");
            var resourceTypes = ["dbs", "colls", "docs", "sprocs", "udfs", "triggers", "users", "permissions", "attachments", "media", "conflicts"];
            for (var i = pathParts.length - 1; i >= 0;i--) {
                if (resourceTypes.indexOf(pathParts[i]) === -1) {
                    if (resourceTokens[pathParts[i]]) {
                        return resourceTokens[pathParts[i]];
                    }
                }
            }
        }
    }
}

if (typeof exports !== "undefined") {
    module.exports = AuthHandler;
}