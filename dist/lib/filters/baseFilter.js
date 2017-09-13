"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
class BaseFilter {
    constructor() { }
    before(request) {
        return Promise.resolve(request);
    }
    after(response) {
        return Promise.resolve(response);
    }
}
exports.BaseFilter = BaseFilter;
//# sourceMappingURL=baseFilter.js.map