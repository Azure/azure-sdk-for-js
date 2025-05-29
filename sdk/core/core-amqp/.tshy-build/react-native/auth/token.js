// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Describes the type of supported tokens.
 */
export var TokenType;
(function (TokenType) {
    /**
     * The "jwt" token type. Used with AADTokenCredential.
     */
    TokenType["CbsTokenTypeJwt"] = "jwt";
    /**
     * The sas token type. Used with SharedKeyCredential.
     */
    TokenType["CbsTokenTypeSas"] = "servicebus.windows.net:sastoken";
})(TokenType || (TokenType = {}));
//# sourceMappingURL=token.js.map