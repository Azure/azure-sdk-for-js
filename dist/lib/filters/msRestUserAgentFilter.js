"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const baseFilter_1 = require("./baseFilter");
const constants_1 = require("../util/constants");
const os = require("os");
const isNode = require("detect-node");
const HeaderConstants = constants_1.Constants.HeaderConstants;
class MsRestUserAgentFilter extends baseFilter_1.BaseFilter {
    constructor(userAgentInfo) {
        super();
        this.userAgentInfo = userAgentInfo;
    }
    tagRequest(request) {
        if (isNode) {
            const osInfo = `(${os.arch()}-${os.type()}-${os.release()})`;
            if (this.userAgentInfo.indexOf(osInfo) === -1) {
                this.userAgentInfo.unshift(osInfo);
            }
            const runtimeInfo = `Node/${process.version}`;
            if (this.userAgentInfo.indexOf(runtimeInfo) === -1) {
                this.userAgentInfo.unshift(runtimeInfo);
            }
            const nodeSDKSignature = `Azure-SDK-For-Node`;
            if (this.userAgentInfo.indexOf(nodeSDKSignature) === -1) {
                const azureRuntime = `ms-rest-azure`;
                let insertIndex = this.userAgentInfo.indexOf(azureRuntime);
                // insert after azureRuntime, otherwise, insert last.
                insertIndex = insertIndex < 0 ? this.userAgentInfo.length : insertIndex + 1;
                this.userAgentInfo.splice(insertIndex, 0, nodeSDKSignature);
            }
            if (!request.headers)
                request.headers = {};
            request.headers[HeaderConstants.USER_AGENT] = this.userAgentInfo.join(" ");
        }
        return Promise.resolve(request);
    }
    before(request) {
        const self = this;
        if (!request.headers)
            request.headers = {};
        if (!request.headers[HeaderConstants.USER_AGENT]) {
            return self.tagRequest(request);
        }
        else {
            return Promise.resolve(request);
        }
    }
}
exports.MsRestUserAgentFilter = MsRestUserAgentFilter;
//# sourceMappingURL=msRestUserAgentFilter.js.map