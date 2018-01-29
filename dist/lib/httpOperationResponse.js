"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Wrapper object for http request and response. Deserialized object is stored in
 * the `bodyAsJson` property when the response body is received in JSON.
 * @class
 * Initializes a new instance of the HttpOperationResponse class.
 * @constructor
 */
var HttpOperationResponse = /** @class */ (function () {
    function HttpOperationResponse(request, response) {
        /**
         * Reference to the original request object.
         * [WebResource] object.
         * @type {object}
         */
        this.request = request;
        /**
         * Reference to the original response object.
         * [ServerResponse] object.
         * @type {object}
         */
        this.response = response;
        /* tslint:disable:no-null-keyword */
        this.bodyAsText = null;
        this.bodyAsJson = null;
    }
    return HttpOperationResponse;
}());
exports.HttpOperationResponse = HttpOperationResponse;
//# sourceMappingURL=httpOperationResponse.js.map