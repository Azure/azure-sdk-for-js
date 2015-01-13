//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

'use strict';

var Documents = require('./documents')
  , Constants = require("./constants")
  , https = require("https")
  ,	url = require("url")
  , querystring = require("querystring");
  
// We don't turn off agent because we want the pooling benefits.
https.globalAgent.maxSockets = 10000;
// setting security protocol for the global agent.
https.globalAgent.options.secureProtocol = "TLSv1_client_method";

//----------------------------------------------------------------------------
// Utility methods
//

function bodyFromData(data) {
    if (data.pipe) return data;
    if (Buffer.isBuffer(data)) return data;
    if (typeof data === "string") return data;
    if (typeof data === "object") return JSON.stringify(data);
    return undefined;
}

function parse(urlString) { return url.parse(urlString); }

function createRequestObject(connectionPolicy, requestOptions, callback){
    var isMedia = ( requestOptions.path.indexOf("media") > -1 );
    
    var httpsRequest = https.request(requestOptions, function(response) {
        // In case of media response, return the stream to the user and the user will need to handle reading the stream.
        if(isMedia && connectionPolicy.MediaReadMode === Documents.MediaReadMode.Streamed){
           callback(undefined, response, response.headers);
           return;
        }
        
        var data = "";
        response.on("data", function(chunk) { 
            data += chunk;
        });
        response.on("end", function() {
            if (response.statusCode >= 400) {
	            callback({code:response.statusCode, body:data}, undefined, response.headers); 
                return;
            }

            var result;
            try {
                if (isMedia) {
                    result = data;
                } else {
                    result = data.length > 0 ? JSON.parse(data) : undefined;
                }
            } catch (exception) {
               callback(exception);
               return;
            }

            return callback(undefined, result, response.headers);
        });
    });
    
    httpsRequest.on('socket', function(socket) {
        if (isMedia) {
            socket.setTimeout(connectionPolicy.MediaRequestTimeout);
        } else {
            socket.setTimeout(connectionPolicy.RequestTimeout);
        }
        
        socket.on('timeout', function() {
            httpsRequest.abort();
        });
    });
    
    httpsRequest.on("error", callback);
	return httpsRequest;
}

var RequestHandler = {
    /**
     *  Creates the request object, call the passed callback when the response is retrieved.
     * @param {object} connectionPolicy - an instance of ConectionPolicy that has the connection configs.
     * @param {string} method - the http request method ( 'get', 'post', 'put', .. etc ).
     * @param {String} url - The base url for the endpoint.
     * @param {string} path - the path of the requesed resource.
     * @param {Object} data - the request body. It can be either string, buffer, stream or undefined.
     * @param {Object} queryParams - query parameters for the request.
     * @param {Object} headers - specific headers for the request.
     * @param {function} callback - the callback that will be called when the response is retrieved and processed.
    */
    request: function(connectionPolicy, method, url, path, data, queryParams, headers, callback) {
        var body;
        
        if (data) {
            body = bodyFromData(data);
            if (!body) return callback({message:"parameter data must be a javascript object, string, Buffer, or stream"});
        }

        var buffer;
        var stream;
        if (body) {
            if (Buffer.isBuffer(body)) {
                buffer = body;
            }
            else if (body.pipe) {
                // it is a stream
                stream = body;
            }
            else if (typeof body === "string") {
                buffer = new Buffer(body, "utf8");
            }
            else {
                callback({message:"body must be string, Buffer, or stream"});
            }
        }

        var requestOptions = parse(url);
        requestOptions.method = method;
        requestOptions.path = path;
        requestOptions.headers = headers;
            
        if(queryParams) {
           requestOptions.path += "?" + querystring.stringify(queryParams);
        }
        
        if (buffer) {
            requestOptions.headers[Constants.HttpHeaders.ContentLength] = buffer.length;
            var httpsRequest = createRequestObject(connectionPolicy, requestOptions, callback);
            httpsRequest.write(buffer);
            httpsRequest.end();
        } else if(stream) {
            var httpsRequest = createRequestObject(connectionPolicy, requestOptions, callback);
            stream.pipe(httpsRequest);
        } else {
            var httpsRequest = createRequestObject(connectionPolicy, requestOptions, callback);
            httpsRequest.end();
        }
    }
}

if (typeof exports !== "undefined") {
    module.exports = RequestHandler;
}