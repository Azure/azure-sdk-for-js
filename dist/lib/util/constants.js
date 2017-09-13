"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const Constants = {
    /**
     * Defines constants for long running operation states.
     *
     * @const
     * @type {string}
     */
    LongRunningOperationStates: {
        InProgress: "InProgress",
        Succeeded: "Succeeded",
        Failed: "Failed",
        Canceled: "Canceled"
    },
    /**
     * The default language in the request header.
     *
     * @const
     * @type {string}
     */
    DEFAULT_LANGUAGE: "en-us",
    /**
     * The ms-rest-azure version.
     * @const
     * @type {string}
     */
    msRestAzureVersion: "0.1.0"
};
exports.default = Constants;
//# sourceMappingURL=constants.js.map