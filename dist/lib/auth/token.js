"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Describes the type of supported tokens.
 * @readonly
 * @enum TokenType
 */
var TokenType;
(function (TokenType) {
    /**
     * The "jwt" token type. Used with AADTokenProvider.
     */
    TokenType["CbsTokenTypeJwt"] = "jwt";
    /**
     * The sas token type. Used with SasTokenProvider.
     */
    TokenType["CbsTokenTypeSas"] = "servicebus.windows.net:sastoken";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
//# sourceMappingURL=token.js.map