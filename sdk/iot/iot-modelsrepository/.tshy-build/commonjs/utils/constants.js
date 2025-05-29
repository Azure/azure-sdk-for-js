"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEPENDENCY_MODE_TRY_FROM_EXPANDED = exports.DEPENDENCY_MODE_ENABLED = exports.DEPENDENCY_MODE_DISABLED = exports.DEFAULT_API_VERSION = exports.DEFAULT_REPOSITORY_LOCATION = exports.DEFAULT_USER_AGENT = exports.SDK_VERSION = void 0;
const core_util_1 = require("@azure/core-util");
const currentPlatform = core_util_1.isNode ? "node" : "browser";
exports.SDK_VERSION = "1.0.0-beta.3";
exports.DEFAULT_USER_AGENT = `azsdk-node-modelsrepository/${exports.SDK_VERSION} (${currentPlatform})`;
exports.DEFAULT_REPOSITORY_LOCATION = "https://devicemodels.azure.com";
exports.DEFAULT_API_VERSION = "2021-02-11";
exports.DEPENDENCY_MODE_DISABLED = "disabled";
exports.DEPENDENCY_MODE_ENABLED = "enabled";
exports.DEPENDENCY_MODE_TRY_FROM_EXPANDED = "tryFromExpanded";
//# sourceMappingURL=constants.js.map