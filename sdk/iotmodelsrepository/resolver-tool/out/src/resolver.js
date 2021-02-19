// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
const modelFetcherHandler_1 = require("./modelFetcherHandler");
function checkIfTryFromExpanded(options) {
  if (options && options.resolveDependencies && options.resolveDependencies === "tryFromExpanded") {
    return true;
  }
  return false;
}
function checkIfResolveDependencies(options) {
  if (options && options.resolveDependencies && options.resolveDependencies === "enabled") {
    return true;
  }
  return false;
}
function resolve(dtmi, endpoint, options) {
  const tryFromExpanded = checkIfTryFromExpanded(options);
  const resolveDependencies = checkIfResolveDependencies(options);
  return modelFetcherHandler_1.modelFetcher(dtmi, endpoint, resolveDependencies, tryFromExpanded);
}
exports.resolve = resolve;
//# sourceMappingURL=resolver.js.map
