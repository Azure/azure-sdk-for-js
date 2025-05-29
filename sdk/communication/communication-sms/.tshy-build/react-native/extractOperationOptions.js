// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __rest } from "tslib";
export const extractOperationOptions = (obj) => {
    const { abortSignal, onResponse, requestOptions, serializerOptions, tracingOptions } = obj, restOptions = __rest(obj, ["abortSignal", "onResponse", "requestOptions", "serializerOptions", "tracingOptions"]);
    return {
        operationOptions: {
            abortSignal,
            requestOptions,
            tracingOptions,
        },
        restOptions,
    };
};
//# sourceMappingURL=extractOperationOptions.js.map