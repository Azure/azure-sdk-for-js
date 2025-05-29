"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceEnvironmentVariable = exports.ServiceAuth = exports.ServiceOS = exports.getConnectOptions = exports.getServiceConfig = void 0;
/**
 * Library for integrating Microsoft Playwright Testing with existing playwright projects.
 *
 * @packageDocumentation
 */
const constants_js_1 = require("./common/constants.js");
Object.defineProperty(exports, "ServiceAuth", { enumerable: true, get: function () { return constants_js_1.ServiceAuth; } });
Object.defineProperty(exports, "ServiceOS", { enumerable: true, get: function () { return constants_js_1.ServiceOS; } });
Object.defineProperty(exports, "ServiceEnvironmentVariable", { enumerable: true, get: function () { return constants_js_1.ServiceEnvironmentVariable; } });
const playwrightService_js_1 = require("./core/playwrightService.js");
Object.defineProperty(exports, "getServiceConfig", { enumerable: true, get: function () { return playwrightService_js_1.getServiceConfig; } });
Object.defineProperty(exports, "getConnectOptions", { enumerable: true, get: function () { return playwrightService_js_1.getConnectOptions; } });
//# sourceMappingURL=index.js.map