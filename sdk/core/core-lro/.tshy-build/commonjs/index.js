"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeState = exports.createHttpPoller = void 0;
var poller_js_1 = require("./http/poller.js");
Object.defineProperty(exports, "createHttpPoller", { enumerable: true, get: function () { return poller_js_1.createHttpPoller; } });
var operation_js_1 = require("./poller/operation.js");
Object.defineProperty(exports, "deserializeState", { enumerable: true, get: function () { return operation_js_1.deserializeState; } });
//# sourceMappingURL=index.js.map