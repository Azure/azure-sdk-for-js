"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("./util/utils");
class RequestPipeline {
    constructor(filters, requestOptions) {
        this.filters = filters || [];
        this.requestOptions = requestOptions || {};
    }
    addFilter(f) {
        this.filters.push(f);
        return;
    }
    create() {
        const self = this;
        let pipeline = [];
        if (self.filters && self.filters.length) {
            const beforeFilters = [];
            const afterFilters = [];
            for (let i = 0; i < self.filters.length; i++) {
                const filter = self.filters[i];
                if (filter.before && typeof filter.before === "function") {
                    beforeFilters.push(filter.before.bind(filter));
                }
                if (filter.after && typeof filter.after === "function") {
                    afterFilters.push(filter.after.bind(filter));
                }
            } // end-of-for-loop
            // add the request sink
            beforeFilters.push(self.requestSink.bind(self));
            pipeline = beforeFilters.concat(afterFilters);
        }
        else {
            pipeline.push(self.requestSink.bind(self));
        }
        const requestFun = (request) => {
            if (!request.headers)
                request.headers = {};
            return utils.executePromisesSequentially(pipeline, request);
        };
        return requestFun;
    }
    requestSink(options) {
        if (this.requestOptions.method)
            delete this.requestOptions.method;
        return utils.dispatchRequest(options);
    }
}
exports.RequestPipeline = RequestPipeline;
//# sourceMappingURL=requestPipeline.js.map