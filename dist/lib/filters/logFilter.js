"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const baseFilter_1 = require("./baseFilter");
class LogFilter extends baseFilter_1.BaseFilter {
    constructor(logger = console.log) {
        super();
        this.logger = logger;
    }
    after(operationResponse) {
        const self = this;
        self.logger(`>> Request: ${JSON.stringify(operationResponse.request, undefined, 2)}`);
        self.logger(`>> Response status code: ${operationResponse.response.status}`);
        const responseBody = operationResponse.bodyAsText;
        self.logger(`>> Body: ${responseBody}`);
        return Promise.resolve(operationResponse);
    }
}
exports.LogFilter = LogFilter;
//# sourceMappingURL=logFilter.js.map