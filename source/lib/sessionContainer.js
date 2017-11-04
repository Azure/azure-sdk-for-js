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

var Base = require("./base")
    , ResourceId = require("./resourceId")
    , Constants = require("./constants")
    , BigInt = require("big-integer");

var SessionContainer = Base.defineClass(

    function (hostname, collectionNameToCollectionResourceId, collectionResourceIdToSessionTokens) {
        this.hostname = hostname;

        if (collectionNameToCollectionResourceId != undefined && collectionResourceIdToSessionTokens != undefined) {
            this.collectionNameToCollectionResourceId = collectionNameToCollectionResourceId;
            this.collectionResourceIdToSessionTokens = collectionResourceIdToSessionTokens;
        } else {
            this.collectionNameToCollectionResourceId = {};
            this.collectionResourceIdToSessionTokens = {};
        }
    },
    {
        getHostName: function () {
            return this.hostname;
        },

        getPartitionKeyRangeIdToTokenMap: function (request) {
            return this.getPartitionKeyRangeIdToTokenMapPrivate(request['isNameBased'], request['resourceId'], request['resourceAddress']);
        },

        getPartitionKeyRangeIdToTokenMapPrivate: function (isNameBased, rId, resourceAddress) {
            var rangeIdToTokenMap = null;
            if (!isNameBased) {
                if (rId) {
                    var resourceIdObject = new ResourceId();
                    var resourceId = resourceIdObject.parse(rId);
                    if (resourceId.documentCollection != '0') {
                        rangeIdToTokenMap = this.collectionResourceIdToSessionTokens[resourceId.getUniqueDocumentCollectionId()];
                    }
                }
            } else {
                resourceAddress = Base._trimSlashes(resourceAddress)
                var collectionName = Base.getCollectionLink(resourceAddress);
                if (collectionName && (collectionName in this.collectionNameToCollectionResourceId))
                    rangeIdToTokenMap = this.collectionResourceIdToSessionTokens[this.collectionNameToCollectionResourceId[collectionName]];
            }

            return rangeIdToTokenMap;
        },

        resolveGlobalSessionToken: function (request) {
            if (!request)
                throw new Error("request cannot be null");

            return this.resolveGlobalSessionTokenPrivate(request['isNameBased'], request['resourceId'], request['resourceAddress']);
        },

        resolveGlobalSessionTokenPrivate: function (isNameBased, rId, resourceAddress) {
            var rangeIdToTokenMap = this.getPartitionKeyRangeIdToTokenMapPrivate(isNameBased, rId, resourceAddress);
            if (rangeIdToTokenMap != null)
                return this.getCombinedSessionToken(rangeIdToTokenMap);

            return "";
        },

        clearToken: function (request) {
            var collectionResourceId = undefined;
            if (!request['isNameBased']) {
                if (request['resourceId']) {
                    var resourceIdObject = new ResourceId();
                    var resourceId = resourceIdObject.parse(request['resourceId']);
                    if (resourceId.documentCollection != 0) {
                        collectionResourceId = resourceId.getUniqueDocumentCollectionId();
                    }
                }
            } else {
                var resourceAddress = Base._trimSlashes(request['resourceAddress']);
                var collectionName = Base.getCollectionLink(resourceAddress);
                if (collectionName) {
                    collectionResourceId = this.collectionNameToCollectionResourceId[collectionName];
                    delete this.collectionNameToCollectionResourceId[collectionName];
                }
            }
            if (collectionResourceId != undefined)
                delete this.collectionResourceIdToSessionTokens[collectionResourceId];
        },

        setSessionToken: function (request, reqHeaders, resHeaders) {
            if (resHeaders && !this.isReadingFromMaster(request['resourceType'], request['opearationType'])) {
                var sessionToken = resHeaders[Constants.HttpHeaders.SessionToken];
                if (sessionToken) {
                    var ownerFullName = resHeaders[Constants.HttpHeaders.OwnerFullName];
                    if (!ownerFullName)
                        ownerFullName = Base._trimSlashes(request['resourceAddress']);

                    var collectionName = Base.getCollectionLink(ownerFullName);

                    var ownerId = undefined;
                    if (!request['isNameBased']) {
                        ownerId = request['resourceId'];
                    } else {
                        ownerId = resHeaders[Constants.HttpHeaders.OwnerId];
                        if (!ownerId)
                            ownerId = request['resourceId'];
                    }

                    if (ownerId) {
                        var resourceIdObject = new ResourceId();
                        var resourceId = resourceIdObject.parse(ownerId);

                        if (resourceId.documentCollection != 0 && collectionName) {
                            var uniqueDocumentCollectionId = resourceId.getUniqueDocumentCollectionId();
                            this.setSesisonTokenPrivate(uniqueDocumentCollectionId, collectionName, sessionToken);
                        }
                    }
                }
            }
        },

        setSesisonTokenPrivate: function (collectionRid, collectionName, sessionToken) {
            if (!(collectionRid in this.collectionResourceIdToSessionTokens))
                this.collectionResourceIdToSessionTokens[collectionRid] = {};
            this.compareAndSetToken(sessionToken, this.collectionResourceIdToSessionTokens[collectionRid]);
            if (!(collectionName in this.collectionNameToCollectionResourceId))
                this.collectionNameToCollectionResourceId[collectionName] = collectionRid;
        },

        getCombinedSessionToken: function (tokens) {
            var result = "";
            if (tokens) {
                for (var index in tokens) {
                    result = result + index + ':' + tokens[index] + ",";
                }
            }
            return result.slice(0, -1);
        },

        compareAndSetToken: function (newToken, oldTokens) {
            if (newToken) {
                var newTokenParts = newToken.split(":");
                if (newTokenParts.length == 2) {
                    var range = newTokenParts[0];
                    var newLSN = BigInt(newTokenParts[1]);
                    var success = false;

                    var oldLSN = BigInt(oldTokens[range]);
                    if (!oldLSN || oldLSN.lesser(newLSN))
                        oldTokens[range] = newLSN.toString();
                }
            }
        },

        isReadingFromMaster: function (resourceType, operationType) {
            if (resourceType == "offers" ||
                resourceType == "dbs" ||
                resourceType == "users" ||
                resourceType == "permissions" ||
                resourceType == "topology" ||
                resourceType == "databaseaccount" ||
                resourceType == "pkranges" ||
                (resourceType == "colls"
                    && (operationType == Constants.OperationTypes.Query))) {
                return true;
            }

            return false;
        }
    }
);

if (typeof exports !== "undefined") {
    module.exports = SessionContainer;
}

