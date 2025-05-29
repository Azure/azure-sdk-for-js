"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractOperationOptions = void 0;
const tslib_1 = require("tslib");
const extractOperationOptions = (obj) => {
    const { abortSignal, onResponse, requestOptions, serializerOptions, tracingOptions } = obj, restOptions = tslib_1.__rest(obj, ["abortSignal", "onResponse", "requestOptions", "serializerOptions", "tracingOptions"]);
    return {
        operationOptions: {
            abortSignal,
            requestOptions,
            tracingOptions,
        },
        restOptions,
    };
};
exports.extractOperationOptions = extractOperationOptions;
//# sourceMappingURL=extractOperationOptions.js.map