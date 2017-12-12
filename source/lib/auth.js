/*
The MIT License (MIT)
Copyright (c) 2017 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";

var crypto = require("crypto");

var AuthHandler = {
    getAuthorizationHeader: function (documentClient, verb, path, resourceId, resourceType, headers) {
        if (documentClient.masterKey) {
            return encodeURIComponent(this.getAuthorizationTokenUsingMasterKey(verb, resourceId, resourceType, headers, documentClient.masterKey));
        } else if (documentClient.resourceTokens) {
            return encodeURIComponent(this.getAuthorizationTokenUsingResourceTokens(documentClient.resourceTokens, path, resourceId));
        }
    },

    getAuthorizationTokenUsingMasterKey: function (verb, resourceId, resourceType, headers, masterKey) {
        var key = new Buffer(masterKey, "base64");

        var text = (verb || "").toLowerCase() + "\n" +
            (resourceType || "").toLowerCase() + "\n" +
            (resourceId || "") + "\n" +
            (headers["x-ms-date"] || "").toLowerCase() + "\n" +
            (headers["date"] || "").toLowerCase() + "\n";

        var body = new Buffer(text, "utf8");

        var signature = crypto.createHmac("sha256", key).update(body).digest("base64");

        var MasterToken = "master";

        var TokenVersion = "1.0";

        return "type=" + MasterToken + "&ver=" + TokenVersion + "&sig=" + signature;
    },

    getAuthorizationTokenUsingResourceTokens: function (resourceTokens, path, resourceId) {
        if (resourceTokens && Object.keys(resourceTokens).length > 0) {
            // For database account access(through getDatabaseAccount API), path and resourceId are "", 
            // so in this case we return the first token to be used for creating the auth header as the service will accept any token in this case
            if (!path && !resourceId) {
                return resourceTokens[Object.keys(resourceTokens)[0]];
            }

            if (resourceId && resourceTokens[resourceId]) {
                return resourceTokens[resourceId];
            }

            //minimum valid path /dbs
            if (!path || path.length < 4) {
                return null;
            }

            //remove '/' from left and right of path
            path = path[0] == '/' ? path.substring(1) : path;
            path = path[path.length - 1] == '/' ? path.substring(0, path.length - 1) : path;

            var pathSegments = (path && path.split("/")) || [];

            //if it's an incomplete path like /dbs/db1/colls/, start from the paretn resource
            var index = pathSegments.length % 2 === 0 ? pathSegments.length - 1 : pathSegments.length - 2;
            for (; index > 0; index -= 2) {
                var id = decodeURI(pathSegments[index]);
                if (resourceTokens[id]) {
                    return resourceTokens[id];
                }
            }
        }
        return null;
    }

};

if (typeof exports !== "undefined") {
    module.exports = AuthHandler;
}