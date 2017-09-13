"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const baseFilter_1 = require("./baseFilter");
class SigningFilter extends baseFilter_1.BaseFilter {
    constructor(authenticationProvider) {
        super();
        this.authenticationProvider = authenticationProvider;
    }
    before(request) {
        const self = this;
        return self.authenticationProvider.signRequest(request);
    }
}
exports.SigningFilter = SigningFilter;
//# sourceMappingURL=signingFilter.js.map