"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const ms_rest_js_1 = require("ms-rest-js");
/**
 * Creates a new CognitiveServicesCredentials object.
 *
 * @constructor
 * @param {string} subscriptionKey   The CognitiveServices subscription key
 */
class CognitiveServicesCredentials extends ms_rest_js_1.ApiKeyCredentials {
    constructor(subscriptionKey) {
        if (!subscriptionKey || (subscriptionKey && typeof subscriptionKey.valueOf() !== "string")) {
            throw new Error("subscriptionKey cannot be null or undefined and must be of type string.");
        }
        const options = {
            inHeader: {
                "Ocp-Apim-Subscription-Key": subscriptionKey,
                "X-BingApis-SDK-Client": "node-SDK"
            }
        };
        super(options);
    }
}
exports.CognitiveServicesCredentials = CognitiveServicesCredentials;
//# sourceMappingURL=cognitiveServicesCredentials.js.map