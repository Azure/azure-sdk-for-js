"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
const baseFilter_1 = require("./baseFilter");
const utils = require("../util/utils");
const parse = require("url-parse");
class RedirectFilter extends baseFilter_1.BaseFilter {
    constructor(maximumRetries = 20) {
        super();
        this.maximumRetries = maximumRetries;
    }
    handleRedirect(operationResponse, currentRetries) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = operationResponse.request;
            const response = operationResponse.response;
            if (response && response.headers && response.headers.get("location") &&
                (response.status === 300 || response.status === 307 || (response.status === 303 && request.method === "POST")) &&
                (!this.maximumRetries || currentRetries < this.maximumRetries)) {
                if (parse(response.headers.get("location")).hostname) {
                    request.url = response.headers.get("location");
                }
                else {
                    const urlObject = parse(request.url);
                    urlObject.set("pathname", response.headers.get("location"));
                    request.url = urlObject.href;
                }
                // POST request with Status code 303 should be converted into a
                // redirected GET request if the redirect url is present in the location header
                if (response.status === 303) {
                    request.method = "GET";
                }
                let res;
                try {
                    res = yield utils.dispatchRequest(request);
                    currentRetries++;
                }
                catch (err) {
                    return Promise.reject(err);
                }
                return this.handleRedirect(res, currentRetries);
            }
            return Promise.resolve(operationResponse);
        });
    }
    after(operationResponse) {
        return this.handleRedirect(operationResponse, 0);
    }
}
exports.RedirectFilter = RedirectFilter;
//# sourceMappingURL=redirectFilter.js.map