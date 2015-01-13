//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

'use strict';

var AuthHandler = require("./auth");
var Constants = require("./constants");
//SCRIPT START
    function initializeProperties(target, members, prefix) {
        var keys = Object.keys(members);
        var properties;
        var i, len;
        for (i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var enumerable = key.charCodeAt(0) !== /*_*/95;
            var member = members[key];
            if (member && typeof member === "object") {
                if (member.value !== undefined || typeof member.get === "function" || typeof member.set === "function") {
                    if (member.enumerable === undefined) {
                        member.enumerable = enumerable;
                    }
                    if (prefix && member.setName && typeof member.setName === "function") {
                        member.setName(prefix + "." + key)
                    }
                    properties = properties || {};
                    properties[key] = member;
                    continue;
                }
            }
            if (!enumerable) {
                properties = properties || {};
                properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true }
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

    defineWithParent : defineWithParent,
    
    define : define,

    defineClass: defineClass,

    derive: derive,
    
    mix: mix,

    extend: function(obj, extent) {
        for (var property in extent) {
            if (typeof(extent[property]) !== "function") {
                obj[property] = extent[property];
            } 
        }
        return obj;
    },

    map: function(list, fn) {
        var result = [];
        for (var i = 0, n = list.length; i < n; i++){
            result.push(fn(list[i]));
        }
        
        return result;
    },

    getHeaders: function(documentClient, defaultHeaders, verb, path, resourceId, resourceType, options) {

        var headers = Base.extend({}, defaultHeaders);
        options = options || {};
        
        if (options.continuation) {
            headers[Constants.HttpHeaders.Continuation] = options.continuation;
        }

        if (options.preTriggerInclude) {
            headers[Constants.HttpHeaders.PreTriggerInclude] = options.preTriggerInclude.constructor === Array? options.preTriggerInclude.join(","): options.preTriggerInclude;
        }

        if (options.postTriggerInclude) {
            headers[Constants.HttpHeaders.PostTriggerInclude] = options.postTriggerInclude.constructor === Array? options.postTriggerInclude.join(","): options.postTriggerInclude;
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

        return headers;
    },
    
     /** @ignore */
    parsePath: function(resourcePath) {
        if (resourcePath.length == 0) {
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
    getAttachmentIdFromMediaId: function(mediaId) {
        var buffer = new Buffer(mediaId, 'base64');
        var ResoureIdLength = 20;
        var attachmentId = "";
        if (buffer.length > ResoureIdLength) {
            attachmentId = buffer.toString('base64', 0, ResoureIdLength)
        } 
        else {
            attachmentId = mediaId;
        }
        
        return attachmentId;
    },
	
	/** @ignore */
	getHexaDigit: function() {
		return Math.floor(Math.random() * 16).toString(16);
	},
	
	/** @ignore */
	generateGuidId: function() {
		var id = "";
		
		for (var i = 0;i < 8; i++) {
			id+= Base.getHexaDigit();
		}
		
		id+= "-";
		
		for (var i = 0;i < 4; i++) {
			id+= Base.getHexaDigit();
		}
		
		id+= "-";
		
		for (var i = 0;i < 4; i++) {
			id+= Base.getHexaDigit();
		}
		
		id+= "-";
		
		for (var i = 0;i < 4; i++) {
			id+= Base.getHexaDigit();
		}
		
		id+= "-";
		
		for (var i = 0;i < 12; i++) {
			id+= Base.getHexaDigit();
		}
		
		return id;
	}
};
//SCRIPT END

if (typeof exports !== "undefined") {    
    module.exports = Base;
}