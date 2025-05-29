"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToken = void 0;
const jwt_decode_1 = require("jwt-decode");
const parseToken = (token) => {
    const { exp } = (0, jwt_decode_1.jwtDecode)(token);
    return {
        token,
        expiresOnTimestamp: exp * 1000,
    };
};
exports.parseToken = parseToken;
//# sourceMappingURL=tokenParser.js.map