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
var constants_1 = require("../util/constants");
var utils_1 = require("../util/utils");
var os = require("os");
var HeaderConstants = constants_1.Constants.HeaderConstants;
var MsRestUserAgentFilter = /** @class */ (function (_super) {
    __extends(MsRestUserAgentFilter, _super);
    function MsRestUserAgentFilter(userAgentInfo) {
        var _this = _super.call(this) || this;
        _this.userAgentInfo = userAgentInfo;
        return _this;
    }
    MsRestUserAgentFilter.prototype.tagRequest = function (request) {
        if (utils_1.isNode) {
            var osInfo = "(" + os.arch() + "-" + os.type() + "-" + os.release() + ")";
            if (this.userAgentInfo.indexOf(osInfo) === -1) {
                this.userAgentInfo.unshift(osInfo);
            }
            var runtimeInfo = "Node/" + process.version;
            if (this.userAgentInfo.indexOf(runtimeInfo) === -1) {
                this.userAgentInfo.unshift(runtimeInfo);
            }
            var nodeSDKSignature = "Azure-SDK-For-Node";
            if (this.userAgentInfo.indexOf(nodeSDKSignature) === -1) {
                var azureRuntime = "ms-rest-azure";
                var insertIndex = this.userAgentInfo.indexOf(azureRuntime);
                // insert after azureRuntime, otherwise, insert last.
                insertIndex = insertIndex < 0 ? this.userAgentInfo.length : insertIndex + 1;
                this.userAgentInfo.splice(insertIndex, 0, nodeSDKSignature);
            }
            if (!request.headers)
                request.headers = {};
            request.headers[HeaderConstants.USER_AGENT] = this.userAgentInfo.join(" ");
        }
        return Promise.resolve(request);
    };
    MsRestUserAgentFilter.prototype.before = function (request) {
        var self = this;
        if (!request.headers)
            request.headers = {};
        if (!request.headers[HeaderConstants.USER_AGENT]) {
            return self.tagRequest(request);
        }
        else {
            return Promise.resolve(request);
        }
    };
    return MsRestUserAgentFilter;
}(baseFilter_1.BaseFilter));
exports.MsRestUserAgentFilter = MsRestUserAgentFilter;
//# sourceMappingURL=msRestUserAgentFilter.js.map