"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = void 0;
/**
 * Describes the type of supported tokens.
 */
var TokenType;
(function (TokenType) {
    /**
     * The "jwt" token type. Used with AADTokenCredential.
     */
    TokenType["CbsTokenTypeJwt"] = "jwt";
    /**
     * The sas token type. Used with SharedKeyCredential.
     */
    TokenType["CbsTokenTypeSas"] = "servicebus.windows.net:sastoken";
})(TokenType || (exports.TokenType = TokenType = {}));
//# sourceMappingURL=token.js.map