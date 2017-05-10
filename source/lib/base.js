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

var AuthHandler = require("./auth");
var Constants = require("./constants");
var Platform = require("./platform");

//SCRIPT START
function initializeProperties(target, members, prefix) {
    var keys = Object.keys(members);
    var properties;
    var i, len;
    for (i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        var enumerable = key.charCodeAt(0) !== /*_*/ 95;
        var member = members[key];
        if (member && typeof member === "object") {
            if (member.value !== undefined || typeof member.get === "function" || typeof member.set === "function") {
                if (member.enumerable === undefined) {
                    member.enumerable = enumerable;
                }
                if (prefix && member.setName && typeof member.setName === "function") {
                    member.setName(prefix + "." + key);
                }
                properties = properties || {};
                properties[key] = member;
                continue;
            }
        }
        if (!enumerable) {
            properties = properties || {};
            properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true };
            continue;
        }
        target[key] = member;
    }
    if (properties) {
        Object.defineProperties(target, properties);
    }
}

/**
*  Defines a new namespace with the specified name under the specified parent namespace.
* @param {Object} parentNamespace - The parent namespace.
* @param {String} name - The name of the new namespace.
* @param {Object} members - The members of the new namespace.
* @returns {Function} - The newly-defined namespace.
*/
function defineWithParent(parentNamespace, name, members) {
    var currentNamespace = parentNamespace || {};
    
    if (name) {
        var namespaceFragments = name.split(".");
        for (var i = 0, len = namespaceFragments.length; i < len; i++) {
            var namespaceName = namespaceFragments[i];
            if (!currentNamespace[namespaceName]) {
                Object.defineProperty(currentNamespace, namespaceName,
                    { value: {}, writable: false, enumerable: true, configurable: true }
                );
            }
            currentNamespace = currentNamespace[namespaceName];
        }
    }
    
    if (members) {
        initializeProperties(currentNamespace, members, name || "<ANONYMOUS>");
    }
    
    return currentNamespace;
}

/**
*  Defines a new namespace with the specified name.
* @param {String} name - The name of the namespace. This could be a dot-separated name for nested namespaces.
* @param {Object} members - The members of the new namespace.
* @returns {Function} - The newly-defined namespace.
*/
function define(name, members) {
    return defineWithParent(undefined, name, members);
}

/**
*  Defines a class using the given constructor and the specified instance members.
* @param {Function} constructor - A constructor function that is used to instantiate this class.
* @param {Object} instanceMembers - The set of instance fields, properties, and methods to be made available on the class.
* @param {Object} staticMembers - The set of static fields, properties, and methods to be made available on the class.
* @returns {Function} - The newly-defined class.
*/
function defineClass(constructor, instanceMembers, staticMembers) {
    constructor = constructor || function () { };
    if (instanceMembers) {
        initializeProperties(constructor.prototype, instanceMembers);
    }
    if (staticMembers) {
        initializeProperties(constructor, staticMembers);
    }
    return constructor;
}

/**
*  Creates a sub-class based on the supplied baseClass parameter, using prototypal inheritance.
* @param {Function} baseClass - The class to inherit from.
* @param {Function} constructor - A constructor function that is used to instantiate this class.
* @param {Object} instanceMembers - The set of instance fields, properties, and methods to be made available on the class.
* @param {Object} staticMembers - The set of static fields, properties, and methods to be made available on the class.
* @returns {Function} - The newly-defined class.
*/
function derive(baseClass, constructor, instanceMembers, staticMembers) {
    if (baseClass) {
        constructor = constructor || function () { };
        var basePrototype = baseClass.prototype;
        constructor.prototype = Object.create(basePrototype);
        Object.defineProperty(constructor.prototype, "constructor", { value: constructor, writable: true, configurable: true, enumerable: true });
        if (instanceMembers) {
            initializeProperties(constructor.prototype, instanceMembers);
        }
        if (staticMembers) {
            initializeProperties(constructor, staticMembers);
        }
        return constructor;
    } else {
        return defineClass(constructor, instanceMembers, staticMembers);
    }
}

