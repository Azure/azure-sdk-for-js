"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSasTokenProvider = exports.createSasTokenProvider = void 0;
const tokenProvider_js_1 = require("./auth/tokenProvider.js");
Object.defineProperty(exports, "createSasTokenProvider", { enumerable: true, get: function () { return tokenProvider_js_1.createSasTokenProvider; } });
const typeGuards_js_1 = require("./util/typeGuards.js");
Object.defineProperty(exports, "isSasTokenProvider", { enumerable: true, get: function () { return typeGuards_js_1.isSasTokenProvider; } });
//# sourceMappingURL=internals.js.map