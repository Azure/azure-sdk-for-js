"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
class RestError extends Error {
    constructor(message, code, statusCode, request, response, body) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.request = request;
        this.response = response;
        this.body = body;
    }
}
exports.RestError = RestError;
//# sourceMappingURL=restError.js.map