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

var Documents = require("./documents")
    , Constants = require("./constants")
    , https = require("https")
    , url = require("url")
    , querystring = require("querystring")
    , RetryUtility = require("./retryUtility");

//----------------------------------------------------------------------------
// Utility methods
//

function javaScriptFriendlyJSONStringify(s) {
    // two line terminators (Line separator and Paragraph separator) are not needed to be escaped in JSON
    // but are needed to be escaped in JavaScript.
    return JSON.stringify(s).
        replace(/\u2028/g, '\\u2028').
        replace(/\u2029/g, '\\u2029');
}

function bodyFromData(data) {
    if (data.pipe) return data;
    if (Buffer.isBuffer(data)) return data;
    if (typeof data === "string") return data;
    if (typeof data === "object") return javaScriptFriendlyJSONStringify(data);
    return undefined;
}

function parse(urlString) { return url.parse(urlString); }

function createRequestObject(connectionPolicy, requestOptions, callback) {
    function onTimeout() {
        httpsRequest.abort();
    }

    var isMedia = (requestOptions.path.indexOf("//media") === 0);

    var httpsRequest = https.request(requestOptions, function (response) {
        // In case of media response, return the stream to the user and the user will need to handle reading the stream.
        if (isMedia && connectionPolicy.MediaReadMode === Documents.MediaReadMode.Streamed) {
            return callback(undefined, response, response.headers);
        }

        var data = "";

        //if the requested data is text (not attachment/media) set the encoding to UTF-8
        if (!isMedia) {
            response.setEncoding("utf8");
        }

        response.on("data", function (chunk) {
            data += chunk;
        });
        response.on("end", function () {
            if (response.statusCode >= 400) {
                return callback(getErrorBody(response, data), undefined, response.headers);
            }

            var result;
            try {
                if (isMedia) {
                    result = data;
                } else {
                    result = data.length > 0 ? JSON.parse(data) : undefined;
                }
            } catch (exception) {
                return callback(exception);
            }

            callback(undefined, result, response.headers);
        });
    });

    httpsRequest.once("socket", function (socket) {
        if (isMedia) {
            socket.setTimeout(connectionPolicy.MediaRequestTimeout);
        } else {
            socket.setTimeout(connectionPolicy.RequestTimeout);
        }

        socket.once("timeout", onTimeout);

        httpsRequest.once("response", function () {
            socket.removeListener("timeout", onTimeout);
        });
    });

    httpsRequest.once("error", callback);
    return httpsRequest;
}

/**
*  Constructs the error body from the response and the data returned from the request.
* @param {object} response - response object returned from the executon of a request.
* @param {object} data - the data body returned from the executon of a request.
*/
function getErrorBody(response, data) {
    var errorBody = { code: response.statusCode, body: data };

    if (Constants.HttpHeaders.ActivityId in response.headers) {
        errorBody.activityId = response.headers[Constants.HttpHeaders.ActivityId];
    }

    if (Constants.HttpHeaders.SubStatus in response.headers) {
        errorBody.substatus = parseInt(response.headers[Constants.HttpHeaders.SubStatus]);
    }

    if (Constants.HttpHeaders.RetryAfterInMilliseconds in response.headers) {
        errorBody.retryAfterInMilliseconds = parseInt(response.headers[Constants.HttpHeaders.RetryAfterInMilliseconds]);
    }

    return errorBody;
}

var RequestHandler = {
    _createRequestObjectStub: function (connectionPolicy, requestOptions, callback) {
        return createRequestObject(connectionPolicy, requestOptions, callback);
    },

    /**
     *  Creates the request object, call the passed callback when the response is retrieved.
     * @param {object} globalEndpointManager - an instance of GlobalEndpointManager class.
     * @param {object} connectionPolicy - an instance of ConnectionPolicy that has the connection configs.
     * @param {object} requestAgent - the https agent used for send request
     * @param {string} method - the http request method ( 'get', 'post', 'put', .. etc ).
     * @param {String} url - The base url for the endpoint.
     * @param {string} path - the path of the requesed resource.
     * @param {Object} data - the request body. It can be either string, buffer, stream or undefined.
     * @param {Object} queryParams - query parameters for the request.
     * @param {Object} headers - specific headers for the request.
     * @param {function} callback - the callback that will be called when the response is retrieved and processed.
    */
    request: function (globalEndpointManager, connectionPolicy, requestAgent, method, url, request, data, queryParams, headers, callback) {
        var path = request.path == undefined ? request : request.path;
        var body;

        if (data) {
            body = bodyFromData(data);
            if (!body) return callback({ message: "parameter data must be a javascript object, string, Buffer, or stream" });
        }

        var buffer;
        var stream;
        if (body) {
            if (Buffer.isBuffer(body)) {
                buffer = body;
            } else if (body.pipe) {
                // it is a stream
                stream = body;
            } else if (typeof body === "string") {
                buffer = new Buffer(body, "utf8");
            } else {
                return callback({ message: "body must be string, Buffer, or stream" });
            }
        }

        var requestOptions = parse(url);
        requestOptions.method = method;
        requestOptions.path = path;
        requestOptions.headers = headers;
        requestOptions.agent = requestAgent;
        requestOptions.secureProtocol = "TLSv1_client_method";

        if (connectionPolicy.DisableSSLVerification === true) {
            requestOptions.rejectUnauthorized = false;
        }

        if (queryParams) {
            requestOptions.path += "?" + querystring.stringify(queryParams);
        }

        if (buffer) {
            requestOptions.headers[Constants.HttpHeaders.ContentLength] = buffer.length;
            RetryUtility.execute(globalEndpointManager, { buffer: buffer, stream: null }, this._createRequestObjectStub, connectionPolicy, requestOptions, request, callback);
        } else if (stream) {
            RetryUtility.execute(globalEndpointManager, { buffer: null, stream: stream }, this._createRequestObjectStub, connectionPolicy, requestOptions, request, callback);
        } else {
            RetryUtility.execute(globalEndpointManager, { buffer: null, stream: null }, this._createRequestObjectStub, connectionPolicy, requestOptions, request, callback);
        }
    }
}

if (typeof exports !== "undefined") {
    module.exports = RequestHandler;
}
