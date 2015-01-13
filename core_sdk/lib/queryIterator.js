//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

'use strict';

var Base = require("./base")
  , Constants = require('./constants');

//SCRIPT START
var QueryIterator = Base.defineClass(
    /**
    * Represents a QueryIterator Object, an implmenetation of feed or query response that enables traversal and iterating over the response.
    * @constructor QueryIterator
    * @param {object} documentclient - The documentclient object.
    * @param {object} body           - the JSON body.
    */
    function(documentclient, query, options, fetchFunction){
        this.documentclient = documentclient;
        this.query = query;
        this.resources = [];
        this.current = 0;
        this.fetchFunction = fetchFunction;
        this.continuation = null;
        this.options = options || {};
        this._states = Object.freeze({start: "start", inProgress: "inProgress", ended: "ended" });
        this._state = this._states.start;
    },
    {
        /**
         * Execute a provided function once per feed element.
         * @memberof QueryIterator
         * @instance
         * @param {callback} callback - Function to execute for each element. the function takes two parameters error, element.
         * Note: the last element the callback will be called on will be undefined.
         * If the callback explicitly returned false, the loop gets stopped.
         */
        forEach: function(callback) {
            if (this._state !== this._states.start) {
                this.reset();
            }           
            
            this._forEachImplementation(callback);
        },
        
         /**
         * Execute a provided function on the next element in the QueryIterator.
         * @memberof QueryIterator
         * @instance
         * @param {callback} callback - Function to execute for each element. the function takes two parameters error, element.
         */
        nextItem: function(callback) {
            var that = this;
            if (this.current < this.resources.length) {
                return callback(undefined, this.resources[this.current++]);
            }
            
            if (this._state === this._states.start || (this.continuation && this._state === this._states.inProgress)) {
                this._fetchMore(function(err, resources, headers){
                    if(err) {
                        return callback(err, undefined, headers);
                    }
                    
                    that.resources = resources;
                    if (that.resources.length === 0) {
                        if (!that.continuation) {
                            that._state = that._states.ended;
                            callback(undefined, undefined);
                            return;
                        } else {
                            that.nextItem(callback);
                            return;
                        }
                    }

                    callback(undefined, that.resources[that.current++]);
                });
            } else {
                this._state = this._states.ended;
                callback(undefined, undefined);
            }
        },
        
        /**
         * Retrieve the current element on the QueryIterator.
         * @memberof QueryIterator
         * @instance
         * @returns {Object} The current resource in the QueryIterator, undefined if there isn't.
         */ 
        current: function(){
            return this.resources[this.current];
        },
        
        /**
         * Determine if there are still remaining resources to processs based on the value of the continuation token or the elements remaining on the current batch in the QueryIterator.
         * @memberof QueryIterator
         * @instance
         * @returns {Boolean} true if there is other elements to process in the QueryIterator.
         */ 
        hasMoreResults: function() {
            return this._state === this._states.start || this.continuation !== undefined || this.current < this.resources.length;
        },
        
        /**
         * Retrieve all the elements of the feed and pass them as an array to a function
         * @memberof QueryIterator
         * @instance
         * @param {callback} callback - Function execute on the feed response, takes two parameters error, resourcesList
         */
        toArray: function(callback){
            if (this._state !== this._states.start) {
                this.reset();
            }           
            
            this._toArrayImplementation(callback);
        },
        
        /**
         * Retrieve the next batch of the feed and pass them as an array to a function
         * @memberof QueryIterator
         * @instance
         * @param {callback} callback - Function execute on the feed response, takes two parameters error, resourcesList
         */
        executeNext: function(callback) {
            var that = this;
            this._fetchMore(function(err, resources, responseHeaders) {
                if(err) {
                    return callback(err, undefined, responseHeaders);
                }
                
                callback(undefined, resources, responseHeaders);
            });
        },

        /**
         * Reset the QueryIterator to the beginning and clear all the resources inside it
         * @memberof QueryIterator
         * @instance
         */
        reset: function() {
            this.current = 0;
            this.continuation = null;
            this.resources = [];
            this._state = this._states.start;
        },
        
         /** @ignore */
        _toArrayImplementation: function(callback){
            var that = this;
            if (this._state === this._states.start || (this.continuation && this._state === this._states.inProgress)) {
                this._fetchMore(function(err, resources, headers){
                    if(err) {
                        return callback(err, undefined, headers);
                    }
                    
                    that.resources = that.resources.concat(resources);
                    that._toArrayImplementation(callback);
                });
            } else {
                this._state = this._states.ended;
                callback(undefined, this.resources);
            }
        },
        
         /** @ignore */
        _forEachImplementation: function(callback){
            var that = this;
            if (this._state === this._states.start || (this.continuation && this._state === this._states.inProgress)) {
                this._fetchMore(function(err, resources, headers){
                    if(err) {
                        return callback(err, undefined, headers);
                    }
                    
                    that.resources = resources;
                    while (that.current < that.resources.length) {
                        // if the callback explicitly returned false, the loop gets stopped.
                        if (callback(undefined, that.resources[that.current++]) === false) {
                            return;
                        }
                    }
                    
                    that._forEachImplementation(callback);
                });
            } else {
                that._state = that._states.ended;
                callback(undefined, undefined);
            }
        },
        
         /** @ignore */
        _fetchMore: function(callback){
            var that = this;
            this.options.continuation = this.continuation;
            this.fetchFunction(this.options, function(err, resources, responseHeaders){
                if(err) {
                    that._state = that._states.ended;
                    return callback(err, undefined, responseHeaders);
                }
                
                that.continuation = responseHeaders[Constants.HttpHeaders.Continuation];
                that._state = that._states.inProgress;
                that.current = 0;
                callback(undefined, resources, responseHeaders);
            });
        }
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = QueryIterator;
}