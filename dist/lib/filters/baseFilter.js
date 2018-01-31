"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var BaseFilter = /** @class */ (function () {
    function BaseFilter() {
    }
    BaseFilter.prototype.before = function (request) {
        return Promise.resolve(request);
    };
    BaseFilter.prototype.after = function (response) {
        return Promise.resolve(response);
    };
    return BaseFilter;
}());
exports.BaseFilter = BaseFilter;
//# sourceMappingURL=baseFilter.js.map