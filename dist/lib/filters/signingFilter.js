"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseFilter_1 = require("./baseFilter");
var SigningFilter = /** @class */ (function (_super) {
    __extends(SigningFilter, _super);
    function SigningFilter(authenticationProvider) {
        var _this = _super.call(this) || this;
        _this.authenticationProvider = authenticationProvider;
        return _this;
    }
    SigningFilter.prototype.before = function (request) {
        var self = this;
        return self.authenticationProvider.signRequest(request);
    };
    return SigningFilter;
}(baseFilter_1.BaseFilter));
exports.SigningFilter = SigningFilter;
//# sourceMappingURL=signingFilter.js.map