/**
*  Defines a class using the given constructor and the union of the set of instance members
*   specified by all the mixin objects. The mixin parameter list is of variable length.
* @param {object} constructor - A constructor function that is used to instantiate this class.
* @returns {Function} - The newly-defined class.
*/
function mix(constructor) {
    constructor = constructor || function () { };
    var i, len;
    for (i = 1, len = arguments.length; i < len; i++) {
        initializeProperties(constructor.prototype, arguments[i]);
    }
    return constructor;
}

var Base = {
    NotImplementedException: "NotImplementedException",
    
    defineWithParent: defineWithParent,
    
    define: define,
    
    defineClass: defineClass,
    
    derive: derive,
    
    mix: mix,
    
    extend: function (obj, extent) {
        for (var property in extent) {
            if (typeof extent[property] !== "function") {
                obj[property] = extent[property];
            }
        }
        return obj;
    },
    
    map: function (list, fn) {
        var result = [];
        for (var i = 0, n = list.length; i < n; i++) {
            result.push(fn(list[i]));
        }
        
        return result;
    },
    
    getHeaders: function (documentClient, defaultHeaders, verb, path, resourceId, resourceType, options, partitionKeyRangeId) {
        
        var headers = Base.extend({}, defaultHeaders);
        options = options || {};
        
        if (options.continuation) {
            headers[Constants.HttpHeaders.Continuation] = options.continuation;
        }
        
        if (options.preTriggerInclude) {
            headers[Constants.HttpHeaders.PreTriggerInclude] = options.preTriggerInclude.constructor === Array ? options.preTriggerInclude.join(",") : options.preTriggerInclude;
        }
        
        if (options.postTriggerInclude) {
            headers[Constants.HttpHeaders.PostTriggerInclude] = options.postTriggerInclude.constructor === Array ? options.postTriggerInclude.join(",") : options.postTriggerInclude;
        }
        
        if (options.offerType) {
            headers[Constants.HttpHeaders.OfferType] = options.offerType;
        }
        
        if (options.offerThroughput) {
            headers[Constants.HttpHeaders.OfferThroughput] = options.offerThroughput;
        }
        
        if (options.maxItemCount) {
            headers[Constants.HttpHeaders.PageSize] = options.maxItemCount;
        }
        
        if (options.accessCondition) {
            if (options.accessCondition.type === "IfMatch") {
                headers[Constants.HttpHeaders.IfMatch] = options.accessCondition.condition;
            } else {
                headers[Constants.HttpHeaders.IfNoneMatch] = options.accessCondition.condition;
            }
        }
        
        if (options.indexingDirective) {
            headers[Constants.HttpHeaders.IndexingDirective] = options.indexingDirective;
        }
        
        // TODO: add consistency level validation.
        if (options.consistencyLevel) {
            headers[Constants.HttpHeaders.ConsistencyLevel] = options.consistencyLevel;
        }
        
        if (options.resourceTokenExpirySeconds) {
            headers[Constants.HttpHeaders.ResourceTokenExpiry] = options.resourceTokenExpirySeconds;
        }
        
        // TODO: add session token automatic handling in case of session consistency.
        if (options.sessionToken) {
            headers[Constants.HttpHeaders.SessionToken] = options.sessionToken;
        }
        
        if (options.enableScanInQuery) {
            headers[Constants.HttpHeaders.EnableScanInQuery] = options.enableScanInQuery;
        }
        
        if (options.enableCrossPartitionQuery) {
            headers[Constants.HttpHeaders.EnableCrossPartitionQuery] = options.enableCrossPartitionQuery;
        }

        if (options.maxDegreeOfParallelism) {
            headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery] = true;
        }

        if (options.populateQuotaInfo) {
            headers[Constants.HttpHeaders.PopulateQuotaInfo] = true;
        }
        
        // If the user is not using partition resolver, we add options.partitonKey to the header for elastic collections
        if (documentClient.partitionResolver === undefined || documentClient.partitionResolver === null) {
            if (options.partitionKey !== undefined) {
                var partitionKey = options.partitionKey;
                if (partitionKey === null || partitionKey.constructor !== Array) {
                    partitionKey = [partitionKey];
                }
                
                headers[Constants.HttpHeaders.PartitionKey] = JSON.stringify(partitionKey);
            }
        }
        
        if (documentClient.masterKey) {
            headers[Constants.HttpHeaders.XDate] = new Date().toUTCString();
        }
        
        if (documentClient.masterKey || documentClient.resourceTokens) {
            headers[Constants.HttpHeaders.Authorization] = encodeURIComponent(AuthHandler.getAuthorizationHeader(documentClient, verb, path, resourceId, resourceType, headers));
        }
        
        if (verb === "post" || verb === "put") {
            if (!headers[Constants.HttpHeaders.ContentType]) {
                headers[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.Json;
            }
        }
        
        if (!headers[Constants.HttpHeaders.Accept]) {
            headers[Constants.HttpHeaders.Accept] = Constants.MediaTypes.Json;
        }
        
        if (partitionKeyRangeId !== undefined) {
            headers[Constants.HttpHeaders.PartitionKeyRangeID] = partitionKeyRangeId;
        }

        if (options.enableScriptLogging) {
            headers[Constants.HttpHeaders.EnableScriptLogging] = options.enableScriptLogging;
        }

        if (options.offerEnableRUPerMinuteThroughput) {
            headers[Constants.HttpHeaders.OfferIsRUPerMinuteThroughputEnabled] = true; 
        }

        if (options.disableRUPerMinuteUsage) {
            headers[Constants.HttpHeaders.DisableRUPerMinuteUsage] = true; 
        }

        return headers;
    },
    
    /** @ignore */
    parseLink: function (resourcePath) {
        if (resourcePath.length === 0) {
            /* for DatabaseAccount case, both type and objectBody will be undefined. */
            return {
                type: undefined,
                objectBody: undefined
            };
        }
        
        if (resourcePath[resourcePath.length - 1] !== "/") {
            resourcePath = resourcePath + "/";
        }
        
        if (resourcePath[0] !== "/") {
            resourcePath = "/" + resourcePath;
        }
        
        /*
        / The path will be in the form of /[resourceType]/[resourceId]/ .... /[resourceType]//[resourceType]/[resourceId]/ .... /[resourceType]/[resourceId]/
        / or /[resourceType]/[resourceId]/ .... /[resourceType]/[resourceId]/[resourceType]/[resourceId]/ .... /[resourceType]/[resourceId]/
        / The result of split will be in the form of [[[resourceType], [resourceId] ... ,[resourceType], [resourceId], ""]
        / In the first case, to extract the resourceId it will the element before last ( at length -2 ) and the the type will before it ( at length -3 )
        / In the second case, to extract the resource type it will the element before last ( at length -2 )
        */
        var pathParts = resourcePath.split("/");
        var id, type;
        if (pathParts.length % 2 === 0) {
            // request in form /[resourceType]/[resourceId]/ .... /[resourceType]/[resourceId].
            id = pathParts[pathParts.length - 2];
            type = pathParts[pathParts.length - 3];
        } else {
            // request in form /[resourceType]/[resourceId]/ .... /[resourceType]/.
            id = pathParts[pathParts.length - 3];
            type = pathParts[pathParts.length - 2];
        }
        
        var result = {
            type: type,
            objectBody: {
                id: id,
                self: resourcePath
            }
        };
        
        return result;
    },
    
    /** @ignore */
    parsePath: function (path) {
        var pathParts = [];
        var currentIndex = 0;
        
        var throwError = function () {
            throw new Error("Path " + path + " is invalid at index " + currentIndex);
        };
        
        var getEscapedToken = function () {
            var quote = path[currentIndex];
            var newIndex = ++currentIndex;
            
            while (true) {
                newIndex = path.indexOf(quote, newIndex);
                if (newIndex == -1) {
                    throwError();
                }
                
                if (path[newIndex - 1] !== '\\') break;
                
                ++newIndex;
            }
            
            var token = path.substr(currentIndex, newIndex - currentIndex);
            currentIndex = newIndex + 1;
            return token;
        };
        
        var getToken = function () {
            var newIndex = path.indexOf('/', currentIndex);
            var token = null;
            if (newIndex == -1) {
                token = path.substr(currentIndex);
                currentIndex = path.length;
            }
            else {
                token = path.substr(currentIndex, newIndex - currentIndex);
                currentIndex = newIndex;
            }
            
            token = token.trim();
            return token;
        };
        
        while (currentIndex < path.length) {
            if (path[currentIndex] !== '/') {
                throwError();
            }
            
            if (++currentIndex == path.length) break;
            
            if (path[currentIndex] === '\"' || path[currentIndex] === '\'') {
                pathParts.push(getEscapedToken());
            }
            else {
                pathParts.push(getToken());
            }
        }
        
        return pathParts;
    },
    
    /** @ignore */
    getDatabaseLink: function (link) {
        return link.split('/').slice(0, 2).join('/');
    },
    
    /** @ignore */
    getCollectionLink: function (link) {
        return link.split('/').slice(0, 4).join('/');
    },
    
    /** @ignore */
    getAttachmentIdFromMediaId: function (mediaId) {
        // Replace - with / on the incoming mediaId.  This will preserve the / so that we can revert it later.
        var buffer = new Buffer(mediaId.replace(/-/g, "/"), "base64");
        var ResoureIdLength = 20;
        var attachmentId = "";
        if (buffer.length > ResoureIdLength) {
            // After the base64 conversion, change the / back to a - to get the proper attachmentId
            attachmentId = buffer.toString("base64", 0, ResoureIdLength).replace(/\//g, "-");
        } else {
            attachmentId = mediaId;
        }
        
        return attachmentId;
    },
    
    /** @ignore */
    getHexaDigit: function () {
        return Math.floor(Math.random() * 16).toString(16);
    },
    
    /** @ignore */
    generateGuidId: function () {
        var id = "";
        
        for (var i = 0; i < 8; i++) {
            id += Base.getHexaDigit();
        }
        
        id += "-";
        
        for (var i = 0; i < 4; i++) {
            id += Base.getHexaDigit();
        }
        
        id += "-";
        
        for (var i = 0; i < 4; i++) {
            id += Base.getHexaDigit();
        }
        
        id += "-";
        
        for (var i = 0; i < 4; i++) {
            id += Base.getHexaDigit();
        }
        
        id += "-";
        
        for (var i = 0; i < 12; i++) {
            id += Base.getHexaDigit();
        }
        
        return id;
    },
    
    isLinkNameBased: function (link) {
        var parts = link.split("/");
        var firstId = "";
        var count = 0;
        // Get the first id from path.
        for (var i = 0; i < parts.length; ++i) {
            if (!parts[i]) {
                // Skip empty string.
                continue;
            }
            ++count;
            if (count === 1 && parts[i].toLowerCase() !== "dbs") {
                return false;
            }
            if (count === 2) {
                firstId = parts[i];
                break;
            }
        }
        if (!firstId) return false;
        if (firstId.length !== 8) return true;
        var buffer = new Buffer(firstId, "base64");
        if (buffer.length !== 4) return true;
        return false;
    },
    /** @ignore */
    _trimSlashes: function (source) {
        return source.replace(Constants.RegularExpressions.TrimLeftSlashes, "")
                     .replace(Constants.RegularExpressions.TrimRightSlashes, "");
    },
    
    /** @ignore */
    _isValidCollectionLink: function (link) {
        if (typeof link !== "string") {
            return false;
        }
        
        var parts = Base._trimSlashes(link).split("/");
        
        if (parts && parts.length !== 4) {
            return false;
        }
        
        if (parts[0] !== "dbs") {
            return false;
        }
        
        if (parts[2] !== "colls") {
            return false;
        }
        
        return true;
    },
    /** @ignore */
    _getUserAgent: function () {
        return Platform.getUserAgent();
    }
};
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = Base;
}
