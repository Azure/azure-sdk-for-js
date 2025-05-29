"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK_VERSION = exports.LATEST_API_VERSION = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./accessControlClient.js"), exports);
tslib_1.__exportStar(require("./accessControlModels.js"), exports);
tslib_1.__exportStar(require("./backupClient.js"), exports);
tslib_1.__exportStar(require("./backupClientModels.js"), exports);
tslib_1.__exportStar(require("./settingsClient.js"), exports);
tslib_1.__exportStar(require("./settingsClientModels.js"), exports);
var constants_js_1 = require("./constants.js");
Object.defineProperty(exports, "LATEST_API_VERSION", { enumerable: true, get: function () { return constants_js_1.LATEST_API_VERSION; } });
Object.defineProperty(exports, "SDK_VERSION", { enumerable: true, get: function () { return constants_js_1.SDK_VERSION; } });
//# sourceMappingURL=index.js.map