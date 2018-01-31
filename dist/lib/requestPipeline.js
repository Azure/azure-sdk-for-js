"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("./util/utils");
var RequestPipeline = /** @class */ (function () {
    function RequestPipeline(filters, requestOptions) {
        this.filters = filters || [];
        this.requestOptions = requestOptions || {};
    }
    RequestPipeline.prototype.addFilter = function (f) {
        this.filters.push(f);
        return;
    };
    RequestPipeline.prototype.create = function () {
        var self = this;
        var pipeline = [];
        if (self.filters && self.filters.length) {
            var beforeFilters = [];
            var afterFilters = [];
            for (var i = 0; i < self.filters.length; i++) {
                var filter = self.filters[i];
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
        var requestFun = function (request) {
            if (!request.headers)
                request.headers = {};
            return utils.executePromisesSequentially(pipeline, request);
        };
        return requestFun;
    };
    RequestPipeline.prototype.requestSink = function (options) {
        if (this.requestOptions.method)
            delete this.requestOptions.method;
        return utils.dispatchRequest(options);
    };
    return RequestPipeline;
}());
exports.RequestPipeline = RequestPipeline;
//# sourceMappingURL=requestPipeline.js.map